
/// <reference types="cypress" />

describe('Automation Exercise with xpath', () => {

  it('Cadastrar novo usuário com sucesso', () => {

    cy.visit('https://automationexercise.com')

    // CSS: a[href*=login]
    // contains() permite localizar um atributo que contém determinado texto.
    //cy.xpath('//a[contains(@href, "login")]').click()
    cy.xpath('//a[@href="/login"]').click()

    const timestamp = new Date().getTime()

    // CSS: [data-qa="signup-name"]
    // @ representa um atributo no XPath.
    //cy.xpath('//*[@data-qa="signup-name"]').type('Teste 002')
    cy.xpath('//input[@data-qa="signup-name"]')
      .type('Teste 002')

    //cy.xpath('//*[@data-qa="signup-email"]'/
    cy.xpath('//input[@data-qa="signup-email"]')
      .type(`teste${timestamp}@teste.com`)

   // cy.xpath('//*[@data-qa="signup-button"]').click()
    cy.xpath('//button[@data-qa="signup-button"]').click()
   

    // Radio button
    // CSS: #id_gender2
    //cy.xpath('//*[@id="id_gender2"]').check()
    cy.xpath('//input[@id="id_gender2"]')
      .check()
      .should('be.checked')

    //cy.xpath('//*[@data-qa="password"]').type('12345')
    cy.xpath('//input[@data-qa="password"]').type('12345')

  
    cy.xpath('//select[@data-qa="days"]').select('1')

    cy.xpath('//select[@data-qa="months"]').select('September')

    cy.xpath('//select[@data-qa="years"]').select('2000')

    // Checkboxes
    cy.xpath('//*[@id="newsletter"]').click()

    cy.xpath('//*[@id="optin"]').click()

    //cy.xpath('//*[@data-qa="first_name"]').type('Testes')
    cy.xpath('//input[@data-qa="first_name"]').type('Testes')

    //cy.xpath('//*[@data-qa="last_name"]').type('Santos')
    cy.xpath('//input[@data-qa="last_name"]').type('Santos')

    cy.xpath('//input[@data-qa="company"]').type('teste sa')

    cy.xpath('//input[@data-qa="address"]').type('endereço do teste')

    cy.xpath('//select[@data-qa="country"]').select('United States')

    cy.xpath('//input[@data-qa="state"]').type('santa catarina')

    cy.xpath('//input[@data-qa="city"]').type('Chapecó')

    cy.xpath('//input[@data-qa="zipcode"]').type('89809700')

    cy.xpath('//input[@data-qa="mobile_number"]').type('988585859')

    cy.xpath('//*[@data-qa="create-account"]').click()

    // Asserção: localizar o elemento pelo data-qa e validar seu conteúdo.
    cy.xpath('//*[@data-qa="account-created"]')
      .should('be.visible')
      .and('contain', 'Account Created!')

  })


  it('Efetuar Login de Usuário com e-mail e senha corretos', () => {

    /**
     * Ter uma conta para efetuar o Login.
     * teste1791658538930@teste.com | 12345
     */

    // Acesso direto à página de login.
    cy.visit('https://automationexercise.com/login')

    cy.xpath('//input[@data-qa="login-email"]')
      .type('teste1791658538930@teste.com')

    cy.xpath('//input[@data-qa="login-password"]').type('12345')

    cy.xpath('//button[@data-qa="login-button"]').click()

    // CSS original: a > b
    // XPath equivalente: //a/b
    // Mantém a relação de filho direto entre <a> e <b>.
    cy.xpath('//a/b').should('contain', 'Teste 002')

    // Conversão de cy.contains() para XPath por texto
   // cy.xpath('//*[contains(normalize-space(.), "Logged in as Teste 002")]')
   //   .should('be.visible')

  
    cy.xpath('//a[contains(normalize-space(.), "Logged in as")]/b')
      .should('be.visible')
      .and('have.text', 'Teste 002')

  })


  it('Efetuar Login de Usuário com e-mail e senha INCORRETOS', () => {

    // Acesso à página de login.
    cy.visit('https://automationexercise.com/login')

    cy.xpath('//input[@data-qa="login-email"]')
      .type('teste1791658538930@teste.com')

    cy.xpath('//input[@data-qa="login-password"]').type('123456')

    cy.xpath('//button[@data-qa="login-button"]').click()

    // CSS original: form[action*="login"] > p
    // XPath: //form[contains(@action, "login")]/p
    // A barra simples indica que <p> é filho direto do formulário.
    cy.xpath('//form[contains(@action, "login")]/p')
      .should('exist')
      .should('be.visible')
      .should('contain', 'Your email or password is incorrect!')
      .and('contain.text', 'Your email or password is incorrect!')

  })


  it('Efetuar Logout', () => {

    // Acesso à página de login.
    cy.visit('https://automationexercise.com/login')

    cy.xpath('//input[@data-qa="login-email"]')
      .type('teste1791658538930@teste.com')

    cy.xpath('//input[@data-qa="login-password"]').type('12345')

    cy.xpath('//button[@data-qa="login-button"]').click()

    // CSS: a[href*="logout"]
    cy.xpath('//a[contains(@href, "logout")]')
      .should('be.visible')
      .click()

    // CSS: .login-form > h2
    // XPath: //*[@class="login-form"]/h2
    // Mantém a relação de filho direto entre o contêiner e o título.
    cy.xpath('//*[contains(concat(" ", normalize-space(@class), " "), " login-form ")]/h2')
      .should('be.visible')

    cy.xpath('//a[contains(@href, "logout")]')
      .should('not.exist')

    // CSS: [action*="login"]
    cy.xpath('//*[contains(@action, "login")]')
      .should('be.visible')

    cy.url().should('include', 'login')

  })


  it('Tentar cadastrar usuário com e-mail já cadastrado', () => {

    cy.visit('https://automationexercise.com')

    // Link de login localizado pelo atributo href.
    cy.xpath('//a[@href="/login"]').click()


    cy.xpath('//input[@data-qa="signup-name"]').type('Teste 002')

    cy.xpath('//input[@data-qa="signup-email"]')
      .type('teste1791658538930@teste.com')

    cy.xpath('//button[@data-qa="signup-button"]').click()

    // CSS: form[action*=signup] p
    // XPath: //form[contains(@action, "signup")]//p
    // O //p procura um descendente <p>, não apenas um filho direto.
    cy.xpath('//form[contains(@action, "signup")]//p')
      .should('exist')
      .should('be.visible')
      .should('contain', 'Email Address already exist!')
      .and('contain.text', 'Email Address already exist!')

  })

})
