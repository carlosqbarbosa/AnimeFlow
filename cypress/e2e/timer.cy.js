describe("Timer", () => {

    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });

    it("deve iniciar a contagem ao clicar em Iniciar", () => {

        cy.clock();

        cy.get('[data-cy="start-button"]').click();

        cy.tick(1000);

        cy.get('[data-cy="timer"]')
            .should('have.text', '24:59');

    });

});