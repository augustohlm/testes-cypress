/// <reference types="cypress" />

describe('Testes da agenda de contatos', () => {
  beforeEach(() => {
    cy.visit('https://ebac-agenda-contatos-tan.vercel.app')
  })

  it('Deve incluir um contato', () => {
    const identificador = Date.now()
    const nome = `Contato Cypress ${identificador}`
    const email = `cypress${identificador}@example.com`
    const telefone = '31999999999'

    cy.get('input[placeholder="Nome"]').type(nome)
    cy.get('input[placeholder="E-mail"]').type(email)
    cy.get('input[placeholder="Telefone"]').type(telefone)

    cy.contains('button', /^Adicionar$/i).click()

    cy.contains('.contato', nome, {timeout: 10000}).should('be.visible').and('contain', email).and('contain', telefone)
  })

  it('Deve alterar um contato', () => {
    const identificador = Date.now()
    const nomeOriginal = `Contato para editar ${identificador}`
    const emailOriginal = `original${identificador}@example.com`
    const telefoneOriginal = '31999999999'

    const nomeAlterado = `Contato editado ${identificador}`
    const emailAlterado = `editado${identificador}@example.com`
    const telefoneAlterado = '319898989898'

    cy.get('input[placeholder="Nome"]').type(nomeOriginal)
    cy.get('input[placeholder="E-mail"]').type(emailOriginal)
    cy.get('input[placeholder="Telefone"]').type(telefoneOriginal)

    cy.contains('button', /^Adicionar$/i).click()

    cy.contains('.contato', nomeOriginal, {timeout: 10000}).should('be.visible').within(() => {cy.contains('button', /^Editar$/i).click()})

    cy.get('input[placeholder="Nome"]').should('have.value', nomeOriginal).clear().type(nomeAlterado)
    cy.get('input[placeholder="E-mail"]').clear().type(emailAlterado)
    cy.get('input[placeholder="Telefone"]').clear().type(telefoneAlterado)

    cy.contains('button', /^Salvar$/i).click()

    cy.contains('.contato', nomeAlterado, {timeout: 10000}).should('be.visible').and('contain', emailAlterado).and('contain', telefoneAlterado)

    cy.contains('.contato', nomeOriginal).should('not.exist')


  })

  it('Deve remover um contato', () => {
    const identificador = Date.now()
    const nome = `Contato para remover ${identificador}`
    const email = `remover${identificador}@example.com`
    const telefone = '31988887777'

    cy.get('input[placeholder="Nome"]').type(nome)
    cy.get('input[placeholder="E-mail"]').type(email)
    cy.get('input[placeholder="Telefone"]').type(telefone)

    cy.contains('button', /^Adicionar$/i).click()

    cy.contains('.contato', nome, {timeout: 10000}).should('be.visible').within(() => {
      cy.contains('button', /^Deletar$/i).click()
    })

    cy.contains('.contato', nome, {timeout: 10000}).should('not.exist')
  })
})