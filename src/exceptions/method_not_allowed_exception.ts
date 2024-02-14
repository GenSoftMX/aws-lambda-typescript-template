

export class MethodNotAllowedException extends Error {
    constructor(msg: string) {
        super(msg);

        Object.setPrototypeOf(this, MethodNotAllowedException.prototype);
    }
}


