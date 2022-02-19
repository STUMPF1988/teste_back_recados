import { UseCase } from "../../../../core/domain/contracts/usecase";
import { NotFoundError2 } from "../../../../core/domain/errors/not-found-error";
import { CacheRepository } from "../../../../core/infra/repositories/cache-repository";
import { RecadosRepository } from "../../infra/repositories/recados-repository";

export interface IDeleteRecadosParams {
  uid: string;
}

  export class DeleteRecadosUseCase implements UseCase {
    constructor(
      private repository: RecadosRepository,
      private cacheRepository: CacheRepository
    ) {}

    async run(data: IDeleteRecadosParams): Promise<any> {
      const recados = await this.repository.find(data.uid);
      if (!recados) {
          throw new NotFoundError2("uid");
      }
        
      //deletando o item no repository
      await this.repository.delete(data.uid);

  
      //deletando o item no cache
      await this.cacheRepository.delete(
        `recados:${data.uid}`);

        //deletando o item no cache
      await this.cacheRepository.delete(
        `recados:all`);
    

        
      }
    }

   