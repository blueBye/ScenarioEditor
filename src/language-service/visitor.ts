import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor'
import { ScenarioGrammarVisitor } from '../ANTLR/ScenarioGrammarVisitor'
import { BlockContext } from "../ANTLR/ScenarioGrammarParser";
import { ScenarioContext } from "../ANTLR/ScenarioGrammarParser";
import { VariableContext } from "../ANTLR/ScenarioGrammarParser";


export class CustomVisitor extends AbstractParseTreeVisitor<object> implements ScenarioGrammarVisitor<object> {
    defaultResult() {
        return {};
    }

    aggregateResult(aggregate: object, nextResult: object) {
        return Object.assign(aggregate, nextResult);
    }

    visitScenario (ctx: ScenarioContext): object {
        return this.visitChildren(ctx)
    }

    visitBlock (ctx: BlockContext): object {
        return {[ctx._name.text]: this.visitChildren(ctx)}
    }

    visitVariable (ctx: VariableContext): object { 
        return {[ctx._k.text]: ctx._v.text}
    }
}
