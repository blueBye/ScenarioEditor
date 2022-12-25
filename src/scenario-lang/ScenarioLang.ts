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
        'prerequisites',
        'outcomes',
        'released',
        'report',
        'smart',
        'passkey',
        'question',
        'answer',
        'solution',
        'hints',
        'attachments',
        'questions',
        'instructions',
        'questionnarie',
        'test',
        'states',
        'title',
        'content',
        'ffq',
        'mcq',
        'emi',
        'points',
        'penalty',
        'choices',
        'correct',
        'text',
        'entity',
        'options',
        'Own',
        'Access',
        'Read',
        'Write',
        'Execute',
        'Active',
        'Exist',
        'cidr',
        'hidden',
        'accounts',
        'image',
        'flavour',
        'wirm',
        'ssh',
        'routes',
        'username',
        'password',
        'home',
        'groups',
        'shell',
        'files',
        'softwares',
        'services',
        'software',
        'version',
        'repo',
        'command',
        'src',
        'dst',
        'owner',
        'mode',
        'status',
        'reloaded',
        'restarted',
        'started',
        'stopped',
        'gateway',
        'mask',
        'net',
        'state',
        'children',
        'preconditions',
        'postconditions',
        'callback',
        'members',
        'levels',
        'description'
    ],
    typeKeywords: [
        'level', 
        'trainee',
        'group', 
        'network',
        'server',
        'router',
        'file',
        'service',
        'account'
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