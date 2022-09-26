import {
	INodeProperties,
} from 'n8n-workflow';

export const externalTransfersOperations: INodeProperties[] = [

// ------------------------
//      EXTERNAL TRANSFERS
// ------------------------

	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'externalTransfers',
				],
			},
		},
		options: [
			{
				name: 'Create External Transfers with Creditor Data',
				value: 'createExternalTransfersWithCreditorData',
				action: 'Create external transfers with creditor data an external transfers',
			},
			{
				name: 'List External Transfers',
				value: 'listExternalTransfers',
				action: 'List external transfers an external transfers',
			},
			{
				name: 'Create an External Transfer',
				value: 'createAnExternalTransfer',
				action: 'Create an external transfer an external transfers',
			},
			{
				name: 'Show an External Transfer',
				value: 'showAnExternalTransfer',
				action: 'Show an external transfer an external transfers',
			},
		],
		default: 'createExternalTransfersWithCreditorData',
	},

// ------------------------
//      EXTERNAL TRANSFERS - Create external transfers with creditor data
// ------------------------

	{
		displayName: 'Debit IBAN',
		name: 'debit_iban',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'externalTransfers',
				],
				operation: [
					'createExternalTransfersWithCreditorData',
				],
			},
		},
		default: '',
		description: 'IBAN of account to debit',
	},
	{
		displayName: 'Credit IBAN',
		name: 'credit_iban',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'externalTransfers',
				],
				operation: [
					'createExternalTransfersWithCreditorData',
				],
			},
		},
		default: '',
		description: 'IBAN of account to credit',
	},
	{
		displayName: 'Credit Account Name',
		name: 'credit_account_name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'externalTransfers',
				],
				operation: [
					'createExternalTransfersWithCreditorData',
				],
			},
		},
		default: '',
		description: 'The name of the credit account',
	},
	{
		displayName: 'Credit Account Currency',
		name: 'credit_account_currency',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'externalTransfers',
				],
				operation: [
					'createExternalTransfersWithCreditorData',
				],
			},
		},
		default: '',
		description: 'Can be either the currency of the debit_iban or the currency of the creditor. Allowed values is only EUR at the moment.',
	},
	{
		displayName: 'Reference',
		name: 'reference',
		type: 'string',
		displayOptions: {
			show: {
				resource: [
					'externalTransfers',
				],
				operation: [
					'createExternalTransfersWithCreditorData',
				],
			},
		},
		default: '',
		description: 'Transfer reference that can be used to enter transfer details to further describe the transfer - Maximum 140 characters',
	},
	{
		displayName: 'Note',
		name: 'note',
		type: 'string',
		displayOptions: {
			show: {
				resource: [
					'externalTransfers',
				],
				operation: [
					'createExternalTransfersWithCreditorData',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Currency',
		name: 'currency',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'externalTransfers',
				],
				operation: [
					'createExternalTransfersWithCreditorData',
				],
			},
		},
		default: 'EUR',
		description: 'The currency should be EUR',
	},
	{
		displayName: 'Scheduled Date',
		name: 'scheduled_date',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: [
					'externalTransfers',
				],
				operation: [
					'createExternalTransfersWithCreditorData',
				],
			},
		},
		placeholder: '2021-12-31',
		default: '',
		description: 'YYYY-MM-DD, indicates when the external transfer was scheduled to be sent by Qonto',
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'externalTransfers',
				],
				operation: [
					'createExternalTransfersWithCreditorData',
				],
			},
		},
		default: '',
		description: 'The amount corresponds to the amount of the transaction in the currency of the bank account',
	},
	{
		displayName: 'Idempotency Key',
		name: 'idempotency_key',
		type: 'string',
		displayOptions: {
			show: {
				resource: [
					'externalTransfers',
				],
				operation: [
					'createExternalTransfersWithCreditorData',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Attachment IDs',
		name: 'attachment_ids',
		placeholder: 'Add Attachments',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: [
					'externalTransfers',
				],
				operation: [
					'createExternalTransfersWithCreditorData',
				],
			},
		},
		options: [
			{
				name: 'attachmentsBinary',
				displayName: 'Attachments Binary',
				values: [
					{
						displayName: 'Property',
						name: 'property',
						type: 'string',
						default: '',
						description: 'Name of the binary property containing the data to be added to the transaction as an attachment. Multiple properties can be set separated by comma.',
					},
				],
			},
		],
		default: {},
		description: 'Array of supported attachments to add to the message',
	},
// ------------------------
//      EXTERNAL TRANSFERS - List external transfers
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
					'externalTransfers',
				],
				operation: [
					'listExternalTransfers',
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
					'externalTransfers',
				],
				operation: [
					'listExternalTransfers',
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
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'externalTransfers',
				],
				operation: [
					'listExternalTransfers',
				],
			},
		},
		options: [
			{
			displayName: 'Scheduled_date_from',
			name: 'scheduled_date_from',
			type: 'dateTime',
			placeholder: '2019-01-10',
			default: '',
		},
		{
			displayName: 'Scheduled_date_to',
			name: 'scheduled_date_to',
			type: 'dateTime',
			placeholder: '2019-01-10',
			default: '',
		},
		{
			displayName: 'Status',
			name: 'status',
			type: 'string',
			placeholder: 'settled',
			default: '',
			description: 'Allowed values: pending, processing, canceled, declined, settled (no combinaison possible yet)',
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
			displayName: 'Beneficiary_ids',
			name: 'beneficiary_ids',
			type: 'string',
			placeholder: '',
			default: '',
			description: 'Allows filtering on a list of beneficiary IDs',
		},
	],
	},

