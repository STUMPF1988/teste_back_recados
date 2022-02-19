import request from "supertest";
import { DatabaseConnection } from "../../../../../src/core/infra/database/connections/connection";
import { RedisConnection } from "../../../../../src/core/infra/database/connections/redis";
import { createServer } from "../../../../../src/core/presentation/server";

describe("TESTE DO CREATE RECADOS CONTROLLER", () => {
  let app: Express.Application;

  beforeAll(async () => {
    await DatabaseConnection.initConnection();
    RedisConnection.initConnection();

    app = createServer();
  });

  test("deveria retornar badRequest (400) se a descrição não for informada", async () => {
    await request(app).post("/recados").send({}).expect(400);
  });

  test("deveria retornar (200) se o recado for criado com sucesso", async () => {
    await request(app)
      .post("/recados")
      .send({
        descricao: "qualquer",
        detalhamento: "any",
      })
      .expect(200)
      .expect((response) => {
        expect(response.body).not.toBeFalsy();
        expect(response.body.ok).not.toBeFalsy();
        expect(response.body.error).toBeFalsy();
        expect(response.body.data).toEqual("Recado cadastrado com sucesso!");
      });
      
  });

});
