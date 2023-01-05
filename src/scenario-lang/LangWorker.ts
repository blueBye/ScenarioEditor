import * as monaco from "monaco-editor-core";

import IWorkerContext = monaco.worker.IWorkerContext;
import LanguageService from "../language-service/LanguageService";
import { ITodoLangError } from "../language-service/ErrorListener";


export class LangWorker {
    private _ctx: IWorkerContext;
    private languageService: LanguageService;
    constructor(ctx: IWorkerContext) {
        this._ctx = ctx;
        this.languageService = new LanguageService();
    }

    doValidation(): Promise<ITodoLangError[]> {
        const code = this.getTextDocument();
        return Promise.resolve(this.languageService.validate(code));
    }

    private getTextDocument(): string {
        // When there are multiple files open, this will be an array
        const model = this._ctx.getMirrorModels()[0];
        return model.getValue();
    }
}