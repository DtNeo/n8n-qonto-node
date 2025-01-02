import {
	INodeProperties,
} from 'n8n-workflow';

export const transactionsOperations: INodeProperties[] = [

// ------------------------
//      TRANSACTIONS
// ------------------------
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'transactions',
				],
			},
		},
		options: [
			{
				name: 'List Transactions',
				value: 'listTransactions',
				action: 'List transactions a transactions',
			},
			{
				name: 'Show Transaction',
				value: 'showTransaction',
				action: 'Show transaction a transactions',
			},
		],
		default: 'listTransactions',
	},

// ------------------------
//      TRANSACTIONS - List transactions
// ------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: [
					'transactions',
				],
				operation: [
					'listTransactions',
				],
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: [
					'transactions',
				],
				operation: [
					'listTransactions',
				],
				returnAll: [
					false,
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
		displayName: 'Iban',
		name: 'iban',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'transactions',
				],
				operation: [
					'listTransactions',
				],
			},
		},
		placeholder: 'FR7616798000010000005663951',
		default: '',
		description: 'Retrieve all transactions within a particular bank account',
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
					'transactions',
				],
				operation: [
					'listTransactions',
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
			description: 'Allowed values: pending, declined, completed (no combinaison possible yet)',
		},
		{
			displayName: 'Updated_at_from',
			name: 'updated_at_from',
			type: 'dateTime',
			placeholder: '2019-01-10T11:47:53.123Z',
			default: '',
		},
		{
			displayName: 'Updated_at_to',
			name: 'updated_at_to',
			type: 'dateTime',
			placeholder: '2019-01-10T11:47:53.123Z',
			default: '',
		},
		{
			displayName: 'Emitted_at_from',
			name: 'emitted_at_from',
			type: 'dateTime',
			placeholder: '2019-01-10T11:47:53.123Z',
			default: '',
		},
		{
			displayName: 'Emitted_at_to',
			name: 'emitted_at_to',
			type: 'dateTime',
			placeholder: '2019-01-10T11:47:53.123Z',
			default: '',
		},
		{
			displayName: 'Settled_at_from',
			name: 'settled_at_from',
			type: 'dateTime',
			placeholder: '2019-01-10T11:47:53.123Z',
			default: '',
		},
		{
			displayName: 'Settled_at_to',
			name: 'settled_at_to',
			type: 'dateTime',
			placeholder: '2019-01-10T11:47:53.123Z',
			default: '',
		},
		{
			displayName: 'Side',
			name: 'side',
			type: 'options',
			options: [
				{
					name: 'Credit',
					value: 'credit',
				},
				{
					name: 'Debit',
					value: 'debit',
				},
			],
			default: 'credit',
			description: 'Transactions can be filtered using the side (credit or debit) query params : side=credit or side=debit',
		},
		{
			displayName: 'Operation Type',
			name: 'operation_type',
			type: 'string',
			placeholder: 'transfer',
			default: '',
			description: 'Card, transfer or income (no combinaison possible yet)',
		},
		{
			displayName: 'With_attachments',
			name: 'with_attachments',
			type: 'boolean',
			default: false,
			description: 'Whether transactions can be filtered based on the presence of one or more attachments. This is achieved using the with_attachments boolean param.',
		},
		{
			displayName: 'Labels',
			name: 'labels',
			type: 'boolean',
			default: false,
			description: 'Whether for each transactions, labels can be embedded in the response object, using the includes params',
		},
		{
			displayName: 'Attachments',
			name: 'attachments',
			type: 'boolean',
			default: false,
			description: 'Whether for each transactions, attachments can be embedded in the response object, using the includes params',
		},
	],
	},

// ------------------------
//      TRANSACTIONS - Show transaction
// ------------------------
	{
		displayName: 'ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'transactions',
				],
				operation: [
					'showTransaction',
				],
			},
		},
		placeholder: '7b7a5ed6-3903-4782-889d-b4f64bd7bef9',
		default: '',
		description: 'Retrieve a single transaction within a particular bank account',
	},
];
