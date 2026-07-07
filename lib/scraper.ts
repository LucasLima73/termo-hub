import type { Lead } from './types'

async function getText(page: import('puppeteer-core').Page, selector: string): Promise<string> {
  return page.$eval(selector, el => el.textContent?.trim() ?? '').catch(() => '')
}

export async function scrapeLeads(
  segmento: string,
  cidade: string,
  filtroSite: 'sem_site' | 'com_site' | 'todos' = 'sem_site'
): Promise<Lead[]> {
  const puppeteer = await import('puppeteer-core')

  let executablePath: string
  let args: string[]

  if (process.env.NODE_ENV === 'production') {
    const chromium = (await import('@sparticuz/chromium')).default
    executablePath = await chromium.executablePath()
    args = chromium.args
  } else {
    // macOS local — usa Chrome instalado
    executablePath =
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    args = ['--no-sandbox', '--disable-setuid-sandbox']
  }

  const browser = await puppeteer.launch({
    executablePath,
    args,
    headless: true,
  })

  const results: Lead[] = []

  try {
    const page = await browser.newPage()
    await page.setExtraHTTPHeaders({ 'Accept-Language': 'pt-BR,pt;q=0.9' })

    const query = encodeURIComponent(`${segmento} em ${cidade}`)
    await page.goto(`https://www.google.com/maps/search/${query}`, {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    })

    await page.waitForSelector('[role="feed"]', { timeout: 15000 })
    await page.waitForSelector('[role="feed"] a[href*="/maps/place/"]', { timeout: 15000 })

    // Scroll para carregar mais resultados
    await page.evaluate(async () => {
      const feed = document.querySelector('[role="feed"]')
      if (!feed) return
      for (let i = 0; i < 5; i++) {
        feed.scrollBy(0, 600)
        await new Promise(r => setTimeout(r, 600))
      }
    })

    const hrefs: string[] = await page.$$eval(
      '[role="feed"] a[href*="/maps/place/"]',
      els => [...new Set(
        (els as HTMLAnchorElement[]).map(el => el.href).filter(h => h.includes('/maps/place/'))
      )]
    )

    const total = Math.min(hrefs.length, 15)

    for (let i = 0; i < total; i++) {
      try {
        await page.goto(hrefs[i], { waitUntil: 'domcontentloaded', timeout: 20000 })
        await page.waitForSelector('h1', { timeout: 10000 })

        const hasWebsite = (await page.$('a[data-item-id="authority"]')) !== null
        if (filtroSite === 'sem_site' && hasWebsite) continue
        if (filtroSite === 'com_site' && !hasWebsite) continue

        const name = await getText(page, 'h1')
        if (!name || name === 'Resultados') continue

        const phone =
          (await getText(page, '[data-item-id^="phone"]')) ||
          (await getText(page, 'button[data-item-id^="phone"]')) ||
          (await page.$eval(
            '[aria-label^="Telefone"]',
            el => el.getAttribute('aria-label')?.replace('Telefone: ', '') ?? ''
          ).catch(() => ''))

        const address =
          (await getText(page, '[data-item-id="address"]')) ||
          (await page.$eval(
            '[aria-label^="Endereço"]',
            el => el.getAttribute('aria-label')?.replace('Endereço: ', '') ?? ''
          ).catch(() => ''))

        results.push({ name, phone, address, mapsUrl: page.url() })
      } catch {
        // pula resultado com erro
      }
    }
  } finally {
    await browser.close()
  }

  return results
}
