import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Editor } from './components/Editor/Editor';
import { GView } from './components/GView/GView';
import { languageID } from './scenario-lang/config';
import {setupLanguage} from "./scenario-lang/setup";
import * as YAML from 'json-to-pretty-yaml'

// import parse from "./language-service/Parser";


setupLanguage();

const App = () => {
    return(
    <>
        <div>{name}</div>
        <GView></GView>
        <Editor language={languageID}></Editor>
    </>
    )
};

ReactDOM.render(<App/>, document.getElementById('container'));



