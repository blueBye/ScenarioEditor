import { parseAndGetASTRoot, parseAndGetSyntaxErrors } from "./Parser";
import { ILangError } from "./ErrorListener";

export default class LanguageService {
    validate(code: string): ILangError[] {
        const syntaxErrors: ILangError[] = parseAndGetSyntaxErrors(code);
        //Later we will append semantic errors
        return syntaxErrors;
    }
}