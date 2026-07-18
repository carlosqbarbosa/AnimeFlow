describe("Timer", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");

    cy.get('[data-cy="timer"]', { timeout: 10000 }).should("contain", "25:00");
  });

  it("deve iniciar o timer", () => {
    cy.get('[data-cy="start-button"]').click();

    cy.get('[data-cy="start-button"]', { timeout: 10000 }).should("contain", "Pausar");
  });

  it("deve pausar o timer", () => {
    cy.get('[data-cy="start-button"]').click();
    cy.get('[data-cy="start-button"]', { timeout: 10000 }).should("contain", "Pausar");

    cy.get('[data-cy="start-button"]').click();
    cy.get('[data-cy="start-button"]', { timeout: 10000 }).should("contain", "Iniciar");
  });

  it("deve contar o tempo pra baixo depois de iniciar", () => {
    cy.get('[data-cy="start-button"]').click();

    cy.get('[data-cy="timer"]', { timeout: 10000 }).should("contain", "24:5");
  });

  it("deve reiniciar o timer para o valor original", () => {
    cy.get('[data-cy="start-button"]').click();
    cy.wait(2000);

    cy.get('[data-cy="reset-button"]').click();

    cy.get('[data-cy="timer"]').should("contain", "25:00");
    cy.get('[data-cy="start-button"]').should("contain", "Iniciar");
  });
});