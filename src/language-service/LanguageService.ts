import { EquationContext } from "../ANTLR/ScenarioGrammarParser";
import { parseAndGetASTRoot, parseAndGetSyntaxErrors } from "./Parser";
import { ITLangError } from "./LangErrorListener";

export default class LanguageService {
    validate(code: string): ILangError[] {
        const syntaxErrors: ILangError[] = parseAndGetSyntaxErrors(code);
        //Later we will append semantic errors
        return syntaxErrors;
    }
}