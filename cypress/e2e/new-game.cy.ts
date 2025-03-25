/// <reference types="cypress" />

describe("New Game Creation", () => {
  beforeEach(() => {
    cy.visit("/new-game");
  });

  it("should create a new game with all fields filled", () => {
    // Fill in Player 1 details
    cy.get('[data-testid="player1-name"]').type("John Doe");
    cy.get('[data-testid="player1-email"]').type("john@example.com");
    cy.get('[data-testid="player1-instagram"]').type("@johndoe");

    // Fill in Player 2 details
    cy.get('[data-testid="player2-name"]').type("Jane Smith");
    cy.get('[data-testid="player2-email"]').type("jane@example.com");
    cy.get('[data-testid="player2-instagram"]').type("@janesmith");

    // Select genre
    cy.get('[data-testid="genre-select"]').select("pop");

    // Select game mode
    cy.get('[data-testid="game-mode-select"]').select("best-ever");

    // Select question
    cy.get('[data-testid="question-select"]').select(
      "What song best captures the feeling of summer?"
    );

    // Submit the form
    cy.get('[data-testid="submit-button"]').click();

    // Assert URL parameters
    cy.url()
      .should(
        "match",
        /\/match\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/
      )
      .and("include", "player1Name=John%20Doe")
      .and("include", "player1Email=john%40example.com")
      .and("include", "player1Instagram=%40johndoe")
      .and("include", "player2Name=Jane%20Smith")
      .and("include", "player2Email=jane%40example.com")
      .and("include", "player2Instagram=%40janesmith")
      .and("include", "genre=pop")
      .and("include", "gameMode=best-ever")
      .and(
        "include",
        "question=What%20song%20best%20captures%20the%20feeling%20of%20summer%3F"
      );
  });

  it("should create a new game with only required fields", () => {
    // Fill in only required fields
    cy.get('[data-testid="player1-name"]').type("John Doe");
    cy.get('[data-testid="player1-email"]').type("john@example.com");
    cy.get('[data-testid="question-select"]').select(
      "What song best captures the feeling of summer?"
    );

    // Submit the form
    cy.get('[data-testid="submit-button"]').click();

    // Assert URL parameters
    cy.url()
      .should(
        "match",
        /\/match\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/
      )
      .and("include", "player1Name=John%20Doe")
      .and("include", "player1Email=john%40example.com")
      .and(
        "include",
        "question=What%20song%20best%20captures%20the%20feeling%20of%20summer%3F"
      );
  });

  it("should show validation errors for required fields", () => {
    // Submit empty form
    cy.get('[data-testid="submit-button"]').click();

    // Assert validation errors for required fields only
    cy.get('[data-testid="player1-name"]').should("have.attr", "required");
    cy.get('[data-testid="player1-email"]').should("have.attr", "required");
    cy.get('[data-testid="question-select"]').should("have.attr", "required");

    // Assert optional fields don't have required attribute
    cy.get('[data-testid="player2-name"]').should("not.have.attr", "required");
    cy.get('[data-testid="player2-email"]').should("not.have.attr", "required");
    cy.get('[data-testid="genre-select"]').should("not.have.attr", "required");
    cy.get('[data-testid="game-mode-select"]').should(
      "not.have.attr",
      "required"
    );
  });

  it("should handle custom question creation", () => {
    // Select custom question option
    cy.get('[data-testid="question-select"]').select("custom");

    // Custom question input should be visible
    cy.get('[data-testid="custom-question-input"]').should("be.visible");

    // Type custom question
    cy.get('[data-testid="custom-question-input"]').type(
      "What song reminds you of your childhood?"
    );

    // Fill in required fields
    cy.get('[data-testid="player1-name"]').type("John Doe");
    cy.get('[data-testid="player1-email"]').type("john@example.com");

    // Submit the form
    cy.get('[data-testid="submit-button"]').click();

    // Assert URL includes custom question and matches UUID pattern
    cy.url()
      .should(
        "match",
        /\/match\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/
      )
      .and(
        "include",
        "question=What%20song%20reminds%20you%20of%20your%20childhood%3F"
      );
  });

  it("should validate email format for player 1", () => {
    // Fill in invalid email for player 1
    cy.get('[data-testid="player1-email"]').type("invalid-email");

    // Submit the form
    cy.get('[data-testid="submit-button"]').click();

    // Assert email validation error
    cy.get('[data-testid="player1-email"]').should(
      "have.attr",
      "type",
      "email"
    );
  });

  it("should validate email format for player 2 when provided", () => {
    // Fill in required fields
    cy.get('[data-testid="player1-name"]').type("John Doe");
    cy.get('[data-testid="player1-email"]').type("john@example.com");
    cy.get('[data-testid="question-select"]').select(
      "What song best captures the feeling of summer?"
    );

    // Fill in invalid email for player 2
    cy.get('[data-testid="player2-email"]').type("invalid-email");

    // Submit the form
    cy.get('[data-testid="submit-button"]').click();

    // Assert email validation error
    cy.get('[data-testid="player2-email"]').should(
      "have.attr",
      "type",
      "email"
    );
  });
});
