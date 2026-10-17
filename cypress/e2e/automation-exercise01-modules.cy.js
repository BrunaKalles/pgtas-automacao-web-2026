/// <reference types="cypress" />

const cadastro = require('../modules/cadastro/index')

describe('Automation Exercise 01', () => {
    let timestamp
    let email
    let nome
    beforeEach(() => {
        //criando uma variavel para poder sempre gerar novos e-mails.
        timestamp = new Date().getTime()
        email = `teste${timestamp}@teste.com`
        nome = `Teste ${Date.now()}`
    })

  it.only('Test Case 1: Cadastrar usuário - módulo', () => {
    cy.visit('https://automationexercise.com')
    cy.get('header').should('be.visible')

    //clicando no botão: 'Signup / Login' 
    cy.get('a[href*=login]').click() //mapear elemento

    //verificando se o label New User Signup! está visivel na tela
    cy.contains('New User Signup!').should('be.visible')
    
    //iniciar cadastro

    cadastro.iniciarCadastro(`Teste`,`teste${timestamp}@teste.com` )
    //verificando se 'Enter Account Information' está visivel
    cy.contains('Enter Account Information').should('be.visible')

    
    cadastro.preencherCadastro()

    cadastro.verificarSeCadastrofoiEfetuadoComSucesso()


    //clicando no botão continuar
    cy.get('[data-qa="continue-button"]').click()

    // verificando se esta sendo exibido: Logged in as nome_usuario' esta visivel
    cy.contains(`Logged in as`).should('be.visible')

    //clicando no botão Delete Accoun
   // cy.get('.shop-menu > .nav > :nth-child(5) > a').click()

    //verificando se 'ACCOUNT DELETED!' está sendo exibido
    //cy.contains('Account Deleted!').should('be.visible')
    
  });

  it('Test Case 2: Login do usuário com e-mail e senha corretos', () => {
    cy.visit('https://automationexercise.com')
    cy.get('header').should('be.visible')

    //clicando no botão: 'Signup / Login' 
    cy.get('a[href*=login]').click() //mapear elemento


    cadastro.iniciarCadastro(`Teste`,`teste${timestamp}@teste.com` )
    //verificando se 'Enter Account Information' está visivel
    cy.contains('Enter Account Information').should('be.visible')

    
    cadastro.preencherCadastro()

    cadastro.verificarSeCadastrofoiEfetuadoComSucesso()


    //clicando no botão continuar
    cy.get('[data-qa="continue-button"]').click()

    // verificando se esta sendo exibido: Logged in as nome_usuario' esta visivel
    cy.contains(`Logged in as`).should('be.visible')

    //clicando no botão continuar
    cy.get('[data-qa="continue-button"]').click()

    // verificando se esta sendo exibido: Logged in as nome_usuario' esta visivel
    cy.contains(`Logged in as ${nome}`).should('be.visible')

    logout()    

    //inserindo e-mail e senha corretos
    cy.get('[data-qa="login-email"]')
      .should('be.visible')
      .and('not.be.disabled')
      .type(email)

    cy.get('[data-qa="login-password"]').should('be.visible').and('not.be.disabled').type('12345')

    //clicando no botão login
    cy.get('[data-qa="login-button"]').click()

    // verificando se esta sendo exibido: Logged in as Teste 001 ' esta visivel
    cy.contains(`Logged in as ${nome}`).should('be.visible')

    //clicando no botão Delete Accoun
    cy.get('a').contains('Delete Account').click() //mudei para essa opção para deixar mais claro, pois no comando abaixo não é uma boa prática.
   // cy.get('.shop-menu > .nav > :nth-child(5) > a').click()

    //verificando se 'ACCOUNT DELETED!' está sendo exibido
    cy.contains('Account Deleted!').should('be.visible')

  });

  it('Test Case 3: Login do usuário com e-mail e senha incorretos', () => {
    cy.visit('https://automationexercise.com')
    cy.get('header').should('be.visible')

    //clicando no botão: 'Signup / Login' 
    cy.get('a[href*=login]').click() //mapear elemento

    //verificando se o label Login to your account! está visivel na tela
    cy.contains('Login to your account').should('be.visible')

    login('teste@teste1.com.br', '1234578')
  
    //senhaOuEmailIncorreto()
    // Verifique se a mensagem de erro 'Your email or password is incorrect!' is visible está visível.
    sennhaOuEmailIncorreto()
  });
  it('Test Case 4: Fazer logout do usuário', () => {
   cy.visit('https://automationexercise.com')
    cy.get('header').should('be.visible')

    //clicando no botão: 'Signup / Login' 
    cy.get('a[href*=login]').click() //mapear elemento

    cadastro.iniciarCadastro(nome, email)

    cadastro.preencherCadastro()

   cadastro.verificarSeCadastrofoiEfetuadoComSucesso()

    //clicando no botão continuar
    cy.get('[data-qa="continue-button"]').click()

    // verificando se esta sendo exibido: Logged in as nome_usuario' esta visivel
    cy.contains(`Logged in as ${nome}`).should('be.visible')

    //verifique se a opção de logout esta visivel
    cy.contains('Logout').should('be.visible')

    //deslogando
    cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
    cy.location('pathname').should('eq', '/login')

    //verificando se o label Login to your account! está visivel na tela
    cy.contains('Login to your account').should('be.visible')

    //inserindo e-mail e senha corretos
    cy.get('[data-qa="login-email"]')
      .should('be.visible')
      .and('be.enabled')
      .type(email)

    cy.get('[data-qa="login-password"]').type('12345')

    //clicando no botão login
    cy.get('[data-qa="login-button"]').click()

    // verificando se esta sendo exibido: Logged in as Teste 001 ' esta visivel
    cy.contains(`Logged in as ${nome}`).should('be.visible')

    //clicar no botão 'Logout'
    cy.get('a').contains('Logout').click() //mudei para essa opção para deixar mais claro, pois no comando abaixo não é uma boa prática.
    //cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
    
    //verificar se o usuário foi redirecionado para a página de login.
    cy.location('pathname').should('eq', '/login')
    cy.contains('Login to your account').should('be.visible')
      
  });
  it.only('Test Case 5: Cadastrar usuário com e-mail existente', () => {
   cy.visit('https://automationexercise.com')
    cy.get('header').should('be.visible')

    //clicando no botão: 'Signup / Login' 
    cy.get('a[href*=login]').click() //mapear elemento

    //verificando se 'new user signup' está visivel
    //cy.contains('New User Signup').should('be.visible')

    cadastro.iniciarCadastro('Teste 1791035761675','teste1791035761675@teste.com')

    cadastro.verificarSeMensagemErroEExibida()

    /*cy.get('form[action*="login"] > p')
      .should('be.visible')
      .and('contain','Email Address already exist!')*/

  });

});



function logout(){
  
    //verifique se a opção de logout esta visivel
    cy.contains('Logout').should('be.visible')

    //deslogando
    cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
    cy.location('pathname').should('eq', '/login')

    //verificando se o label Login to your account! está visivel na tela
    cy.contains('Login to your account').should('be.visible')
}

function login(email,senha){
   //inserindo e-mail e senha incorretos
    cy.get('[data-qa="login-email"]')
      .should('be.visible')
      .and('not.be.disabled')
      .type(email)

    cy.get('[data-qa="login-password"]').should('be.visible').and('not.be.disabled').type(senha)

    //clicando no botão login
    cy.get('[data-qa="login-button"]').click()  

}

function sennhaOuEmailIncorreto(){
  cy.get('form[action*="login"] > p')
      .should('be.visible')
      .and('contain','Your email or password is incorrect!')
}
