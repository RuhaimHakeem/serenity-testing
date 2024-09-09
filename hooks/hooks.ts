import { Before } from "@cucumber/cucumber";
import { actorCalled } from "@serenity-js/core";
import {
  navigateToAuthPage,
  enterEmail,
  submitEmail,
  enterOtp,
  enableNotifications,
  ensureLogin,
} from "../helpers/auth.helpers";

Before({ tags: "@authenticated", timeout: 60 * 1000 }, async () => {
  const actor = actorCalled("Julia");
  await navigateToAuthPage(actor);
  await enterEmail(actor);
  await submitEmail(actor);
  await enterOtp(actor);
  await enableNotifications(actor);
  await ensureLogin(actor);
});
