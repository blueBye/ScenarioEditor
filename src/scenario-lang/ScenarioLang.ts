import { languageID } from './config';
import * as monaco from "monaco-editor-core";
import IRichLanguageConfiguration = monaco.languages.LanguageConfiguration;
import ILanguage = monaco.languages.IMonarchLanguage;


export const richLanguageConfiguration: IRichLanguageConfiguration = {
    // If we want to support code folding, brackets ... ( [], (), {}....), we can override some properties here
    // check the doc
};

export const monarchLanguage = <ILanguage>{
    // Set defaultToken to invalid to see what you do not tokenize yet
    defaultToken: 'invalid',
    keywords: [
        'accounts',
        'mgmt_user',
        'mgmt_protocol',
        'type',
        'owner',
        'mode',
        'unarchive',
        'image',
        'flavor',
        'src',
        'cidr',
        'accessible',
        'dst',
    ],
    typeKeywords: [
        'SERVER', 
        'FILE',
        'NETWORK', 
        'ROUTER',
        'SERVICE',
        'ACCOUNT',
        'LEVEL',
        'TRAINEE',
        'GROUP'
    ],
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    // The main tokenizer for our languages
    tokenizer: {
        root: [
            // identifiers and keywords
            [/[a-zA-Z_$][\w$]*/, {
                cases: {
                    '@keywords': { token: 'keyword' },
                    '@typeKeywords': { token: 'type' },
                    '@default': 'identifier'
                }
            }],
            // whitespace
            { include: '@whitespace' },
            // strings for todos
            [/"([^"\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
            [/"/, 'string', '@string'],
        ],
        whitespace: [
			[/[ \t\r\n]+/, ''],
		],
        string: [
            [/[^\\"]+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/"/, 'string', '@pop']
        ]
    },
}

monaco.languages.registerCompletionItemProvider(languageID, {
	provideCompletionItems: (model, position) => {
        var word = model.getWordUntilPosition(position);
        var range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn
        };
		var suggestions = [
			{
				label: 'SERVER',
				kind: monaco.languages.CompletionItemKind.Snippet,
				insertText: 'SERVER_NAME:\n\ttype: "server"\n\tflavor: "replace"\n\timage: "replace"\n\tmgmt_user: "replace"\n\tmgmt_protocol: "replace"\n\taccounts: "replace [format: acc1,acc2,...]"\n',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: range
			},
            {
				label: 'FILE',
				kind: monaco.languages.CompletionItemKind.Snippet,
				insertText: 'FILE_NAME:\n\ttype: "file"\n\tsrc: "replace"\n\tdst: "replace"\n\towner: "replace"\n\tmode: "replace"\n\tunarchive: "false"\n',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: range
			},
            {
				label: 'NETWORK',
				kind: monaco.languages.CompletionItemKind.Snippet,
				insertText: 'NETWORK_NAME:\n\ttype: "network"\n\tcidr: "replace"\n\taccessible: "false"\n\tnet_mappings: "replace"\n',
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: range
			},
		];
		return { suggestions: suggestions };
	}
});