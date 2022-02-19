import { DomainError } from "./domain-error";

export class NotFoundError extends DomainError {
    constructor(data: string) {
        super(`${data} nao informada.`, 404);
        this.name = "NotFoundError";
    }
}


export class NotFoundError2 extends DomainError {
    constructor(data: string) {
        super(`${data} inexistente.`, 404);
        this.name = "NotFoundError2";
    }

    
}