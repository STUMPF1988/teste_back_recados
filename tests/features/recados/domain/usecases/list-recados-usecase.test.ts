import { DatabaseConnection } from "../../../../../src/core/infra/database/connections/connection";
import { RedisConnection } from "../../../../../src/core/infra/database/connections/redis";
import { CacheRepository } from "../../../../../src/core/infra/repositories/cache-repository";
import { RecadosRepository } from "../../../../../src/features/recados/infra/repositories/recados-repository";
import { ListRecadosUseCase } from "../../../../../src/features/recados/domain/usecases/list-recados-usecase";


//TESTE INTEGRADO
describe("TESTE NO LIST RECADOS USECASE", () => {
  const makeSut = () => {
    const recadosRepo = new RecadosRepository();
    const cacheRepo = new CacheRepository();

    const sut = new ListRecadosUseCase(recadosRepo, cacheRepo);
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

  const makeRecados = async () => {
    const recado1 = {
      uid: "123456",
      descricao: "123",
      detalhamento: "nome teste",
    };

    const recado2 = {
      uid: "256987",
      descricao: "123",
      detalhamento: "nome teste",
    };

    await new RecadosRepository().create(recado1);
    await new RecadosRepository().create(recado2);

    return {
      recado1,
      recado2,
    };
  };

  test("Deveria retornar um ok se os recados criados pelo makeRecados forem listados", async () => {
    const sut = makeSut();
    

    const result = await sut.run();

    expect(result).toBeTruthy();
    
  });

 
});
