// creditNotesDescriptions.ts

import { INodeProperties } from 'n8n-workflow';

// Descriptions for the "Get a list of credit notes for an organization" operation
	export const creditNotesOperations: INodeProperties[] = [

		// ------------------------
		//      creditNotes
		// ------------------------

			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'creditNotes',
						],
					},
				},
				options: [
					{
						name: 'Get a List of Credit Notes for an Organization',
						value: 'getListCreditNotes',
						action: 'Get a list of credit notes for an organization',
					},
					{
						name: 'Get Details of Credit Note for an Organization',
						value: 'getDetailsCreditNotes',
						action: 'Get details of credit note for an organization',
					},

				],
				default: 'getListCreditNotes',
			},
		// ------------------------
		//      creditNotes - Get a list of credit notes for an organization
		// ------------------------
    {
        displayName: 'Organization ID',
        name: 'organizationId',
        type: 'string',
				displayOptions: {
					show: {
						resource: [
							'creditNotes',
						],
						operation: [
							'getListCreditNotes',
						],
					},
				},
        default: '',
        required: true,
        description: 'The unique identifier of the organization whose credit notes are to be fetched',
    },
    {
        displayName: 'Status',
        name: 'status',
        type: 'options',
				displayOptions: {
					show: {
						resource: [
							'creditNotes',
						],
						operation: [
							'getListCreditNotes',
						],
					},
				},
        options: [
            { name: 'All', value: 'all' },
            { name: 'Pending', value: 'pending' },
            { name: 'Used', value: 'used' },
        ],
        default: 'all',
        description: 'Filter credit notes by their status',
    },
    {
        displayName: 'Start Date',
        name: 'startDate',
        type: 'dateTime',
				displayOptions: {
					show: {
						resource: [
							'creditNotes',
						],
						operation: [
							'getListCreditNotes',
						],
					},
				},
        default: '',
        description: 'Fetch credit notes created after this date',
    },
    {
        displayName: 'End Date',
        name: 'endDate',
        type: 'dateTime',
				displayOptions: {
					show: {
						resource: [
							'creditNotes',
						],
						operation: [
							'getListCreditNotes',
						],
					},
				},
        default: '',
        description: 'Fetch credit notes created before this date',
    },

		// ------------------------
		//      creditNotes - Get details of credit note for an organization
		// ------------------------

    {
        displayName: 'Organization ID',
        name: 'organizationId',
        type: 'string',
				displayOptions: {
					show: {
						resource: [
							'creditNotes',
						],
						operation: [
							'getDetailsCreditNotes',
						],
					},
				},
        default: '',
        required: true,
        description: 'The unique identifier of the organization whose credit note details are to be fetched',
    },
    {
        displayName: 'Credit Note ID',
        name: 'creditNoteId',
        type: 'string',
				displayOptions: {
					show: {
						resource: [
							'creditNotes',
						],
						operation: [
							'getDetailsCreditNotes',
						],
					},
				},
        default: '',
        required: true,
        description: 'The unique identifier of the credit note',
    },
];
