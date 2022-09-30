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
		displayName: 'Attachments Binary',
		name: 'attachment_ids',
		type: 'string',
		required: true,	
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
		default: 'data',
		description: 'Object property name which holds binary data',
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