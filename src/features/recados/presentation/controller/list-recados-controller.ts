import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { ok, serverError } from "../../../../core/presentation/helpers/http-handler";
import { ListRecadosUseCase } from "../../domain/usecases/list-recados-usecase";

export class ListRecadosController implements Controller {
    constructor(private listRecadosUseCase: ListRecadosUseCase) {}

    async execute(_: Request, res: Response) {
        try {
            const result = await this.listRecadosUseCase.run();

            return ok(res, result);

        } catch(error) {
            return serverError(res, error);
        }
    }
}
