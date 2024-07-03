import { Given } from "@cucumber/cucumber";
import { Actor } from "@serenity-js/core";
import {
  PageElement,
  By,
  Enter,
  Press,
  Key,
  PageElements,
  Navigate,
} from "@serenity-js/web";
import { Ensure, equals } from "@serenity-js/assertions";

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
