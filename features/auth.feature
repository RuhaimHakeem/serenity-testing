 Feature: User Authentication

  Scenario: Successful authentication
    Given Julia navigates to the authentication page
    When she enters their email demo@hotelmanager.co
    And she submits the email
    And she enters the OTP
    And she clicks the Enable notifications button
    Then she is successfully authenticated