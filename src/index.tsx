import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Editor } from './components/Editor/Editor';
import { languageID } from './scenario-lang/config';
import {setupLanguage} from "./scenario-lang/setup";
import * as YAML from 'json-to-pretty-yaml'

import parse from "./language-service/Parser";



setupLanguage();
const App = () => {
    return(
    <>
        <Editor language={languageID}></Editor>
    </>
    )
};

ReactDOM.render(<App/>, document.getElementById('container'));



