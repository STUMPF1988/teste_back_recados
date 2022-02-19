import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { MissingFieldError } from "../../../../core/presentation/errors/missing-field-error";
import { ok, serverError } from "../../../../core/presentation/helpers/http-handler";
import { DeleteRecadosUseCase } from "../../domain/usecases/delete-recados-usecase";


export class DeleteRecadosController implements Controller {
    constructor(private deleteRecadosUseCase: DeleteRecadosUseCase) {}

    async execute(req: Request, res: Response) {
        try {
            //const { uid } = req.params;

            const uid = req.query.uid as string

            if(!uid) {
                throw new MissingFieldError("uid");
            }

            await this.deleteRecadosUseCase.run({uid})

            return ok(res, "Recado deletado com sucesso!");
            
        } catch(error) {
            return serverError(res, error);
        }
    }
}