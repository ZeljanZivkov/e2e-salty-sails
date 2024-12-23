//? User Story 3 - Filter All Leads View
/// <reference types="cypress" />

describe('Verify Filtering Functionality on the All Designs Table', () => {
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
        cy.get('button[type="submit"]').click();
    });

    it('should display lead designs in list view', () => {
        cy.get('h4').should('be.visible').should('contain', 'Leads');
        cy.url().should('include', '/app/admin-panel');
    });

    it('should display all supported statuses in the Status filter dropdown', () => {
        cy.get('section', ).eq(1).find('button').click()
        
        const expectedStatuses = [
            'Base quote sent',
            'Refined quote requested',
            'Refined quote sent',
            'Refined quote declined',
            'Project scheduled',
            'In progress',
            'Completed'
        ];
        expectedStatuses.forEach(status => {
            cy.get('.react-select__control').click();
            cy.get('.react-select__menu').contains(status).should('be.visible');
            cy.get('body').click();
        });
    });
    
    it('should filter designs by a single status', () => {
        
        cy.get('section', ).eq(1).find('button').click()
        cy.get('.react-select__control').click();
        cy.get('.react-select__menu').contains('Completed').click();
        cy.get('table').find('tr').should('have.length.greaterThan', 0);
        cy.get('table').contains('Completed').should('exist'); 
    });

    it('should reset the status filter', () => {

        cy.get('section', ).eq(1).find('button').click()
        cy.get('.react-select__control').click();
        cy.get('.react-select__menu').contains('Completed').click();

        //? Ovde treba dopuna na primer Apply filter pa onda Clear
        cy.get('section', ).eq(1).contains('span', 'Clear all filters').click();
        
        cy.get('table').find('tr').should('have.length.greaterThan', 0);

        Cypress.runner.stop();
    });
            //! ovde si stao
    it.only('should display a date picker for the Date Range filter', () => {
        // Step #6: Locate the "Date Range" filter.
        cy.get('section', ).eq(1).find('button').click()
        // cy.get('.react-select__control').click();


        //?----------------------------------------------------------------------------------------------------------------
        // cy.get('#date-range-filter').click(); // Replace with actual date range filter selector
        // cy.get('.date-picker').should('be.visible'); // Ensure date picker is visible
    });

    it('should filter designs by a specific date range', () => {
        // Step #7: Select a specific date range (e.g., "2024-01-01" to "2024-12-31")
        cy.get('#date-range-start').type('2024-01-01'); // Replace with actual start date input selector
        cy.get('#date-range-end').type('2024-12-31'); // Replace with actual end date input selector
        cy.get('#apply-date-range').click(); // Replace with actual apply button selector
        cy.get('.designs-table').find('tr').should('have.length.greaterThan', 0); // Ensure designs are filtered
    });

    it('should change the date range to a different interval', () => {
        // Step #8: Change the date range to a different interval
        cy.get('#date-range-start').clear().type('2024-06-01'); // Replace with actual start date input selector
        cy.get('#date-range-end').clear().type('2024-06-30'); // Replace with actual end date input selector
        cy.get('#apply-date-range').click(); // Replace with actual apply button selector
        cy.get('.designs-table').find('tr').should('have.length.greaterThan', 0); // Ensure designs are filtered
    });

    it('should reset the date range filter', () => {
        // Step #9: Reset the filter
        cy.get('#reset-filters').click(); // Replace with actual reset button selector
        cy.get('.designs-table').find('tr').should('have.length.greaterThan', 0); // Ensure all designs are displayed
    });

    it('should filter designs by a specific status again', () => {
        // Step #10: Select a specific status (e.g., "Refined Quote Sent")
        cy.get('#status-filter').select('Refined Quote Sent'); // Replace with actual dropdown selector
        cy.get('.designs-table').find('tr').should('have.length.greaterThan', 0); // Ensure designs are filtered
    });

    it('should apply a date range with a specific status', () => {
        // Step #11: Apply a date range (e.g., "2024-01-01" to "2024-06-30").
        cy.get('#date-range-start').type('2024-01-01'); // Replace with actual start date input selector
        cy.get('#date-range-end').type('2024-06-30'); // Replace with actual end date input selector
        cy.get('#apply-date-range').click(); // Replace with actual apply button selector
        cy.get('.designs-table').find('tr').should('have.length.greaterThan', 0); // Ensure designs are filtered
    });

    it('should reset the date range filter', () => {
        // Step #12: Reset one filter (e.g., date range)
        cy.get('#reset-date-range').click(); // Replace with actual reset button selector for date range
        cy.get('.designs-table').find('tr').should('have.length.greaterThan', 0); // Ensure designs are filtered by status
    });

    it('should reset all filters', () => {
        // Step #13: Reset all filters
        cy.get('#reset-filters').click(); // Replace with actual reset button selector
        cy.get('.designs-table').find('tr').should('have.length.greaterThan', 0); // Ensure all designs are displayed
    });
});
