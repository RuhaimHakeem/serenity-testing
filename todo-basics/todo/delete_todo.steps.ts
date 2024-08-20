import { Then, When } from "@cucumber/cucumber";
import { Ensure, equals } from "@serenity-js/assertions";
import { Actor } from "@serenity-js/core";
import { By, Click, Hover, PageElement, PageElements } from "@serenity-js/web";
import "./common/common.steps";

When(
  "{actor} deletes the todo {string}",
  async (actor: Actor, todo: string) => {
    const todoItemDeleteButton = PageElement.located(
      By.xpath(
        `//label[text()='${todo}']/following-sibling::button[@class='destroy']`
      )
    ).describedAs("delete button for the todo item");

    await actor.attemptsTo(
      Hover.over(PageElement.located(By.xpath(`//label[text()='${todo}']`))),
      Click.on(todoItemDeleteButton)
    );
  }
);

Then(
  "{pronoun} should not see the todo {string} in the list",
  async (actor: Actor, todo: string) => {
    const deletedItem = PageElement.located(
      By.xpath(`//label[text()='${todo}']`)
    ).describedAs("deleted todo item");

    await actor.attemptsTo(Ensure.that(deletedItem.isPresent(), equals(false)));
  }
);
