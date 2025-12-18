import { POMTodoPage } from '../support/page/cypressPOM'


const todo = new POMTodoPage();

describe('Pruebas de la web de TODO', () => {

  beforeEach(() => {
    todo.visit();
  });

  it('Crear una nueva tarea', () => {
    todo.addTask('Tarea 1');
    todo.shouldSeeTask('Tarea 1');
  });

  it('Marcar una tarea como completada', () => {
    todo.addTask('Tarea 2');
    todo.markTaskCompleted('Tarea 2');
    todo.shouldBeCompleted('Tarea 2');
  });

  it('Desmarcar una tarea completada', () => {
    todo.addTask('Tarea 3');
    todo.markTaskCompleted('Tarea 3');
    todo.unmarkTask('Tarea 3');
    todo.shouldBeActive('Tarea 3');
  });

  it('Editar una tarea', () => {
    todo.addTask('Atrea 4');
    todo.editTask('Atrea 4', 'Tarea 4');
    todo.shouldSeeTask('Tarea 4');
    todo.shouldNotSeeTask('Atrea 4');
  });

  it('Borrar una tarea', () => {
    todo.addTask('Tarea 5');
    todo.shouldSeeTask('Tarea 5');
    todo.deleteTask('Tarea 5');
    todo.shouldNotSeeTask('Tarea 5');
  });

  it('Filtrar tareas completadas y activas', () => {
    const activeTasks = ['Tarea 5', 'Tarea 6', 'Tarea 7'];
    const completedTasks = ['Tarea 1', 'Tarea 2', 'Tarea 3', 'Tarea 4'];

    [...completedTasks, ...activeTasks].forEach((t) => todo.addTask(t));

    completedTasks.forEach((t) => todo.markTaskCompleted(t));

    // Filtrar Completadas
    todo.filter('Completed');
    todo.shouldHaveTasks(completedTasks);

    // Filtrar Activas
    todo.filter('Active');
    todo.shouldHaveTasks(activeTasks);

    // Filtrar Todas
    todo.filter('All');
    todo.shouldHaveTasks([...completedTasks, ...activeTasks]);
  });
});
