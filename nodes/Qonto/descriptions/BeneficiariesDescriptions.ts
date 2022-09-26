import {
	INodeProperties,
} from 'n8n-workflow';

export const beneficiariesOperations: INodeProperties[] = [

// ------------------------
//      BENEFICIAIRIES
// ------------------------

	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'beneficiaries',
				],
			},
		},
		options: [
			{
				name: 'List beneficiaries',
				value: 'listBeneficiaries',
				description: '',
			},
			{
				name: 'Show beneficiary',
				value: 'showBeneficiary',
				description: 'get the list',
			},
			{
				name: 'Trust a list of beneficiaries',
				value: 'trustBeneficiaries',
				description: '',
			},
			{
				name: 'Untrust a list of beneficiaries',
				value: 'untrustBeneficiaries',
				description: 'get the list',
			},
		],
		default: 'listBeneficiaries',
	},
// ------------------------
//      BENEFICIAIRIES - List beneficiaries
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
					'beneficiaries',
				],
				operation: [
					'listBeneficiaries',
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
					'beneficiaries',
				],
				operation: [
					'listBeneficiaries',
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
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'beneficiaries',
				],
				operation: [
					'listBeneficiaries',
				],
			},
		},
		options: [
			{
			displayName: 'IBAN',
			name: 'iban',
			type: 'string',
			placeholder: '',
			default: '',
			description: `Beneficiaries can be filtered by IBAN. The iban query parameter accepts an array of IBANs as value.`,
		},
		{
			displayName: 'Trusted',
			name: 'trusted',
			type: 'string',
			placeholder: '',
			default: '',
			description: `Boolean property that can filter beneficiaries by true or false.`,
		},
		{
			displayName: 'Status',
			name: 'status',
			type: 'string',
			placeholder: 'settled',
			default: '',
			description: `Allowed values: pending, processing, canceled, declined, settled (no combinaison possible yet)`,
		},
		{
			displayName: 'updated_at_from',
			name: 'updated_at_from',
			type: 'dateTime',
			placeholder: '2019-01-10T11:47:53.123Z',
			default: '',
			description: ``,
		},
		{
			displayName: 'updated_at_to',
			name: 'updated_at_to',
			type: 'dateTime',
			placeholder: '2019-01-10T11:47:53.123Z',
			default: '',
			description: ``,
		},
	],
	},


// ------------------------
//      BENEFICIAIRIES - Show beneficiary
// ------------------------
	{
		displayName: 'id',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'beneficiaries',
				],
				operation: [
					'showBeneficiary',
				],
			},
		},
		placeholder: 'ce91bc4e-68d6-4ab0-bfab-4a9403f7f316',
		default: '',
		description: `Get a single beneficiary.`,
	},
// ------------------------
//      BENEFICIAIRIES - Trust a list of beneficiaries
// ------------------------
	{
		displayName: 'ids',
		name: 'ids',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'beneficiaries',
				],
				operation: [
					'trustBeneficiaries',
				],
			},
		},
		placeholder: 'ce91bc4e-68d6-4ab0-bfab-4a9403f7f316',
		default: '',
		description: `"abc", "xyz"`,
	},
// ------------------------
//      BENEFICIAIRIES - Untrust a list of beneficiaries
// ------------------------

	{
		displayName: 'ids',
		name: 'ids',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'beneficiaries',
				],
				operation: [
					'untrustBeneficiary',
				],
			},
		},
		placeholder: 'ce91bc4e-68d6-4ab0-bfab-4a9403f7f316',
		default: '',
		description: `"abc", "xyz"`,
	},
];