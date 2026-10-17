# Diretrizes de Modularização e Arquitetura dos Testes Cypress

## 1. Contexto

Este projeto utiliza Cypress para automação de testes E2E.

Os testes devem ser modularizados de forma a separar claramente:

- Cenários e comportamento dos testes (`spec`);
- Ações de negócio da aplicação (`modules`);
- Seletores dos elementos;
- Dados utilizados nos cenários.

O objetivo é reduzir duplicação, facilitar manutenção e tornar as specs mais legíveis e orientadas ao comportamento do usuário.

---

## 2. Arquitetura adotada

A arquitetura esperada é baseada em módulos de Ações de Negócio.

Não utilizar a nomenclatura:

- `Pages`;
- `Page Objects`;
- `PageObject`;
- `*Page.js`;
- classes representando páginas.

Em vez disso, utilizar módulos que representem contextos, funcionalidades ou ações de negócio.

### Estrutura

Os módulos dedicados devem ser armazenados na pasta:

```text
modules/
```

Preferencialmente organizados por funcionalidade:

```text
modules/
├── usuario/
│   ├── login.js
│   ├── cadastro.js
│   └── logout.js
├── produto/
│   └── consulta.js
└── pedido/
    └── checkout.js
```

A nomenclatura e organização devem representar o contexto funcional, e não a estrutura visual da aplicação.

---

## 3. Módulos

Os módulos devem utilizar funções e `module.exports`, evitando classes.

Exemplo:

```javascript
const seletores = {
  email: '[data-qa="login-email"]',
  senha: '[data-qa="login-password"]',
  botaoEntrar: '[data-qa="login-button"]',
  usuarioAutenticado: '.navbar-nav li'
}

function acessarLogin() {
  cy.visit('/login')
}

function efetuarLogin(email, senha) {
  cy.get(seletores.email).type(email)
  cy.get(seletores.senha).type(senha)
  cy.get(seletores.botaoEntrar).click()
}

function validarLoginRealizado(nome) {
  cy.get(seletores.usuarioAutenticado)
    .contains(nome)
    .should('be.visible')
}

module.exports = {
  acessarLogin,
  efetuarLogin,
  validarLoginRealizado
}
```

---

## 4. Seletores

Os seletores devem ficar fora da spec e próximos das funções de Ação de Negócio que os utilizam.

O agrupamento de seletores deve utilizar obrigatoriamente o nome:

```javascript
const seletores = {
  ...
}
```

Exemplo:

```javascript
const seletores = {
  email: '[data-qa="login-email"]',
  senha: '[data-qa="login-password"]',
  botaoEntrar: '[data-qa="login-button"]'
}
```

Evitar nomes como:

```javascript
const elementos = {}
const selectors = {}
const locators = {}
```

Preferencialmente, os seletores devem permanecer no próprio módulo quando estiverem diretamente relacionados às ações daquele módulo.

A spec não deve precisar conhecer detalhes como:

```javascript
cy.get('[data-qa="login-email"]')
cy.get('[data-qa="login-password"]')
cy.get('[data-qa="login-button"]')
```

Não espalhar seletores diretamente pelas specs quando eles puderem ser encapsulados no módulo de Ações de Negócio.

---

## 5. Nomenclatura das funções

As funções utilizadas diretamente pelas specs devem utilizar Português do Brasil e representar ações ou comportamentos de negócio.

### Preferir

```javascript
efetuarLogin()
cadastrarUsuario()
validarUsuarioAutenticado()
efetuarLogout()
preencherDadosDoUsuario()
validarMensagemDeErro()
```

### Evitar

```javascript
login()
createUser()
clickLogin()
fillEmail()
assertUser()
```

A função deve representar o que o usuário ou o negócio está fazendo, e não apenas a operação técnica realizada pelo Cypress.

---

## 6. Granularidade das funções

Não é necessário criar uma função para cada interação com um elemento da página.

As funções podem agrupar várias interações relacionadas, desde que representem uma ação coerente.

### Preferir

```javascript
function efetuarLogin(email, senha) {
  cy.get(seletores.email).type(email)
  cy.get(seletores.senha).type(senha)
  cy.get(seletores.botaoEntrar).click()
}
```

Em vez de:

```javascript
function preencherEmail(email) {
  cy.get(seletores.email).type(email)
}

function preencherSenha(senha) {
  cy.get(seletores.senha).type(senha)
}

function clicarBotaoEntrar() {
  cy.get(seletores.botaoEntrar).click()
}
```

A granularidade deve considerar:

- significado de negócio;
- coesão das operações;
- possibilidade de reutilização;
- legibilidade;
- manutenção;
- redução de duplicação.

Operações menores podem existir internamente quando forem necessárias para organizar a implementação, mas a interface utilizada pela spec deve priorizar ações de negócio.

Também deve ser evitada a criação de abstrações excessivas para operações que não possuem reutilização ou valor de negócio.

---

## 7. Asserções

As asserções devem ser colocadas nos módulos dedicados, relacionadas ao comportamento que está sendo encapsulado.

A spec deve chamar uma função que represente a validação de negócio.

### Preferir

```javascript
login.efetuarLogin(usuario.email, usuario.senha)
login.validarLoginRealizado(usuario.nome)
```

Com:

```javascript
function validarLoginRealizado(nome) {
  cy.get(seletores.usuarioAutenticado)
    .contains(nome)
    .should('be.visible')
}
```

### Evitar

```javascript
login.efetuarLogin(usuario.email, usuario.senha)

cy.get('.navbar-nav li')
  .contains(usuario.nome)
  .should('be.visible')
```

