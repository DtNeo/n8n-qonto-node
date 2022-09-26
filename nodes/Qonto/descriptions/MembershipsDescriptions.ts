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
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'memberships',
				],
			},
		},
		options: [
			{
				name: 'List Memberships',
				value: 'listMemberships',
				action: 'List memberships a memberships',
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
		default: 50,
		description: 'Max number of results to return',
	},
];