// creditNotesDescriptions.ts

import { INodeProperties } from 'n8n-workflow';

// Descriptions for the "Get a list of credit notes for an organization" operation
export const getCreditNotesDescription: INodeProperties[] = [
    {
        displayName: 'Organization ID',
        name: 'organizationId',
        type: 'string',
        default: '',
        required: true,
        description: 'The unique identifier of the organization whose credit notes are to be fetched.',
    },
    {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        options: [
            { name: 'All', value: 'all' },
            { name: 'Pending', value: 'pending' },
            { name: 'Used', value: 'used' },
        ],
        default: 'all',
        required: false,
        description: 'Filter credit notes by their status.',
    },
    {
        displayName: 'Start Date',
        name: 'startDate',
        type: 'dateTime',
        default: '',
        required: false,
        description: 'Fetch credit notes created after this date.',
    },
    {
        displayName: 'End Date',
        name: 'endDate',
        type: 'dateTime',
        default: '',
        required: false,
        description: 'Fetch credit notes created before this date.',
    },
];

// Descriptions for the "Get details of credit note for an organization" operation
export const getCreditNoteDetailsDescription: INodeProperties[] = [
    {
        displayName: 'Organization ID',
        name: 'organizationId',
        type: 'string',
        default: '',
        required: true,
        description: 'The unique identifier of the organization whose credit note details are to be fetched.',
    },
    {
        displayName: 'Credit Note ID',
        name: 'creditNoteId',
        type: 'string',
        default: '',
        required: true,
        description: 'The unique identifier of the credit note.',
    },
];
