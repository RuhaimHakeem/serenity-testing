@authenticated
Feature: Elah the Bay User sends messages to Guest

Scenario: Send a message to guest
    Given Julia is a user at Elah the Bay
    And the messaging feature is enabled
    When she navigates to the messages page
    And she selects a guest's chat
    And she types "Welcome to Elah the Bay" into the message input
    And she clicks the send button
    Then the message "Welcome to Elah the Bay" is sent successfully