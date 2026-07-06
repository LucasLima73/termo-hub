// lib/scraper.ts
import chromium from '@sparticuz/chromium'
import playwright from 'playwright-core'
import { addResult, updateJob } from './jobs'

export async function runScraper(
  jobId: string,
  segmento: string,
  cidade: string,
  raioKm: number
): Promise<void> {
  updateJob(jobId, { status: 'running', progress: 5 })

  let browser
  try {
    browser = await playwright.chromium.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    })

    const page = await browser.newPage()
    const query = encodeURIComponent(`${segmento} em ${cidade}`)
    await page.goto(`https://www.google.com/maps/search/${query}`, {
      waitUntil: 'networkidle',
      timeout: 30000,
    })

    // Aguarda lista de resultados carregar
    await page.waitForSelector('[role="feed"]', { timeout: 15000 })

    // Coleta links dos resultados
    const listItems = await page.$$('[role="feed"] > div a[href*="/maps/place/"]')
    const total = Math.min(listItems.length, 20) // limita a 20 resultados

    updateJob(jobId, { progress: 10 })

    for (let i = 0; i < total; i++) {
      try {
        const items = await page.$$('[role="feed"] > div a[href*="/maps/place/"]')
        if (!items[i]) continue

        await items[i].click()
        await page.waitForTimeout(2000)

        // Verifica se tem website
        const websiteLink = await page.$('a[data-item-id="authority"]')
        if (websiteLink) {
          // Tem site — pula
          updateJob(jobId, { progress: 10 + Math.floor((i / total) * 85) })
          continue
        }

        // Extrai dados
        const name = await page.$eval('h1', el => el.textContent?.trim() ?? '')
        const phone = await page.$eval(
          '[data-item-id^="phone"]',
          el => el.textContent?.trim() ?? ''
        ).catch(() => '')
        const address = await page.$eval(
          '[data-item-id="address"]',
          el => el.textContent?.trim() ?? ''
        ).catch(() => '')
        const mapsUrl = page.url()

        if (name) {
          addResult(jobId, { name, phone, address, mapsUrl })
        }

        updateJob(jobId, { progress: 10 + Math.floor((i / total) * 85) })

        // Volta para lista
        await page.goBack({ waitUntil: 'networkidle' }).catch(() => {})
        await page.waitForTimeout(1000)
      } catch {
        // Continua para próximo resultado se um falhar
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
