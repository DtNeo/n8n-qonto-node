// fichierteamsDescriptions.ts

import { INodeProperties } from 'n8n-workflow';

export const teamsOperations: INodeProperties[] = [

	// ------------------------
	//      teams
	// ------------------------

		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: [
						'teams',
					],
				},
			},
			options: [
				{
					name: 'List teams in an organization',
					value: 'listTeams',
					action: 'List teams in an organization',
				},
				{
					name: 'Create a new team',
					value: 'createTeam',
					action: 'Create a new team',
				},
			],
			default: 'listTeams',
		},
	// ------------------------
	//      teams - List teams in an organization
	// ------------------------
    {
        displayName: 'Organization ID',
        name: 'organizationId',
        type: 'string',
				displayOptions: {
					show: {
						resource: [
							'teams',
						],
						operation: [
							'listTeams',
						],
					},
				},
        default: '',
        required: true,
        description: 'The unique identifier of the organization whose teams are to be listed.',
    },

	// ------------------------
	//      teams - Create a new team
	// ------------------------

    {
        displayName: 'Organization ID',
        name: 'organizationId',
        type: 'string',
				displayOptions: {
					show: {
						resource: [
							'teams',
						],
						operation: [
							'createTeam',
						],
					},
				},
        default: '',
        required: true,
        description: 'The unique identifier of the organization where the new team will be created.',
    },
    {
        displayName: 'Team Name',
        name: 'teamName',
        type: 'string',
				displayOptions: {
					show: {
						resource: [
							'teams',
						],
						operation: [
							'createTeam',
						],
					},
				},
        default: '',
        required: true,
        description: 'The name of the new team.',
    },
    {
        displayName: 'Team Description',
        name: 'teamDescription',
        type: 'string',
				displayOptions: {
					show: {
						resource: [
							'teams',
						],
						operation: [
							'createTeam',
						],
					},
				},
        default: '',
        required: false,
        description: 'A description of the new team.',
    },
];
