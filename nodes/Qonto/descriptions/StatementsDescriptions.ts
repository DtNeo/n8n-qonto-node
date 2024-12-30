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
					name: 'Show statement',
					value: 'showStatement',
					action: 'Show statement',
				},
				{
					name: 'List statements',
					value: 'listStatement',
					action: 'List statements',
				},
			],
			default: 'listTransactions',
		},

	// ------------------------
	//      statements - Show statement
	// ------------------------

    {
        displayName: 'Statement ID',
        name: 'statementId',
        type: 'string',
        default: '',
        required: true,
        description: 'The unique identifier of the statement to be fetched.',
    },

	// ------------------------
	//      statements - List statements
	// ------------------------

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
