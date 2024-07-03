import { When, Then, Given } from "@cucumber/cucumber";
import { Ensure, equals } from "@serenity-js/assertions";
import { Actor } from "@serenity-js/core";
import {
  PageElements,
  By,
  Navigate,
  Enter,
  Click,
  Text,
  Press,
  Key,
  PageElement,
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

// New step to ensure a todo item exists before marking it as completed
Given(
  "{actor} has added a todo {string}",
  async (actor: Actor, todo: string) => {
    await actor.attemptsTo(
      Navigate.to("https://todo-app.serenity-js.org/"),
      Enter.theValue(todo).into(PageElement.located(By.css(".new-todo"))),
      Press.the(Key.Enter),
      Ensure.that(
        PageElements.located(By.css(".todo-list li")).first().text(),
        equals(todo)
      )
    );
  }
);

When(
  "{actor} marks the todo {string} as completed",
  async (actor: Actor, todo: string) => {
    const todoItem = PageElement.located(
      By.xpath(
        `//label[text()='${todo}']/preceding-sibling::input[@type='checkbox']`
      )
    ).describedAs("todo checkbox");

    await actor.attemptsTo(Click.on(todoItem));
  }
);

Then(
  "{pronoun} should see the todo {string} marked as completed",
  async (actor: Actor, todo: string) => {
    const completedItem = PageElement.located(
      By.xpath(`//li[contains(@class, 'completed')]//label[text()='${todo}']`)
    ).describedAs("completed todo item");

    await actor.attemptsTo(Ensure.that(Text.of(completedItem), equals(todo)));
  }
);
