// statementsDescriptions.ts

import { INodeProperties } from 'n8n-workflow';

export const statementsOperations: INodeProperties[] = [

	// ------------------------
	//      statements
	// ------------------------

		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: [
						'statements',
					],
				},
			},
			options: [
				{
					name: 'Show Statement',
					value: 'showStatement',
					action: 'Show statement',
				},
				{
					name: 'List Statements',
					value: 'listStatement',
					action: 'List statements',
				},
			],
			default: 'showStatement',
		},

	// ------------------------
	//      statements - Show statement
	// ------------------------

    {
        displayName: 'Statement ID',
        name: 'statementId',
        type: 'string',
				displayOptions: {
					show: {
						resource: [
							'statements',
						],
						operation: [
							'showStatement',
						],
					},
				},
        default: '',
        required: true,
        description: 'The unique identifier of the statement to be fetched',
    },

	// ------------------------
	//      statements - List statements
	// ------------------------

    {
        displayName: 'Organization ID',
        name: 'organizationId',
        type: 'string',
				displayOptions: {
					show: {
						resource: [
							'statements',
						],
						operation: [
							'listStatement',
						],
					},
				},
        default: '',
        required: true,
        description: 'The unique identifier of the organization whose statements are to be listed',
    },
    {
        displayName: 'Start Date',
        name: 'startDate',
        type: 'dateTime',
				displayOptions: {
					show: {
						resource: [
							'statements',
						],
						operation: [
							'listStatement',
						],
					},
				},
        default: '',
        description: 'Fetch statements created after this date',
    },
    {
        displayName: 'End Date',
        name: 'endDate',
        type: 'dateTime',
				displayOptions: {
					show: {
						resource: [
							'statements',
						],
						operation: [
							'listStatement',
						],
					},
				},
        default: '',
        description: 'Fetch statements created before this date',
    },
];
