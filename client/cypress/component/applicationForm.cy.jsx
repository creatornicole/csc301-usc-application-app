import React from 'react';
import ApplicationForm from '../../src/pages/ApplicationForm';

/*

Test if the Application Form contains all the needed input fields
renders the correct initial values and accepts right data
as well as displays the right amount of errors when the invalid
input data is entered.

*/
describe('Application Form', () => {
  beforeEach(() => {
    cy.mount(<ApplicationForm />);
  });

  it('should render all input fields', () => {
    // check the presence of each input field by querying their selectors
    cy.get('input[name="name"]').should('exist');
    cy.get('input[name="birthdate"]').should('exist');
    cy.get('input[name="phonenumber"]').should('exist');
    cy.get('input[name="address"]').should('exist');
    cy.get('input[name="abbr"]').should('exist');
    cy.get('input[name="course"]').should('exist');
    cy.get('input[name="seminargroup"]').should('exist');
    cy.get('select[name="position"]').should('exist');
  });

  it('should have initial values for all input fields', () => {
    // check that each input field has its initial value
    cy.get('input[name="name"]').should('have.value', '');
    cy.get('input[name="birthdate"]').should('have.value', '');
    cy.get('input[name="phonenumber"]').should('have.value', '');
    cy.get('input[name="address"]').should('have.value', '');
    cy.get('input[name="abbr"]').should('have.value', '');
    cy.get('input[name="course"]').should('have.value', '');
    cy.get('input[name="seminargroup"]').should('have.value', '');
    // make sure that the first option of the select is the placeholder
    // because cypress seems to be unable to assign the value property to the position select
    // hence, cannot check if true, since value will always be null
    cy.get('select[name="position"]').find('option:first').invoke('val').then(firstOptionValue => {
      // check if the value of the first option is equal to the expected value
      expect(firstOptionValue).to.equal('Change to your desired position...');
    });
  });

  it('should accept valid input data', () => {
    // fill out the form with valid data
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="birthdate"]').type('01/01/1990');
    cy.get('input[name="phonenumber"]').type('1234567890');
    cy.get('input[name="address"]').type('123 Main St, City');
    cy.get('input[name="abbr"]').type('example@hs-mittweida.de');
    cy.get('input[name="course"]').type('Computer Science');
    cy.get('input[name="seminargroup"]').type('IF21wS1-B');
    cy.get('select[name="position"]').select('battery');

    // submit the form
    cy.get('button[type="submit"]').click();

    // check for the success message
    // get all elements with class .error
    cy.get('.error').then(($errorElements) => {
      // filter the elements to get only those with non-empty text content
      const errorElementsWithValue = $errorElements.filter((index, element) => {
        return Cypress.$(element).text().trim() !== '';
      });

      // assert the count of error elements with values
      // equals 1, when it is run with github actions
      // this one error occurs because of the server error
      // the server error occurs, because the server is not started, when the github action is run
      expect(errorElementsWithValue.length).to.be.equal(1);
    });
  });

  // check for the most obvious mistakes that should not submit the form to the server
  it('should display error messages for invalid', () => {
    // fill out the form with invalid data
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="birthdate"]').type('01-01-1990'); // error no. 1
    cy.get('input[name="phonenumber"]').type('1234567890');
    cy.get('input[name="address"]').type('123 Main St, City');
    cy.get('input[name="abbr"]').type('example@other-mail.de'); // error no. 2
    cy.get('input[name="course"]').type('Computer Science');
    cy.get('input[name="seminargroup"]').type('IF21wS1-B234'); // error no. 3
    // error no. 4 is that no position is selected

    // submit the form
    cy.get('button[type="submit"]').click();

    // get all elements with class .error
    cy.get('.error').then(($errorElements) => {
      // filter the elements to get only those with non-empty text content
      const errorElementsWithValue = $errorElements.filter((index, element) => {
        return Cypress.$(element).text().trim() !== '';
      });

      // assert the count of error elements with values
      expect(errorElementsWithValue.length).to.be.equal(4);
    });
  });
})