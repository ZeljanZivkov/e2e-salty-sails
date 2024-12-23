//* User Story 1 - Login to Admin Panel
/// <reference types="cypress" />

describe('Admin Panel Login', () => {
    const validEmail = Cypress.env("email");
    const validPassword = Cypress.env("password"); 
    const invalidEmail = Cypress.env("invalidEmail");
    const invalidPassword = Cypress.env("invalidPassword");
    const invalidPasswordNoNumb = Cypress.env("invalidPasswordNoNumb");
    const invalidPasswordErrorMsg = Cypress.env("invalidPasswordErrorMsg");


    beforeEach(() => {
        cy.visit('/app/login', {
            auth: {
                username: Cypress.env("httpAuthUsername"),
                password: Cypress.env("httpAuthPassword"),          
            },
        });
    });

    it('should log in successfully with valid credentials', () => {
        
        cy.get('[type="email"]').type(validEmail); 
        cy.get('[type="password"]').type(validPassword); 
        cy.get('button[type="submit"]').click(); 

        cy.url().should('include', '/app/admin-panel'); 
        cy.get('h4')
            .should('be.visible')
            .should('contain', 'Leads');
    });
    
    it('should display an error message with invalid credentials', () => {
        
        cy.get('[type="email"]').type(invalidEmail); 
        cy.get('[type="password"]').type(invalidPassword); 
        cy.get('button[type="submit"]').click(); 

        cy.get('span').should('contain', 'Invalid credentials.'); 
        cy.url().should('include', '/app/login'); 
    });

    it('should display an error message with invalid password', () => {

        cy.get('[type="email"]').type(validEmail); 
        cy.get('[type="password"]').type(invalidPasswordNoNumb); 
        cy.get('button[type="submit"]').click(); 

        cy.get('span').should('contain', invalidPasswordErrorMsg); 
        cy.url().should('include', '/app/login'); 

    });
});
