import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor'
import { ScenarioGrammarVisitor } from '../ANTLR/ScenarioGrammarVisitor'
import { BlockContext } from "../ANTLR/ScenarioGrammarParser";
import { ScenarioContext } from "../ANTLR/ScenarioGrammarParser";
import { VariableContext } from "../ANTLR/ScenarioGrammarParser";
import { ListContext } from "../ANTLR/ScenarioGrammarParser";
import { v4 as uuid } from 'uuid';


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
        return {
            [uuid()]: {
                type: ctx._name.text,
                _line_start: ctx.start.line,
                _line_stop: ctx.stop.line,
                ...this.visitChildren(ctx)
            }
        }
    }

    visitVariable (ctx: VariableContext): object {
        
        return {
            [ctx._k.text]: ctx._v.text.slice(1,-1)
        }
    }
}
