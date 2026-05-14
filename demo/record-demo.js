const { chromium } = require('playwright');
const path = require('path');

const BASE_URL = 'http://localhost:5173';
const VIDEO_DIR = path.join(__dirname, 'videos');

// Smooth scroll helper
async function smoothScroll(page, targetY, duration = 800) {
  await page.evaluate(
    ({ targetY, duration }) => {
      return new Promise((resolve) => {
        const startY = window.scrollY;
        const distance = targetY - startY;
        const startTime = performance.now();
        function step(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const ease = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
          window.scrollTo(0, startY + distance * ease);
          if (progress < 1) requestAnimationFrame(step);
          else resolve();
        }
        requestAnimationFrame(step);
      });
    },
    { targetY, duration }
  );
}

async function scrollToBottom(page, step = 400, pause = 600) {
  const height = await page.evaluate(() => document.body.scrollHeight);
  let current = 0;
  while (current < height - 200) {
    current = Math.min(current + step, height);
    await smoothScroll(page, current, 700);
    await page.waitForTimeout(pause);
  }
}

async function scrollToTop(page) {
  await smoothScroll(page, 0, 600);
  await page.waitForTimeout(400);
}

async function wait(page, ms) {
  await page.waitForTimeout(ms);
}

(async () => {
  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: {
      dir: VIDEO_DIR,
      size: { width: 1440, height: 900 },
    },
    locale: 'en-US',
  });

  const page = await context.newPage();

  // ─────────────────────────────────────────────
  // 1. HOMEPAGE
  // ─────────────────────────────────────────────
  console.log('📍 Homepage...');
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await wait(page, 2000); // obdivuj hero

  await scrollToBottom(page, 350, 700);
  await wait(page, 1000);
  await scrollToTop(page);
  await wait(page, 800);

  // ─────────────────────────────────────────────
  // 2. HOTEL PAGE
  // ─────────────────────────────────────────────
  console.log('📍 Hotel...');
  await page.click('a[href="/hotel"], nav a:has-text("Hotel")');
  await page.waitForLoadState('networkidle');
  await wait(page, 1800);

  await scrollToBottom(page, 380, 650);
  await wait(page, 800);
  await scrollToTop(page);
  await wait(page, 600);

  // ─────────────────────────────────────────────
  // 3. ROOMS PAGE
  // ─────────────────────────────────────────────
  console.log('📍 Izby...');
  // Klik na "View Rooms" CTA alebo nav
  const roomsLink = page.locator('a[href="/rooms"]').first();
  await roomsLink.scrollIntoViewIfNeeded();
  await wait(page, 400);
  await roomsLink.click();
  await page.waitForLoadState('networkidle');
  await wait(page, 1800);

  await scrollToBottom(page, 420, 700);
  await wait(page, 1000);
  await scrollToTop(page);
  await wait(page, 600);

  // ─────────────────────────────────────────────
  // 4. RESTAURANT PAGE
  // ─────────────────────────────────────────────
  console.log('📍 Reštaurácia...');
  await page.click('a[href="/restaurant"], nav a:has-text("Restaurant")');
  await page.waitForLoadState('networkidle');
  await wait(page, 1800);

  // Scrolluj cez chef, menu sekcie
  await scrollToBottom(page, 380, 620);

  // Ukáž wine list taby (klikni na viacero)
  const wineTabs = [
    'By the Glass', 'Sparkling', 'White', 'Rosé', 'Red', 'Sweet',
    'Nach Glas', 'Weißwein', 'Rotwein', // German fallback names
  ];

  for (const tabText of wineTabs) {
    const tab = page.locator(`button:has-text("${tabText}")`).first();
    if (await tab.isVisible().catch(() => false)) {
      await tab.scrollIntoViewIfNeeded();
      await tab.click();
      await wait(page, 900);
    }
  }

  await wait(page, 800);
  await scrollToBottom(page, 500, 500);
  await wait(page, 1000);
  await scrollToTop(page);
  await wait(page, 600);

  // ─────────────────────────────────────────────
  // 5. RESERVATION PAGE — TABLE
  // ─────────────────────────────────────────────
  console.log('📍 Rezervácia — stôl...');
  await page.click('a[href="/reservation"]');
  await page.waitForLoadState('networkidle');
  await wait(page, 1800);

  // Uisti sa, že sme na table mode — force check (radio je sr-only)
  await page.locator('input[name="type"][value="table"]').check({ force: true });
  await wait(page, 600);

  // Vypln formulár pomocou presných IDs
  await page.fill('#name', 'Anna Müller');
  await wait(page, 400);

  // Dátum — zajtra
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateStr = tomorrow.toISOString().split('T')[0];
  await page.fill('#date', dateStr);
  await wait(page, 400);

  // Čas — 19:00
  await page.selectOption('#time', { value: '19:00' });
  await wait(page, 400);

  // Počet hostí
  await page.selectOption('#guests', { value: '2' });
  await wait(page, 400);

  await page.fill('input[name="email"]', 'anna.mueller@example.com');
  await wait(page, 400);

  // Špeciálne požiadavky
  await page.fill('#requests', 'Window table preferred. Celebrating anniversary.');
  await wait(page, 600);

  await wait(page, 800);

  // Odoslať formulár
  console.log('📤 Odosielam rezerváciu stola...');
  const submitBtn = page.locator('button[type="submit"]').first();
  await submitBtn.scrollIntoViewIfNeeded();
  await wait(page, 600);
  await submitBtn.click();

  // Počkaj na success modal
  await wait(page, 3500);

  // ─────────────────────────────────────────────
  // 6. ROOM RESERVATION (ukáž aj druhý režim)
  // ─────────────────────────────────────────────
  console.log('📍 Rezervácia — izba...');
  // Zatvor modal — klikni overlay alebo Close button
  try {
    const closeBtn = page.locator('button:has-text("Close")').first();
    if (await closeBtn.isVisible({ timeout: 2000 })) {
      await closeBtn.click();
      await wait(page, 800);
    } else {
      // Klikni na overlay (fixed pozadie modalu)
      const overlay = page.locator('.fixed.inset-0').first();
      if (await overlay.isVisible({ timeout: 1000 })) {
        await overlay.click({ position: { x: 50, y: 50 } });
        await wait(page, 800);
      }
    }
  } catch (_) {}

  await scrollToTop(page);
  await wait(page, 500);

  // Klikni radio button pre room mode — force (input je sr-only)
  await page.locator('input[name="type"][value="room"]').check({ force: true });
  await wait(page, 1000);

  // Vypln room form s presnými IDs
  await page.fill('#name', 'Thomas Brunner');
  await wait(page, 400);

  // Vyber typ izby
  await page.selectOption('#roomType', { index: 2 });
  await wait(page, 400);

  // Dátumy
  const checkIn = new Date();
  checkIn.setDate(checkIn.getDate() + 7);
  const checkOut = new Date(checkIn);
  checkOut.setDate(checkIn.getDate() + 3);

  await page.fill('#checkIn', checkIn.toISOString().split('T')[0]);
  await wait(page, 500);
  await page.fill('#checkOut', checkOut.toISOString().split('T')[0]);
  await wait(page, 400);

  // Počet hostí
  await page.selectOption('#roomGuests', { value: '2' });
  await wait(page, 400);

  await page.fill('input[name="email"]', 'thomas.brunner@example.com');
  await wait(page, 400);

  await wait(page, 800);

  // Odoslať room rezerváciu
  console.log('📤 Odosielam rezerváciu izby...');
  const submitBtnRoom = page.locator('button[type="submit"]').first();
  await submitBtnRoom.scrollIntoViewIfNeeded();
  await wait(page, 500);
  await submitBtnRoom.click();
  await wait(page, 3500);

  // ─────────────────────────────────────────────
  // KONIEC — späť na homepage
  // ─────────────────────────────────────────────
  console.log('🏁 Záver...');
  try {
    const closeModal2 = page.locator('button:has-text("Close")').first();
    if (await closeModal2.isVisible({ timeout: 2000 })) {
      await closeModal2.click();
      await wait(page, 400);
    }
  } catch (_) {}

  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await wait(page, 2500); // záverečný záber na hero

  await context.close();
  await browser.close();

  console.log(`\n✅ Video uložené do: ${VIDEO_DIR}`);
  console.log('   Otvor priečinok demo/videos/ a nájdeš MP4 súbor.');
})();
