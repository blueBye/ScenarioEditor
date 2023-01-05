import { ANTLRErrorListener, RecognitionException, Recognizer } from "antlr4ts";


export interface ILangError {
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
    message: string;
    code: string;
}

export class LangErrorListener implements ANTLRErrorListener<any>{
    private errors: ILangError[] = []
    syntaxError(recognizer: Recognizer<any, any>, offendingSymbol: any, line: number, charPositionInLine: number, message: string, e: RecognitionException | undefined): void {
        
        this.errors.push(
            {
                startLineNumber:line,
                endLineNumber: line,
                startColumn: charPositionInLine,
                //Let's suppose the length of the error is only 1 char for simplicity
                endColumn: charPositionInLine+1,
                message,
                // This the error code you can customize them as you want
                code: "1"
            }
        )
    }

    getErrors(): ILangError[] {
        return this.errors;
    }
}