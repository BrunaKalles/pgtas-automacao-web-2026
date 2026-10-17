import { faker } from '@faker-js/faker';

function iniciarCadastro(nome, email){
  cy.get('[data-qa="signup-name"]').type(nome)
  cy.get('[data-qa="signup-email"]').type(email)

  cy.get('[data-qa="signup-button"]').click()

}

function gerarDadosCadastro(){
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    company: faker.company.name(),
    address: faker.location.streetAddress(),
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode:faker.location.zipCode('#####-###'),
    mobile_number: faker.string.numeric(11)
  };
}

function preencherCadastro(){
  const dados = gerarDadosCadastro();

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
  cy.get('[data-qa="first_name"]').type(dados.firstName)
  cy.get('[data-qa="last_name"]').type(dados.lastName)
  cy.get('[data-qa="company"]').type(dados.company)
  cy.get('[data-qa="address"]').type(dados.address)
  cy.get('[data-qa="country"]').select('United States')
  cy.get('[data-qa="state"]').type(dados.state)
  cy.get('[data-qa="city"]').type(dados.city)
  cy.get('[data-qa="zipcode"]').type(dados.zipcode)
  cy.get('[data-qa="mobile_number"]').type(dados.mobile_number)
}

function verificarSeCadastroFoiEfetuadoComSucesso(){
  cy.get('[data-qa="create-account"]').click()
  cy.get('[data-qa="account-created"]')
    .should('be.visible')
    .and('contain', 'Account Created!')

}

  function verificarSeMensagemDeCadastroExistenteFoiExibida(){
  cy.get('form[action*=signup] p')
    .should('exist')
    .should('be.visible')
    .should('contain', 'Email Address already exist!')
    .and('contain.text', 'Email Address already exist!')
}


module.exports = {
  iniciarCadastro,
  preencherCadastro,
  verificarSeCadastroFoiEfetuadoComSucesso,
  verificarSeMensagemDeCadastroExistenteFoiExibida



}