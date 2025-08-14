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
				name: 'Retrieve a Transaction',
				value: 'showTransaction',
				action: 'Returns the transaction identified by the id path parameter',
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
    displayName: 'Identifier Type',
    name: 'identifierType',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
        show: {
            resource: ['transactions'],
            operation: ['listTransactions'],
        },
    },
    options: [
        {
            name: 'IBAN',
            value: 'iban',
            description: 'Use the IBAN to identify the account',
        },
        {
            name: 'Bank Account ID',
            value: 'bankAccountId',
            description: 'Use the internal Qonto ID to identify the account',
        },
    ],
    default: 'iban',
	},
	{
			displayName: 'IBAN',
			name: 'iban',
			type: 'string',
			required: true,
			displayOptions: {
        show: {
            resource: ['transactions'],
            operation: ['listTransactions'],
						identifierType: ['iban'],
        },
    },
			placeholder: 'FR7616798000010000005663951',
			default: '',
			description: 'The IBAN of the account to retrieve transactions from',
	},
	{
			displayName: 'Bank Account ID',
			name: 'bankAccountId',
			type: 'string',
			required: true,
			displayOptions: {
        show: {
            resource: ['transactions'],
            operation: ['listTransactions'],
            identifierType: ['bankAccountId'],
        },
    },
			placeholder: '018f71db-c635-78b5-b90a-ea05de98c2bf',
			default: '',
			description: 'The ID of the account to retrieve transactions from',
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
			displayName: 'Attachments',
			name: 'attachments',
			type: 'boolean',
			default: false,
			description: 'Whether for each transactions, attachments can be embedded in the response object, using the includes params',
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
			displayName: 'Labels',
			name: 'labels',
			type: 'boolean',
			default: false,
			description: 'Whether for each transactions, labels can be embedded in the response object, using the includes params',
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
			displayName: 'With_attachments',
			name: 'with_attachments',
			type: 'boolean',
			default: false,
			description: 'Whether transactions can be filtered based on the presence of one or more attachments. This is achieved using the with_attachments boolean param.',
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
