// insuranceContractsDescriptions.ts

import { INodeProperties } from 'n8n-workflow';

// Descriptions for the "Create a new insurance contract" operation
export const createInsuranceContractDescription: INodeProperties[] = [
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
];

// Descriptions for the "Get insurance contract" operation
export const getInsuranceContractDescription: INodeProperties[] = [
    {
        displayName: 'Contract ID',
        name: 'contractId',
        type: 'string',
        default: '',
        required: true,
        description: 'The unique identifier of the insurance contract to be fetched.',
    },
];

// Descriptions for the "Update an insurance contract" operation
export const updateInsuranceContractDescription: INodeProperties[] = [
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
];

// Descriptions for the "Upload a PDF document for a specific insurance contract" operation
export const uploadInsuranceContractPDFDescription: INodeProperties[] = [
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
];
