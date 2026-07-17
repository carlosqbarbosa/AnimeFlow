describe("Home", () => {
    it("deve abrir a aplicação", ()=>{
        cy.visit("http://localhost:3000");
        cy.contains("Iniciar").should("be.visible");
    });
});