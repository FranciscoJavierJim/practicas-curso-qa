Feature: Actions on TODO website

  Background: 
    Given user is on the TodoReact website

  @smoke 
  Scenario: Add task
    When the user add a task
    Then he can see the task like active

  @smoke
  Scenario: Mark task as completed
    When the user mark a active task as completed
    Then he can see the task as completed

  @smoke
  Scenario: Unmark completed task
    When the user unmark a completed task
    Then he can see the task as active

  @regression
  Scenario: Edit task
    When the user edit a task
    Then he can see a new name task

  @smoke
  Scenario: Delete task
    When the user delete a task
    Then he can't see the task on list

  @smoke
  Scenario: Filter task
    When the user add tasks
    Then he can filter task as active and completed