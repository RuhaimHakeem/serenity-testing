import { Then, When } from "@cucumber/cucumber";
import { Ensure, equals } from "@serenity-js/assertions";
import { Actor } from "@serenity-js/core";
import {
  By,
  Enter,
  Key,
  Navigate,
  PageElement,
  PageElements,
  Press,
  Text,
} from "@serenity-js/web";

When("{actor} opens the todo app for the first time", async (actor: Actor) => {
  await actor.attemptsTo(Navigate.to("https://todo-app.serenity-js.org/"));
});

Then("{pronoun} todo list should be empty", async (actor: Actor) => {
  const displayedItems = () =>
    PageElements.located(By.css(".todo-list li")).describedAs(
      "displayed items"
    );

  await actor.attemptsTo(Ensure.that(displayedItems().count(), equals(0)));
});

When("{actor} adds a new todo {string}", async (actor: Actor, todo: string) => {
  await actor.attemptsTo(
    Enter.theValue(todo).into(PageElement.located(By.css(".new-todo"))),
    Press.the(Key.Enter)
  );
});

Then(
  "{pronoun} should see the new todo {string} in the list",
  async (actor: Actor, todo: string) => {
    const displayedItems = () =>
      PageElements.located(By.css(".todo-list li")).describedAs(
        "displayed items"
      );

    await actor.attemptsTo(
      Ensure.that(Text.of(displayedItems().first()), equals(todo))
    );
  }
);
