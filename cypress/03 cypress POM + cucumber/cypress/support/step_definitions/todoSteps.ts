import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { HomePage } from "../../support/pages/TODO";

const homePage = new HomePage();

// BACKGROUND
Given("user is on the TodoReact website", () => {
  cy.visit("https://todomvc.com/examples/react/dist/");
});

// SCENARIO: Add task
When("the user add a task", () => {
homePage.taskInput().type("Tarea 1{enter}");
});

Then("he can see the task like active", () => {
  homePage.taskItem("Tarea 1").should('exist').and('not.have.class', 'completed');
});

// SCENARIO: Mark task as completed
When("the user mark a active task as completed", () => {
  homePage.taskInput().type("Tarea 2{enter}");
  homePage.checkbox("Tarea 2").click();
});

Then("he can see the task as completed", () => {
  homePage.taskItem("Tarea 2").should("have.class", "completed");
});

// SCENARIO: Unmark completed task
When("the user unmark a completed task", () => {
  homePage.taskInput().type("Tarea 3{enter}");
  homePage.checkbox("Tarea 3").click();
  homePage.checkbox("Tarea 3").click();
});

Then("he can see the task as active", () => {
  homePage.taskItem("Tarea 3").should("not.have.class", "completed");
});

// SCENARIO: Edit task
When("the user edit a task", () => {
  homePage.taskInput().type("Atrea 4{enter}");
  homePage.label("Atrea 4").dblclick();
  homePage.taskInput().clear();
  homePage.taskInput().type("Tarea 4{enter}");
});

Then("he can see a new name task", () => {
  homePage.label("Tarea 4").should("be.visible");
});

// SCENARIO: Delete task
When("the user delete a task", () => {
  homePage.taskInput().type("Tarea 5{enter}");
  homePage.deleteButton("Tarea 5").click({ force: true });
});

Then("he can't see the task on list", () => {
  homePage.taskItem("Tarea 5").should("not.exist");
});

// SCENARIO: Filter tasks
When("the user add tasks", () => {
  homePage.taskInput().type("Tarea 1{enter}");
  homePage.taskInput().type("Tarea 2{enter}");
  homePage.taskInput().type("Tarea 3{enter}");
  // Marcar Tarea 2 como completada
  homePage.checkbox("Tarea 2").click();
});

Then("he can filter task as active and completed", () => {
  // Filtrar Active
  homePage.filter("Active");
  homePage.visibleTasks().should("have.length", 2).and("not.contain.text", "Tarea 2");

  // Filtrar Completed
  homePage.filter("Completed");
  homePage.visibleTasks().should("have.length", 1).and("contain.text", "Tarea 2");

  // Filtrar All
  homePage.filter("All");
  homePage.visibleTasks().should("have.length", 3);
});
