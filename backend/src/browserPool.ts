import puppeteerExtra from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import type { Browser, Page } from 'puppeteer-core';

const puppeteer = puppeteerExtra as any;
puppeteer.use(StealthPlugin());

const BROWSER_ARGS = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-dev-shm-usage',
  '--disable-gpu',
  '--disable-extensions',
  '--disable-background-networking',
  '--disable-default-apps',
  '--disable-sync',
  '--no-first-run',
];

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

export class BrowserPool {
  private browsers: Browser[] = [];
  private inUse = new Set<Browser>();
  private queue: Array<(browser: Browser) => void> = [];
  private poolSize: number;

  constructor(poolSize = 2) {
    this.poolSize = poolSize;
  }

  async initialize(): Promise<void> {
    console.log(`[BrowserPool] Launching ${this.poolSize} browser instances...`);
    const launchPromises = Array.from({ length: this.poolSize }, () => this.launchBrowser());
    this.browsers = await Promise.all(launchPromises);
    console.log(`[BrowserPool] ${this.browsers.length} browsers ready`);
  }

  private async launchBrowser(): Promise<Browser> {
    const executablePath =
      process.env.PUPPETEER_EXECUTABLE_PATH ||
      (process.platform === 'win32'
        ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
        : '/usr/bin/chromium');
    console.log(`[BrowserPool] Using executable: ${executablePath}`);
    const browser = await (puppeteer as any).launch({
      headless: true,
      executablePath,
      args: BROWSER_ARGS,
    }) as Browser;

    browser.on('disconnected', () => {
      console.warn('[BrowserPool] Browser disconnected, replacing...');
      const idx = this.browsers.indexOf(browser);
      if (idx !== -1) {
        this.inUse.delete(browser);
        this.launchBrowser().then((newBrowser) => {
          this.browsers[idx] = newBrowser;
          this.tryDequeue();
        });
      }
    });

    return browser;
  }

  async acquire(): Promise<Browser> {
    const available = this.browsers.find((b) => !this.inUse.has(b));
    if (available) {
      this.inUse.add(available);
      return available;
    }

    return new Promise<Browser>((resolve) => {
      this.queue.push(resolve);
    });
  }

  release(browser: Browser): void {
    this.inUse.delete(browser);
    this.tryDequeue();
  }

  private tryDequeue(): void {
    if (this.queue.length === 0) return;
    const available = this.browsers.find((b) => !this.inUse.has(b));
    if (available) {
      this.inUse.add(available);
      const next = this.queue.shift()!;
      next(available);
    }
  }

  get readyCount(): number {
    return this.browsers.length - this.inUse.size;
  }

  get totalCount(): number {
    return this.browsers.length;
  }

  async shutdown(): Promise<void> {
    await Promise.all(this.browsers.map((b) => b.close().catch(() => {})));
    this.browsers = [];
    this.inUse.clear();
    this.queue = [];
  }
}

export async function createConfiguredPage(browser: Browser): Promise<Page> {
  const page = await browser.newPage();

  await page.setUserAgent(USER_AGENT);
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
  });

  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const type = req.resourceType();
    if (['image', 'stylesheet', 'font', 'media'].includes(type)) {
      req.abort();
    } else {
      req.continue();
    }
  });

  return page;
}

export const browserPool = new BrowserPool(
  parseInt(process.env.BROWSER_POOL_SIZE || '2', 10)
);
