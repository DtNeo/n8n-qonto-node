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
			{
				name: 'Get details of a single membership',
				value: 'getMemberships',
				action: 'Get details of a single membership',
			},
			{
				name: 'Create and invite a new membership',
				value: 'createMemberships',
				action: 'Create and invite a new membership',
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

// ------------------------
//      MEMBERSHIPS - Get details of a single membership
// ------------------------
{
	displayName: 'ID',
	name: 'id',
	type: 'string',
	default: '',
	description: 'Incomplet API Qonto',
	displayOptions: {
		show: {
			resource: [
				'memberships',
			],
			operation: [
				'getMemberships',
			],
		},
	},
},

// ------------------------
//      MEMBERSHIPS - Create and invite a new membership
// ------------------------
{
	displayName: 'Email',
	name: 'email',
	type: 'string',
	default: '',
	description: 'email of the person being invited to join the organization',
	displayOptions: {
		show: {
			resource: [
				'memberships',
			],
			operation: [
				'createMemberships',
			],
		},
	},
},
{
	displayName: 'first_name',
	name: 'first_name',
	type: 'string',
	default: '',
	description: 'first name of the person being invited to join the organization',
	displayOptions: {
		show: {
			resource: [
				'memberships',
			],
			operation: [
				'createMemberships',
			],
		},
	},
},
{
	displayName: 'last_name',
	name: 'last_name',
	type: 'string',
	default: '',
	description: 'last name of the person being invited to join the organization',
	displayOptions: {
		show: {
			resource: [
				'memberships',
			],
			operation: [
				'createMemberships',
			],
		},
	},
},
{
	displayName: 'role',
	name: 'role',
	type: 'string',
	default: '',
	description: 'role of the person being invited to join the organization',
	displayOptions: {
		show: {
			resource: [
				'memberships',
			],
			operation: [
				'createMemberships',
			],
		},
	},
},
{
	displayName: 'team_id',
	name: 'team_id',
	type: 'string',
	default: '',
	description: 'unique identifier of the team the new membership is being assigned',
	displayOptions: {
		show: {
			resource: [
				'memberships',
			],
			operation: [
				'createMemberships',
			],
		},
	},
},
];
