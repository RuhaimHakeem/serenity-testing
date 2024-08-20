Feature: Todo app

  Scenario: Delete a todo
    Given Ruhaim has added a todo "Buy groceries"
    When Ruhaim deletes the todo "Buy groceries"
    Then he should not see the todo "Buy groceries" in the list