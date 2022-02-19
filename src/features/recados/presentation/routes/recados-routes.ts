import { Request, Response, Router } from "express";
import { RecadosRepository } from "../../infra/repositories/recados-repository";
import { CreateRecadosController } from "../controller/create-recados-controller";
import { ListRecadosController } from "../controller/list-recados-controller";
import { UpdateRecadosController } from "../controller/update-recados-controller";
import { DeleteRecadosController } from "../controller/delete-recados-controller";
import { CacheRepository } from "../../../../core/infra/repositories/cache-repository";
import { CreateRecadosUseCase } from "../../domain/usecases/create-recados-usecase";
import { ListRecadosUseCase } from "../../domain/usecases/list-recados-usecase";
import { UpdateRecadosUseCase } from "../../domain/usecases/update-recados-usecase";
import { DeleteRecadosUseCase } from "../../domain/usecases/delete-recados-usecase";

export class RecadosRouter {
    static getRoutes() {
        const routes = Router();
        
        const recadosRepo = new RecadosRepository();
        const cacheRepository = new CacheRepository();



        const createRecadosUseCase = new CreateRecadosUseCase(recadosRepo, cacheRepository);


        const listRecadosUseCase = new ListRecadosUseCase(recadosRepo, cacheRepository);


        const updateRecadosUseCase = new UpdateRecadosUseCase(recadosRepo, cacheRepository);


        const deleteRecadosUseCase = new DeleteRecadosUseCase(recadosRepo, cacheRepository);


        const createRecadosController = new CreateRecadosController(
            createRecadosUseCase
        );

        const listRecadosController = new ListRecadosController(
            listRecadosUseCase
        );

        const updateRecadosController = new UpdateRecadosController(
            updateRecadosUseCase
        );

        const deleteRecadosController = new DeleteRecadosController(
            deleteRecadosUseCase
        );

        routes.get('/', (req: Request, res: Response) => listRecadosController.execute(req, res));
        routes.post('/', (req: Request, res: Response) => createRecadosController.execute(req, res));
        routes.put('/:uid', (req: Request, res: Response) => updateRecadosController.execute(req, res));
        routes.delete('/:uid', (req: Request, res: Response) => deleteRecadosController.execute(req, res));

        return routes;
    }
}
