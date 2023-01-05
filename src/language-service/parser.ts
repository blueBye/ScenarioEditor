import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor'
import { ScenarioGrammerLexer } from '../ANTLR/ScenarioGrammerLexer'
import { ScenarioGrammerParser, EquationContext } from '../ANTLR/ScenarioGrammerParser'
import { ScenarioGrammerVisitor } from '../ANTLR/ScenarioGrammerVisitor'


export default function getAST(code: string): EquationContext {
    let inputStream = new ANTLRInputStream(code);
    let lexer = new ScenarioGrammerLexer(inputStream);
    let tokenStream = new CommonTokenStream(lexer);
    let parser = new ScenarioGrammerParser(tokenStream);
    
    let tree = parser.equation();
    // console.log(tree.toStringTree(parser));

    return tree;
}