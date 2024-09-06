import { Before } from "@cucumber/cucumber";
import { actorCalled } from "@serenity-js/core";
import { authenticate } from "../helpers/auth-helper";

Before({ tags: "@authenticated", timeout: 60 * 1000 }, async () => {
  const actor = actorCalled("Julia");
  await authenticate(actor);
});
