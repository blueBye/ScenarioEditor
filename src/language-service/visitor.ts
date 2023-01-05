import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor'
import { ScenarioGrammarVisitor } from '../ANTLR/ScenarioGrammarVisitor'
import { NumberContext } from "../ANTLR/ScenarioGrammarParser";
import { AdditionOrSubtractionContext } from "../ANTLR/ScenarioGrammarParser";
import { EquationContext } from "../ANTLR/ScenarioGrammarParser";
import { ExpressionContext } from "../ANTLR/ScenarioGrammarParser";


export class CustomVisitor extends AbstractParseTreeVisitor<object> implements ScenarioGrammarVisitor<object> {
    defaultResult() {
        return {};
    }

    aggregateResult(aggregate: object, nextResult: object) {
        return Object.assign(aggregate, nextResult);
    }

    visitEquation (ctx: EquationContext): object {
        console.log('visitEquation');
        return this.visitChildren(ctx)
    }

    visitExpression (ctx: ExpressionContext): object {
        console.log('visitExpression');
        return this.visitChildren(ctx)
    }

    visitNumber (ctx: NumberContext): object { 
        let obj = {'number' : ctx.text} 
        console.log('[+] visitNumber');
        console.log(obj)
        return obj;
    }

    visitAdditionOrSubtraction (ctx: AdditionOrSubtractionContext): object {
        const left = this.visit(ctx._left)
        const right = this.visit(ctx._right)
        
        var obj = {'addOrSub': `[[ ${left} ${ctx._operator.text} ${right} ]]`} 
        
        console.log('[+] visitAdditionOrSubtraction');
        console.log(obj)

        return obj;
    }
}
