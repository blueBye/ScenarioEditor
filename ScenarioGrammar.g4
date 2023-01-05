grammar ScenarioGrammar;

equation: expression;

expression:
	NUMBER															# Number
	| left = expression operator = (ADD | SUB) right = expression	# AdditionOrSubtraction;

ADD: '+';
SUB: '-';

NUMBER: [0-9]+;

/* We're going to ignore all white space characters */
WHITESPACE: [ \r\n\t]+ -> channel(HIDDEN);