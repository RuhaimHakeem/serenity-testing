import { Then, When } from "@cucumber/cucumber";
import { Ensure, equals } from "@serenity-js/assertions";
import { Actor } from "@serenity-js/core";
import { By, Click, PageElement, Text } from "@serenity-js/web";
import "./common/common.steps";

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
