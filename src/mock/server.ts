/**
 * External Imports
 * @see https://miragejs.com/docs/getting-started/introduction/
 */
import { createServer } from "miragejs";

/**
 * Imports server related configs and helper functions
 */
import { RoutesHandler } from "./controllers";
import { models } from "./models";
import { factories } from "./factories";
import { generateSeeds } from "./seeds";

/**
 * Handles creating the server
 */
export function makeServer({ environment = "test" } = {}) {
  const server = createServer({
    /**
     * The environment argument we're adding to the function signature is just a convention.
     * We're defaulting it to test since in most apps, you'll call makeServer once in development mode
     * but many times in test (across your various test files).
     */
    environment,

    /**
     * Generates the data
     */
    factories: factories,

    /**
     * Base Models
     */
    models: models,

    /**
     * Generates the data seed
     */
    seeds(server) {
      generateSeeds(server);
    },

    /**
     * Defines the routes
     */
    routes() {
      this.namespace = "v1";

      /**
       * Articles
       */
      this.get("/articles", RoutesHandler.getArticles);
      this.get("/articles/:id", RoutesHandler.getArticle);
      this.post("/articles", RoutesHandler.createArticle);
      this.put("/articles/:id", RoutesHandler.updateArticle);
      this.delete("/articles/:id", RoutesHandler.deleteArticle);

      /**
       * Users
       */
      this.get("/users", RoutesHandler.getUsers);
      this.get("/users/:id", RoutesHandler.getUser);
      this.post("/users", RoutesHandler.createUser);
      this.put("/users/:id", RoutesHandler.updateUser);
      this.delete("/users/:id", RoutesHandler.deleteUser);
    },
  });

  return server;
}
