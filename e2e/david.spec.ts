import { test, expect } from "@playwright/test";

test("David switches his IND routing and the total follows", async ({ page }) => {
  await page.goto("/");
  const flights = page.getByText(/^Flights . getting there \(2 origins\)$/).locator("..");
  const grandTotal = page.locator("#grandTotal");
  await expect(grandTotal).toHaveText("$6,207");
  await expect(flights).toContainText("$3,000");

  await page.getByRole("radio", { name: /Delta Main Cabin via Detroit/ }).check({ force: true });

  await expect(flights).toContainText("$2,050");
  await expect(grandTotal).toHaveText("$5,257");
});
