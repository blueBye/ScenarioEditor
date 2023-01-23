import './Codegen.css'
import * as React from 'react';
import {useEffect, useState} from 'react';
import * as YAML from 'json-to-pretty-yaml';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';

const Codegen = ({model}) => {
    const topology = () => {
        
    }

    const generate = () => {
        const zip = new JSZip();
        zip.file('model.yaml', YAML.stringify(model));
        let provisioning = zip.folder('provisioning');

        zip.generateAsync({ type: 'blob' }).then(function(content) {
            saveAs(content, 'download.zip');
        });
    }

    return (
        <div className="controls">
            <button onClick={()=>generate()}>Download</button>
            <button onClick={()=>alert('not implemented')}>Validate</button>
        </div>
    )
}

export { Codegen };