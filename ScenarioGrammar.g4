grammar ScenarioGrammar;

scenario: block+;
block: name = BLOCK ':' EOL (variable)+;
variable: k = VARIABLE ':' v = STRING EOL;

VARIABLE: [a-z][a-z0-9_]*;
BLOCK: [A-Z][A-Z0-9_]*;
STRING: '"' (~[#"])+ '"';
COMMENT: '#' (~[\n])* -> skip;
EOL: [\r\n]+;
WHITESPACE: [ \t]+ -> skip;