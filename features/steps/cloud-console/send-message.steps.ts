import { Given, Then, When } from "@cucumber/cucumber";
import { Ensure, equals, includes } from "@serenity-js/assertions";
import { Actor, actorInTheSpotlight, Wait } from "@serenity-js/core";
import { By, isVisible, Navigate, PageElement } from "@serenity-js/web";
import { __url__ } from "../../../constants";

Given(
  "{actor} is a user at Elah the Bay",
  { timeout: 60 * 1000 },
  async (actor: Actor) => {
    const userNameSelector = PageElement.located(
      By.xpath("//div/div/div[contains(text(), 'Julia')]")
    ).describedAs("user name");

    await actor.attemptsTo(
      Wait.until(userNameSelector, isVisible()),
      Ensure.that(userNameSelector.text(), includes(actor.name))
    );
  }
);

Given("the messaging feature is enabled", async () => {
  const actor = actorInTheSpotlight();
  const messageStatusElement = PageElement.located(
    By.xpath("//div/div/div[contains(text(), 'Live')]")
  ).describedAs("message status");

  await actor.attemptsTo(
    Navigate.to(`${__url__}/manage/messages`),
    Wait.until(messageStatusElement, isVisible()),
    Ensure.that(messageStatusElement.text(), equals("LIVE"))
  );
});

When(
  "{pronoun} navigates to the messages page",
  { timeout: 60 * 1000 },
  async (actor: Actor) => {
    await actor.attemptsTo(Navigate.to(`${__url__}/messages`));
  }
);

When("{pronoun} selects a guest's chat", async (actor: Actor) => {
  const guestCard = PageElement.located(
    By.xpath("//*[@id='root']/div[2]/div[2]/div[2]/div[1]/div/div[2]/div[1]")
  ).describedAs("guest card");

  await actor.attemptsTo(Wait.until(guestCard, isVisible()), guestCard.click());
});

When(
  "{pronoun} types {string} into the message input",
  async (actor: Actor, message: string) => {
    const messageInput = PageElement.located(
      By.xpath(
        "//div[@placeholder='Start typing your message']"
      )
    ).describedAs("message input");

    await actor.attemptsTo(
      Wait.until(messageInput, isVisible()),
      messageInput.enterValue(message)
    );
  }
);

When("{pronoun} clicks the send button", async (actor: Actor) => {
  const sendButton = PageElement.located(
    By.xpath(
      "//div[3]/button/div[contains(text(), 'Send')]"
    )
  ).describedAs("send button");

  await actor.attemptsTo(sendButton.click());
});

Then(
  "the message {string} is sent successfully",
  async (expectedMessage: string) => {
    const actor = actorInTheSpotlight();
    const lastMessageElement = PageElement.located(
      By.xpath(
        "//div[last()]/span[1][contains(text(), 'Welcome to Elah the Bay')]"
      )
    ).describedAs("last sent message text");

    await actor.attemptsTo(
      Ensure.that(lastMessageElement.text(), includes(expectedMessage))
    );
  }
);
