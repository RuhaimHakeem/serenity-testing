import { Given, Then, When } from "@cucumber/cucumber";
import { Actor, actorInTheSpotlight, Duration, Wait } from "@serenity-js/core";
import { PageElement, By, Navigate } from "@serenity-js/web";
import { Ensure, equals } from "@serenity-js/assertions";

Given(
  "{actor} is a user at Elah the Bay",
  { timeout: 60 * 1000 },
  async (actor: Actor) => {
    const userNameSelector = PageElement.located(
      By.xpath("//*[@id='root']/div[2]/div[1]/div[2]/div[2]/div[2]/div[1]")
    ).describedAs("user name");

    await actor.attemptsTo(
      Wait.for(Duration.ofSeconds(5)),
      Ensure.that(userNameSelector.text(), equals(`${actor.name} Anderson`)),
      Wait.for(Duration.ofSeconds(5)),
      Navigate.to("http://localhost:3000/manage/messages"),
      Wait.for(Duration.ofSeconds(5))
    );
  }
);

Given("the messaging feature is enabled", { timeout: 60 * 1000 }, async () => {
  const actor = actorInTheSpotlight();
  const messageStatusElement = PageElement.located(
    By.css(".sc-imWYAI.sc-feUZmu.hlIdEi.hZytvI")
  ).describedAs("message status");

  await actor.attemptsTo(
    Ensure.that(messageStatusElement.text(), equals("LIVE"))
  );
});

When(
  "{pronoun} navigates to the messages page",
  { timeout: 60 * 1000 },
  async (actor: Actor) => {
    await actor.attemptsTo(
      Navigate.to("http://localhost:3000/messages"),
      Wait.for(Duration.ofSeconds(5))
    );
  }
);

When(
  "{pronoun} selects a guest's chat",
  { timeout: 60 * 1000 },
  async (actor: Actor) => {
    const guestCard = PageElement.located(
      By.xpath("//*[@id='root']/div[2]/div[2]/div[2]/div[1]/div/div[2]/div[1]")
    ).describedAs("guest card");

    await actor.attemptsTo(Wait.for(Duration.ofSeconds(2)), guestCard.click());
  }
);

When(
  "{pronoun} types {string} into the message input",
  { timeout: 60 * 1000 },
  async (actor: Actor, message: string) => {
    const messageInput = PageElement.located(
      By.xpath(
        "//*[@id='root']/div[2]/div[2]/div[2]/div[2]/div/div[1]/div[3]/div/div"
      )
    ).describedAs("message input");

    await actor.attemptsTo(
      Wait.for(Duration.ofSeconds(2)),
      messageInput.enterValue(message)
    );
  }
);

When(
  "{pronoun} clicks the send button",
  { timeout: 60 * 1000 },
  async (actor: Actor) => {
    const sendButton = PageElement.located(
      By.xpath(
        "//*[@id='root']/div[2]/div[2]/div[2]/div[2]/div/div[1]/div[3]/button"
      )
    ).describedAs("send button");

    await actor.attemptsTo(Wait.for(Duration.ofSeconds(2)), sendButton.click());
  }
);

Then(
  "the message {string} is sent successfully",
  { timeout: 60 * 1000 },
  async (expectedMessage: string) => {
    const actor = actorInTheSpotlight();
    const lastMessageElement = PageElement.located(
      By.xpath(
        '//*[@id="root"]/div[2]/div[2]/div[2]/div[2]/div/div[1]/div[2]/div[1]/div[last()]/span[1]'
      )
    ).describedAs("last sent message text");

    await actor.attemptsTo(
      Ensure.that(lastMessageElement.text(), equals(expectedMessage))
    );
  }
);
