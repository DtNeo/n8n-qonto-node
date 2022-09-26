import {
	INodeProperties,
} from 'n8n-workflow';

export const membershipsOperations: INodeProperties[] = [

// ------------------------
//      MEMBERSHIPS
// ------------------------

	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'memberships',
				],
			},
		},
		options: [
			{
				name: 'List memberships',
				value: 'listMemberships',
				description: '',
			},
		],
		default: 'listMemberships',
	},

// ------------------------
//      MEMBERSHIPS - List membership
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
					'memberships',
				],
				operation: [
					'listMemberships',
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
					'memberships',
				],
				operation: [
					'listMemberships',
				],
				returnAll: [
					false,
				],
			},
		},
		typeOptions: {
			minValue: 1,
		},
		default: 10,
		description: 'How many results to return.',
	},
];