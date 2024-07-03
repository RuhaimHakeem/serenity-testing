import { BeforeAll, AfterAll } from "@cucumber/cucumber";
import { configure, Cast } from "@serenity-js/core";
import { BrowseTheWebWithPlaywright } from "@serenity-js/playwright";

import * as playwright from "playwright";

let browser: playwright.Browser;

BeforeAll(async () => {
  // Launch the browser once before all the tests
  // Serenity/JS will take care of managing Playwright browser context and browser tabs.
  browser = await playwright.chromium.launch({
    headless: true,
  });

  // Configure Serenity/JS
  configure({
    actors: Cast.where((actor) =>
      actor.whoCan(
        BrowseTheWebWithPlaywright.using(browser as any, {
          baseURL: "https://todo-app.serenity-js.org/",
        })
      )
    ),
    crew: [
      "@serenity-js/console-reporter",
      "@serenity-js/serenity-bdd",
      [
        "@serenity-js/core:ArtifactArchiver",
        { outputDirectory: "target/site/serenity" },
      ],
      // ... any other reporting services
    ],
  });
});

AfterAll(async () => {
  // Close the browser after all the tests are finished
  await browser?.close();
});
