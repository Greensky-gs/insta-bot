import { CommandOptions, commandRunFunction } from '../typings/structures';

export class Command<T extends CommandOptions> {
    private _options: T;
    private _run: commandRunFunction = undefined;

    constructor(options: T) {
        this._options = options;
    }

    public get options() {
        return this._options;
    }
    public setRun(run: commandRunFunction): this {
        this._run = run;
        return this;
    }
    public get run() {
        return this._run;
    }
}
