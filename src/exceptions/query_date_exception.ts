
export class QueryDateException extends Error {
    constructor(msg: string) {
        super(msg);

        Object.setPrototypeOf(this, QueryDateException.prototype);
    }
}

