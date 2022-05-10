import * as updateEmail from '../../../helpers/update-email';
import { viewportContext } from '../../../helpers/viewport-context';

describe('My Account - Update Email', () => {
  viewportContext(['desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

    describe('Anonymous user', () => {
      it(['update_email', 'smoke_b2c'], 'should redirect to login page', () => {
        cy.visit(updateEmail.UPDATE_EMAIL_URL);
        cy.location('pathname').should('contain', '/login');
      });
    });

    describe('Logged in user', () => {
      before(() => {
        updateEmail.registerAndLogin();
        cy.visit('/');
      });

      beforeEach(() => {
        cy.restoreLocalStorage();
        cy.selectUserMenuOption({
          option: 'Email Address',
        });
      });

      it(['update_email', 'smoke_b2c'], 'should update email and login', () => {
        updateEmail.testUpdateEmailAndLogin();
      });

      afterEach(() => {
        cy.saveLocalStorage();
      });
    });
  });
});
