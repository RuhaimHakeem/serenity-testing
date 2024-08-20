import { Before, Given, Then, When } from "@cucumber/cucumber";
import { Ensure, equals } from "@serenity-js/assertions";
import {
  Activity,
  Actor,
  actorCalled,
  Duration,
  Interaction,
  Question,
  Task,
  Wait,
} from "@serenity-js/core";
import {
  By,
  Enter,
  Key,
  Navigate,
  PageElement,
  PageElements,
  Press,
  Text,
  Cookie,
  isVisible,
  Click,
  ExecuteScript,
} from "@serenity-js/web";
import axios from "axios";
import {
  CallAnApi,
  GetRequest,
  LastResponse,
  PostRequest,
  Send,
} from "@serenity-js/rest";

const FillOTPFields = async () => {
  // Interaction.where(
  //   `#actor sends an API request to get the token`,
  //   async (actor) => {

  //     Wait.for(Duration.ofSeconds(5));
  //   }
  // );

  const response = await axios.post("http://localhost:5000/auth/token", {
    email: "demo@hotelmanager.co",
  });

  const token = response.data.token; // Assuming the token is in response.data.token
  console.log("API response token:", response.data.token);

  return Task.where(
    `#actor fills OTP fields with the token`,
    // Wait for the OTP page to load and the number input fields to be visible
    Wait.for(Duration.ofSeconds(5)),

    ...Array.from({ length: 6 }, (_, i) =>
      Task.where(
        `Fill OTP field ${i + 1} with token digits`,
        Enter.theValue(
          Question.about(`the ${i + 1}th digit of the token`, (actor) => {
            return token.charAt(i); // Get the corresponding digit from the token
          })
        ).into(
          PageElement.located(
            By.css(`input[type="number"]:nth-of-type(${i + 1})`)
          )
        ),
        Press.the(token.charAt(i)).in(
          PageElement.located(
            By.css(`input[type="number"]:nth-of-type(${i + 1})`)
          )
        ),
        Wait.for(Duration.ofMilliseconds(200)),
        Press.the("Tab")
      )
    )
  );
};

Given(
  "{actor} is a user at Elah the Bay",
  { timeout: 60 * 1000 },
  async (actor: Actor) => {
    await actor.attemptsTo(
      Navigate.to("http://localhost:3000/"),

      // Wait for the email field to be visible
      Wait.until(
        PageElement.located(By.css('input[type="email"]')),
        isVisible()
      ),

      // Type the email into the email field
      Enter.theValue("demo@hotelmanager.co").into(
        PageElement.located(By.css('input[type="email"]'))
      ),

      // Click the login button
      Click.on(
        PageElement.located(
          By.css('button[type="submit"], input[type="submit"]')
        )
      ),

      // Optional: Wait for the next page or element to appear
      Wait.for(Duration.ofSeconds(5)),

      Send.a(
        PostRequest.to("http://localhost:5000/auth/token").with({
          email: "demo@hotelmanager.co",
        })
      ), // GET https://api.example.org/v1/users/2
      Ensure.that(LastResponse.status(), equals(200)),

      // const token = response.data.token; // Assuming the token is in response.data.token
      // console.log("API response token:", response.data.token);

      Task.where(
        `#actor fills OTP fields with the token`,
        // Wait for the OTP page to load and the number input fields to be visible
        Wait.for(Duration.ofSeconds(5)),

        ...Array.from({ length: 6 }, (_, i) =>
          Task.where(
            `Fill OTP field ${i + 1} with token digits`,
            Enter.theValue(
              Question.about(`the ${i + 1}th digit of the token`, (actor) => {
                return LastResponse.body().token.charAt(i); // Get the corresponding digit from the token
              })
            ).into(
              PageElement.located(
                By.css(`input[type="number"]:nth-of-type(${i + 1})`)
              )
            )
            // Press.the(LastResponse.body().toString().charAt(i)).in(
            //   PageElement.located(
            //     By.css(`input[type="number"]:nth-of-type(${i + 1})`)
            //   )
            // ),
            // Wait.for(Duration.ofMilliseconds(200)),
            // Press.the("Tab")
          )
        )
      ),

      Wait.for(Duration.ofSeconds(5))
    );
  }
);

// Then("{pronoun} todo list should be empty", async (actor: Actor) => {
//   const displayedItems = () =>
//     PageElements.located(By.css(".todo-list li")).describedAs(
//       "displayed items"
//     );

//   await actor.attemptsTo(Ensure.that(displayedItems().count(), equals(0)));
// });
