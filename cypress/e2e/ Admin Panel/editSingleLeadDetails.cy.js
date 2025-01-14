// ? User Story 6 - Edit Single Lead Details
/// <reference types="cypress" />

describe('Verify Editing Lead Details', () => {
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

        cy.get('table tbody tr').first().find('[alt="menu-dots"]').click(); 
        cy.get('[alt="menu-dots"]') 
                .parents('div.c-table-btn') 
                .find('span') 
                .contains('Lead details')
                .click({ force: true });
        //fali mi url ovde koj ide posle klika na lead details
        // ?cy.url().should('include', 'app/admin-panel?page=1&itemsPerPage=5'); 
    });
    //should edit basic info
    it('should edit basic info successfully', () => {
                 
        cy.get('.undefined') 
                .find('span') 
                .contains('Edit info')
                .click({ force: true });

        cy.get('input[name="address"]').should('be.visible'); 
        cy.get('input[name="phone"]').should('be.visible'); 

        cy.get('input[name="address"]').clear().type('123 New Address');
        cy.get('input[name="phone"]').clear().type('1234567890');
        cy.get('button[type="button"]').contains('Save').click();

        cy.get('.undefined') 
                .find('span') 
                .contains('Edit method')
                .click({ force: true });

        cy.get('h5').contains('Communication method'); 

        cy.get('input[name="preferredCommunication"][value="Email"]')
                .should('exist') 
                .should('be.visible') 
                .click(); 

        cy.get('input[name="preferredCommunication"][value="Phone"]')
                .should('exist') 
                .should('be.visible') 
                .click();       
        cy.get('button[type="submit"]').contains('Save').click();
    });
    //no changes have been saved after canceling edit Base info
    it('no changes have been saved after canceling edit Base info', () => {

        cy.get('.undefined') 
                .find('span') 
                .contains('Edit info')
                .click({ force: true });

        cy.get('input[name="address"]').should('be.visible'); 
        cy.get('input[name="phone"]').should('be.visible'); 

        cy.get('input[name="address"]').clear().type('456 Another Address');
        cy.get('input[name="phone"]').clear().type('0987654321');
        cy.get('button[type="button"]').contains('Cancel').click();
        
        //modal
        cy.get('h6').contains('Discard changes');
        cy.get('button[type="button"]').contains('Discard').click();

        cy.get('.undefined') 
                .find('span') 
                .contains('Address')
                .should('not.contain', '456 Another Address');

        cy.get('.undefined') 
                .find('span') 
                .contains('Phone')
                .should('not.contain', '0987654321');
    });
    //should edit Preferred communication info
    it('should edit Preferred communication info successfully', () => {

        cy.get('.undefined') 
                .find('span') 
                .contains('Edit method')
                .click({ force: true }).wait(2000);
        
        cy.get('h5').contains('Communication method'); 

        cy.get('input[name="preferredCommunication"][value="Email"]')
            .should('exist')
            .then(($email) => {
             if ($email.attr('checked') !== undefined) {
                // Ako je Email selektovan, izaberi Phone
                cy.get('input[name="preferredCommunication"][value="Phone"]')
                    .should('exist')
                    .should('be.visible')
                    .click();
            } else {
                // Ako Email NIJE selektovan, izaberi Email
                cy.wrap($email)
                    .should('exist')
                    .should('be.visible')
                    .click();
                }
            });
        cy.get('button[type="submit"]').contains('Save').click()
    });
    //should edit Best contact time
    it('should edit Best contact time info successfully', () => {
        cy.get('.undefined') 
                .find('span') 
                .contains('Edit time')
                .click({ force: true });

        cy.get('h5').contains('Best contact time'); 

            const daysOfweek = [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
                ];
                daysOfweek.forEach(daysOfweek => {
                    cy.get('#time').contains(daysOfweek).should('be.visible');
                });

            const preferedTime = [
                'Morning (7AM - 10AM)',
                'Early afternoon (11AM - 2PM)',
                'Late afternoon (3PM - 6PM)'
                ];
                cy.get('input[name="preferredTime"]').each(($el, index) => {
                    cy.wrap($el).should('have.value', preferedTime[index]);
                });


        cy.get('input[name="preferredDays"][value="Mon"]')
            .should('exist') 
            .should('be.visible') 
            .click(); 

        cy.get('input[name="preferredTime"][value="Morning (7AM - 10AM)"]')
            .should('exist') 
            .should('be.visible') 
            .click(); 

        cy.get('button[type="submit"]').contains('Save').click();

    });

});

