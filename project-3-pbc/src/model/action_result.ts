

export default class ActionResult<T> {
    readonly success: boolean;
    readonly errorMessage?: string;
    readonly payload?: T;

    constructor(success: boolean, errorMessage?: string, payload?: T) {
        this.success = success;
        this.errorMessage = errorMessage;
        this.payload = payload;
    }
}