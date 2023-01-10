grammar ScenarioGrammar;

scenario: block+;

block: blockName ':' (variable)+;
variable: variableName ':' variableValue EOL;

blockName: BLOCK;
variableName: VARIABLE;
variableValue: STRING;

VARIABLE: [a-z][a-z0-9_]*;
BLOCK: [A-Z][A-Z0-9_]*;
STRING: '"' (~[#"])+ '"';
COMMENT: '#' (~[\n])* -> skip;
EOL: [\r\n]+;
WHITESPACE: [ \t\r\n]+ -> skip;