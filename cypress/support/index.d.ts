/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    submitPlayerAnswer(
      playerNumber: 1 | 2,
      data: { name: string; instagram: string; query: string }
    ): Chainable<void>;
  }
}
