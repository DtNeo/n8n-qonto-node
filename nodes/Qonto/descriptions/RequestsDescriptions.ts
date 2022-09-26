import {
	INodeProperties,
} from 'n8n-workflow';

export const requestsOperations: INodeProperties[] = [

// ------------------------
//      REQUESTS
// ------------------------

	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'requests',
				],
			},
		},
		options: [
			{
				name: 'List Requests',
				value: 'listRequests',
				action: 'List requests a requests',
			},
			{
				name: 'Approve a Request',
				value: 'approveARequest',
				action: 'Approve a request a requests',
			},
			{
				name: 'Decline a Request',
				value: 'declineARequest',
				action: 'Decline a request a requests',
			},
		],
		default: 'listRequests',
	},
// ------------------------
//      REQUESTS - List requests
// ------------------------

	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: [
					'requests',
				],
				operation: [
					'listRequests',
				],
			},
		},
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'requests',
				],
				operation: [
					'listRequests',
				],
			},
		},
		options: [
		{
			displayName: 'Status',
			name: 'status',
			type: 'string',
			placeholder: 'settled',
			default: '',
			description: 'Allowed values: pending, approved, canceled, declined (no combinaison possible yet)',
		},
		{
			displayName: 'Request_type',
			name: 'request_type',
			type: 'options',
			description: 'Request_type can take 4 different values:',
			options: [
				{
					name: 'Flash_card',
					value: 'flash_card',
					description: 'Flash_card: a flash card is a non-physical card with a budget and a last day of validity. The card becomes inactive after the budget is totally spent or the last date of validity is past.',
				},
				{
					name: 'Virtual_card',
					value: 'virtual_card',
					description: 'Virtual_card: a virtual card is a non-physical card with a monthly budget. Card holder can spend that amount every calendar month. Above that, transactions will be refused.',
				},
				{
					name: 'Transfer',
					value: 'transfer',
					description: 'Transfer: a transfer of money from one Qonto account to another account',
				},
				{
					name: 'Multi_transfer',
					value: 'multi_transfer',
					description: 'Multi_transfer: several transfers executed at the same time. A document can be provided to create a multi-transfer which is composed of many different transfers.',
				},
			],
			default: 'flash_card',
		},
		{
			displayName: 'Processed_at_from',
			name: 'processed_at_from',
			type: 'dateTime',
			placeholder: '2019-01-10T11:47:53.123Z',
			default: '',
		},
		{
			displayName: 'Created_at_from',
			name: 'created_at_from',
			type: 'dateTime',
			placeholder: '2019-01-10T11:47:53.123Z',
			default: '',
		},
	],
	},
// ------------------------
//      REQUESTS - Approve a request
// ------------------------
	{
		displayName: 'ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'requests',
				],
				operation: [
					'approveARequest',
				],
			},
		},
		placeholder: 'UUID of the request to be processed.',
		default: '',
		description: 'This endpoint allows you to approve a pending request',
	},
	{
		displayName: 'Request_type',
		name: 'request_type',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'requests',
				],
				operation: [
					'approveARequest',
				],
			},
		},
		options: [
			{
				name: 'Flash_cards',
				value: 'flash_cards',
				description: 'A flash card is a non-physical card with a budget and a last day of validity. The card becomes inactive after the budget is totally spent or the last date of validity is past.',
			},
			{
				name: 'Virtual_cards',
				value: 'virtual_cards',
				description: 'A virtual card is a non-physical card with a monthly budget. Card holder can spend that amount every calendar month. Above that, transactions will be refused.',
			},
			{
				name: 'Transfers',
				value: 'transfers',
				description: 'A transfer of money from one Qonto account to another account',
			},
			{
				name: 'Multi_transfers',
				value: 'multi_transfers',
				description: 'Several transfers executed at the same time. A document can be provided to create a multi-transfer which is composed of many different transfers.',
			},
		],
		default: 'transfers',
	},
	{
		displayName: 'Debit IBAN',
		name: 'debit_iban',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'requests',
				],
				operation: [
					'approveARequest',
				],
			},
		},
		default: '',
		description: 'IBAN of account to debit',
	},

// ------------------------
//      REQUESTS - Decline a request
// ------------------------
	{
		displayName: 'ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'requests',
				],
				operation: [
					'declineARequest',
				],
			},
		},
		placeholder: 'UUID of the request to be processed.',
		default: '',
		description: 'This endpoint allows you to approve a pending request',
	},
	{
		displayName: 'Request_type',
		name: 'request_type',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'requests',
				],
				operation: [
					'declineARequest',
				],
			},
		},
		options: [
			{
				name: 'Flash_cards',
				value: 'flash_cards',
				description: 'A flash card is a non-physical card with a budget and a last day of validity. The card becomes inactive after the budget is totally spent or the last date of validity is past.',
			},
			{
				name: 'Virtual_cards',
				value: 'virtual_cards',
				description: 'A virtual card is a non-physical card with a monthly budget. Card holder can spend that amount every calendar month. Above that, transactions will be refused.',
			},
			{
				name: 'Transfers',
				value: 'transfers',
				description: 'A transfer of money from one Qonto account to another account',
			},
			{
				name: 'Multi_transfers',
				value: 'multi_transfers',
				description: 'Several transfers executed at the same time. A document can be provided to create a multi-transfer which is composed of many different transfers.',
			},
		],
		default: 'transfers',
	},
	{
		displayName: 'Declined Note',
		name: 'declined_note',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'requests',
				],
				operation: [
					'declineARequest',
				],
			},
		},
		default: '',
	},
];