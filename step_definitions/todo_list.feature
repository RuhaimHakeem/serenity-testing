Feature: Todo app

  Scenario: Add a new todo
    When Alex opens the todo app for the first time
    Then his todo list should be empty
    When Alex adds a new todo "Buy groceries"
    Then he should see the new todo "Buy groceries" in the list
    
  Scenario: Mark a todo as completed
    Given Alex has added a todo "Buy groceries"
    When Alex marks the todo "Buy groceries" as completed
    Then he should see the todo "Buy groceries" marked as completed