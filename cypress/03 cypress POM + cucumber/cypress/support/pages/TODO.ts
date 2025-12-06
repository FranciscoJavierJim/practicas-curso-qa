export class HomePage {

  taskInput() {
    return cy.get('.new-todo');
  }

  taskItem(task: string) {
  return cy.contains('.todo-list li', task);
  }

  checkbox(task: string) {
    return this.taskItem(task).find('.toggle');
  }

  deleteButton(task: string) {
    return this.taskItem(task).find('.destroy');
  }

  label(task: string) {
    return cy.contains('.todo-list li label', task);
  }

  editInput() {
    return cy.get('.todo-list li.editing .edit');
  }

  filter(filterName: 'All' | 'Active' | 'Completed') {
    cy.get('ul.filters').contains(filterName).click();
  }

  visibleTasks() {
    return cy.get('.todo-list li:visible');
  }
}

