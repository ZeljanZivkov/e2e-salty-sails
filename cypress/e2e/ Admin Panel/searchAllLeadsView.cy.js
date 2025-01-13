//* User Story 4 - Search All Leads View
/// <reference types="cypress" />

describe('Verify Search Functionality on the All Designs Table', () => {
    const validEmail = Cypress.env("email");
    const validPassword = Cypress.env("password"); 
    const leadName = 'Zeljan';
    const invalidLeadName = 'Miki Milane';
    beforeEach(() => {
        cy.visit('/app/login', {
            auth: {
                username: Cypress.env("httpAuthUsername"),
                password: Cypress.env("httpAuthPassword"),          
            },
        });
        cy.get('[type="email"]').type(validEmail); 
        cy.get('[type="password"]').type(validPassword); 
        cy.get('button[type="submit"]').click();
    });

    it('should log in successfully', () => {

        cy.url().should('include', '/app/admin-panel'); 
        cy.get('h4')
            .should('be.visible')
            .should('contain', 'Leads');
    });

    it('should display all designs initially', () => {
        cy.get('table').should('exist');
        cy.get('table tbody tr').should('have.length.greaterThan', 0);
        cy.get('table tbody tr').first().find('td').eq(0).should('be.visible'); 
        // ? Cypress.runner.stop();
    });

    it('should locate the search bar', () => {
        cy.get('input[type="search"]').should('be.visible'); 
    });

    it('should search by valid design ID', () => {
        cy.get('input[type="search"]').type('4').wait(2000); 
        cy.get('table tbody tr').should('have.length', 1); 
        cy.get('table tbody tr').first().find('td').first().contains('4'); 
    });

    it('should show no data for invalid design ID', () => {
        cy.get('input[type="search"]').clear().type('555555').wait(1000);
        cy.get('table tbody tr').first().find('td').first().contains('No Data'); 
    });

    it('should search by valid lead name', () => {
        cy.get('input[type="search"]').clear().type(leadName).wait(1000); 
        cy.get('table tbody tr').should('have.length.greaterThan', 0 ); //Ovde moze da se stavi tacan broj koliko ima leadova sa tim imenom
        cy.get('table tbody tr').first().find('td').eq(1).contains(leadName);  
    });

    it('should show no data for invalid lead name', () => {
        cy.get('input[type="search"]').clear().type(invalidLeadName).wait(1000);
        cy.get('table tbody tr').first().find('td').first().contains('No Data'); 

        cy.get('input[type="search"]').clear();
        cy.get('table').should('exist');
        cy.get('table tbody tr').should('have.length.greaterThan', 0);
    });

});
