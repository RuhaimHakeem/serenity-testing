import { Given, Then, When } from "@cucumber/cucumber";
import { Actor } from "@serenity-js/core";
import {
  enableNotifications,
  ensureLogin,
  enterEmail,
  enterOtp,
  navigateToAuthPage,
  submitEmail,
} from "../../../helpers/auth.helpers";

Given(
  "{actor} navigates to the authentication page",
  { timeout: 60 * 1000 },
  async (actor: Actor) => {
    await navigateToAuthPage(actor);
  }
);

When(
  "{pronoun} enters their email demo@hotelmanager.co",
  async (actor: Actor) => {
    await enterEmail(actor);
  }
);

When("{pronoun} submits the email", async (actor: Actor) => {
  await submitEmail(actor);
});

When("{pronoun} enters the OTP", async (actor: Actor) => {
  await enterOtp(actor);
});

When(
  "{pronoun} clicks the Enable notifications button",
  async (actor: Actor) => {
    await enableNotifications(actor);
  }
);

Then("{pronoun} is successfully authenticated", async (actor: Actor) => {
  await ensureLogin(actor);
});
