import * as React from 'react';
import * as monaco from 'monaco-editor-core';

interface IEditorPorps {
    language: string;
}

const Editor: React.FC<IEditorPorps> = (props: IEditorPorps) => {
    let divNode;
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
        }
    }, [assignRef])

    return (
        <>
            <div ref={assignRef} style={{ height: '100%', width: '100%' }}></div>
            {/* <button onClick={onButtonPress}>Callback</button> */}
        </>
    )
}



export { Editor };