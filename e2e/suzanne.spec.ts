import { test, expect } from "@playwright/test";

test("Suzanne picks her Davao routing and opens the itinerary", async ({ page }) => {
  await page.goto("/");
  const flights = page.getByText(/^Flights . getting there \(2 origins\)$/).locator("..");

  await page.getByRole("radio", { name: /Cebu Pacific via Manila/ }).check({ force: true });
  await expect(flights).toContainText("$2,630");

  await page.getByRole("button", { name: "Itinerary" }).click();
  await expect(page.getByRole("heading", { name: "Your itinerary", level: 1 })).toBeVisible();
  await expect(page.getByText(/arrive on separate flights/)).toBeVisible();
});
