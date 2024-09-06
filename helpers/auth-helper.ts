import { Actor } from "@serenity-js/core";
import {
  Enter,
  Click,
  PageElement,
  By,
  Navigate,
  Press,
  isVisible,
} from "@serenity-js/web";
import axios from "axios";
import { Duration, Wait } from "@serenity-js/core";

export async function authenticate(actor: Actor) {
  await actor.attemptsTo(
    Navigate.to("http://localhost:3000/"),
    Wait.until(PageElement.located(By.css('input[type="email"]')), isVisible()),
    Enter.theValue("demo@hotelmanager.co").into(
      PageElement.located(By.css('input[type="email"]'))
    ),
    Click.on(
      PageElement.located(By.css('button[type="submit"], input[type="submit"]'))
    ),
    Wait.for(Duration.ofSeconds(5)) // Adjust this wait to match OTP prompt time
  );

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

  await actor.attemptsTo(
    Click.on(PageElement.located(By.css(".sc-cwHptR.kJDfMM"))),
    Wait.for(Duration.ofSeconds(5))
  );
}
