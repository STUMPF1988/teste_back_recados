import { DatabaseConnection } from "../../../../../src/core/infra/database/connections/connection";
import { RedisConnection } from "../../../../../src/core/infra/database/connections/redis";
import { CacheRepository } from "../../../../../src/core/infra/repositories/cache-repository";
import { RecadosRepository } from "../../../../../src/features/recados/infra/repositories/recados-repository";
import { CreateRecadosUseCase } from "../../../../../src/features/recados/domain/usecases/create-recados-usecase";
import { NotFoundError } from "../../../../../src/core/domain/errors/not-found-error";

//TESTE INTEGRADO
describe("TESTE NO CREATE RECADOS USECASE", () => {
  const makeSut = () => {
    const recadosRepo = new RecadosRepository();
    const cacheRepo = new CacheRepository();

    const sut = new CreateRecadosUseCase(recadosRepo, cacheRepo);
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




  test("Deveria retornar o NotFoundError se não informar a descrição que é obrigatória", async () => {
    const sut = makeSut();

    expect.assertions(3);

    try {
      await sut.run({
        descricao: "",
        detalhamento: "qualquer coisa",
      });
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError);
      const err = error as NotFoundError;
      expect(err.name).toEqual("NotFoundError");
      expect(err.message).toEqual("descricao nao informada.");
    }
  });



  test("Deveria retornar ok se o recado for criado", async () => {
    const sut = makeSut();

    

      const recados = {
        descricao: "qualquer descrição",
        detalhamento: "",
      };


      const result = await sut.run(recados);

      expect(result).toBeTruthy(); //é esperado que retorne ok!
      expect(result.descricao).toEqual(recados.descricao);
      expect(result.detalhamento).toBeFalsy;
     
  });


  
  test("deveria retornar ok se o recado for criado com detalhamento", async () => {
    const sut = makeSut();
    

    const recados = {
      descricao: "qualquer descrição",
      detalhamento: "qualquer detalhamento",
    };

    const result = await sut.run(recados);

    expect(result).toBeTruthy();
    expect(result.descricao).toEqual(recados.descricao);
    expect(result.detalhamento).not.toBeFalsy();

});



});
