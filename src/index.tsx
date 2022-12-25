import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Editor } from './components/Editor/Editor';
import { languageID } from './scenario-lang/config';
import {setupLanguage} from "./scenario-lang/setup";

setupLanguage();
const App = () => <Editor language={languageID}></Editor>;

ReactDOM.render(<App/>, document.getElementById('container'));