// cardsDescriptions.ts

import { INodeProperties } from 'n8n-workflow';

// Descriptions for the "List cards" operation
export const listCardsDescription: INodeProperties[] = [
    {
        displayName: 'Organization ID',
        name: 'organizationId',
        type: 'string',
        default: '',
        required: true,
        description: 'The unique identifier of the organization whose cards are to be listed.',
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
        description: 'Filter cards by their status.',
    },
];

// Descriptions for the "Create a new Virtual (virtual, flash, advertising) card" operation
export const createVirtualCardDescription: INodeProperties[] = [
    {
        displayName: 'Organization ID',
        name: 'organizationId',
        type: 'string',
        default: '',
        required: true,
        description: 'The unique identifier of the organization for which the virtual card will be created.',
    },
    {
        displayName: 'Card Type',
        name: 'cardType',
        type: 'options',
        options: [
            { name: 'Virtual', value: 'virtual' },
            { name: 'Flash', value: 'flash' },
            { name: 'Advertising', value: 'advertising' },
        ],
        default: 'virtual',
        required: true,
        description: 'The type of virtual card to create.',
    },
    {
        displayName: 'Card Name',
        name: 'cardName',
        type: 'string',
        default: '',
        required: true,
        description: 'The name of the virtual card.',
    },
    {
        displayName: 'Spending Limit',
        name: 'spendingLimit',
        type: 'number',
        default: '',
        required: false,
        description: 'The spending limit for the virtual card.',
    },
    {
        displayName: 'Currency',
        name: 'currency',
        type: 'string',
        default: 'EUR',
        required: true,
        description: 'The currency of the virtual card.',
    },
];
