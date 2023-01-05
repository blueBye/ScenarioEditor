import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Editor } from './components/Editor/Editor';
import { languageID } from './scenario-lang/config';
import {setupLanguage} from "./scenario-lang/setup";
import * as YAML from 'json-to-pretty-yaml'


// ========================== 1
// import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts';
// import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor'
// import { ScenarioGrammerLexer } from './ANTLR/ScenarioGrammerLexer'
// import { ScenarioGrammerParser } from './ANTLR/ScenarioGrammerParser'
// import { ScenarioGrammerVisitor } from './ANTLR/ScenarioGrammerVisitor'

// let inputStream = new ANTLRInputStream('13+2+1');
// let lexer = new ScenarioGrammerLexer(inputStream);
// let tokenStream = new CommonTokenStream(lexer);
// let parser = new ScenarioGrammerParser(tokenStream);
// let tree = parser.equation();
// console.log(tree.toStringTree(parser));


// ========================== 2
// import { CustomVisitor } from './utils/visitor'
// const countFunctionsVisitor = new CustomVisitor()
// console.log("===========")
// console.log(countFunctionsVisitor.visit(tree))
// console.log("===========")


// ========================== 3


const json = { "a": 1, "b": 2, "c": 3 };
const data = YAML.stringify(json);
console.log("data: ")
console.log(data)

// ========================== base
setupLanguage();
const App = () => <Editor language={languageID}></Editor>;

ReactDOM.render(<App/>, document.getElementById('container'));



