import { UseCase } from "../../../../core/domain/contracts/usecase";
import { NotFoundError2 } from "../../../../core/domain/errors/not-found-error";
import { CacheRepository } from "../../../../core/infra/repositories/cache-repository";
import { RecadosRepository } from "../../infra/repositories/recados-repository";
import { IRecados } from "../model/recados";



export interface IUpdateParams {
  uid: string;
  descricao: string;
  detalhamento: string;
}

export class UpdateRecadosUseCase implements UseCase {
  constructor(
    private repository: RecadosRepository,
    private cacheRepository: CacheRepository
  ) {}

  async run(data: IUpdateParams): Promise<any> {
    const updated = await this.repository.find(data.uid);

    if (!updated) {
      throw new NotFoundError2("Recado");
    }

    //update no repository
    const edit = await this.repository.update(data);

    //se tiver no cache, deleta
    await this.cacheRepository.delete(`recados:${data.uid}`);

    //se tiver no cache, deleta
    await this.cacheRepository.delete(`recados:all`);

    //e cria um novo igual ao do repository
    await this.cacheRepository.set(`recados:${data.uid}`, JSON.stringify(data));
  }
  }

