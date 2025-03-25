/// <reference types="cypress" />

describe("Match Page", () => {
  beforeEach(() => {
    // Visit a match page with initial parameters
    cy.visit(
      "/match/a256b411-b08c-4919-8d4e-59034e14f05d?question=What%20song%20best%20captures%20the%20feeling%20of%20summer%3F&genre=hip-hop"
    );
  });

  it("should allow Player 1 to submit their answer", () => {
    // Fill in Player 1 details
    cy.get('[name="player1Name"]').type("John Doe");
    cy.get('[name="player1Instagram"]').type("@johndoe");
    cy.get('[name="player1Query"]').type("Summer Vibes");

    // Submit Player 1's answer
    cy.get('button[type="submit"]').first().click();

    // Verify URL contains Player 1's data
    cy.url().should("include", "player1Name=John+Doe");
    cy.url().should("include", "player1Instagram=%40johndoe");
    cy.url().should("include", "player1Query=Summer+Vibes");

    // Verify form is disabled after submission
    cy.get('[name="player1Name"]').should("be.disabled");
    cy.get('[name="player1Instagram"]').should("be.disabled");
    cy.get('[name="player1Query"]').should("be.disabled");
  });

  it("should allow Player 2 to submit their answer", () => {
    // First submit Player 1's answer
    cy.get('[name="player1Name"]').type("John Doe");
    cy.get('[name="player1Instagram"]').type("@johndoe");
    cy.get('[name="player1Query"]').type("Summer Vibes");
    cy.get('button[type="submit"]').first().click();

    // Wait for Player 1's form to be disabled and URL to update
    cy.get('[name="player1Name"]').should("be.disabled");
    cy.get('[name="player1Instagram"]').should("be.disabled");
    cy.get('[name="player1Query"]').should("be.disabled");
    cy.url().should("include", "player1Name=John+Doe");

    // Fill in Player 2 details
    cy.get('[name="player2Name"]').type("Jane Smith");
    cy.get('[name="player2Instagram"]').type("@janesmith");
    cy.get('[name="player2Query"]').type("Summer Paradise");

    // Submit Player 2's answer
    cy.get('[data-testid="player2-submit-answer"]').click();

    // Wait for URL to update with Player 2's data
    cy.url().should("include", "player2Name=Jane+Smith");
    cy.url().should("include", "player2Query=Summer+Paradise");

    // Verify Player 2's form is disabled after submission
    cy.get('[name="player2Name"]').should("be.disabled");
    cy.get('[name="player2Instagram"]').should("be.disabled");
    cy.get('[name="player2Query"]').should("be.disabled");
  });

  it("should allow judge to submit their name and vote", () => {
    // First submit both players' answers
    cy.get('input[name="player1Name"]').type("John Doe");
    cy.get('input[name="player1Instagram"]').type("@johndoe");
    cy.get('input[name="player1Query"]').type("Summer Vibes");
    cy.get('button[type="submit"]').first().click();

    cy.get('input[name="player2Name"]').type("Jane Smith");
    cy.get('input[name="player2Instagram"]').type("@janesmith");
    cy.get('input[name="player2Query"]').type("Summer Paradise");
    cy.get('button[type="submit"]').eq(1).click();

    // Wait for both players' answers to be submitted
    cy.url().should("include", "player1Query=Summer+Vibes");
    cy.url().should("include", "player2Query=Summer+Paradise");

    // Submit judge name
    cy.get('input[name="judgeName"]').type("Judge Bob");
    cy.get('button[type="submit"]').last().click();

    // Verify judge name is in URL
    cy.url().should("include", "judgeName=Judge+Bob");

    // Submit vote
    cy.get('button[type="submit"]').first().click();

    // Verify winner is displayed
    cy.contains("🏆 Winner 🏆").should("be.visible");
  });

  it("should preserve all parameters when submitting answers", () => {
    // Fill in and submit Player 1's answer
    cy.get('[name="player1Name"]').type("John Doe");
    cy.get('[name="player1Instagram"]').type("@johndoe");
    cy.get('[name="player1Query"]').type("Summer Vibes");
    cy.get('button[type="submit"]').first().click();

    // Verify original parameters are preserved
    cy.url().should(
      "include",
      "question=What+song+best+captures+the+feeling+of+summer%3F"
    );
    cy.url().should("include", "genre=hip-hop");

    // Fill in and submit Player 2's answer
    cy.get('[name="player2Name"]').type("Jane Smith");
    cy.get('[name="player2Instagram"]').type("@janesmith");
    cy.get('[name="player2Query"]').type("Summer Paradise");
    cy.get('[data-testid="player2-submit-answer"]').click();

    // Verify all parameters are still preserved
    cy.url().should(
      "include",
      "question=What+song+best+captures+the+feeling+of+summer%3F"
    );
    cy.url().should("include", "genre=hip-hop");
    cy.url().should("include", "player1Name=John+Doe");
    cy.url().should("include", "player2Name=Jane+Smith");
  });

  it("should display Spotify embeds after song submissions", () => {
    // Submit Player 1's answer
    cy.get('[name="player1Name"]').type("John Doe");
    cy.get('[name="player1Instagram"]').type("@johndoe");
    cy.get('[name="player1Query"]').type("Summer Vibes");
    cy.get('button[type="submit"]').first().click();

    // Verify Spotify embed is displayed
    cy.get('iframe[src*="spotify.com"]').should("be.visible");

    // Submit Player 2's answer
    cy.get('[name="player2Name"]').type("Jane Smith");
    cy.get('[name="player2Instagram"]').type("@janesmith");
    cy.get('[name="player2Query"]').type("Summer Paradise");
    cy.get('[data-testid="player2-submit-answer"]').click();

    // Verify both Spotify embeds are displayed
    cy.get('iframe[src*="spotify.com"]').should("have.length", 2);
  });
});
