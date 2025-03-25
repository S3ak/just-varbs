/// <reference types="cypress" />

// import "../global.d.ts";

// Custom command to login
Cypress.Commands.add(
  "login",
  (email = "motestuser@mail.com", password = "Pa55W0rd1!TestUser") => {
    cy.visit("/sign-in");
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
  }
);

const defaultGameData = {
  player1Name: "Kratos",
  player1Email: "player1@mail.com",
  player1Instagram: "player1",
  player2Name: "Norman Redus",
  player2Email: "player2@mail.com",
  player2Instagram: "player2",
  genre: "Hip-Hop",
  gameMode: "best ever",
  question: "What the greatest song of all time?",
};

// Custom command to create a new game
Cypress.Commands.add("createNewGame", (gameData = defaultGameData) => {
  cy.visit("/new-game");
  cy.get('input[name="player1Name"]').type(gameData.player1Name);
  cy.get('input[name="player1Email"]').type(gameData.player1Email);
  if (gameData.player1Instagram) {
    cy.get('input[name="player1Instagram"]').type(gameData.player1Instagram);
  }
  cy.get('input[name="player2Name"]').type(gameData.player2Name);
  cy.get('input[name="player2Email"]').type(gameData.player2Email);
  if (gameData.player2Instagram) {
    cy.get('input[name="player2Instagram"]').type(gameData.player2Instagram);
  }
  cy.get('select[name="genre"]').select(gameData.genre);
  cy.get('select[name="gameMode"]').select(gameData.gameMode);
  // TODO: Add question selection via UI
  cy.get('select[name="question"]').select(gameData.question);
  cy.get('button[type="submit"]').click();
});
