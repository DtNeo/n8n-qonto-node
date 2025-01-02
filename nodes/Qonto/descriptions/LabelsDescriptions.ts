import {
	INodeProperties,
} from 'n8n-workflow';

export const labelsOperations: INodeProperties[] = [

// ------------------------
//      LABELS
// ------------------------
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'labels',
				],
			},
		},
		options: [
			{
				name: 'List Labels',
				value: 'listLabels',
				action: 'List labels a labels',
			},
			{
				name: 'Show Label',
				value: 'showLabel',
				action: 'Show label a labels',
			},
		],
		default: 'listLabels',
	},

// ------------------------
//      LABELS - List labels
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
					'labels',
				],
				operation: [
					'listLabels',
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
					'labels',
				],
				operation: [
					'listLabels',
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

// ------------------------
//      LABELS - Show label
// ------------------------
	{
		displayName: 'ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'labels',
				],
				operation: [
					'showLabel',
				],
			},
		},
		placeholder: '2d9663fd-1748-4ed4-a590-48066ae9e1cb',
		default: '',
		description: 'Retrieve all labels within the organization',
	},
];
