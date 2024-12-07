describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });
});

it('Insere 3 tarefas e marca a segunda como concluída, depois filtra por completas e exclui a segunda tarefa.', () => {
  cy.visit(''); 

  cy.get('[data-cy=todo-input]')
    .type('Tarefa 1 - Teste{enter}')
    .type('Tarefa 2 - Teste{enter}')
    .type('Tarefa 3 - Teste{enter}');

  cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
    .eq(1)
    .click();
  
  cy.get('[data-cy=filter-active-link]')
    .click();

  cy.get('[data-cy=todos-list]')
    .children()
    .should('have.length', 2)
    .eq(0)
    .should('have.text', 'Tarefa 1 - Teste');

  cy.get('[data-cy=todos-list]')
    .children()
    .eq(1)
    .should('have.text', 'Tarefa 3 - Teste');

  cy.get('[data-cy=filter-completed-link]')
    .click()

  cy.get('[data-cy=todos-list]')
    .children()
    .should('have.length', 1)
    .eq(0)
    .should('have.text', 'Tarefa 2 - Teste');

  cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
    .first()
    .invoke('show')
    .click();

  cy.get('[data-cy=todos-list]')
    .children()
    .should('have.length', 0);
    
});

it('Insere 2 tarefas e marca todas como concluídas.', () => {
  cy.visit(''); 

  cy.get('[data-cy=todo-input]')
    .type('Tarefa 1 - Teste{enter}')
    .type('Tarefa 2 - Teste{enter}');

  cy.get('.toggle-all-label')
    .click();

  cy.get('[data-cy=filter-active-link]')
    .click();
  
  cy.get('[data-cy=todos-list]')
    .children()
    .should('have.length', 0);

  cy.get('[data-cy=filter-completed-link]')
    .click();

  cy.get('[data-cy=todos-list]')
    .children()
    .should('have.length', 2);
    
});

it('Insere 3 tarefas, marca todas como concluídas, remove todas as concluídas, adiciona uma nova tarefa e marca como concluída.', () => {

  cy.visit('');

  cy.get('[data-cy=todo-input]')
    .type('Tarefa 1 - T1{enter}')
    .type('Tarefa 2 - T2{enter}')
    .type('Tarefa 3 - T3{enter}');
  
  cy.get('.toggle-all-label')
    .click();

  cy.get('[data-cy=filter-completed-link]')
    .click();
  
  cy.get('[data-cy=todos-list]')
    .children()
    .should('have.length', 3);

  cy.get('[data-cy=todo-input]')
    .type('Tarefa 4 - T4{enter}');

  cy.get('.clear-completed')
    .click();

  cy.get('[data-cy=todos-list]')
    .children()
    .should('have.length', 0);

  cy.get('[data-cy=filter-active-link]')
    .click();

  cy.get('[data-cy=todos-list]')
    .children()
    .should('have.length', 1);

  cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
    .first()
    .invoke('show')
    .click();
  
  cy.get('[data-cy=todos-list]')
    .children()
    .should('have.length', 0); 
  
  cy.get('[data-cy=filter-completed-link]')
    .click();

  cy.get('[data-cy=todos-list]')
    .children()
    .should('have.length', 1);

})