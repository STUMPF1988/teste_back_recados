import { UseCase } from "../../../../core/domain/contracts/usecase";
import { NotFoundError } from "../../../../core/domain/errors/not-found-error";
import { CacheRepository } from "../../../../core/infra/repositories/cache-repository";
import { RecadosRepository } from "../../infra/repositories/recados-repository";

export interface ICreateRecadosParams {
  descricao: string;
  detalhamento: string;
}

export class CreateRecadosUseCase implements UseCase {
  constructor(
    private repository: RecadosRepository,
    private cacheRepository: CacheRepository
  ) {}

  async run(data: ICreateRecadosParams): Promise<any> {

    
    // Create no BD relacional
    if (!data.descricao) {
      throw new NotFoundError("descricao");
  }

    const criar = await this.repository.create(data);

    


    // Set no Redis
    await this.cacheRepository.set(`recados:${criar.uid}`,  JSON.stringify(data));

   

    //deleta a lista que estará desatualizada
    await this.cacheRepository.delete("recados:all");

    return criar;

  }
}
