import * as myCoupons from '../../../helpers/coupons/my-coupons';
import { viewportContext } from '../../../helpers/viewport-context';

viewportContext(['desktop'], () => {
  describe('My coupons - Authenticated user', () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
      cy.requireLoggedIn();
    });

    it(['my_coupons'],'should validate coupons core functionality', () => {
      myCoupons.testClaimCustomerCoupon();
    });
  });
});
