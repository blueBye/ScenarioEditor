grammar ScenarioGrammer;

// Rule Scenario
ruleScenario:
	'title' RULE_STRING ('description' RULE_STRING)? (
		'prerequisites' RULE_STRING+
	)? ('outcomes' RULE_STRING+)? 'released'? 'show_stepper_bar'? 'estimated_duration' RULE_INT (
		'monitoring_server' RULE_STRING
	)? 'monitoring_type' ('report' | 'smart' | 'questionnarie') 'kypo_global_openstack_stack_id'
		RULE_STRING 'kypo_global_pool_id' RULE_STRING 'kypo_global_sandbox_allocation_unit_id'
		RULE_STRING 'kypo_global_sandbox_ip' RULE_STRING 'kypo_global_sandbox_name' RULE_STRING
		'kypo_global_head_ip' RULE_STRING 'kypo_global_ssh_public_user_key' RULE_STRING
		'kypo_global_ssh_public_mgmt_key' RULE_STRING '#infrastructure' ruleITEntity+ (
		'#management_groups' ruleTopologyGroup+
	)? ('#states' ruleState+)? ('#levels' ruleLevel+)? (
		'#trainees' ruleTrainee+
	)? ('#groups' ruleTrainingGroup+)?;

// Rule Level
ruleLevel:
	'level' RULE_ID 'title' RULE_STRING ('content' RULE_STRING)? 'level_type' (
		'info_level'
		| 'training_level'
		| 'assessment_level'
		| 'access_level'
	) 'estimated_duration' RULE_INT ('passkey' RULE_STRING)? (
		'cloud_content' RULE_STRING
	)? ('local_content' RULE_STRING)? ('max_score' RULE_INT)? (
		'question' ruleQuestion
	)? ('answer' RULE_STRING)? (
		'answer_variable_name' RULE_STRING
	)? 'variant_answers'? ('solution' RULE_STRING)? 'solution_penalized'? (
		'hints' ruleHint+
	)? ('incorrect_answer_limit' RULE_INT)? (
		'reference_solution' RULE_STRING+
	)? ('attachments' RULE_STRING+)? ('questions' ruleQuestion+)? (
		'instructions' RULE_STRING
	)? ('assessment_type' ( 'questionnarie' | 'test'))? (
		'states' RULE_ID+
	)?;

// Rule Hint
ruleHint:
	'title' RULE_STRING 'content' RULE_STRING 'hint_penalty' RULE_INT;

// Rule Question
ruleQuestion:
	'question_type' ('ffq' | 'mcq' | 'emi') 'text' RULE_STRING 'points' RULE_INT 'penalty' RULE_INT
		'answer_required'? ('choices' ruleChoices+)? (
		'extended_matching_options' ruleExtendedMatchingOption+
	)? (
		'extended_matching_statements' ruleExtendedMatchingStatement+
	)?;

// Rule Choices
ruleChoices: 'text' RULE_STRING 'correct'?;

// Rule ExtendedMatchingOption
ruleExtendedMatchingOption: 'text' RULE_STRING;

// Rule ExtendedMatchingStatement
ruleExtendedMatchingStatement:
	'text' RULE_STRING ('correct_option_order' RULE_INT)?;

// Rule ITEntity
ruleITEntity:
	'entity' ruleITEntityType RULE_ID ('description' RULE_STRING)? (
		'options' ruleITEntityOption
	)? 'initial_status' ruleITEntityStatus (
		'initial_permissions' ruleITEntityPermission+
	)? ('docker_compose' RULE_STRING)?;

// Rule ITEntityType
ruleITEntityType:
	(
		'network'
		| 'server'
		| 'router'
		| 'account'
		| 'software'
		| 'file'
		| 'service'
	);

// Rule ITEntityPermission
ruleITEntityPermission:
	'!'? ('Own' | 'Access' | 'Read' | 'Write' | 'Execute');

// Rule ITEntityStatus
ruleITEntityStatus: '!'? ( 'Active' | 'Exist');

