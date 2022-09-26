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
		displayOptions: {
			show: {
				resource: [
					'organizations',
				],
			},
		},
		options: [
			{
				name: 'Get organization and its bank_accounts',
				value: 'getOrganizationAndItsBank_accounts',
				description: '',
			},
		],
		default: 'getOrganizationAndItsBank_accounts',
	},

// ------------------------
//      ORGANIZATIONS - Get organization and its bank_accounts
// ------------------------
];