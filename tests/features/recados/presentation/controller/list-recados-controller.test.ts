import request from "supertest";
import { DatabaseConnection } from "../../../../../src/core/infra/database/connections/connection";
import { RedisConnection } from "../../../../../src/core/infra/database/connections/redis";
import { createServer } from "../../../../../src/core/presentation/server";

describe("TESTE DO LIST RECADOS CONTROLLER", () => {
  let app: Express.Application;

  beforeAll(async () => {
    await DatabaseConnection.initConnection();
    RedisConnection.initConnection();

    app = createServer();
  });

  test("deveria retornar (200) se os recados forem listados", async () => {
    await request(app).get("/recados").send({}).expect(200);
  });

  

});
