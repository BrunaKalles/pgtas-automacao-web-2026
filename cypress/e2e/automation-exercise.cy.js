/// <reference types="cypress" />

describe('Automation Exercise', () => {
  it('Cadastrar novo usuário com sucesso', () => {
    cy.visit('https://automationexercise.com')
    cy.get('a[href*=login]').click() //mapear elemento
    
    const timestamp = new Date().getTime()

    cy.get('[data-qa="signup-name"]').type('Teste 002')
    cy.get('[data-qa="signup-email"]').type(`teste${timestamp}@teste.com`)

    cy.get('[data-qa="signup-button"]').click()

    //radio button -> check
    cy.get('#id_gender2').check()

    cy.get('[data-qa="password"]').type('12345')


        //select e comboboxes -> select
    cy.get('[data-qa="days"]').select('1')

    cy.get('[data-qa="months"]').select('September')

    cy.get('[data-qa="years"]').select('2000')
    
    //checkboxes -> check
    cy.get('#newsletter').click()


    cy.get('#optin').click()
    cy.get('[data-qa="first_name"]').type('Testes')
    cy.get('[data-qa="last_name"]').type('Santos')
    cy.get('[data-qa="company"]').type('teste sa')
    cy.get('[data-qa="address"]').type('endereço do teste')
    cy.get('[data-qa="country"]').select('United States')
    cy.get('[data-qa="state"]').type('santa catarina')
    cy.get('[data-qa="city"]').type('Chapecó')
    cy.get('[data-qa="zipcode"]').type('89809700')
    cy.get('[data-qa="mobile_number"]').type('988585859')

    cy.get('[data-qa="create-account"]').click()


  });
});