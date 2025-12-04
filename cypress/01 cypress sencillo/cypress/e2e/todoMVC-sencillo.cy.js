describe('pruebas de la pagina TODO', () => {

  beforeEach(() => {
    cy.visit('https://todomvc.com/examples/react/dist/')
  })

  it('Crear tarea', () => {
    cy.get('[data-testid="text-input"]').type("Tarea 1{enter}")
    cy.get('[data-testid="todo-item-label"]').should("have.text", "Tarea 1")
  })

  it('Marcar tarea como completada', () => {
    cy.get('[data-testid="text-input"]').type("Tarea 2{enter}")
    cy.get('[data-testid="todo-item-toggle"]').click()
    cy.get('[data-testid="todo-item-label"]').should("have.text", "Tarea 2")
    cy.get('[data-testid="todo-item-toggle"]').should("be.checked")   
  })

  it('Desmarcar tarea completada', () => {
    cy.get('[data-testid="text-input"]').type("Tarea 3{enter}")
    cy.get('[data-testid="todo-item-toggle"]').click()
    cy.get('[data-testid="todo-item-toggle"]').click()
    cy.get('[data-testid="todo-item-label"]').should("have.text", "Tarea 3")
    cy.get('[data-testid="todo-item-toggle"]').should("not.be.checked")
  });

  
  it('Editar tarea', () => {
    cy.get('[data-testid="text-input"]').type("Atrea 4{enter}")
    cy.get('[data-testid="todo-item-label"]').contains('Atrea 4').dblclick()
    cy.focused().should('be.visible').clear().type('Tarea 4{enter}')
    cy.get('[data-testid="todo-item-label"]').should("have.text", "Tarea 4")
  })
  

  it('Borrar una tarea', () => {
    cy.get('[data-testid="text-input"]').type("Tarea 5{enter}")
    cy.get('[data-testid="todo-item-label"]').should("have.text", "Tarea 5")
    cy.get('.todo-list li') // selecciona cada elemento li dentro de la clase todo-list
    .find('.destroy') // el boton de cerrar "x" no tiene el atributo data-testid, por lo que se ha encontrado en .todo-list li, ademas, dicho boton tiene clase .destroy
    .invoke('show') // forzamos a mostrar el boton de cerrar
    .click()
    cy.get('.todo-list li').should("have.length", 0)
  });

  it('Filtrar tareas', () => {
    cy.get('[data-testid="text-input"]').type("Tarea 1{enter}")
    cy.get('[data-testid="text-input"]').type("Tarea 2{enter}")
    cy.get('[data-testid="text-input"]').type("Tarea 3{enter}")
    cy.get('[data-testid="text-input"]').type("Tarea 4{enter}")
    cy.get('[data-testid="text-input"]').type("Tarea 5{enter}")
    cy.get('[data-testid="text-input"]').type("Tarea 6{enter}")
    cy.get('[data-testid="text-input"]').type("Tarea 7{enter}")
    cy.get(':nth-child(1) > .view > [data-testid="todo-item-toggle"]').click()
    cy.get(':nth-child(2) > .view > [data-testid="todo-item-toggle"]').click()
    cy.get(':nth-child(3) > .view > [data-testid="todo-item-toggle"]').click()
    cy.get(':nth-child(4) > .view > [data-testid="todo-item-toggle"]').click()
    cy.get('[data-testid="footer-navigation"] > :nth-child(3) > a').click()
    cy.get('[data-testid="todo-item"]') // selecciona todos los elementos de la lista de tareas completadas
    .should('have.length', 4) // 4 son las tareas que hemos marcado como completadas
    .then((items) => { // trabajamos con los elementos seleccionados
    const doIt = [...items].map(i => i.innerText) // transforma los elementos en un array con cada una de las tareas completadas
    expect(doIt).to.include.members(['Tarea 1', 'Tarea 2', 'Tarea 3', 'Tarea 4']) // con esta assertion verificamos que el array contiene los elementos indicados como marcados
    })
    cy.get('[data-testid="footer-navigation"] > :nth-child(2) > a').click()
    cy.get('[data-testid="todo-item"]')
    .should('have.length', 3)
    .then((items) => {
    const toDo = [...items].map(i => i.innerText)
    expect(toDo).to.include.members(['Tarea 5', 'Tarea 6', 'Tarea 7'])
    })
    cy.get('[data-testid="footer-navigation"] > :nth-child(1) > a').click()
})

})