export default class ActionResultVoid {
    readonly success: boolean;
    readonly errorMessage?: string;

    constructor(success: boolean, errorMessage?: string) {
        this.success = success;
        this.errorMessage = errorMessage;
    }
}