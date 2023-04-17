// NOTE: THIS REQUIRES A CLEAN DATABASE (at least for the created test user Banks and email Test2@mail.com)

// ** INTEGRATION TEST FOR HAPPY PATH 2 ** //
describe('Registers successfully', () => {
  it('should navigate to welcome page successfully', () => {
    cy.visit('localhost:3000/')
    cy.url().should('include', 'localhost:3000')
  })

  it('should register successfully after filling in form', () => {
    cy.visit('localhost:3000/')
    cy.get('button[name="login-register-button"]')
      .click()
    cy.get('button[name="switch-to-register"]')
      .click()
    cy.get('input[name="name"]')
      .focus()
      .type('Banks')
    cy.get('input[name="email"]')
      .focus()
      .type('test2@mail.com')
    cy.get('input[name="password"]')
      .focus()
      .type('123')
    cy.get('input[name="confirm"]')
      .focus()
      .type('123')
    cy.get('button[name="register-button"]')
      .click()
    cy.url().should('include', 'localhost:3000/')
  })
})

describe('Creates a new game successfully', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/')
    cy.get('button[name="login-register-button"]')
      .click()
    cy.get('input[name="email"]')
      .focus()
      .type('test2@mail.com')
    cy.get('input[name="password"]')
      .focus()
      .type('123')
    cy.get('button[name="login-button"]')
      .click()
  })

  it('Create new game with name test game', () => {
    cy.get('input[name="new-game-input"]')
      .focus()
      .type('test game')
    cy.get('button[name="create-game"]')
      .click()
  })
})

describe('Edit Game', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/')
    cy.get('button[name="login-register-button"]')
      .click()
    cy.get('input[name="email"]')
      .focus()
      .type('test2@mail.com')
    cy.get('input[name="password"]')
      .focus()
      .type('123')
    cy.get('button[name="login-button"]')
      .click()
  })

  it('Edit game details', () => {
    cy.get('button[name="edit-game"]')
      .click()
    cy.url().should('include', 'localhost:3000/editgame')
    cy.get('input[name="name"]')
      .focus()
      .type('new name')
    cy.get('input[type=file]').selectFile('cypress/fixtures/test_image.jpg', { force: true })
    cy.get('button[name="add-question"]')
      .click()
    cy.get('input[name="add-question-field"]')
      .focus()
      .type('new question')
    cy.get('button[name="save-question-field"]')
      .click()
    cy.get('button[name="save-game"]')
      .click()
  })
})

describe('Loggin out and log back in', () => {
  before(() => {
    cy.visit('localhost:3000/')
    cy.get('button[name="login-register-button"]')
      .click()
    cy.url().should('include', 'localhost:3000/login')
    cy.get('input[name="email"]')
      .focus()
      .type('test2@mail.com')
    cy.get('input[name="password"]')
      .focus()
      .type('123')
    cy.get('button[name="login-button"]')
      .click()
  })
  after(() => {
    cy.visit('localhost:3000/')
    cy.get('button[name="login-register-button"]')
      .click()
    cy.url().should('include', 'localhost:3000/login')
    cy.get('input[name="email"]')
      .focus()
      .type('test2@mail.com')
    cy.get('input[name="password"]')
      .focus()
      .type('123')
    cy.get('button[name="login-button"]')
      .click()
  })
  it('Log out', () => {
    cy.get('button[name="logout"]')
      .click()
  })
})