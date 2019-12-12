/// <reference types="Cypress" />

context('Login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8100/ingresar');
        cy.server();
    });

    it('Login fail', () => {
        cy.get("ion-input[name='usuario']").type('ASDASDASD');
        cy.get("ion-input[name='pass']").type('ASDASDASD');

        cy.get("ion-button[color='primary']").click();
        cy.url().should('contain', '/ingresar');
    });

    it('Login success', () => {
        cy.get("ion-input[name='usuario']").type('gabriel.cancellieri');
        cy.get("ion-input[name='pass']").type('Gabo123$');

        cy.get("ion-button[color='primary']").click();

        cy.url().should('contain', '/cuenta');

    });
});
