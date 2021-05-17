import { Server } from "miragejs";

export const generateSeeds = (server: Server) => {
  server.createList("article", 30);
  server.createList("user", 30);
};
