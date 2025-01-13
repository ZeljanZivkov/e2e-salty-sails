//? User Story 2 - View All Lead Designs
/// <reference types="cypress" />
    
describe('Salty-Sails Admin Panel - Lead Designs List View', () => {
    const validEmail = Cypress.env("email");
    const validPassword = Cypress.env("password"); 
    beforeEach(() => {
        cy.visit('/app/login', {
            auth: {
                username: Cypress.env("httpAuthUsername"),
                password: Cypress.env("httpAuthPassword"),          
            },
        });
        cy.get('[type="email"]').type(validEmail); 
        cy.get('[type="password"]').type(validPassword); 
        cy.get('button[type="submit"]').click().wait(1000);

        cy.url().should('include', '/app/admin-panel'); 
        cy.get('h4')
            .should('be.visible')
            .should('contain', 'Leads');
    });

    it('should display all lead designs in List View', () => {
       
        cy.get('nav').contains('Leads').should('be.visible'); 
        cy.url().should('include', '/app/admin-panel'); 

        
        cy.get('table').should('exist').wait(2000); 
        cy.get('table tbody tr').should('have.length.greaterThan', 0); 

        // Identify a label for column
        const tableColomLabel = [
            'Design ID',
            'Lead name',
            'Email',
            'Created at',
            'Base quote',
            'Refined quote',
            'Status',
        ];
        tableColomLabel.forEach(tableColomLabel => {
            cy.contains('th', tableColomLabel).should('be.visible'); 

        });

      
        //Locate the "View Lead details" action button in kebab menu.
        cy.get('table tbody tr').first().find('[alt="menu-dots"]').click(); 
        cy.get('[alt="menu-dots"]') 
                .parents('div.c-table-btn') 
                .find('span') 
                .contains('Lead details')
                .should('exist');
                // .click({ force: true });

        // Click the "View Lead details" action button.
        // ?cy.url().should('include', 'app/admin-panel?page=1&itemsPerPage=5'); // Expected result: Redirected to Design Details page
       
        //Locate the "View Design details" action button in kebab menu.
        cy.get('table tbody tr').first().find('[alt="menu-dots"]').click(); 
        cy.get('[alt="menu-dots"]') 
                .parents('div.c-table-btn') 
                .find('span') 
                .contains('Design details')
                .should('exist');
                // .click({ force: true });

        // Click the "View Design Details" action button
        // ?cy.url().should('include', '/lead-details'); // Expected result: Redirected to Lead Details page

        //  Locate the "Download Design PDF" action button in kebab menu
        cy.get('table tbody tr').first().find('[alt="menu-dots"]').click(); 
        cy.get('[alt="menu-dots"]') 
                .parents('div.c-table-btn') 
                .find('span') 
                .contains('Download design PDF')
                .should('exist');
                // .click({ force: true });

        // Click the "Download Design PDF" action button
        // Assuming the download is handled by the browser, we can check for the download
        cy.wait(2000); // Wait for download to complete, adjust as necessary

        // Locate the "Delete" action button in kebab menu
        cy.get('table tbody tr').first().find('[alt="menu-dots"]').click(); 
        cy.get('[alt="menu-dots"]') 
                .parents('div.c-table-btn') 
                .find('span') 
                .contains('Delete')
                .should('exist');
                // .click({ force: true });

        //  Click the "Delete" action button
        // ? cy.get('.confirmation-dialog').should('be.visible'); // Check for confirmation dialog

        //  Confirm the deletion when prompted.
        // ? cy.get('.confirmation-dialog').contains('Confirm').click(); // Confirm deletion
        // ? cy.get('.notification').should('contain', 'Lead design deleted successfully.'); // Check for success notification

        // Navigate to the "Leads" list
        // cy.get('nav').contains('Leads').click(); // Navigate back to Leads

        cy.scrollTo('bottom'); // Scroll to the bottom

        //Pagination
        cy.scrollTo('bottom'); 
        cy.get('section', ).eq(5).contains('button', 'Next').should('be.visible').click({force: true});
        cy.url().should('include', '/app/admin-panel?page=2');
        cy.get('section', ).eq(5).contains('button', 'Previous').should('be.visible').click({force: true});
        cy.url().should('include', '/app/admin-panel?page=1');
    });

});

// Cypress.runner.stop();