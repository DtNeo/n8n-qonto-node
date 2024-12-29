// statementsDescriptions.ts

import { INodeProperties } from 'n8n-workflow';

// Descriptions for the "Show statement" operation
export const showStatementDescription: INodeProperties[] = [
    {
        displayName: 'Statement ID',
        name: 'statementId',
        type: 'string',
        default: '',
        required: true,
        description: 'The unique identifier of the statement to be fetched.',
    },
];

// Descriptions for the "List statements" operation
export const listStatementsDescription: INodeProperties[] = [
    {
        displayName: 'Organization ID',
        name: 'organizationId',
        type: 'string',
        default: '',
        required: true,
        description: 'The unique identifier of the organization whose statements are to be listed.',
    },
    {
        displayName: 'Start Date',
        name: 'startDate',
        type: 'dateTime',
        default: '',
        required: false,
        description: 'Fetch statements created after this date.',
    },
    {
        displayName: 'End Date',
        name: 'endDate',
        type: 'dateTime',
        default: '',
        required: false,
        description: 'Fetch statements created before this date.',
    },
];
