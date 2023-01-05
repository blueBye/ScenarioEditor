import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Editor } from './components/Editor/Editor';
import { languageID } from './scenario-lang/config';
import {setupLanguage} from "./scenario-lang/setup";
import * as YAML from 'json-to-pretty-yaml'

import parse from "./language-service/parser";


const code = '13+2+1';
let {ast} = parse(code);
console.log(ast);

// ========================== 2
// import { CustomVisitor } from './utils/visitor'
// const countFunctionsVisitor = new CustomVisitor()
// console.log("===========")
// console.log(countFunctionsVisitor.visit(tree))
// console.log("===========")


// ========================== 3


// const json = { "a": 1, "b": 2, "c": 3 };
// const data = YAML.stringify(json);
// console.log("data: ")
// console.log(data)

// ========================== base
setupLanguage();
const App = () => <Editor language={languageID}></Editor>;

ReactDOM.render(<App/>, document.getElementById('container'));



