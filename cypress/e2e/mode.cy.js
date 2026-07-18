describe("Troca de modo", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get('[data-cy="timer"]', { timeout: 10000 }).should("contain", "25:00");
  });

  it("deve trocar para Pausa Curta e atualizar o tempo para 05:00", () => {
    cy.get('[data-cy="mode-short"]').click();

    cy.get('[data-cy="timer"]', { timeout: 10000 }).should("contain", "05:00");
  });

  it("deve trocar para Pausa Longa e atualizar o tempo para 15:00", () => {
    cy.get('[data-cy="mode-long"]').click();

    cy.get('[data-cy="timer"]', { timeout: 10000 }).should("contain", "15:00");
  });

  it("deve voltar para Foco e restaurar o tempo para 25:00", () => {
    cy.get('[data-cy="mode-short"]').click();
    cy.get('[data-cy="timer"]', { timeout: 10000 }).should("contain", "05:00");

    cy.get('[data-cy="mode-focus"]').click();
    cy.get('[data-cy="timer"]', { timeout: 10000 }).should("contain", "25:00");
  });

  it("deve pausar o timer ao trocar de modo enquanto estiver rodando", () => {
    cy.get('[data-cy="start-button"]').click();
    cy.get('[data-cy="start-button"]').should("contain", "Pausar");

    cy.get('[data-cy="mode-short"]').click();

    cy.get('[data-cy="start-button"]', { timeout: 10000 }).should("contain", "Iniciar");
  });
});