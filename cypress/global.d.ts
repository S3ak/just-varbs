/// <reference types="cypress" />

declare namespace Cypress {
  import { Game } from "../lib/types";

  type LoginOptions = {
    rememberUser: boolean;
  };

  interface Chainable {
    /**
     *  Window object with additional properties used during test.
     */
    window(options?: Partial<Game>): Chainable<Window>;

    /**
     * Logs-in user by using UI
     */
    login(
      username: string,
      password: string,
      loginOptions?: LoginOptions
    ): void;

    /**
     * Logs-in user by using API request
     */
    loginByApi(username: string, password?: string): Chainable<Response>;

    /**
     * Creates a new game
     */
    createNewGame(gameData?: typeof defaultGameData): Chainable<void>;
  }
}
