/// <reference types="cypress" />

describe("Match Page", () => {
  beforeEach(() => {
    // Visit a match page with initial parameters
    cy.visit(
      "/match/a256b411-b08c-4919-8d4e-59034e14f05d?question=What%20song%20best%20captures%20the%20feeling%20of%20summer%3F&genre=hip-hop"
    );
  });

  it("should allow Player 1 to submit their answer", () => {
    cy.submitPlayerAnswer(1, {
      name: "John Doe",
      instagram: "@johndoe",
      query: "Summer Vibes",
    });
  });

  it("should allow Player 2 to submit their answer", () => {
    // First submit Player 1's answer
    cy.submitPlayerAnswer(1, {
      name: "John Doe",
      instagram: "@johndoe",
      query: "Summer Vibes",
    });

    // Fill in Player 2 details
    cy.submitPlayerAnswer(2, {
      name: "Jane Smith",
      instagram: "@janesmith",
      query: "Summer Paradise",
    });
  });

  it("should allow judge to submit their name and vote", () => {
    // First submit both players' answers
    cy.submitPlayerAnswer(1, {
      name: "John Doe",
      instagram: "@johndoe",
      query: "Summer Vibes",
    });

    cy.submitPlayerAnswer(2, {
      name: "Jane Smith",
      instagram: "@janesmith",
      query: "Summer Paradise",
    });

    // Submit judge name
    cy.get('[data-testid="judge-name-input"]').type("Judge Bob");
    cy.get('[data-testid="judge-name-submit"]').click();

    // Wait for judge name to be in URL and form to be hidden
    cy.url().should("include", "judgeName=Judge+Bob");
    cy.get('[data-testid="judge-name-input"]').should("not.exist");

    // Submit vote
    cy.get('button[type="submit"]').first().click();

    // Wait for winner to be displayed
    cy.contains("🏆 Winner 🏆").should("be.visible");
  });

  it("should preserve all parameters when submitting answers", () => {
    // Fill in and submit Player 1's answer
    cy.submitPlayerAnswer(1, {
      name: "John Doe",
      instagram: "@johndoe",
      query: "Summer Vibes",
    });

    // Verify original parameters are preserved
    cy.url().should(
      "include",
      "question=What+song+best+captures+the+feeling+of+summer%3F"
    );
    cy.url().should("include", "genre=hip-hop");

    // Fill in and submit Player 2's answer
    cy.submitPlayerAnswer(2, {
      name: "Jane Smith",
      instagram: "@janesmith",
      query: "Summer Paradise",
    });

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
    cy.submitPlayerAnswer(1, {
      name: "John Doe",
      instagram: "@johndoe",
      query: "Summer Vibes",
    });

    // Verify Spotify embed is displayed
    cy.get('iframe[src*="spotify.com"]').should("be.visible");

    // Submit Player 2's answer
    cy.submitPlayerAnswer(2, {
      name: "Jane Smith",
      instagram: "@janesmith",
      query: "Summer Paradise",
    });

    // Verify both Spotify embeds are displayed
    cy.get('iframe[src*="spotify.com"]').should("have.length", 2);
  });
});