// Rule ITEntityOption
ruleITEntityOption:
	(
		ruleNetworkOptions
		| ruleServerOptions
		| ruleRouterOptions
		| ruleAccountOptions
		| ruleSoftwareOptions
		| ruleFileOptions
		| ruleServiceOptions
	);

// Rule NetworkOptions
ruleNetworkOptions:
	'cidr' RULE_STRING 'accessible_by_user'? ruleNetMapping+;

// Rule ServerOptions
ruleServerOptions:
	'image' RULE_STRING 'flavour' RULE_STRING 'mgmt_user' RULE_STRING (
		'mgmt_protocol' ( 'wirm' | 'ssh')
	)? 'hidden'? ('accounts' RULE_ID+)?;

// Rule RouterOptions
ruleRouterOptions:
	'image' RULE_STRING 'flavour' RULE_STRING 'mgmt_user' RULE_STRING (
		'mgmt_protocol' ( 'wirm' | 'ssh')
	)? ruleRouterMapping+ ('routes' ruleRoute+)?;

// Rule AccountOptions
ruleAccountOptions:
	'username' RULE_STRING 'password' RULE_STRING (
		'home' RULE_STRING
	)? ('groups' RULE_STRING)? ('shell' RULE_STRING)? (
		'files' RULE_ID+
	)? ('softwares' RULE_ID+)? ('services' RULE_ID+)?;

// Rule SoftwareOptions
ruleSoftwareOptions:
	'software' RULE_STRING ('version' RULE_STRING)? (
		'repo' RULE_STRING
	)? ('file' RULE_ID)? ('command' RULE_STRING)?;

// Rule FileOptions
ruleFileOptions:
	'src' RULE_STRING 'dst' RULE_STRING ('owner' RULE_STRING)? (
		'mode' RULE_STRING
	)?;

// Rule ServiceOptions
ruleServiceOptions:
	'service' RULE_STRING 'status' (
		'reloaded'
		| 'restarted'
		| 'started'
		| 'stopped'
	);

// Rule NetMapping
ruleNetMapping: 'net_mapping' RULE_ID RULE_STRING;

// Rule RouterMapping
ruleRouterMapping: 'router_mapping' RULE_ID RULE_STRING;

// Rule Route
ruleRoute:
	'gateway' RULE_STRING 'mask' RULE_STRING 'net' RULE_STRING;

// Rule TopologyGroup
ruleTopologyGroup: 'group' RULE_ID ruleITEntity+;

// Rule State
ruleState:
	'state' RULE_ID ('description' RULE_STRING)? (
		'children' RULE_ID+
	)? ('preconditions' ruleCondition+)? (
		'postconditions' ruleCondition+
	)? ('callback' RULE_STRING)?;

// Rule Condition
ruleCondition: ( rulePermissionCondition | ruleStatusCondition);

// Rule PermissionCondition
rulePermissionCondition: RULE_ID ruleITEntityPermission;

// Rule StatusCondition
ruleStatusCondition: RULE_ID ruleITEntityStatus;

// Rule TrainingGroup
ruleTrainingGroup:
	'group' RULE_ID ('description' RULE_STRING)? 'members' RULE_ID+ (
		'target_states' RULE_ID+
	)? ('levels' RULE_ID+)? 'ignore-validation'?;

// Rule Trainee
ruleTrainee:
	'trainee' RULE_ID ('description' RULE_STRING)? 'initial_state' RULE_ID (
		'level' RULE_ID
	)?;

RULE_ID:
	'^'? ('a' ..'z' | 'A' ..'Z' | '_') (
		'a' ..'z'
		| 'A' ..'Z'
		| '_'
		| '0' ..'9'
	)*;

RULE_INT: ('0' ..'9')+;

RULE_STRING: (
		'"' ('\\' . | ~('\\' | '"'))* '"'
		| '\'' ('\\' . | ~('\\' | '\''))* '\''
	);

RULE_ML_COMMENT: '/*' ()*? '*/' -> skip;

	RULE_SL_COMMENT:
		'//' ~('\n' | '\r')* ('\r'? '\n')? -> skip;

	RULE_WS: (' ' | '\t' | '\r' | '\n')+ -> skip;

	RULE_ANY_OTHER: .;
	