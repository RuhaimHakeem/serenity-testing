Feature: Todo app

  Scenario: Delete a todo
    Given Alex has added a todo "Buy groceries"
    When Alex deletes the todo "Buy groceries"
    Then he should not see the todo "Buy groceries" in the list