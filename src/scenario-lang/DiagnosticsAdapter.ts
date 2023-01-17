import * as monaco from "monaco-editor-core";
import { WorkerAccessor } from "./setup";
import { languageID } from "./config";
import { ILangError } from "../language-service/ErrorListener";
import { subject } from '../service.js'


export default class DiagnosticsAdapter {
    constructor(private worker: WorkerAccessor) {
        const onModelAdd = (model: monaco.editor.IModel): void => {
            let handle: any;

            const sendMessage = (message: object) => {
                subject.next(message)
            }
            
            model.onDidChangeContent(() => {
                clearTimeout(handle);
                handle = setTimeout(() => this.validate(model.uri, sendMessage), 500);
            });
            this.validate(model.uri, sendMessage);
        };
        monaco.editor.onDidCreateModel(onModelAdd);
        monaco.editor.getModels().forEach(onModelAdd);
    }
    private async validate(resource: monaco.Uri, sendMessage): Promise<void> {
        // get the worker proxy
        const worker = await this.worker(resource)
        // call the validate methode proxy from the langaueg service and get errors
        const errorMarkers = await worker.doValidation();
        // get the current model(editor or file) which is only one
        const model = monaco.editor.getModel(resource);
        // add the error markers and underline them with severity of Error
        monaco.editor.setModelMarkers(model, languageID, errorMarkers.map(toDiagnostics));

        sendMessage(await worker.doGetJson())
    }
}

function toDiagnostics(error: ILangError): monaco.editor.IMarkerData {
    return {
        ...error,
        severity: monaco.MarkerSeverity.Error,
    };
}