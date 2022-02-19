import { Repository } from "typeorm";
import { DatabaseConnection } from "../../../../core/infra/database/connections/connection";
import { Recados } from "../../../../core/infra/database/entities/Recados";
import { IRecados } from "../../../../features/recados/domain/model/recados";
import { IUpdateParams } from "../../domain/usecases/update-recados-usecase";
import { UpdateRecadosController } from "../../presentation/controller/update-recados-controller";

export class RecadosRepository {
    private repository: Repository<Recados>;

    constructor() {
        this.repository = DatabaseConnection.getConnection().getRepository(Recados);
    }

    async create(recados: IRecados) {
        const recadosEntity = this.repository.create(recados);
        await this.repository.save(recadosEntity);
        return recadosEntity;
    }


    async list() {
        return await this.repository.find();
    }


    async find(uid: string) {
        return await this.repository.findOne(uid);
    }


    
    async update(data:IUpdateParams) {
        
        await this.repository.update(data.uid, {
            descricao: data.descricao,
            detalhamento: data.detalhamento,
        });
       
    }


    async delete(uid: string) {
        await this.repository.delete(uid);
    }

    async clear(){
        await this.repository.clear();
    }
    
}

