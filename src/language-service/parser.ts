import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor'
import { ScenarioGrammarLexer } from '../ANTLR/ScenarioGrammarLexer'
import { ScenarioGrammarParser, ScenarioContext } from '../ANTLR/ScenarioGrammarParser'
import { ScenarioGrammarVisitor } from '../ANTLR/ScenarioGrammarVisitor'
import { ILangError, LangErrorListener } from './ErrorListener';


export default function parse(code: string): {ast: ScenarioContext, errors: ILangError[]} {
    let inputStream = new ANTLRInputStream(code);
    let lexer = new ScenarioGrammarLexer(inputStream);

    // lexer error listener
    lexer.removeErrorListeners()
    const langErrorsListner = new LangErrorListener();
    lexer.addErrorListener(langErrorsListner);

    // parser error listener
    let tokenStream = new CommonTokenStream(lexer);
    let parser = new ScenarioGrammarParser(tokenStream);
    parser.removeErrorListeners();
    parser.addErrorListener(langErrorsListner);

    let ast = parser.scenario();
    const errors: ILangError[]  = langErrorsListner.getErrors();
    // console.log(tree.toStringTree(parser));

    return {ast, errors};
}

export function parseAndGetASTRoot(code: string): ScenarioContext {
    const {ast} = parse(code);
    return ast;
}
export function parseAndGetSyntaxErrors(code: string): ILangError[] {
    const {errors} = parse(code);
    return errors;
}