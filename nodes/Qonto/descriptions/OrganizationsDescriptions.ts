import {
	INodeProperties,
} from 'n8n-workflow';

export const organizationsOperations: INodeProperties[] = [

// ------------------------
//      ORGANIZATIONS
// ------------------------
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'organizations',
				],
			},
		},
		options: [
			{
				name: 'Get Organization and Its Bank_accounts',
				value: 'getOrganizationAndItsBank_accounts',
				action: 'Get organization and its bank accounts an organizations',
			},
		],
		default: 'getOrganizationAndItsBank_accounts',
	},

// ------------------------
//      ORGANIZATIONS - Get organization and its bank_accounts
// ------------------------
	{
		displayName: 'Include_external_accounts',
		name: 'include_external_accounts',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'organizations',
				],
				operation: [
					'getOrganizationAndItsBank_accounts',
				],
			},
		},
		default: false,
		description: 'Whether to include archived organizations or not',
	},
];
