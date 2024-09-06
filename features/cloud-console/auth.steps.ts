import { Given, Then, When } from "@cucumber/cucumber";
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

Given(
  "{actor} navigates to the authentication page",
  { timeout: 60 * 1000 },
  async (actor: Actor) => {
    await actor.attemptsTo(
      Navigate.to("http://localhost:3000/"),
      Wait.until(
        PageElement.located(By.css('input[type="email"]')),
        isVisible()
      )
    );
  }
);

When(
  "{actor} enters their email demo@hotelmanager.co",
  { timeout: 60 * 1000 },
  async (actor: Actor) => {
    await actor.attemptsTo(
      Enter.theValue("demo@hotelmanager.co").into(
        PageElement.located(By.css('input[type="email"]'))
      )
    );
  }
);

When(
  "{actor} submits the email",
  { timeout: 60 * 1000 },
  async (actor: Actor) => {
    await actor.attemptsTo(
      Click.on(
        PageElement.located(
          By.css('button[type="submit"], input[type="submit"]')
        )
      )
    );
  }
);

Then(
  "{actor} is prompted to enter the OTP",
  { timeout: 60 * 1000 },
  async (actor: Actor) => {
    await actor.attemptsTo(Wait.for(Duration.ofSeconds(5)));
  }
);

When("{actor} enters the OTP", { timeout: 60 * 1000 }, async (actor: Actor) => {
  const response = await axios.post("http://localhost:5000/auth/token", {
    email: "demo@hotelmanager.co",
  });

  const token = response.data.token;

  if (!token) {
    throw new Error("Failed to retrieve OTP");
  }

  const otpDigits = token.toString().split("");

  for (let i = 0; i < otpDigits.length; i++) {
    await actor.attemptsTo(
      Enter.theValue(otpDigits[i]).into(
        PageElement.located(
          By.css(`input[type="number"]:nth-of-type(${i + 1})`)
        )
      ),
      Press.the(otpDigits[i]).in(
        PageElement.located(
          By.css(`input[type="number"]:nth-of-type(${i + 1})`)
        )
      ),
      Wait.for(Duration.ofMilliseconds(200)),
      Press.the("Tab")
    );
  }
});

Then(
  "{actor} is successfully authenticated",
  { timeout: 60 * 1000 },
  async (actor: Actor) => {
    await actor.attemptsTo(Wait.for(Duration.ofSeconds(5)));
  }
);

When(
  "{actor} clicks the Enable notifications button",
  { timeout: 60 * 1000 },
  async (actor: Actor) => {
    await actor.attemptsTo(
      Click.on(PageElement.located(By.css(".sc-cwHptR.kJDfMM")))
    );
  }
);

Then(
  "{actor} is navigated to the home page",
  { timeout: 60 * 1000 },
  async (actor: Actor) => {
    await actor.attemptsTo(Wait.for(Duration.ofSeconds(3)));
  }
);
