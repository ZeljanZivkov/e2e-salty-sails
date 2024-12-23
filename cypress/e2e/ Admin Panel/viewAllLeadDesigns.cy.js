//? User Story 2 - View All Lead Designs
/// <reference types="cypress" />

describe('Test cases for viewing all lead designs in List View', () => {
    const validEmail = Cypress.env("email");
    const validPassword = Cypress.env("password"); 

    // beforeEach(() => {
    //     cy.visit('/app/login', {
    //         auth: {
    //             username: Cypress.env("httpAuthUsername"),
    //             password: Cypress.env("httpAuthPassword"),          
    //         },
    //     });

    //     cy.get('[type="email"]').type(validEmail); 
    //     cy.get('[type="password"]').type(validPassword); 
    //     cy.get('button[type="submit"]').click(); 
    //     cy.wait(2000);
    // });

    beforeEach(() => {
        cy.session('loginSession', () => {
            cy.visit('/app/login', {
                auth: {
                    username: Cypress.env("httpAuthUsername"),
                    password: Cypress.env("httpAuthPassword"),          
                },
            });
            cy.get('[type="email"]').type(validEmail); 
            cy.get('[type="password"]').type(validPassword); 
            cy.get('button[type="submit"]').click();
            cy.url().should('include', '/app/admin-panel');
            cy.get('h4').should('be.visible'); // Wait for the header to be visible
        });
    });


    it('should log in successfully', () => {
        cy.visit('/app/admin-panel');
        cy.url().should('include', '/app/admin-panel'); 
        cy.get('h4')
            .should('be.visible')
            .should('contain', 'Leads');
    });

    it('should display leads in list view', () => {
        cy.visit('/app/admin-panel');
        cy.get('table').should('exist');
        cy.get('table tbody tr').should('have.length.greaterThan', 0);
        cy.get('table tbody tr').first().find('td').eq(0).should('be.visible'); 

    });

    it('verify options in the kebab menu',()=>{
        cy.visit('/app/admin-panel');
        //? Treba proveriti da li moze da se otvori single page preko ID
        //! Step #5: Click the Design ID for a specific lead. Kebab menu here
        //! cy.get('table tbody tr').first().find('td').find('.c-table-btn').click(); // Click on the Design ID
        //! cy.url().should('include', '/design-details'); // Expected result: Redirected to Design Details page

        cy.get('table tbody tr').first().find('.c-table-btn').click(); // Click on kebab menu
        cy.contains('span','Design details').click({ force: true });
        // ? ovde unesi URl koji se pojavi kad otvoris details page
        // cy.url().should('include', '/design-details');

        cy.get('table tbody tr').first().find('.c-table-btn').click(); // Click on kebab menu
        cy.contains('span','Lead details').click({ force: true }); 
        // ? ovde unesi URl koji se pojavi kad otvoris details page
        // cy.url().should('include', '/lead-details');

        
        cy.get('table tbody tr').first().find('.c-table-btn').click(); // Click on kebab menu
        cy.get('span').contains('Download design PDF').click({ force: true }); 

        // Step #13: Locate the "Delete" action button in kebab menu.
        // *cy.get('table tbody tr').first().find('.c-table-btn').click(); // Click on kebab menu
        // *cy.get('span').contains('Delete').click({ force: true }); 

        //? Treba proveriti da li ima confirmation modal
        //! cy.get('.confirmation-dialog').should('be.visible');

        //! Step #15: Confirm the deletion when prompted.
        //! cy.get('.confirmation-dialog').contains('Confirm').click(); // Click confirm button
        //! cy.get('.notification').should('contain', 'You’ve successfully deleted a sail'); // Check success notification

        // // Step #16: Navigate to the "Leads" list
        // !cy.get('nav').contains('Leads').click(); // Navigate back to Leads
        // !cy.url().should('include', '/leads'); // Expected result: Leads page is displayed

    });

    it('verify pagination functionality on Admin Panel', () => {
        //Pagination
        cy.visit('/app/admin-panel');
        cy.scrollTo('bottom'); 
        cy.wait(2000);
        cy.get('section', ).eq(4).contains('button', 'Next').should('be.visible').click({force: true});
        cy.url().should('include', '/app/admin-panel?page=2');
        cy.get('section', ).eq(4).contains('button', 'Previous').should('be.visible').click({force: true});
        cy.url().should('include', '/app/admin-panel?page=1');

    });
});
