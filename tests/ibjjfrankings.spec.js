// @ts-check
import { test, expect } from '@playwright/test';

test('Verify myself on the IBJJF Rankings website', async ({ page }) => {
  await page.goto('https://ibjjfrankings.com/');
  await expect(page).toHaveTitle('Unofficial IBJJF Elo Rankings');

  // this past year I competed more in no-gi, so go to that tab
  await page.getByText('No Gi').click();
  // Adam competes more in the gi, so once he disappears, we know that the no-gi page has loaded
  const coolGuyAdam = page.getByRole('link', { name: 'Adam Wardziński' });
  await coolGuyAdam.waitFor({ state: 'hidden' });

  await page.getByRole('textbox', { name: 'Search Within Division' }).fill('James Vafiades');
  await page.getByRole('textbox', { name: 'Search Within Division' }).press('Enter');
  await page.getByRole('link', { name: 'James Vafiades' }).click();

  // verify my name, academy, and instagram link
  await expect (page).toHaveURL(/.*athlete\/james-vafiades.*/);
  await expect(page.getByRole('heading', { name: 'James Vafiades' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Broadway Jiu-Jitsu' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Instagram jamesvafiades' })).toBeVisible();

  // verify recent silver medal
  await page.locator('header').filter({ hasText: 'Earned Medals 🏆' }).locator('i').click();
  await expect(page.locator('span').filter({ hasText: 'Boston Summer International Open IBJJF Jiu-Jitsu No-Gi Championship 2025' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '🥈' }).first()).toBeVisible();
});