A spec não deve conhecer os detalhes de implementação necessários para realizar a asserção.

---

## 8. Responsabilidade da Spec

A spec deve descrever o cenário de forma clara e próxima da linguagem utilizada nos requisitos.

Exemplo:

```javascript
const login = require('../../modules/usuario/login')

describe('Login de usuário', () => {

  it('Efetuar Login de Usuário com email e senha corretos', () => {
    login.acessarLogin()
    login.efetuarLogin(usuario.email, usuario.senha)
    login.validarLoginRealizado(usuario.nome)
  })

})
```

A spec deve ser responsável principalmente por:

- estruturar o cenário;
- fornecer os dados necessários;
- chamar as ações de negócio na ordem necessária;
- representar o comportamento que está sendo validado.

A spec não deve conter detalhes de implementação da interface quando esses detalhes puderem ser encapsulados nos módulos.

---

## 9. Promises e aninhamento de código

O código das specs deve priorizar legibilidade e manutenção.

Sempre que possível, deve-se evitar aninhamentos desnecessários utilizados para resolver Promises ou encadear resultados.

### Evitar

Estruturas excessivamente aninhadas que dificultem a leitura do cenário:

```javascript
algumaAcao().then((resultado) => {
  outraAcao(resultado).then((outroResultado) => {
    outraValidacao(outroResultado).then(() => {
      // ...
    })
  })
})
```

Quando possível, a implementação deve ser simplificada para que o fluxo do teste permaneça claro e próximo do comportamento de negócio.

Por exemplo, preferir encapsular a complexidade dentro do módulo:

```javascript
const usuario = usuarioModule.criarUsuario()

usuarioModule.validarUsuarioCriado(usuario)
```

em vez de transferir toda a complexidade de resolução de Promises para a spec.

### Regra

A complexidade necessária para executar uma ação deve, sempre que possível, ser encapsulada no módulo, mantendo a spec simples e orientada ao comportamento.

Isso não significa eliminar o uso de `.then()` quando ele for realmente necessário. O objetivo é evitar que detalhes de controle assíncrono prejudiquem a compreensão do cenário.

---

## 10. Dados de teste

Os dados de teste devem ser mantidos separados da implementação das Ações de Negócio sempre que fizer sentido.

Podem ser utilizados fixtures ou outra estrutura apropriada para dados reutilizáveis.

Exemplo:

```text
fixtures/
└── usuarios.json
```

```json
{
  "usuarioValido": {
    "nome": "PGATS Aut",
    "email": "teste@mail.com",
    "senha": "12345"
  }
}
```

A ação deve receber os dados necessários como parâmetros.

### Preferir

```javascript
function efetuarLogin(email, senha) {
  // implementação
}
```

### Evitar

```javascript
function efetuarLogin() {
  const email = 'teste@mail.com'
  const senha = '12345'

  // implementação
}
```

---

## 11. Princípios gerais

Ao refatorar os testes existentes:

1. Preservar o comportamento dos cenários originais.
2. Reduzir duplicação de código.
3. Remover detalhes de implementação das specs.
4. Encapsular seletores nos módulos.
5. Utilizar `seletores` como nome do agrupamento de seletores.
6. Criar funções reutilizáveis para comportamentos recorrentes.
7. Utilizar nomes de funções em Português do Brasil.
8. Priorizar nomes orientados ao negócio em vez de nomes técnicos.
9. Utilizar módulos com funções e `module.exports`.
10. Evitar classes para representar ações ou páginas.
11. Não utilizar a nomenclatura `Page`, `Pages` ou `Page Object`.
12. Manter os dados de teste separados das ações quando houver reutilização.
13. Evitar criar abstrações excessivas.
14. Não criar obrigatoriamente uma função para cada elemento da interface.
15. Permitir que uma função agrupe interações relacionadas.
16. Manter as asserções nos módulos dedicados.
17. Evitar aninhamento desnecessário de Promises nas specs.
18. Priorizar legibilidade e manutenibilidade do fluxo do teste.
19. Encapsular complexidade técnica nos módulos sempre que possível.

---

## 12. Regra principal

A arquitetura deve buscar esta separação:

```text
SPEC
  ↓
Cenário de negócio
  ↓
Módulos
  ↓
Ações de Negócio
  ↓
Seletores + interação + asserções
  ↓
Aplicação
```

Os dados ficam separados:

```text
DADOS
  ↓
SPEC
  ↓
MÓDULOS
  ↓
APLICAÇÃO
```

Em termos práticos:

| Responsabilidade | Definição |
|---|---|
| Spec | Diz O QUE está sendo testado |
| Módulo | Define COMO realizar a ação de negócio |
| Seletores | Definem ONDE interagir com a aplicação |
| Dados | Definem COM QUAIS informações executar o cenário |
| Asserções | Validam o comportamento dentro dos módulos |
| Promises/fluxos assíncronos | Devem ser encapsulados ou simplificados quando possível para preservar a legibilidade da spec |

---

## 13. Resultado esperado

Uma pessoa deve conseguir ler uma spec como:

```javascript
login.acessarLogin()
login.efetuarLogin(usuario.email, usuario.senha)
login.validarLoginRealizado(usuario.nome)
```

e entender o comportamento que está sendo validado sem precisar conhecer:

- seletores CSS;
- `data-qa`;
- estrutura HTML;
- comandos específicos do Cypress;
- detalhes de implementação;
- resolução de Promises;
- detalhes internos da aplicação.

A arquitetura deve priorizar testes legíveis, manuteníveis, reutilizáveis e orientados ao comportamento do usuário e às regras de negócio.
