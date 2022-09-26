import {
	INodeProperties,
} from 'n8n-workflow';

export const attachmentsInATransactionOperations: INodeProperties[] = [

// ------------------------
//      ATTACHMENTS IN TRANSACTIONS
// ------------------------

	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'attachmentsInATransaction',
				],
			},
		},
		options: [
			{
				name: 'Upload attachment to a transaction',
				value: 'uploadAttachmentToATransaction',
				description: '',
			},
			{
				name: 'List attachments in a transaction',
				value: 'listAttachmentsInATransaction',
				description: '',
			},
			{
				name: 'Remove all attachments from a transaction',
				value: 'removeAllAttachmentsFromATransaction',
				description: '',
			},
			{
				name: 'Remove an attachment from a transaction',
				value: 'removeAnAttachmentFromATransaction',
				description: '',
			},
		],
		default: 'uploadAttachmentToATransaction',
	},
// ------------------------
//      ATTACHMENTS IN TRANSACTIONS - Upload attachment to a transaction
// ------------------------

	{
		displayName: 'ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'attachmentsInATransaction',
				],
				operation: [
					'uploadAttachmentToATransaction',
				],
			},
		},
		placeholder: '2751a41c-c17f-43f7-bd18-04efa6cd8e30',
		default: '',
		description: 'Upload an attachment to a transaction',
	},
	{
		displayName: 'Attachment Ids',
		name: 'attachment_ids',
		placeholder: 'Add Attachments',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: [
					'attachmentsInATransaction',
				],
				operation: [
					'uploadAttachmentToATransaction',
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
//      ATTACHMENTS IN TRANSACTIONS - List attachments in a transaction
// ------------------------
	{
		displayName: 'ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'attachmentsInATransaction',
				],
				operation: [
					'listAttachmentsInATransaction',
				],
			},
		},
		placeholder: 'aab86d8a-0d4c-4749-9a49-0ada88a9c423',
		default: '',
		description: 'Retrieve the list of attachments within a transaction.',
	},
// ------------------------
//      ATTACHMENTS IN TRANSACTIONS - Remove all attachments from a transaction
// ------------------------
	{
		displayName: 'ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'attachmentsInATransaction',
				],
				operation: [
					'removeAllAttachmentsFromATransaction',
				],
			},
		},
		placeholder: '2750ad5e-6c04-4096-88d8-ab43363bdb57',
		default: '',
		description: 'Remove all attachments from a transaction',
	},
// ------------------------
//      ATTACHMENTS IN TRANSACTIONS - Remove an attachment from a transaction
// ------------------------
	{
		displayName: 'ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'attachmentsInATransaction',
				],
				operation: [
					'removeAnAttachmentFromATransaction',
				],
			},
		},
		placeholder: '644cf847-125e-4ec9-920d-0d09aaeb4bbc',
		default: '',
		description: 'Remove an attachment from a transaction',
	},
];