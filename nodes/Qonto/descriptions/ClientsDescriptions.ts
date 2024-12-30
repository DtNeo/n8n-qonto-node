// clientsDescriptions.ts

import { INodeProperties } from 'n8n-workflow';

export const clientsOperations: INodeProperties[] = [

	// ------------------------
	//      clients
	// ------------------------

		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: [
						'clients',
					],
				},
			},
			options: [
				{
					name: 'Get clients details',
					value: 'getclients',
					action: 'Get clients details',
				},
				{
					name: 'Get a list of clients',
					value: 'getListClients',
					action: 'SGet a list of clientsow',
				},
				{
					name: 'Create a client',
					value: 'createClient',
					action: 'Create a client',
				},
			],
			default: 'getclients',
		},
	// ------------------------
	//      clients - Get client's details
	// ------------------------
    {
        displayName: 'Client ID',
        name: 'clientId',
        type: 'string',
        default: '',
        required: true,
        description: 'The unique identifier of the client whose details are to be fetched.',
    },
	// ------------------------
	//      clients - Get a list of clients
	// ------------------------

    {
        displayName: 'Organization ID',
        name: 'organizationId',
        type: 'string',
        default: '',
        required: true,
        description: 'The unique identifier of the organization whose clients are to be fetched.',
    },
    {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        options: [
            { name: 'All', value: 'all' },
            { name: 'Active', value: 'active' },
            { name: 'Inactive', value: 'inactive' },
        ],
        default: 'all',
        required: false,
        description: 'Filter clients by their status.',
    },
    {
        displayName: 'Start Date',
        name: 'startDate',
        type: 'dateTime',
        default: '',
        required: false,
        description: 'Fetch clients created after this date.',
    },
    {
        displayName: 'End Date',
        name: 'endDate',
        type: 'dateTime',
        default: '',
        required: false,
        description: 'Fetch clients created before this date.',
    },

	// ------------------------
	//      clients - Create a client
	// ------------------------
    {
        displayName: 'Organization ID',
        name: 'organizationId',
        type: 'string',
        default: '',
        required: true,
        description: 'The unique identifier of the organization for which the client will be created.',
    },
    {
        displayName: 'Client Name',
        name: 'clientName',
        type: 'string',
        default: '',
        required: true,
        description: 'The name of the client to be created.',
    },
    {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        default: '',
        required: true,
        description: 'The email address of the client.',
    },
    {
        displayName: 'Phone Number',
        name: 'phoneNumber',
        type: 'string',
        default: '',
        required: false,
        description: 'The phone number of the client.',
    },
    {
        displayName: 'Address',
        name: 'address',
        type: 'string',
        default: '',
        required: false,
        description: 'The address of the client.',
    },
];
