// suplierInvoicesOperations.ts

import { INodeProperties } from 'n8n-workflow';

// Descriptions for the "Get a list of supplier invoices for an organization" operation
export const suplierInvoicesOperations: INodeProperties[] = [

// ------------------------
//      SUPPLIER INVOICES
// ------------------------

{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: [
				'suplierInvoices',
			],
		},
	},
	options: [
		{
			name: 'Get a List of Supplier Invoices for an Organization',
			value: 'getSupplierInvoices',
			action: 'Get a list of supplier invoices for an organization',
		},
		{
			name: 'Create Supplier Invoices with Attachments',
			value: 'createSupplierInvoices',
			action: 'Create supplier invoices with attachments',
		},
	],
	default: 'getSupplierInvoices',
},

// ------------------------
//      SUPPLIER INVOICES - Get a list of supplier invoices for an organization
// ------------------------

    {
        displayName: 'Organization ID',
        name: 'organizationId',
        type: 'string',
				displayOptions: {
					show: {
						resource: [
							'suplierInvoices',
						],
						operation: [
							'getSupplierInvoices',
						],
					},
				},
        default: '',
        required: true,
        description: 'The unique identifier of the organization whose supplier invoices are to be fetched',
    },
    {
        displayName: 'Status',
        name: 'status',
        type: 'options',
				displayOptions: {
					show: {
						resource: [
							'suplierInvoices',
						],
						operation: [
							'getSupplierInvoices',
						],
					},
				},
        options: [
            { name: 'All', value: 'all' },
            { name: 'Pending', value: 'pending' },
            { name: 'Paid', value: 'paid' },
        ],
        default: 'all',
        description: 'Filter supplier invoices by their payment status',
    },
    {
        displayName: 'Start Date',
        name: 'startDate',
        type: 'dateTime',
				displayOptions: {
					show: {
						resource: [
							'suplierInvoices',
						],
						operation: [
							'getSupplierInvoices',
						],
					},
				},
        default: '',
        description: 'Fetch invoices created after this date',
    },
    {
        displayName: 'End Date',
        name: 'endDate',
        type: 'dateTime',
				displayOptions: {
					show: {
						resource: [
							'suplierInvoices',
						],
						operation: [
							'getSupplierInvoices',
						],
					},
				},
        default: '',
        description: 'Fetch invoices created before this date',
    },

// ------------------------
//      SUPPLIER INVOICES - Create supplier invoices with attachments
// ------------------------

    {
        displayName: 'Organization ID',
        name: 'organizationId',
        type: 'string',
				displayOptions: {
					show: {
						resource: [
							'suplierInvoices',
						],
						operation: [
							'createSupplierInvoices',
						],
					},
				},
        default: '',
        required: true,
        description: 'The unique identifier of the organization for which supplier invoices will be created',
    },
    {
        displayName: 'Supplier Invoices',
        name: 'supplierInvoices',
        type: 'fixedCollection',
				displayOptions: {
					show: {
						resource: [
							'suplierInvoices',
						],
						operation: [
							'createSupplierInvoices',
						],
					},
				},
        typeOptions: {
            multipleValues: true,
        },
        default: {},
        required: true,
        description: 'Details of the supplier invoices to be created',
        options: [
            {
                displayName: 'Invoice',
                name: 'invoice',
                values: [
                    {
                        displayName: 'Invoice Number',
                        name: 'invoiceNumber',
                        type: 'string',
                        default: '',
                        required: true,
                        description: 'Unique number of the supplier invoice',
                    },
                    {
                        displayName: 'Invoice Date',
                        name: 'invoiceDate',
                        type: 'dateTime',
                        default: '',
                        required: true,
                        description: 'Date of the supplier invoice',
                    },
                    {
                        displayName: 'Amount',
                        name: 'amount',
                        type: 'number',
                        default: '',
                        required: true,
                        description: 'Amount of the supplier invoice',
                    },
                    {
                        displayName: 'Currency',
                        name: 'currency',
                        type: 'string',
                        default: 'EUR',
                        required: true,
                        description: 'Currency of the supplier invoice',
                    },
                    {
                        displayName: 'Attachment IDs',
                        name: 'attachmentIds',
                        type: 'string',
                        default: '',
                        required: true,
                        description: 'Comma-separated IDs of the attachments associated with the invoice',
                    },
                ],
            },
        ],
    },
];
