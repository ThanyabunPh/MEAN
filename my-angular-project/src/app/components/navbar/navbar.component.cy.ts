// @ts-nocheck
import { NavbarComponent } from './navbar.component'
import { mount } from 'cypress/angular';


describe('NavbarComponent', () => {
  it('should mount', () => {
    cy.mount(NavbarComponent)
  })

  it('should contain the title', () => {
    mount(NavbarComponent)
    cy.get('a.btn.btn-ghost.text-xl').contains('K e e p It')
  })

  it('should contain the theme switcher', () => {
    mount(NavbarComponent)
    cy.get('[data-cy="themeSwitcher"]').should('exist')
  })

  it('should toggle the theme', () => {

    mount(NavbarComponent)
    cy.get('[data-cy="themeSwitcher"]').click();

    // Check if the body's data-theme attribute is set to 'light'
    cy.get('body').should('have.attr', 'data-theme', 'dark');

    // Check localStorage
    cy.window().should((window) => {
      expect(window.localStorage.getItem('theme')).to.eq('dark');
    });

    // Click again to toggle back
    cy.get('[data-cy="themeSwitcher"]').click();

    // Check if the theme is set back to 'dark'
    cy.get('body').should('have.attr', 'data-theme', 'light');
    cy.window().should((window) => {
      expect(window.localStorage.getItem('theme')).to.eq('light');
    });
  });
})
