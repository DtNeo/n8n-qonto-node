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
					name: 'Create a New Insurance Contract',
					value: 'listTransactions',
					action: 'Create a new insurance contract',
				},
				{
					name: 'Get Insurance Contract',
					value: 'getInsuranceContract',
					action: 'Get insurance contract',
				},
				{
					name: 'Upload a PDF Document for a Specific Insurance Contract',
					value: 'uploadTransaction',
					action: 'Upload a PDF document for a specific insurance contract',
				},
				{
					name: 'Delete Uploaded Document',
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
				displayOptions: {
					show: {
						resource: [
							'insuranceContracts',
						],
						operation: [
							'listTransactions',
						],
					},
				},
        default: '',
        required: true,
        description: 'The unique identifier of the organization creating the insurance contract',
    },
    {
        displayName: 'Contract Name',
        name: 'contractName',
        type: 'string',
				displayOptions: {
					show: {
						resource: [
							'insuranceContracts',
						],
						operation: [
							'listTransactions',
						],
					},
				},
        default: '',
        required: true,
        description: 'The name of the insurance contract',
    },
    {
        displayName: 'Start Date',
        name: 'startDate',
        type: 'dateTime',
				displayOptions: {
					show: {
						resource: [
							'insuranceContracts',
						],
						operation: [
							'listTransactions',
						],
					},
				},
        default: '',
        required: true,
        description: 'The start date of the insurance contract',
    },
    {
        displayName: 'End Date',
        name: 'endDate',
        type: 'dateTime',
				displayOptions: {
					show: {
						resource: [
							'insuranceContracts',
						],
						operation: [
							'listTransactions',
						],
					},
				},
        default: '',
        description: 'The end date of the insurance contract',
    },
    {
        displayName: 'Coverage Details',
        name: 'coverageDetails',
        type: 'string',
				displayOptions: {
					show: {
						resource: [
							'insuranceContracts',
						],
						operation: [
							'listTransactions',
						],
					},
				},
        default: '',
        description: 'Details about the coverage provided by the insurance contract',
    },
	// ------------------------
	//      insuranceContracts - Get insurance contract
	// ------------------------
    {
        displayName: 'Contract ID',
        name: 'contractId',
        type: 'string',
				displayOptions: {
					show: {
						resource: [
							'insuranceContracts',
						],
						operation: [
							'getInsuranceContract',
						],
					},
				},
        default: '',
        required: true,
        description: 'The unique identifier of the insurance contract to be fetched',
    },
	// ------------------------
	//      insuranceContracts - Update an insurance contract
	// ------------------------
    {
        displayName: 'Contract ID',
        name: 'contractId',
        type: 'string',
				displayOptions: {
					show: {
						resource: [
							'insuranceContracts',
						],
						operation: [
							'listTransactions',
						],
					},
				},
        default: '',
        required: true,
        description: 'The unique identifier of the insurance contract to be updated',
    },
    {
        displayName: 'Contract Name',
        name: 'contractName',
        type: 'string',
				displayOptions: {
					show: {
						resource: [
							'insuranceContracts',
						],
						operation: [
							'listTransactions',
						],
					},
				},
        default: '',
        description: 'The updated name of the insurance contract',
    },
    {
        displayName: 'End Date',
        name: 'endDate',
        type: 'dateTime',
				displayOptions: {
					show: {
						resource: [
							'insuranceContracts',
						],
						operation: [
							'listTransactions',
						],
					},
				},
        default: '',
        description: 'The updated end date of the insurance contract',
    },
    {
        displayName: 'Coverage Details',
        name: 'coverageDetails',
        type: 'string',
				displayOptions: {
					show: {
						resource: [
							'insuranceContracts',
						],
						operation: [
							'listTransactions',
						],
					},
				},
        default: '',
        description: 'Updated details about the coverage provided by the insurance contract',
    },
	// ------------------------
	//      insuranceContracts - Upload a PDF document for a specific insurance contract
	// ------------------------
    {
        displayName: 'Contract ID',
        name: 'contractId',
        type: 'string',
				displayOptions: {
					show: {
						resource: [
							'insuranceContracts',
						],
						operation: [
							'uploadTransaction',
						],
					},
				},
        default: '',
        required: true,
        description: 'The unique identifier of the insurance contract to which the PDF will be uploaded',
    },
    {
        displayName: 'PDF File',
        name: 'pdfFile',
        type: 'string',
				displayOptions: {
					show: {
						resource: [
							'insuranceContracts',
						],
						operation: [
							'uploadTransaction',
						],
					},
				},
        default: '',
        required: true,
        description: 'Path to the PDF file to be uploaded',
    },
// ------------------------
	//      insuranceContracts - Delete uploaded document
	// ------------------------
];
