/// <reference types="Cypress" />

context('Register', () => {
    beforeEach(() => {
        cy.wait(2000)
        cy.visit('http://localhost:8100/ingresar');
        cy.server();
    });

    it('Register fail', () => {
        cy.get("ion-button[color='secondary']").click();

        cy.get("ion-input[name='nombre']").type('ASDAS%%$$$');
        cy.get("ion-input[name='apellido']").type('%%///aaaa');
        cy.get("ion-input[name='email']").type('ññññññ');
        cy.get("ion-input[name='password']").type('%%///aaaa');

        cy.get("ion-button[color='secondary']").click();
    });

    it('Register success', () => {
        cy.get("ion-button[color='secondary']").click();

        cy.get("ion-input[name='nombre']").type('Gabriel');
        cy.get("ion-input[name='apellido']").type('Cancellieri');
        cy.get("ion-input[name='email']").type('elgabonqn@gmail.com');
        cy.get("ion-input[name='password']").type('Gabo123$');

        cy.get("ion-button[color='secondary']").click();

    });
});