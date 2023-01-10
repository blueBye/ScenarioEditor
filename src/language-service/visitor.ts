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
        console.log('visitScenario')
        return this.visitChildren(ctx)
    }

    visitBlock (ctx: BlockContext): object {
        console.log('visitBlock')
        return this.visitChildren(ctx)
    }

    visitVariable (ctx: VariableContext): object { 
        console.log('visitVariable')
        return this;
    }

    // visitAdditionOrSubtraction (ctx: AdditionOrSubtractionContext): object {
    //     const left = this.visit(ctx._left)
    //     const right = this.visit(ctx._right)
        
    //     var obj = {'addOrSub': `[[ ${left} ${ctx._operator.text} ${right} ]]`} 
        
    //     console.log('[+] visitAdditionOrSubtraction');
    //     console.log(obj)

    //     return obj;
    // }
}
