Feature: Todo app

  Scenario: Add a new todo
    When Alex opens the todo app for the first time
    Then his todo list should be empty
    When Alex adds a new todo "Buy groceries"
    Then he should see the new todo "Buy groceries" in the list