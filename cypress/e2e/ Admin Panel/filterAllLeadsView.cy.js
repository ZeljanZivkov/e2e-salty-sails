//* User Story 3 - Filter All Leads View
/// <reference types="cypress" />

describe('Verify Filtering Functionality on the All Designs Table', () => {
    const validEmail = Cypress.env("email");
    const validPassword = Cypress.env("password"); 
    const statusFilter = Cypress.env("specificStatusFilter");

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
        cy.get('.react-select__menu').contains(statusFilter).click();
        cy.get('button').contains('Apply filters').click().wait(2000);
        cy.get('table').find('tr').should('have.length.greaterThan', 0).contains('Base Quote Sent').should('exist'); 
    });

    it('should reset the status filter', () => {

        cy.get('section', ).eq(1).find('button').click()
        cy.get('.react-select__control').click();
        cy.get('.react-select__menu').contains(statusFilter).click();
        cy.get('section', ).eq(2).should('be.visible');
        cy.get('button').contains('Apply filters').click().wait(2000);
        cy.get('table').find('tr').should('have.length.greaterThan', 0).contains('Base Quote Sent').should('exist');
        cy.get('section', ).eq(1).contains('span', 'Clear all filters').click();
        cy.get('button').contains('Apply filters').should('be.hidden');

        // Cypress.runner.stop();
    });

    it('should display a date picker for the Date Range filter', () => {
        // Step #6: Locate the "Date Range" filter.
        cy.get('section', ).eq(1).find('button').click()
        cy.get(':nth-child(2) > label')
            .contains('Start date')
            .parent()
            .click();
        cy.get('.react-calendar').should('be.visible');

        cy.get(':nth-child(3) > label')
            .contains('End date')
            .parent()
            .click();
        cy.get('.react-calendar').should('be.visible');
          
    });

    it('should filter designs by a specific start date ', () => {

        cy.get('section', ).eq(1).find('button').click()
        cy.get(':nth-child(2) > label')
            .contains('Start date')
            .parent()
            .click();
        cy.get('.react-calendar').should('be.visible');
        cy.get('.react-calendar__tile').filter((index, element) => {
                return element.querySelector('abbr')?.textContent === '6';
            }).click();

        cy.get('button').contains('Apply filters').click().wait(1000);

        cy.get('table').find('tr').should('have.length.greaterThan', 0); 
    });

    it('should filter designs by a start and end date', () => {

        cy.get('section', ).eq(1).find('button').click()
        cy.get(':nth-child(2) > label')
            .contains('Start date')
            .parent()
            .click();
        cy.get('.react-calendar').should('be.visible');
        cy.get('.react-calendar__tile').filter((index, element) => {
                return element.querySelector('abbr')?.textContent === '6';
            }).click();

        cy.get(':nth-child(3) > label')
            .contains('End date')
            .parent()
            .click();
        cy.get('.react-calendar').should('be.visible');
        cy.get('.react-calendar__tile').filter((index, element) => {
                return element.querySelector('abbr')?.textContent === '10';
            }).click();

        cy.get('button').contains('Apply filters').click().wait(1000);

        cy.get('table').find('tr').should('have.length.greaterThan', 0); 
    });
    
    it('should apply a Start date  with a specific status', () => {
        cy.get('section', ).eq(1).find('button').click()
        cy.get(':nth-child(2) > label')
            .contains('Start date')
            .parent()
            .click();
        cy.get('.react-calendar').should('be.visible');
        cy.get('.react-calendar__tile').filter((index, element) => {
                return element.querySelector('abbr')?.textContent === '6';
            }).click();

        cy.get('.react-select__control').click();
        cy.get('.react-select__menu').contains(statusFilter).click();
        cy.get('button').contains('Apply filters').click().wait(2000);
        cy.get('table').find('tr').should('have.length.greaterThan', 0).contains('Base Quote Sent').should('exist'); 
    });

    it('should reset all filters', () => {
        cy.get('section', ).eq(1).find('button').click()
        cy.get(':nth-child(2) > label')
            .contains('Start date')
            .parent()
            .click();
        cy.get('.react-calendar').should('be.visible');
        cy.get('.react-calendar__tile').filter((index, element) => {
                return element.querySelector('abbr')?.textContent === '6';
            }).click();

        cy.get(':nth-child(3) > label')
            .contains('End date')
            .parent()
            .click();
        cy.get('.react-calendar').should('be.visible');
        cy.get('.react-calendar__tile').filter((index, element) => {
                return element.querySelector('abbr')?.textContent === '10';
            }).click();

        cy.get('.react-select__control').click();
        cy.get('.react-select__menu').contains(statusFilter).click();

        cy.get('button').contains('Apply filters').click().wait(1000);

        cy.get('table').find('tr').should('have.length.greaterThan', 0); 
        cy.get('section', ).eq(1).contains('span', 'Clear all filters').click();
        cy.get('button').contains('Apply filters').should('be.hidden');
    });

});
