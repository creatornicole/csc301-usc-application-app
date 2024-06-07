// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { mount } from 'cypress/react'
import { MemoryRouter } from 'react-router-dom'
import React from 'react';

// components that consum a hook or component from React Router
// need to have access to a React Router provider
// ApplicationForm uses useLocation from React Router
// the ApplicationForm component gets wrapped inside the MemoryRouter
// when the mount command is written
Cypress.Commands.add('mount', (component, options = {}) => {
  const { routerProps = { initialEntries: ['/'] }, ...mountOptions } = options
  
  const wrapped = <MemoryRouter {...routerProps}>{component}</MemoryRouter>
  
  return mount(wrapped, mountOptions)
})
