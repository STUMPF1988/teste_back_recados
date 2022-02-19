import { Response } from "express"
import { DomainError } from "../../domain/errors/domain-error";
import { ControllerError } from "../errors/controller-error";

export const ok = (res: Response, data?: any) => {
    return res.status(200).send({
        ok: true,
        data
    });
}

export const serverError = (res: Response, error?: any) => {
    if(error instanceof DomainError || error instanceof ControllerError){
        return res.status(error.code).send({
            ok: false,
            error: error.message,
            identifier: error.name,
        });
    }
}

export const badRequest = (res: Response, reason?: string) => {
    return res.status(400).send({
        ok: true,
        reason
    });
}