// ------------------------
//      EXTERNAL TRANSFERS - Create an external transfer
// ------------------------

	{
		displayName: 'Idempotency Key',
		name: 'idempotency_key',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'externalTransfers',
				],
				operation: [
					'createAnExternalTransfer',
				],
			},
		},
		default: '',
		description: 'This is a unique string (we advise to use a uuid) that identifies a transfer. This is used by Qonto to prevent "double spending" by accidentaly replaying the same API call.',
	},
	{
		displayName: 'Beneficiary ID',
		name: 'beneficiary_id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'externalTransfers',
				],
				operation: [
					'createAnExternalTransfer',
				],
			},
		},
		default: '',
		description: 'IBAN of account to debit',
	},
	{
		displayName: 'Debit IBAN',
		name: 'debit_iban',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'externalTransfers',
				],
				operation: [
					'createAnExternalTransfer',
				],
			},
		},
		default: '',
		description: 'IBAN of account to debit',
	},
	{
		displayName: 'Reference',
		name: 'reference',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'externalTransfers',
				],
				operation: [
					'createAnExternalTransfer',
				],
			},
		},
		default: '',
		description: 'Transfer reference that can be used to enter transfer details to further describe the transfer - Maximum 140 characters',
	},
	{
		displayName: 'Note',
		name: 'note',
		type: 'string',
		displayOptions: {
			show: {
				resource: [
					'externalTransfers',
				],
				operation: [
					'createAnExternalTransfer',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Currency',
		name: 'currency',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'externalTransfers',
				],
				operation: [
					'createAnExternalTransfer',
				],
			},
		},
		default: 'EUR',
		description: 'The currency should be EUR',
	},
	{
		displayName: 'Scheduled Date',
		name: 'scheduled_date',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: [
					'externalTransfers',
				],
				operation: [
					'createAnExternalTransfer',
				],
			},
		},
		placeholder: '2021-12-31',
		default: '',
		description: 'YYYY-MM-DD, indicates when the external transfer was scheduled to be sent by Qonto',
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'externalTransfers',
				],
				operation: [
					'createAnExternalTransfer',
				],
			},
		},
		default: '',
		description: 'The amount corresponds to the amount of the transaction in the currency of the bank account',
	},
	{
		displayName: 'Attachment IDs',
		name: 'attachment_ids',
		placeholder: 'Add Attachments',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: [
					'externalTransfers',
				],
				operation: [
					'createAnExternalTransfer',
				],
			},
		},
		options: [
			{
				name: 'attachmentsBinary',
				displayName: 'Attachments Binary',
				values: [
					{
						displayName: 'Property',
						name: 'property',
						type: 'string',
						default: '',
						description: 'Name of the binary property containing the data to be added to the transaction as an attachment. Multiple properties can be set separated by comma.',
					},
				],
			},
		],
		default: {},
		description: 'Array of supported attachments to add to the message',
	},

// ------------------------
//      EXTERNAL TRANSFERS - Show an external transfer
// ------------------------

	{
		displayName: 'ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'externalTransfers',
				],
				operation: [
					'showAnExternalTransfer',
				],
			},
		},
		placeholder: '7b7a5ed6-3903-4782-889d-b4f64bd7bef9',
		default: '',
		description: 'Get a single external transfer',
	},
];