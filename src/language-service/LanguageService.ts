import { parseAndGetASTRoot, parseAndGetSyntaxErrors } from "./Parser";
import { CustomVisitor } from './Visitor'
import { ILangError } from "./ErrorListener";


export default class LanguageService {
    validate(code: string): ILangError[] {
        // syntax error handle
        const syntaxErrors: ILangError[] = parseAndGetSyntaxErrors(code);

        return syntaxErrors;
    }

    getOModel(code: string): object {
        // visitor
        const tree = parseAndGetASTRoot(code)
        const visitor = new CustomVisitor()
        const model = visitor.visit(tree)
        return model;
    }
}