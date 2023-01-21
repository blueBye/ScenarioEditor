import './Editor.css'
import * as React from 'react';
import * as monaco from 'monaco-editor-core';
import { mouseSubject } from '../../service.js' 
import { revealSubject } from '../../service.js'


interface IEditorPorps {
    language: string;
}

const Editor: React.FC<IEditorPorps> = (props: IEditorPorps) => {
    let divNode;
    let decorator = []
    const assignRef = React.useCallback((node) => {
        divNode = node;
    }, []);

    React.useEffect(() => {
        if (divNode) {
            const editor = monaco.editor.create(divNode, {
                language: props.language,
                minimap: { enabled: true },
                autoIndent: true,
                theme: 'vs-dark',
                roundedSelection: false,
                lineNumbers: 'on',
                scrollBeyondLastLine: true
            });

            editor.onMouseDown(function (e) {
                decorator = editor.deltaDecorations(
                    decorator,
                    []
                );
                mouseSubject.next(editor.getPosition())
            })

            revealSubject.subscribe(line=>{
                editor.revealLineInCenter(line['start'])
                decorator = editor.deltaDecorations(
                    decorator,
                    [
                        {
                            range: new monaco.Range(line['start'], 1, line['stop'], 1),
                            options: {
                                isWholeLine: true,
                                linesDecorationsClassName: 'lineDecoration'
                            }
                        }
                    ]
                );
            })

            
        }
    }, [assignRef])


    return (
        <>
            <div ref={assignRef} style={{ height: '100%', width: '100%' }}></div>
        </>
    )
}



export { Editor };