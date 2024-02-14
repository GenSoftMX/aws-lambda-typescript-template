export class InvalidEntryDateException extends Error {
    constructor(msg: string) {
        super(msg);

        Object.setPrototypeOf(this, InvalidEntryDateException.prototype);
    }
}