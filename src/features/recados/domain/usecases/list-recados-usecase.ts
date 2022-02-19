import { UseCase } from "../../../../core/domain/contracts/usecase";
import { CacheRepository } from "../../../../core/infra/repositories/cache-repository";
import { RecadosRepository } from "../../infra/repositories/recados-repository";




  export class ListRecadosUseCase implements UseCase {
    constructor(
      private repository: RecadosRepository,
      private cacheRepository: CacheRepository
    ) {}
  
    async run(): Promise<any> {
  
  
      //primeiro vai tentar pegar a lista do cache
    const cacheRec = await this.cacheRepository.get("recados:all");
    if (cacheRec) {
      return JSON.parse(cacheRec);
    }

    //se nao tiver lista, vai pegar do repository
    const result = await this.repository.list();

    //depois que pegar do repositório, vai criar essa mesma lista no cache
    await this.cacheRepository.set(`recados:all`, JSON.stringify(result));

    return result;
  
    }
  }