// fichierteamsDescriptions.ts

import { INodeProperties } from 'n8n-workflow';

// Descriptions for the "List teams in an organization" operation
export const listTeamsDescription: INodeProperties[] = [
    {
        displayName: 'Organization ID',
        name: 'organizationId',
        type: 'string',
        default: '',
        required: true,
        description: 'The unique identifier of the organization whose teams are to be listed.',
    },
];

// Descriptions for the "Create a new team" operation
export const createTeamDescription: INodeProperties[] = [
    {
        displayName: 'Organization ID',
        name: 'organizationId',
        type: 'string',
        default: '',
        required: true,
        description: 'The unique identifier of the organization where the new team will be created.',
    },
    {
        displayName: 'Team Name',
        name: 'teamName',
        type: 'string',
        default: '',
        required: true,
        description: 'The name of the new team.',
    },
    {
        displayName: 'Team Description',
        name: 'teamDescription',
        type: 'string',
        default: '',
        required: false,
        description: 'A description of the new team.',
    },
];
