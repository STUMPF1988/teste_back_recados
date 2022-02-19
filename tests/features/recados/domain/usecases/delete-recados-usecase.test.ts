import { DatabaseConnection } from "../../../../../src/core/infra/database/connections/connection";
import { RedisConnection } from "../../../../../src/core/infra/database/connections/redis";
import { CacheRepository } from "../../../../../src/core/infra/repositories/cache-repository";
import { RecadosRepository } from "../../../../../src/features/recados/infra/repositories/recados-repository";
import { DeleteRecadosUseCase } from "../../../../../src/features/recados/domain/usecases/delete-recados-usecase";
import { NotFoundError, NotFoundError2 } from "../../../../../src/core/domain/errors/not-found-error";

//TESTE INTEGRADO
describe("TESTE NO DELETE RECADOS USECASE", () => {
  const makeSut = () => {
    const recadosRepo = new RecadosRepository();
    const cacheRepo = new CacheRepository();

    const sut = new DeleteRecadosUseCase(recadosRepo, cacheRepo);
    return sut;
  };

  beforeAll(async () => {
    await DatabaseConnection.initConnection();
    RedisConnection.initConnection();
  });

  afterAll(async () => {
    await DatabaseConnection.closeConnection();
    await RedisConnection.closeConnection();
  });

  beforeEach(async () => {
    
    const recadosRepo = new RecadosRepository();

    await recadosRepo.clear();
  });




  test("Deveria retornar o NotFoundError2 se uid for inexistente", async () => {
    const sut = makeSut();

    expect.assertions(3);

    try {
      await sut.run({
        uid: "",
       
      });
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError2);
      const err = error as NotFoundError2;
      expect(err.name).toEqual("NotFoundError2");
      expect(err.message).toEqual("uid inexistente.");
    }
  });


});
