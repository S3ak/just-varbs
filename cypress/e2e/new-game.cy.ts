/// <reference types="cypress" />

describe("New Game Creation", () => {
  beforeEach(() => {
    cy.visit("/new-game");
  });

  it("should create a new game with all fields filled", () => {
    cy.get('input[name="player1Name"]').type("John Doe");
    cy.get('input[name="player1Email"]').type("john@example.com");
    cy.get('input[name="player1Instagram"]').type("@johndoe");
    cy.get('input[name="player2Name"]').type("Jane Smith");
    cy.get('input[name="player2Email"]').type("jane@example.com");
    cy.get('input[name="player2Instagram"]').type("@janesmith");
    cy.get('select[name="genre"]').select("pop");
    cy.get('select[name="gameMode"]').select("best-ever");
    cy.get('select[name="question"]').select(
      "What song best captures the feeling of summer?"
    );
    cy.get('button[type="submit"]').click();

    // Check URL with encoded parameters
    cy.url().should("include", "player1Name=John+Doe");
    cy.url().should("include", "player2Name=Jane+Smith");
    cy.url().should("include", "genre=pop");
  });

  it("should create a new game with only required fields", () => {
    cy.get('input[name="player1Name"]').type("John Doe");
    cy.get('input[name="player1Email"]').type("john@example.com");
    cy.get('select[name="genre"]').select("hip-hop");
    cy.get('select[name="gameMode"]').select("best-ever");
    cy.get('select[name="question"]').select(
      "What song best captures the feeling of summer?"
    );
    cy.get('button[type="submit"]').click();

    // Check URL with encoded parameters
    cy.url().should("include", "player1Name=John+Doe");
    cy.url().should("include", "genre=hip-hop");
  });

  it("should show validation errors for required fields", () => {
    // Submit empty form
    cy.get('button[type="submit"]').click();

    // Assert validation errors for required fields only
    cy.get('input[name="player1Name"]').should("have.attr", "required");
    cy.get('input[name="player1Email"]').should("have.attr", "required");
    cy.get('select[name="question"]').should("have.attr", "required");

    // Assert optional fields don't have required attribute
    cy.get('input[name="player2Name"]').should("not.have.attr", "required");
    cy.get('input[name="player2Email"]').should("not.have.attr", "required");
    cy.get('select[name="genre"]').should("not.have.attr", "required");
    cy.get('select[name="gameMode"]').should("not.have.attr", "required");
  });

  it("should handle custom question creation", () => {
    cy.get('input[name="player1Name"]').type("John Doe");
    cy.get('input[name="player1Email"]').type("john@example.com");
    cy.get('select[name="genre"]').select("hip-hop");
    cy.get('select[name="gameMode"]').select("best-ever");
    cy.get('select[name="question"]').select("custom");
    cy.get('input[name="customQuestion"]').type(
      "What song reminds you of your childhood?"
    );
    cy.get('button[type="submit"]').click();

    // Check URL with encoded parameters
    cy.url().should("include", "player1Name=John+Doe");
    cy.url().should(
      "include",
      "question=What+song+reminds+you+of+your+childhood%3F"
    );
  });

  it("should validate email format for player 1", () => {
    // Fill in invalid email for player 1
    cy.get('input[name="player1Email"]').type("invalid-email");

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Assert email validation error
    cy.get('input[name="player1Email"]').should("have.attr", "type", "email");
  });

  it("should validate email format for player 2 when provided", () => {
    // Fill in required fields
    cy.get('input[name="player1Name"]').type("John Doe");
    cy.get('input[name="player1Email"]').type("john@example.com");
    cy.get('select[name="question"]').select(
      "What song best captures the feeling of summer?"
    );

    // Fill in invalid email for player 2
    cy.get('input[name="player2Email"]').type("invalid-email");

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Assert email validation error
    cy.get('input[name="player2Email"]').should("have.attr", "type", "email");
  });
});
