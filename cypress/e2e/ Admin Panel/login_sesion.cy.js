describe('Admin Panel Login with Session', () => {
    beforeEach(() => {
        cy.session('admin', () => {
            cy.visit('/admin/login');
            cy.get('input[name="username"]').type('admin');
            cy.get('input[name="password"]').type('password');
            cy.get('button[type="submit"]').click();
            cy.url().should('include', '/admin/dashboard');
        });
    });

    it('should navigate to the dashboard without logging in again', () => {
        cy.visit('/admin/dashboard');
        cy.url().should('include', '/admin/dashboard');
    });
});


before(() => {
        cy.session('loginSession', () => {
            cy.visit('/app/login', {
                auth: {
                    username: Cypress.env("httpAuthUsername"),
                    password: Cypress.env("httpAuthPassword"),          
                },
            });
            cy.wait(1000);
            cy.window().then((win) => {
                win.localStorage.setItem('authToken', token);
            });
            cy.window().then((win) => {
                expect(win.localStorage.getItem('authToken')).to.equal(token);
            });
            cy.get('[type="email"]').type(validEmail); 
            cy.get('[type="password"]').type(validPassword); 
            cy.get('button[type="submit"]').click();
            cy.url().should('include', '/app/admin-panel');
            cy.get('h4').should('be.visible'); // Wait for the header to be visible
        });
    });
    
    beforeEach(() => {
        // cy.session('loginSession');
        cy.visit('/app/login');
        cy.wait(2000);
    });