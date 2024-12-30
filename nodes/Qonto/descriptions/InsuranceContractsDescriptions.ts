// insuranceContractsDescriptions.ts

import { INodeProperties } from 'n8n-workflow';
export const insuranceContractsOperations: INodeProperties[] = [

	// ------------------------
	//      insuranceContracts
	// ------------------------

		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: [
						'insuranceContracts',
					],
				},
			},
			options: [
				{
					name: 'Create a new insurance contract',
					value: 'listTransactions',
					action: 'Create a new insurance contract',
				},
				{
					name: 'Get insurance contract',
					value: 'getInsuranceContract',
					action: 'Get insurance contract',
				},
				{
					name: 'Update an insurance contract',
					value: 'listTransactions',
					action: 'Update an insurance contract',
				},
				{
					name: 'Upload a PDF document for a specific insurance contract',
					value: 'showTransaction',
					action: 'Upload a PDF document for a specific insurance contract',
				},
				{
					name: 'Delete uploaded document',
					value: 'deleteUploaded',
					action: 'Delete uploaded document',
				},
			],
			default: 'listTransactions',
		},
	// ------------------------
	//      insuranceContracts - Create a new insurance contract
	// ------------------------
    {
        displayName: 'Organization ID',
        name: 'organizationId',
        type: 'string',
        default: '',
        required: true,
        description: 'The unique identifier of the organization creating the insurance contract.',
    },
    {
        displayName: 'Contract Name',
        name: 'contractName',
        type: 'string',
        default: '',
        required: true,
        description: 'The name of the insurance contract.',
    },
    {
        displayName: 'Start Date',
        name: 'startDate',
        type: 'dateTime',
        default: '',
        required: true,
        description: 'The start date of the insurance contract.',
    },
    {
        displayName: 'End Date',
        name: 'endDate',
        type: 'dateTime',
        default: '',
        required: false,
        description: 'The end date of the insurance contract.',
    },
    {
        displayName: 'Coverage Details',
        name: 'coverageDetails',
        type: 'string',
        default: '',
        required: false,
        description: 'Details about the coverage provided by the insurance contract.',
    },
	// ------------------------
	//      insuranceContracts - Get insurance contract
	// ------------------------
    {
        displayName: 'Contract ID',
        name: 'contractId',
        type: 'string',
        default: '',
        required: true,
        description: 'The unique identifier of the insurance contract to be fetched.',
    },
	// ------------------------
	//      insuranceContracts - Update an insurance contract
	// ------------------------
    {
        displayName: 'Contract ID',
        name: 'contractId',
        type: 'string',
        default: '',
        required: true,
        description: 'The unique identifier of the insurance contract to be updated.',
    },
    {
        displayName: 'Contract Name',
        name: 'contractName',
        type: 'string',
        default: '',
        required: false,
        description: 'The updated name of the insurance contract.',
    },
    {
        displayName: 'End Date',
        name: 'endDate',
        type: 'dateTime',
        default: '',
        required: false,
        description: 'The updated end date of the insurance contract.',
    },
    {
        displayName: 'Coverage Details',
        name: 'coverageDetails',
        type: 'string',
        default: '',
        required: false,
        description: 'Updated details about the coverage provided by the insurance contract.',
    },
	// ------------------------
	//      insuranceContracts - Upload a PDF document for a specific insurance contract
	// ------------------------
    {
        displayName: 'Contract ID',
        name: 'contractId',
        type: 'string',
        default: '',
        required: true,
        description: 'The unique identifier of the insurance contract to which the PDF will be uploaded.',
    },
    {
        displayName: 'PDF File',
        name: 'pdfFile',
        type: 'string',
        default: '',
        required: true,
        description: 'Path to the PDF file to be uploaded.',
    },
// ------------------------
	//      insuranceContracts - Delete uploaded document
	// ------------------------
];
