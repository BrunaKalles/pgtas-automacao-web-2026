/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

const cadastro = require('../modules/cadastro/index.js')
const login = require('../modules/login/index.js')


describe('Automation Exercise', () => {
  it.only('Cadastrar novo usuário com sucesso', () => {
    cy.visit('https://automationexercise.com')
    cy.get('a[href*=login]').click() //mapear elemento
    //`teste${Date.now()}@teste.com`
  const email = faker.internet.email();
  cadastro.iniciarCadastro('Teste 002',email)

  cadastro.preencherCadastro()

  cadastro.verificarSeCadastroFoiEfetuadoComSucesso()

  });
  it('Efetuar Login de Usuário com e-mail e senha corretos', ()=>{
    /**
     * Ter uma conta para efetuar o Login
     * teste1791658538930@teste.com | 12345
     */


    //acesso a página de login
    cy.visit('https://automationexercise.com/login')

   
    login.preencherLogin('teste1791658538930@teste.com','12345')
    

    login.verificarSeLoginFoiEfetuadoComsucesso()

  });
  it('Efetuar Login de Usuário com e-mail e senha INCORRETOS',()=>{
     //acesso a página de login
    cy.visit('https://automationexercise.com/login')

    login.preencherLogin('teste1791658538930@teste.com','123456')


    login.verificarSeMensagemDeErroFoiExibidaNoLogin()

  });
  it('Efetuar Logout',()=>{

     //acesso a página de login
  cy.visit('https://automationexercise.com/login')

  login.preencherLogin('teste1791658538930@teste.com', '12345')

  login.efetuarLogout()

  login.verificarSeOUsuarioFoiDeslogado()
  
  });
  it('Tentar cadastrar usuário com e-mail já cadastrado',()=>{

   cy.visit('https://automationexercise.com')
    cy.get('a[href*=login]').click() //mapear elemento
    
    cadastro.iniciarCadastro('Teste 002',`teste1791658538930@teste.com`)

    cadastro.verificarSeMensagemDeCadastroExistenteFoiExibida()

  });
  it.skip('Verificar todos os produtos e a página de detalhes do produto', ()=>{
    cy.visit('https://automationexercise.com/products')

    cy.contains('All Products').should('be.visible')

    cy.contains('a', 'View Product').click();

    cy.get('btn btn-default cart')
      .should('be.visible')

    
  })

});






// //Cadastro
// function iniciarCadastro(nome, email){
//   cy.get('[data-qa="signup-name"]').type(nome)
//   cy.get('[data-qa="signup-email"]').type(email)

//   cy.get('[data-qa="signup-button"]').click()

// }

// function preencherCadastro(){
//   //radio button -> check
//   cy.get('#id_gender2').check()

//   cy.get('[data-qa="password"]').type('12345')


//   //select e comboboxes -> select
//   cy.get('[data-qa="days"]').select('1')

//   cy.get('[data-qa="months"]').select('September')

//   cy.get('[data-qa="years"]').select('2000')

//   //checkboxes -> check
//   cy.get('#newsletter').click()
//   cy.get('#optin').click()
//   cy.get('[data-qa="first_name"]').type('Testes')
//   cy.get('[data-qa="last_name"]').type('Santos')
//   cy.get('[data-qa="company"]').type('teste sa')
//   cy.get('[data-qa="address"]').type('endereço do teste')
//   cy.get('[data-qa="country"]').select('United States')
//   cy.get('[data-qa="state"]').type('santa catarina')
//   cy.get('[data-qa="city"]').type('Chapecó')
//   cy.get('[data-qa="zipcode"]').type('89809700')
//   cy.get('[data-qa="mobile_number"]').type('988585859')

//   cy.get('[data-qa="create-account"]').click()
// }

// function verificarSeCadastroFoiEfetuadoComSucesso(){
//   cy.get('[data-qa="create-account"]').click()
//   cy.get('[data-qa="account-created"]')
//     .should('be.visible')
//     .and('contain', 'Account Created!')

// }

//Login

// function preencherLogin(email, senha){
//   //email:'teste1791658538930@teste.com' | senha 12345
//   cy.get('[data-qa="login-email"]').type(email)
//   cy.get('[data-qa="login-password"]').type(senha)
//   cy.get('[data-qa="login-button"]').click()
// }
// function verificarSeLoginFoiEfetuadoComsucesso(){

//      /** verificarSeLoginFoiEfetuadoComsucesso()*/
//     cy.get('a > b').should('contain', 'Teste 002')
//     cy.contains('Logged in as Teste 002').should('be.visible')
//     cy.contains('a', ' Logged in as')
//         .should('be.visible')
//         .find('b').should('be.visible')
//         .and('have.text', 'Teste 002')
// }

// function verificarSeMensagemDeErroFoiExibidaNoLogin(){
//   cy.get('form[action*="login"] > p')
//     .should('exist')
//     .should('be.visible')
//     .should('contain', 'Your email or password is incorrect!')
//     .and('contain.text', 'Your email or password is incorrect!')
// }
  
// function efetuarLogout(){
// cy.get('a[href*="logout"]')
//   .should('be.visible')
//   .click()

// }


// function verificarSeOUsuarioFoiDeslogado(){
//   cy.get('.login-form > h2').should('be.visible')
//   cy.get('a[href*="logout"]').should('not.exist')
//   cy.get('[action*="login"]').should('be.visible')
//   cy.url().should('include','login')

// }


//   function verificarSeMensagemDeCadatsroExistenteFoiExibida(){
//   cy.get('form[action*=signup] p')
//     .should('exist')
//     .should('be.visible')
//     .should('contain', 'Email Address already exist!')
//     .and('contain.text', 'Email Address already exist!')
// }