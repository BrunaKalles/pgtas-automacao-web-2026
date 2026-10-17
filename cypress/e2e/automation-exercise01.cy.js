/// <reference types="cypress" />

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

  it('Test Case 1: Cadastrar usuário', () => {
    cy.visit('https://automationexercise.com')
    cy.get('header').should('be.visible')

    //clicando no botão: 'Signup / Login' 
    cy.get('a[href*=login]').click() //mapear elemento

    //verificando se o label New User Signup! está visivel na tela
    cy.contains('New User Signup!').should('be.visible')
    
    
    //inserindo nome e e-mail
    cy.get('[data-qa="signup-name"]').should('be.visible').and('not.be.disabled').type(nome)
    cy.get('[data-qa="signup-email"]').should('be.visible').and('not.be.disabled').type(email)

    //clicando no botão: Signup
    cy.get('[data-qa="signup-button"]').click()

    //verificando se 'Enter Account Information' está visivel
    cy.contains('Enter Account Information').should('be.visible')


    //selecionando o Title
    //radio button -> check
    cy.get('#id_gender2').check()

    //inseridno nome
    //cy.get('[data-qa="name"]').type(`Nome${timestamp}`)

    //inserindo e-mail
    //cy.get('[data-qa="email"]').type(`novoemial${timestamp}@teste.com`)

    //inserindo a senha
    cy.get('[data-qa="password"]').type('12345')


    //inserindo data de nascimento
        //select e comboboxes -> select
    cy.get('[data-qa="days"]').select('12')
    cy.get('[data-qa="months"]').select('September')
    cy.get('[data-qa="years"]').select('1992')
    
    //selecionando a caixa newsletter e receber ofertas
    //checkboxes -> click
    cy.get('#newsletter').click()
    cy.get('#optin').click()

    //inserindo Nome, Sobrenome, Empresa, Endereço, Endereço 2, País, Estado, Cidade, CEP, Número de celular
    cy.get('[data-qa="first_name"]').type(`Testes${timestamp}`)
    cy.get('[data-qa="last_name"]').type('Santos')
    cy.get('[data-qa="company"]').type('teste sa')
    cy.get('[data-qa="address"]').type('endereço do teste 01')
    cy.get('[data-qa="address2"]').type('endereço do teste 02')
    cy.get('[data-qa="country"]').select('United States')
    cy.get('[data-qa="state"]').type('santa catarina')
    cy.get('[data-qa="city"]').type('Chapecó')
    cy.get('[data-qa="zipcode"]').type('89809700')
    cy.get('[data-qa="mobile_number"]').type('988585859')

    //clicando em criar conta
    cy.get('[data-qa="create-account"]').click()

    //verifiando se a conta foi criada
    cy.contains('Account Created!').should('be.visible')

    //clicando no botão continuar
    cy.get('[data-qa="continue-button"]').click()

    // verificando se esta sendo exibido: Logged in as nome_usuario' esta visivel
    cy.contains(`Logged in as ${nome}`).should('be.visible')

    //clicando no botão Delete Accoun
    cy.get('.shop-menu > .nav > :nth-child(5) > a').click()

    //verificando se 'ACCOUNT DELETED!' está sendo exibido
    cy.contains('Account Deleted!').should('be.visible')
    
  });

  it('Test Case 2: Login do usuário com e-mail e senha corretos', () => {
    cy.visit('https://automationexercise.com')
    cy.get('header').should('be.visible')

    //clicando no botão: 'Signup / Login' 
    cy.get('a[href*=login]').click() //mapear elemento

    //inserindo nome e e-mail
    cy.get('[data-qa="signup-name"]').should('be.visible').and('not.be.disabled').type(nome)
    cy.get('[data-qa="signup-email"]').should('be.visible').and('not.be.disabled').type(email)

    //clicando no botão: Signup
    cy.get('[data-qa="signup-button"]').click()

    //verificando se 'Enter Account Information' está visivel
    cy.contains('Enter Account Information').should('be.visible')

    //selecionando o Title
    //radio button -> check
    cy.get('#id_gender2').check()

    //inseridno nome
    //cy.get('[data-qa="name"]').type(`Nome${timestamp}`)

    //inserindo e-mail
    //cy.get('[data-qa="email"]').type(`novoemial${timestamp}@teste.com`)

    //inserindo a senha
    cy.get('[data-qa="password"]').type('12345')


    //inserindo data de nascimento
    //select e comboboxes -> select
    cy.get('[data-qa="days"]').select('12')
    cy.get('[data-qa="months"]').select('September')
    cy.get('[data-qa="years"]').select('1992')
    
    //selecionando a caixa newsletter e receber ofertas
    //checkboxes -> click
    cy.get('#newsletter').click()
    cy.get('#optin').click()

    //inserindo Nome, Sobrenome, Empresa, Endereço, Endereço 2, País, Estado, Cidade, CEP, Número de celular
    cy.get('[data-qa="first_name"]').type(`Testes${timestamp}`)
    cy.get('[data-qa="last_name"]').type('Santos')
    cy.get('[data-qa="company"]').type('teste sa')
    cy.get('[data-qa="address"]').type('endereço do teste 01')
    cy.get('[data-qa="address2"]').type('endereço do teste 02')
    cy.get('[data-qa="country"]').select('United States')
    cy.get('[data-qa="state"]').type('santa catarina')
    cy.get('[data-qa="city"]').type('Chapecó')
    cy.get('[data-qa="zipcode"]').type('89809700')
    cy.get('[data-qa="mobile_number"]').type('988585859')

    //clicando em criar conta
    cy.get('[data-qa="create-account"]').click()

    //verifiando se a conta foi criada
    cy.contains('Account Created!').should('be.visible')

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

    //inserindo e-mail e senha incorretos
    cy.get('[data-qa="login-email"]')
      .should('be.visible')
      .and('not.be.disabled')
      .type('teste@teste1.com.br')

    cy.get('[data-qa="login-password"]').should('be.visible').and('not.be.disabled').type('123456')

    //clicando no botão login
    cy.get('[data-qa="login-button"]').click()

    // Verifique se a mensagem de erro 'Your email or password is incorrect!' is visible está visível.
    cy.get('form[action*="login"] > p')
      .should('be.visible')
      .and('contain','Your email or password is incorrect!')

  });
  it('Test Case 4: Fazer logout do usuário', () => {
   cy.visit('https://automationexercise.com')
    cy.get('header').should('be.visible')

    //clicando no botão: 'Signup / Login' 
    cy.get('a[href*=login]').click() //mapear elemento

    //inserindo nome e e-mail
    cy.get('[data-qa="signup-name"]').type(nome)
    cy.get('[data-qa="signup-email"]').type(email)

    //clicando no botão: Signup
    cy.get('[data-qa="signup-button"]').click()

    //verificando se 'Enter Account Information' está visivel
    cy.contains('Enter Account Information').should('be.visible')

    //selecionando o Title
    //radio button -> check
    cy.get('#id_gender2').check()

    //inserindo a senha
    cy.get('[data-qa="password"]').type('12345')


    //inserindo data de nascimento
    //select e comboboxes -> select
    cy.get('[data-qa="days"]').select('12')
    cy.get('[data-qa="months"]').select('September')
    cy.get('[data-qa="years"]').select('1992')
    
    //selecionando a caixa newsletter e receber ofertas
    //checkboxes -> click
    cy.get('#newsletter').click()
    cy.get('#optin').click()

    //inserindo Nome, Sobrenome, Empresa, Endereço, Endereço 2, País, Estado, Cidade, CEP, Número de celular
    cy.get('[data-qa="first_name"]').type(`Testes${timestamp}`)
    cy.get('[data-qa="last_name"]').type('Santos')
    cy.get('[data-qa="company"]').type('teste sa')
    cy.get('[data-qa="address"]').type('endereço do teste 01')
    cy.get('[data-qa="address2"]').type('endereço do teste 02')
    cy.get('[data-qa="country"]').select('United States')
    cy.get('[data-qa="state"]').type('santa catarina')
    cy.get('[data-qa="city"]').type('Chapecó')
    cy.get('[data-qa="zipcode"]').type('89809700')
    cy.get('[data-qa="mobile_number"]').type('988585859')

    //clicando em criar conta
    cy.get('[data-qa="create-account"]').click()

    //verifiando se a conta foi criada
    cy.contains('Account Created!').should('be.visible')

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
  it('Test Case 5: Cadastrar usuário com e-mail existente', () => {
    cy.visit('https://automationexercise.com')
    cy.get('header').should('be.visible')

    //clicando no botão: 'Signup / Login' 
    cy.get('a[href*=login]').click() //mapear elemento

    //verificando se 'new user signup' está visivel
    cy.contains('New User Signup').should('be.visible')

     //inserindo nome e e-mail já cadastrado,
    cy.get('[data-qa="signup-name"]')
      .should('be.visible')
     // .should('not.be.enabled')
      .type('Teste 1791035761675')

    cy.get('[data-qa="signup-email"]').should('be.visible').type('teste1791035761675@teste.com')


    //clicando no botão: Signup
    cy.get('[data-qa="signup-button"]').click()

    //verificar e exibiu a mensagem: Email Address already exist!
    cy.contains('Email Address already exist!')
      .should('be.visible')

    /*cy.get('form[action*="login"] > p')
      .should('be.visible')
      .and('contain','Email Address already exist!')*/

  });

});