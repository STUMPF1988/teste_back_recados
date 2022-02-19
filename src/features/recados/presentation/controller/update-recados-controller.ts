import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { badRequest, ok, serverError } from "../../../../core/presentation/helpers/http-handler";
import { UpdateRecadosUseCase } from "../../domain/usecases/update-recados-usecase";


export class UpdateRecadosController implements Controller {
    constructor(private updateRecadosUseCase: UpdateRecadosUseCase) {}

    async execute(req: Request, res: Response) {
        try {
            const { descricao, detalhamento } = req.body;
            const { uid } = req.params;
            //const uid = req.query.uid as string

            if (!uid) {return badRequest (res, "ID não informado"); }

            await this.updateRecadosUseCase.run({uid, descricao, detalhamento});

           return ok(res, "Recado alterado com sucesso!");
            
        } catch(error) {
            return serverError(res, error);
        }
    }
}

