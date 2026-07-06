// lib/scraper.ts
import { addResult, updateJob } from './jobs'

async function getText(page: import('playwright-core').Page, selector: string): Promise<string> {
  return page.$eval(selector, el => el.textContent?.trim() ?? '').catch(() => '')
}

export async function runScraper(
  jobId: string,
  segmento: string,
  cidade: string,
  raioKm: number,
  filtroSite: 'sem_site' | 'com_site' | 'todos' = 'sem_site'
): Promise<void> {
  updateJob(jobId, { status: 'running', progress: 5 })

  let browser: import('playwright-core').Browser | undefined
  try {
    // Import dinâmico para evitar execução do coreBundle no momento do bundle
    const playwright = await import('playwright-core')

    let launchOptions: Parameters<typeof playwright.chromium.launch>[0]

    if (process.env.NODE_ENV === 'production') {
      const chromium = (await import('@sparticuz/chromium')).default
      launchOptions = {
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: true,
      }
    } else {
      launchOptions = { headless: true }
    }

    browser = await playwright.chromium.launch(launchOptions)

    const page = await browser.newPage()

    await page.setExtraHTTPHeaders({
      'Accept-Language': 'pt-BR,pt;q=0.9',
    })

    const query = encodeURIComponent(`${segmento} em ${cidade}`)
    await page.goto(`https://www.google.com/maps/search/${query}`, {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    })

    await page.waitForSelector('[role="feed"]', { timeout: 15000 })
    await page.waitForSelector('[role="feed"] a[href*="/maps/place/"]', { timeout: 15000 })

    // Scroll para carregar mais resultados
    const feed = await page.$('[role="feed"]')
    if (feed) {
      for (let s = 0; s < 8; s++) {
        await feed.evaluate(el => el.scrollBy(0, 600))
        await page.waitForTimeout(800)
      }
    }

    const hrefs: string[] = await page.$$eval(
      '[role="feed"] a[href*="/maps/place/"]',
      els => [...new Set(els.map(el => (el as HTMLAnchorElement).href).filter(h => h.includes('/maps/place/')))]
    )

    const total = Math.min(hrefs.length, 40)
    updateJob(jobId, { progress: 10 })

    for (let i = 0; i < total; i++) {
      try {
        await page.goto(hrefs[i], { waitUntil: 'domcontentloaded', timeout: 20000 })
        await page.waitForSelector('h1', { timeout: 10000 })

        const hasWebsite = await page.$('a[data-item-id="authority"]') !== null
        if (filtroSite === 'sem_site' && hasWebsite) {
          updateJob(jobId, { progress: 10 + Math.floor(((i + 1) / total) * 85) })
          continue
        }
        if (filtroSite === 'com_site' && !hasWebsite) {
          updateJob(jobId, { progress: 10 + Math.floor(((i + 1) / total) * 85) })
          continue
        }

        const name = await getText(page, 'h1')

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

        const mapsUrl = page.url()

        if (name && name !== 'Resultados') {
          addResult(jobId, { name, phone, address, mapsUrl })
        }

        updateJob(jobId, { progress: 10 + Math.floor(((i + 1) / total) * 85) })
      } catch {
        // Continua para próximo
      }
    }

    updateJob(jobId, { status: 'done', progress: 100 })
  } catch (err) {
    updateJob(jobId, {
      status: 'error',
      progress: 0,
      error: err instanceof Error ? err.message : 'Erro desconhecido',
    })
  } finally {
    await browser?.close()
  }
}
