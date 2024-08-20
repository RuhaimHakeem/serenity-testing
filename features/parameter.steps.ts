import { defineParameterType } from "@cucumber/cucumber";
import { actorCalled, actorInTheSpotlight } from "@serenity-js/core";
import { CallAnApi } from "@serenity-js/rest";

defineParameterType({
  regexp: /[A-Z][a-z]+/,
  transformer(name: string) {
    return actorCalled(name).whoCan(
      CallAnApi.using({
        baseURL: "http://localhost:5000/",
        timeout: 30_000,
      })
    );
  },
  name: "actor",
});

defineParameterType({
  regexp: /he|she|they|his|her|their/,
  transformer() {
    return actorInTheSpotlight();
  },
  name: "pronoun",
});
