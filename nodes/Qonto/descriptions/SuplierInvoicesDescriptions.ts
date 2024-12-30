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
			name: 'Get a list of supplier invoices for an organization',
			value: 'getSupplierInvoices',
			action: 'Get a list of supplier invoices for an organization',
		},
		{
			name: 'Create supplier invoices with attachments',
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
        default: '',
        required: true,
        description: 'The unique identifier of the organization whose supplier invoices are to be fetched.',
    },
    {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        options: [
            { name: 'All', value: 'all' },
            { name: 'Pending', value: 'pending' },
            { name: 'Paid', value: 'paid' },
        ],
        default: 'all',
        required: false,
        description: 'Filter supplier invoices by their payment status.',
    },
    {
        displayName: 'Start Date',
        name: 'startDate',
        type: 'dateTime',
        default: '',
        required: false,
        description: 'Fetch invoices created after this date.',
    },
    {
        displayName: 'End Date',
        name: 'endDate',
        type: 'dateTime',
        default: '',
        required: false,
        description: 'Fetch invoices created before this date.',
    },

// ------------------------
//      SUPPLIER INVOICES - Create supplier invoices with attachments
// ------------------------

    {
        displayName: 'Organization ID',
        name: 'organizationId',
        type: 'string',
        default: '',
        required: true,
        description: 'The unique identifier of the organization for which supplier invoices will be created.',
    },
    {
        displayName: 'Supplier Invoices',
        name: 'supplierInvoices',
        type: 'fixedCollection',
        typeOptions: {
            multipleValues: true,
        },
        default: {},
        required: true,
        description: 'Details of the supplier invoices to be created.',
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
                        description: 'Unique number of the supplier invoice.',
                    },
                    {
                        displayName: 'Invoice Date',
                        name: 'invoiceDate',
                        type: 'dateTime',
                        default: '',
                        required: true,
                        description: 'Date of the supplier invoice.',
                    },
                    {
                        displayName: 'Amount',
                        name: 'amount',
                        type: 'number',
                        default: '',
                        required: true,
                        description: 'Amount of the supplier invoice.',
                    },
                    {
                        displayName: 'Currency',
                        name: 'currency',
                        type: 'string',
                        default: 'EUR',
                        required: true,
                        description: 'Currency of the supplier invoice.',
                    },
                    {
                        displayName: 'Attachment IDs',
                        name: 'attachmentIds',
                        type: 'string',
                        default: '',
                        required: true,
                        description: 'Comma-separated IDs of the attachments associated with the invoice.',
                    },
                ],
            },
        ],
    },
];
