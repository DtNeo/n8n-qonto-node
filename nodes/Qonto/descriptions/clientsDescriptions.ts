// clientsDescriptions.ts

import { INodeProperties } from 'n8n-workflow';

// Descriptions for the "Get client's details" operation
export const getClientDetailsDescription: INodeProperties[] = [
    {
        displayName: 'Client ID',
        name: 'clientId',
        type: 'string',
        default: '',
        required: true,
        description: 'The unique identifier of the client whose details are to be fetched.',
    },
];

// Descriptions for the "Get a list of clients" operation
export const getClientsListDescription: INodeProperties[] = [
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
];

// Descriptions for the "Create a client" operation
export const createClientDescription: INodeProperties[] = [
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
