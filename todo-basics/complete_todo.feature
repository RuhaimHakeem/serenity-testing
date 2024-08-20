Feature: Todo app
    
  Scenario: Mark a todo as completed
    Given Alex has added a todo "Buy groceries"
    When Alex marks the todo "Buy groceries" as completed
    Then he should see the todo "Buy groceries" marked as completed