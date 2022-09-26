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
		displayOptions: {
			show: {
				resource: [
					'requests',
				],
			},
		},
		options: [
			{
				name: 'List requests',
				value: 'listRequests',
				description: '',
			},
			{
				name: 'Approve a request',
				value: 'approveARequest',
				description: '',
			},
			{
				name: 'Decline a request',
				value: 'declineARequest',
				description: '',
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
		default: 10,
		description: 'How many results to return.',
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
			description: `Allowed values: pending, approved, canceled, declined (no combinaison possible yet)`,
		},
		{
			displayName: 'request_type',
			name: 'request_type',
			type: 'options',
			description: `request_type can take 4 different values:`,
			options: [
				{
					name: 'flash_card',
					value: 'flash_card',
					description: 'flash_card: a flash card is a non-physical card with a budget and a last day of validity. The card becomes inactive after the budget is totally spent or the last date of validity is past.',
				},
				{
					name: 'virtual_card',
					value: 'virtual_card',
					description: 'virtual_card: a virtual card is a non-physical card with a monthly budget. Card holder can spend that amount every calendar month. Above that, transactions will be refused.',
				},
				{
					name: 'transfer',
					value: 'transfer',
					description: 'transfer: a transfer of money from one Qonto account to another account.',
				},
				{
					name: 'multi_transfer',
					value: 'multi_transfer',
					description: 'multi_transfer: several transfers executed at the same time. A document can be provided to create a multi-transfer which is composed of many different transfers.',
				},
			],
			default: '',
		},
		{
			displayName: 'processed_at_from',
			name: 'processed_at_from',
			type: 'dateTime',
			placeholder: '2019-01-10T11:47:53.123Z',
			default: '',
			description: ``,
		},
		{
			displayName: 'created_at_from',
			name: 'created_at_from',
			type: 'dateTime',
			placeholder: '2019-01-10T11:47:53.123Z',
			default: '',
			description: ``,
		},
	],
	},
// ------------------------
//      REQUESTS - Approve a request
// ------------------------
	{
		displayName: 'id',
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
		description: `This endpoint allows you to approve a pending request.`,
	},
	{
		displayName: 'request_type',
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
				name: 'flash_cards',
				value: 'flash_cards',
				description: 'a flash card is a non-physical card with a budget and a last day of validity. The card becomes inactive after the budget is totally spent or the last date of validity is past.',
			},
			{
				name: 'virtual_cards',
				value: 'virtual_cards',
				description: 'a virtual card is a non-physical card with a monthly budget. Card holder can spend that amount every calendar month. Above that, transactions will be refused.',
			},
			{
				name: 'transfers',
				value: 'transfers',
				description: 'a transfer of money from one Qonto account to another account.',
			},
			{
				name: 'multi_transfers',
				value: 'multi_transfers',
				description: 'several transfers executed at the same time. A document can be provided to create a multi-transfer which is composed of many different transfers.',
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
		description: `IBAN of account to debit`,
	},

// ------------------------
//      REQUESTS - Decline a request
// ------------------------
	{
		displayName: 'id',
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
		description: `This endpoint allows you to approve a pending request.`,
	},
	{
		displayName: 'request_type',
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
				name: 'flash_cards',
				value: 'flash_cards',
				description: 'a flash card is a non-physical card with a budget and a last day of validity. The card becomes inactive after the budget is totally spent or the last date of validity is past.',
			},
			{
				name: 'virtual_cards',
				value: 'virtual_cards',
				description: 'a virtual card is a non-physical card with a monthly budget. Card holder can spend that amount every calendar month. Above that, transactions will be refused.',
			},
			{
				name: 'transfers',
				value: 'transfers',
				description: 'a transfer of money from one Qonto account to another account.',
			},
			{
				name: 'multi_transfers',
				value: 'multi_transfers',
				description: 'several transfers executed at the same time. A document can be provided to create a multi-transfer which is composed of many different transfers.',
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
		description: ``,
	},
];