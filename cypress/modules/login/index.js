
function preencherLogin(email, senha){
  //email:'teste1791658538930@teste.com' | senha 12345
  cy.get('[data-qa="login-email"]').type(email)
  cy.get('[data-qa="login-password"]').type(senha)
  cy.get('[data-qa="login-button"]').click()
}

function verificarSeLoginFoiEfetuadoComsucesso(){

     /** verificarSeLoginFoiEfetuadoComsucesso()*/
   // cy.get('a > b').should('contain', 'Teste 002')
    cy.contains('Logged in as Teste 002').should('be.visible')
    cy.contains('a', ' Logged in as')
        .should('be.visible')
        .find('b').should('be.visible')
        .and('have.text', 'Teste 002')
}

function verificarSeMensagemDeErroFoiExibidaNoLogin(){
  cy.get('form[action*="login"] > p')
    .should('exist')
    .should('be.visible')
    .should('contain', 'Your email or password is incorrect!')
    .and('contain.text', 'Your email or password is incorrect!')
}
  
function efetuarLogout(){
cy.get('a[href*="logout"]')
  .should('be.visible')
  .click()

}


function verificarSeOUsuarioFoiDeslogado(){
  cy.get('.login-form > h2').should('be.visible')
  cy.get('a[href*="logout"]').should('not.exist')
  cy.get('[action*="login"]').should('be.visible')
  cy.url().should('include','login')

}




module.exports = {
  preencherLogin,
  verificarSeLoginFoiEfetuadoComsucesso,
  verificarSeMensagemDeErroFoiExibidaNoLogin,
  efetuarLogout,
  verificarSeOUsuarioFoiDeslogado,



}