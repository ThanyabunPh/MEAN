import { TodosCategoricalControllerComponent } from './todos-categorical-controller.component'

describe('TodosCategoricalControllerComponent', () => {
  it('should mount', () => {
    cy.mount(TodosCategoricalControllerComponent)
    cy.get('ul.menu.rounded-box').should('exist')
  })

  it('should render 5 menu items', () => {
    cy.mount(TodosCategoricalControllerComponent)
    cy.get('ul.menu.rounded-box li').should('have.length', 5)
  })

  it('should render home menu item and svg', () => {
    cy.mount(TodosCategoricalControllerComponent)
    cy.get('ul.menu.rounded-box li').contains('Home').should('exist')
    cy.get('ul.menu.rounded-box li svg').should('exist')
  })

  it('should render Fast & Important menu item', () => {
    cy.mount(TodosCategoricalControllerComponent)
    cy.get('ul.menu.rounded-box li').contains('Fast & Important').should('exist')
    cy.get('ul.menu.rounded-box li svg').should('exist')
  })

  it('should render Important menu item', () => {
    cy.mount(TodosCategoricalControllerComponent)
    cy.get('ul.menu.rounded-box li').contains('Important').should('exist')
    cy.get('ul.menu.rounded-box li svg').should('exist')
  })

  it('should render Fast menu item', () => {
    cy.mount(TodosCategoricalControllerComponent)
    cy.get('ul.menu.rounded-box li').contains('Fast').should('exist')
    cy.get('ul.menu.rounded-box li svg').should('exist')
  })

  it('should render No Priority menu item', () => {
    cy.mount(TodosCategoricalControllerComponent)
    cy.get('ul.menu.rounded-box li').contains('No Priority').should('exist')
    cy.get('ul.menu.rounded-box li svg').should('exist')
  })

})
