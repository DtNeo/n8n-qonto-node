import {
	INodeProperties,
} from 'n8n-workflow';

export const internalTransactionsOperations: INodeProperties[] = [

// ------------------------
//      INTERNAL TRANSFERS
// ------------------------
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'internalTransactions',
				],
			},
		},
		options: [
			{
				name: 'Create Internal Transfer',
				value: 'createInternalTransfer',
				action: 'Create internal transfer an internal transactions',
			},
		],
		default: 'createInternalTransfer',
	},

// ------------------------
//      INTERNAL TRANSFERS - Create internal transfer
// ------------------------
	{
		displayName: 'Idempotency Key',
		name: 'idempotency_key',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'internalTransactions',
				],
				operation: [
					'createInternalTransfer',
				],
			},
		},
		default: '',
		description: 'This is a unique string (we advise to use a uuid) that identifies a transfer. This is used by Qonto to prevent "double spending" by accidentaly replaying the same API call.',
	},
	{
		displayName: 'Debit_iban',
		name: 'debit_iban',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'internalTransactions',
				],
				operation: [
					'createInternalTransfer',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Credit_iban',
		name: 'credit_iban',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'internalTransactions',
				],
				operation: [
					'createInternalTransfer',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Reference',
		name: 'reference',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'internalTransactions',
				],
				operation: [
					'createInternalTransfer',
				],
			},
		},
		default: '',
		description: 'Transfer reference that can be used to enter transfer details to further describe the transfer - Maximum 140 characters',
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'internalTransactions',
				],
				operation: [
					'createInternalTransfer',
				],
			},
		},
		default: '',
		description: 'The amount corresponds to the amount of the transaction in the currency of the bank account',
	},
	{
		displayName: 'Currency',
		name: 'currency',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'internalTransactions',
				],
				operation: [
					'createInternalTransfer',
				],
			},
		},
		default: 'EUR',
		description: 'The currency should be EUR',
	},
];
