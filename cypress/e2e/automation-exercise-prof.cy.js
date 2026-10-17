/// <reference types="cypress" />

//const dadosCadastro =  requiere('../fixtures/cadastro.json')

describe('Automation Exercise', () => {
  it.only('Cadastrar novo usuário com sucesso', () => {
    
  //   retries: {
  //   openMode: 0;//iterativo, abre o navegdor3
  //   runMode: 1;//headless 
  // }
    //cy.visit('https://automationexercise.com')
    cy.visit('/')//inseri no cypress.config.js a url base.
    //pre sets
    //cy.viewport('iphone-8') quando quer deixar uma spec com uma resolução especifica, funciona só aqui nessa spec
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

   // cy.get('[data-qa="create-account"]').click()

    
    cy.get('[data-qa="create-account"]').click()
    cy.get('[data-qa="account-created"]')
      .should('be.visible')
      .and('contain', 'Account Created!')


  });
  it('Efetuar Login de Usuário com e-mail e senha corretos', ()=>{
    /**
     * Ter uma conta para efetuar o Login
     * teste1791658538930@teste.com | 12345
     */


    //acesso a página de login
    cy.visit('/login')
    cy.get('[data-qa="login-email"]').type('teste1791658538930@teste.com')
    cy.get('[data-qa="login-password"]').type('12345')
    cy.get('[data-qa="login-button"]').click()

    cy.get('a > b').should('contain', 'Teste 002')
    cy.contains('Logged in as Teste 002').should('be.visible')
    cy.contains('a', ' Logged in as')
        .should('be.visible')
        .find('b').should('be.visible')
        .and('have.text', 'Teste 002')

  });
  it('Efetuar Login de Usuário com e-mail e senha INCORRETOS',()=>{
     //acesso a página de login
    cy.visit('/login')
    cy.get('[data-qa="login-email"]').type('teste1791658538930@teste.com')
    cy.get('[data-qa="login-password"]').type('123456')//senha incorreta
    cy.get('[data-qa="login-button"]').click()

    cy.get('form[action*="login"] > p')
        .should('exist')
        .should('be.visible')
        .should('contain', 'Your email or password is incorrect!')
        .and('contain.text', 'Your email or password is incorrect!')


  });
  it('Efetuar Logout',()=>{

     //acesso a página de login
    cy.visit('/login')
    cy.get('[data-qa="login-email"]').type('teste1791658538930@teste.com')
    cy.get('[data-qa="login-password"]').type('12345')
    cy.get('[data-qa="login-button"]').click()

    
     //assert do login
    cy.get('a[href*="logout"]')
        .should('be.visible')
        .click()

    cy.get('.login-form > h2').should('be.visible')
    cy.get('a[href*="logout"]').should('not.exist')
    cy.get('[action*="login"]').should('be.visible')
    cy.url().should('include','login')

  });
  it('Tentar cadastrar usuário com e-mail já cadastrado',()=>{

   cy.visit('/')
    cy.get('a[href*=login]').click() //mapear elemento
    
    const timestamp = new Date().getTime()

    cy.get('[data-qa="signup-name"]').type('Teste 002')
    cy.get('[data-qa="signup-email"]').type(`teste1791658538930@teste.com`)

    cy.get('[data-qa="signup-button"]').click()

    cy.get('form[action*=signup] p')
        .should('exist')
        .should('be.visible')
        .should('contain', 'Email Address already exist!')
        .and('contain.text', 'Email Address already exist!')

  });


});