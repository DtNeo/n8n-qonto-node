// clientInvoicesDescriptions.ts

import { INodeProperties } from 'n8n-workflow';

// Descriptions for the "List client invoices" operation
export const clientsInvoicesOperations: INodeProperties[] = [

// ------------------------
//      Client Invoice
// ------------------------

{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: [
				'clientsInvoices',
			],
		},
	},
	options: [
		{
			name: 'List client invoices',
			value: 'listInvoices',
			action: 'List client invoices',
		},
		{
			name: 'Create a client invoice',
			value: 'createClientInvoice',
			action: 'Create a client invoice',
		},
		{
			name: 'Show client invoice',
			value: 'showClientInvoice',
			action: 'Show client invoice',
		},
	],
	default: 'listInvoices',
},
// ------------------------
//      Client Invoice - List client invoices
// ------------------------
    {
        displayName: 'Organization ID',
        name: 'organizationId',
        type: 'string',
				displayOptions: {
					show: {
						resource: [
							'clientsInvoices',
						],
						operation: [
							'listInvoices',
						],
					},
				},
        default: '',
        required: true,
        description: 'The unique identifier of the organization whose client invoices are to be fetched.',
    },
    {
        displayName: 'Status',
        name: 'status',
        type: 'options',
				displayOptions: {
					show: {
						resource: [
							'clientsInvoices',
						],
						operation: [
							'listInvoices',
						],
					},
				},
        options: [
            { name: 'All', value: 'all' },
            { name: 'Pending', value: 'pending' },
            { name: 'Paid', value: 'paid' },
        ],
        default: 'all',
        required: false,
        description: 'Filter client invoices by their payment status.',
    },
    {
        displayName: 'Start Date',
        name: 'startDate',
        type: 'dateTime',
				displayOptions: {
					show: {
						resource: [
							'clientsInvoices',
						],
						operation: [
							'listInvoices',
						],
					},
				},
        default: '',
        required: false,
        description: 'Fetch invoices created after this date.',
    },
    {
        displayName: 'End Date',
        name: 'endDate',
        type: 'dateTime',
				displayOptions: {
					show: {
						resource: [
							'clientsInvoices',
						],
						operation: [
							'listInvoices',
						],
					},
				},
        default: '',
        required: false,
        description: 'Fetch invoices created before this date.',
    },

// ------------------------
//      Client Invoice - Create a client invoice
// ------------------------

    {
        displayName: 'Organization ID',
        name: 'organizationId',
        type: 'string',
				displayOptions: {
					show: {
						resource: [
							'clientsInvoices',
						],
						operation: [
							'createClientInvoice',
						],
					},
				},
        default: '',
        required: true,
        description: 'The unique identifier of the organization for which the client invoice will be created.',
    },
    {
        displayName: 'Client Invoice',
        name: 'clientInvoice',
        type: 'fixedCollection',
				displayOptions: {
					show: {
						resource: [
							'clientsInvoices',
						],
						operation: [
							'createClientInvoice',
						],
					},
				},
        typeOptions: {
            multipleValues: false,
        },
        default: {},
        required: true,
        description: 'Details of the client invoice to be created.',
        options: [
            {
                displayName: 'Invoice Details',
                name: 'invoiceDetails',
                values: [
                    {
                        displayName: 'Invoice Number',
                        name: 'invoiceNumber',
                        type: 'string',
                        default: '',
                        required: true,
                        description: 'Unique number of the client invoice.',
                    },
                    {
                        displayName: 'Invoice Date',
                        name: 'invoiceDate',
                        type: 'dateTime',
                        default: '',
                        required: true,
                        description: 'Date of the client invoice.',
                    },
                    {
                        displayName: 'Due Date',
                        name: 'dueDate',
                        type: 'dateTime',
                        default: '',
                        required: true,
                        description: 'Due date for the client invoice payment.',
                    },
                    {
                        displayName: 'Amount',
                        name: 'amount',
                        type: 'number',
                        default: '',
                        required: true,
                        description: 'Amount of the client invoice.',
                    },
                    {
                        displayName: 'Currency',
                        name: 'currency',
                        type: 'string',
                        default: 'EUR',
                        required: true,
                        description: 'Currency of the client invoice.',
                    },
                    {
                        displayName: 'Description',
                        name: 'description',
                        type: 'string',
                        default: '',
                        required: false,
                        description: 'Description or details of the client invoice.',
                    },
                ],
            },
        ],
    },

// ------------------------
//      Client Invoice - Show client invoice
// ------------------------

];
