import { parseAndGetASTRoot, parseAndGetSyntaxErrors } from "./Parser";
import { CustomVisitor } from './Visitor'
import { ILangError } from "./ErrorListener";

export default class LanguageService {
    validate(code: string): ILangError[] {
        // syntax error handle
        const syntaxErrors: ILangError[] = parseAndGetSyntaxErrors(code);
        
        // semantic error handler

        // visitor
        const tree = parseAndGetASTRoot(code)
        const visitor = new CustomVisitor()
        const obj = visitor.visit(tree)
        
        // modify view
        const view = document.getElementById("view")
        console.log(view)
        // view.innerHTML = '';
        for (const key of Object.keys(obj)){
            
            // const node = document.createElement("div");
            // view.appendChild(node)
            console.log('>>' + key)
        }
        // console.log(obj)

        return syntaxErrors;
    }
}