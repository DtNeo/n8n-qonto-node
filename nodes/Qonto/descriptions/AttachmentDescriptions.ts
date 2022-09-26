import {
	INodeProperties,
} from 'n8n-workflow';

export const attachmentOperations: INodeProperties[] = [

// ------------------------
//      ATTACHMENTS
// ------------------------

	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'attachment',
				],
			},
		},
		options: [
			{
				name: 'Upload Attachment',
				value: 'uploadAttachment',
				action: 'Upload attachment an attachment',
			},
			{
				name: 'Show Attachment',
				value: 'showAttachment',
				action: 'Show attachment an attachment',
			},
		],
		default: 'showAttachment',
	},
// ------------------------
//      ATTACHMENTS - Upload attachment
// ------------------------

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
					'attachment',
				],
				operation: [
					'uploadAttachment',
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
//      ATTACHMENTS - Show attachment
// ------------------------

	{
		displayName: 'ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'attachment',
				],
				operation: [
					'showAttachment',
				],
			},
		},
		placeholder: 'e72f6e43-0f27-4415-8781-ad648a89b47f',
		default: '',
		description: 'Obtain the details (e.g: download URL) for a specific attachment',
	},
];