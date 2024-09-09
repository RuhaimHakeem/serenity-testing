import { Actor, Duration, Wait } from "@serenity-js/core";
import {
  By,
  Click,
  Enter,
  isVisible,
  Navigate,
  PageElement,
  Press,
} from "@serenity-js/web";
import axios from "axios";
import { __url__, __graphql_endpoint__ } from "../constants";
import { Ensure, includes } from "@serenity-js/assertions";

export const navigateToAuthPage = async (actor: Actor) => {
  await actor.attemptsTo(
    Navigate.to(__url__),
    Wait.until(PageElement.located(By.css('input[type="email"]')), isVisible())
  );
};

export const enterEmail = async (actor: Actor) => {
  await actor.attemptsTo(
    Enter.theValue("demo@hotelmanager.co").into(
      PageElement.located(By.css('input[type="email"]'))
    )
  );
};

export const submitEmail = async (actor: Actor) => {
  await actor.attemptsTo(
    Click.on(PageElement.located(By.css('button[type="submit"]')))
  );
};

export const enterOtp = async (actor: Actor) => {
  const otpInputElement = (n: number) =>
    PageElement.located(By.css(`input[type="number"]:nth-of-type(${n + 1})`));

  await actor.attemptsTo(Wait.until(otpInputElement(0), isVisible()));

  const response = await axios.post(`${__graphql_endpoint__}/auth/token`, {
    email: "demo@hotelmanager.co",
  });

  const token = response.data.token;
  if (!token) {
    throw new Error("Failed to retrieve OTP");
  }

  const otpDigits = token.toString().split("");

  for (let i = 0; i < otpDigits.length; i++) {
    await actor.attemptsTo(
      Enter.theValue(otpDigits[i]).into(otpInputElement(i)),
      Press.the(otpDigits[i]).in(otpInputElement(i)),
      Wait.for(Duration.ofMilliseconds(200)),
      Press.the("Tab")
    );
  }
};

export const enableNotifications = async (actor: Actor) => {
  const enableNotificationButton = PageElement.located(
    By.xpath("//*[@id='root']/div[1]/div/button")
  );
  await actor.attemptsTo(
    Wait.until(enableNotificationButton, isVisible()),
    Click.on(enableNotificationButton)
  );
};

export const ensureLogin = async (actor: Actor) => {
  const userNameSelector = PageElement.located(
    By.xpath("//*[@id='root']/div[2]/div[1]/div[2]/div[2]/div[2]/div[1]")
  ).describedAs("user name");

  await actor.attemptsTo(
    Wait.until(userNameSelector, isVisible()),
    Ensure.that(userNameSelector.text(), includes(actor.name))
  );
};
