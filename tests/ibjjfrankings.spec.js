// @ts-check
import { test, expect } from '@playwright/test';

test('Verify myself on the IBJJF Rankings website', async ({ page }) => {
  console.log('Verifying IBJJF Rankings website title');
  await page.goto('https://ibjjfrankings.com/');
  await expect(page).toHaveTitle('Unofficial IBJJF Elo Rankings');

  console.log('Click no-gi tab, because I competed more in no-gi this year');
  await page.getByText('No Gi').click();
  // Adam competes more in the gi, so once he disappears, we know that the no-gi page has loaded
  console.log('Wait for Adam Wardzinski to drop off the list, because he competes more in the gi, so once he disappears, we know that the no-gi page has loaded');
  const coolGuyAdam = page.getByRole('link', { name: 'Adam Wardziński' });
  await coolGuyAdam.waitFor({ state: 'hidden' });

  console.log('Search for myself, James Vafiades, on the IBJJF Rankings website');
  await page.getByRole('textbox', { name: 'Search Within Division' }).fill('James Vafiades');
  await page.getByRole('textbox', { name: 'Search Within Division' }).press('Enter');
  await page.getByRole('link', { name: 'James Vafiades' }).click();

  console.log('Verify my name, academy, and instagram link on my athlete page');
  await expect (page).toHaveURL(/.*athlete\/james-vafiades.*/);
  await expect(page.getByRole('heading', { name: 'James Vafiades' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Broadway Jiu-Jitsu' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Instagram jamesvafiades' })).toBeVisible();

  console.log('Click to open my medals and verify my recent silver medal at the Boston Open');
  await page.locator('header').filter({ hasText: 'Earned Medals 🏆' }).locator('i').click();
  await expect(page.locator('span').filter({ hasText: 'Boston Summer International Open IBJJF Jiu-Jitsu No-Gi Championship 2025' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '🥈' }).first()).toBeVisible();
});
