import {
	IExecuteFunctions
} from 'n8n-core';

import {
	IBinaryData,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	isEmpty
} from 'lodash';

import {
	handleListing,
	qontoApiRequest
} from './helpers';

import {
	attachmentOperations,
	attachmentsInATransactionOperations,
	beneficiariesOperations,
	externalTransfersOperations,
	internalTransactionsOperations,
	labelsOperations,
	membershipsOperations,
	organizationsOperations,
	requestsOperations,
	transactionsOperations,
} from './descriptions';

interface IidLabels {
	showLabel: string;
}

import { v4 as uuid } from 'uuid';

export class Qonto implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Qonto',
		name: 'Qonto',
		icon: 'file:Qonto.svg',
		group: ['output'],
		version: 1.2,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Qonto API',
		defaults: {
			name: 'Qonto',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'qontoApi',
				required: true,
				displayOptions: {
					show: {
						authentication: ['logKey'],
					},
				},
			},
			{
				name: 'qontoOAuth2Api',
				required: true,
				displayOptions: {
					show: {
						authentication: ['oAuth2'],
					},
				},
			},
		],
		properties: [
			{
				displayName: 'Authentication',
				name: 'authentication',
				type: 'options',
				options: [
					{
						name: 'Login and Secret-Key',
						value: 'logKey',
					},
					{
						name: 'OAuth2',
						value: 'oAuth2',
					},
				],
				default: 'oAuth2',
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Attachment',
						value: 'attachment',
					},
					{
						name: 'Attachments in a Transaction',
						value: 'attachmentsInATransaction',
					},
					{
						name: 'Beneficiary',
						value: 'beneficiaries',
					},
					{
						name: 'External Transfer',
						value: 'externalTransfers',
					},
					{
						name: 'Internal Transaction',
						value: 'internalTransactions',
					},
					{
						name: 'Label',
						value: 'labels',
					},
					{
						name: 'Membership',
						value: 'memberships',
					},
					{
						name: 'Organization',
						value: 'organizations',
					},
					{
						name: 'Request',
						value: 'requests',
					},
					{
						name: 'Transaction',
						value: 'transactions',
					},
				],
				default: 'organizations',
				required: true,
			},
			...externalTransfersOperations,
			...beneficiariesOperations,
			...attachmentOperations,
			...labelsOperations,
			...membershipsOperations,
			...organizationsOperations,
			...attachmentsInATransactionOperations,
			...transactionsOperations,
			...internalTransactionsOperations,
			...requestsOperations,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		let headers: IDataObject = {};
		const body: IDataObject = {};
		const query: IDataObject = {};

		let responseData;
		const returnData: IDataObject[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				// ------------------------
				//      EXTERNAL TRANSFERS
				// ------------------------

				if (resource === 'externalTransfers') {
					if (operation === 'createExternalTransfersWithCreditorData') {
						const endpoint = `external_transfers/checkout`;
						const debitIban = this.getNodeParameter('debit_iban', i) as string;
						const externalTransfer = {
							credit_iban: this.getNodeParameter('credit_iban', i) as string,
							credit_account_name: this.getNodeParameter('credit_account_name', i) as string,
							credit_account_currency: this.getNodeParameter('credit_account_currency', i) as string,
							reference: this.getNodeParameter('reference', i) as string,
							note: this.getNodeParameter('note', i) as string,
							currency: this.getNodeParameter('currency', i) as string,
							scheduled_date: this.getNodeParameter('scheduled_date', i) as string,
							amount: this.getNodeParameter('amount', i) as string,
							idempotency_key: this.getNodeParameter('idempotency_key', i) as string,
							attachment_ids: this.getNodeParameter('attachment_ids', i) as IDataObject,
						};
						body.debit_iban = debitIban;
						body.external_transfer = externalTransfer;

						responseData = await qontoApiRequest.call(this, headers, 'POST', endpoint, {}, {});
					}

					if (operation === 'listExternalTransfers') {
						const endpoint = `external_transfers`;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						if (!isEmpty(filters)) {
							query.scheduled_date_from = filters.scheduled_date_from;
							query.scheduled_date_to = filters.scheduled_date_to;
							query['status[]'] = filters.status as IDataObject;
							query.updated_at_from = filters.updated_at_from;
							query.updated_at_to = filters.updated_at_to;
							query['beneficiary_ids[]'] = filters.beneficiary_ids as IDataObject;
						}

						responseData = await handleListing.call(this, headers, 'GET', endpoint, body, query, i);
					}

					if (operation === 'createAnExternalTransfer') {
						const endpoint = `external_transfers`;

						const idempotencyKey = uuid();
						const externalTransfer = {
							beneficiary_id: this.getNodeParameter('beneficiary_id', i) as string,
							debit_iban: this.getNodeParameter('debit_iban', i) as string,
							reference: this.getNodeParameter('reference', i) as string,
							note: this.getNodeParameter('note', i) as string,
							currency: this.getNodeParameter('currency', i) as string,
							scheduled_date: this.getNodeParameter('scheduled_date', i) as string,
							amount: this.getNodeParameter('amount', i) as string,
							attachment_ids: this.getNodeParameter('attachment_ids', i) as IDataObject,
						};

						headers = { 'X-Qonto-Idempotency-Key': idempotencyKey };
						body.external_transfer = externalTransfer;

						responseData = await qontoApiRequest.call(this, headers, 'POST', endpoint, {}, {});
					}

					if (operation === 'showAnExternalTransfer') {
						const id = this.getNodeParameter(`id`, i) as string;
						const endpoint = `external_transfers/${id}`;

						responseData = await qontoApiRequest.call(this, headers, 'GET', endpoint, {}, {});
					}
				}

				// ------------------------
				//      BENEFICIAIRIES
				// ------------------------

				if (resource === 'beneficiaries') {
					if (operation === 'listBeneficiaries') {
						const endpoint = `beneficiaries`;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						if (!isEmpty(filters)) {
							query.iban = filters.iban;
							query.trusted = filters.trusted;
							query['status[]'] = filters.status as IDataObject;
							query.updated_at_from = filters.updated_at_from;
							query.updated_at_to = filters.updated_at_to;
						}
						responseData = await handleListing.call(this, headers, 'GET', endpoint, body, query, i);
					}
					if (operation === 'showBeneficiary') {
						const id = this.getNodeParameter(`id`, i) as string;
						const endpoint = `beneficiaries/${id}`;

						responseData = await qontoApiRequest.call(this, headers, 'GET', endpoint, {}, {});
					}
					if (operation === 'trustBeneficiaries') {
						const endpoint = `beneficiaries/trust`;
						const ids = this.getNodeParameter(`ids`, i) as IDataObject;
						body.ids = ids;

						responseData = await qontoApiRequest.call(this, headers, 'PATCH', endpoint, body, {});
					}
					if (operation === 'untrustBeneficiaries') {
						const endpoint = `beneficiaries/untrust`;
						const ids = this.getNodeParameter(`ids`, i) as IDataObject;
						body.ids = ids;

						responseData = await qontoApiRequest.call(this, headers, 'PATCH', endpoint, body, {});
					}
				}

				// ------------------------
				//      ATTACHMENTS
				// ------------------------

				if (resource === 'attachment') {
					if (operation === 'uploadAttachment') {
						const endpoint = `attachments`;
						const idempotencyKey = uuid();
						const attachmentIds = this.getNodeParameter('attachment_ids', i) as IBinaryData;

						headers = { 'X-Qonto-Idempotency-Key': idempotencyKey };
						body.attachment_ids = attachmentIds;

						responseData = await qontoApiRequest.call(this, headers, 'POST', endpoint, body, {});
					}
					if (operation === 'showAttachment') {
						const id = this.getNodeParameter(`id`, i) as string;
						const endpoint = `attachments/${id}`;

						responseData = await qontoApiRequest.call(this, headers, 'GET', endpoint, {}, {});
					}
				}

				// ------------------------
				//      LABELS
				// ------------------------

				if (resource === 'labels') {
					if (operation === 'listLabels') {
						const endpoint = `labels`;

						responseData = await handleListing.call(this, headers, 'GET', endpoint, {}, {}, i);
					}
					if (operation === 'showLabel') {
						const id = this.getNodeParameter(`id`, i) as string;
						const endpoint = `labels/${id}`;

						responseData = await qontoApiRequest.call(this, headers, 'GET', endpoint, {}, {});
					}
				}

				// ------------------------
				//      MEMBERSHIPS
				// ------------------------

				if (resource === 'memberships') {
					if (operation === 'listMemberships') {
						const endpoint = `memberships`;

						responseData = await handleListing.call(this, headers, 'GET', endpoint, {}, {}, i);
					}
				}

				// ------------------------
				//      ORGANIZATIONS
				// ------------------------

				if (resource === 'organizations') {
					if (operation === 'getOrganizationAndItsBank_accounts') {
						const endpoint = `organization`;

						responseData = await qontoApiRequest.call(this, {}, 'GET', endpoint, {}, {});
					}
				}

				// ------------------------
				//      ATTACHMENTS IN TRANSACTIONS
				// ------------------------

				if (resource === 'attachmentsInATransaction') {
					if (operation === 'uploadAttachmentToATransaction') {
						const id = this.getNodeParameter(`id`, i) as string;
						const endpoint = `transactions/${id}/attachments`;
						const idempotencyKey = uuid();
						headers = { 'X-Qonto-Idempotency-Key': idempotencyKey };
						const attachmentIds = this.getNodeParameter('attachment_ids', i) as IBinaryData;

						responseData = await qontoApiRequest.call(this, headers, 'POST', endpoint, {}, {});
					}
					if (operation === 'listAttachmentsInATransaction') {
						const id = this.getNodeParameter(`id`, i) as string;
						const endpoint = `transactions/${id}/attachments`;

						responseData = await qontoApiRequest.call(this, headers, 'GET', endpoint, {}, {});
					}
					if (operation === 'removeAllAttachmentsFromATransaction') {
						const id = this.getNodeParameter(`id`, i) as string;
						const endpoint = `transactions/${id}/attachments`;

						responseData = await qontoApiRequest.call(this, headers, 'DELETE', endpoint, {}, {});
					}
					if (operation === 'removeAnAttachmentFromATransaction') {
						const id = this.getNodeParameter(`id`, i) as string;
						const endpoint = `transactions/${id}/attachments/${id}`;

						responseData = await qontoApiRequest.call(this, headers, 'DELETE', endpoint, {}, {});
					}
				}

				// ------------------------
				//      TRANSACTIONS
				// ------------------------

				if (resource === 'transactions') {
					if (operation === 'listTransactions') {
						const iban = this.getNodeParameter('iban', i) as string;
						query.iban = iban;
						const endpoint = `transactions`;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						if (!isEmpty(filters)) {
							query['status[]'] = filters.status as IDataObject;
							query.updated_at_from = filters.updated_at_from;
							query.updated_at_to = filters.updated_at_to;
							query.emitted_at_from = filters.emitted_at_from;
							query.emitted_at_to = filters.emitted_at_to;
							query.settled_at_from = filters.settled_at_from;
							query.settled_at_to = filters.settled_at_to;
							query.side = filters.side;
							query['operation_type[]'] = filters.operation_type as IDataObject;
							query.with_attachments = filters.with_attachments;
							query.labels = filters.labels;
							query.attachments = filters.attachments;
						}

						responseData = await handleListing.call(this, headers, 'GET', endpoint, {}, query, i);
					}
					if (operation === 'showTransaction') {
						const id = this.getNodeParameter(`id`, i) as string;
						const endpoint = `transactions/${id}`;

						responseData = await qontoApiRequest.call(this, {}, 'GET', endpoint, {}, {});
					}
				}

				// ------------------------
				//      INTERNAL TRANSFERS
				// ------------------------

				if (resource === 'internalTransactions') {
					if (operation === 'createInternalTransfer') {
						const endpoint = `internal_transfers`;
						const idempotencyKey = uuid();
						headers = { 'X-Qonto-Idempotency-Key': idempotencyKey };
						const externalTransfer = {
							debit_iban: this.getNodeParameter('debit_iban', i) as string,
							credit_iban: this.getNodeParameter('credit_iban', i) as string,
							reference: this.getNodeParameter('reference', i) as string,
							currency: this.getNodeParameter('currency', i) as string,
							amount: this.getNodeParameter('amount', i) as string,
						};
						body.external_transfer = externalTransfer;

						responseData = await qontoApiRequest.call(this, headers, 'POST', endpoint, body, {});
					}
				}

				// ------------------------
				//      REQUESTS
				// ------------------------

				if (resource === 'requests') {
					if (operation === 'listRequests') {
						const endpoint = `requests`;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						if (!isEmpty(filters)) {
							query['status[]'] = filters.status as IDataObject;
							query['request_type[]'] = filters.request_type as IDataObject;
							query.created_at_from = filters.created_at_from;
							query.processed_at_from = filters.processed_at_from;
						}

						responseData = await qontoApiRequest.call(this, {}, 'GET', endpoint, {}, query);
					}
					if (operation === 'approveARequest') {
						const id = this.getNodeParameter(`id`, i) as string;
						const requestType = this.getNodeParameter(`request_type`, i) as string;
						const endpoint = `requests/${requestType}/${id}/approve`;
						const idempotencyKey = uuid();
						headers = { 'X-Qonto-Idempotency-Key': idempotencyKey };
						const debitIban = this.getNodeParameter('debit_iban', i) as string;
						body.debit_iban = debitIban;

						responseData = await qontoApiRequest.call(this, headers, 'POST', endpoint, body, {});
					}
					if (operation === 'declineARequest') {
						const id = this.getNodeParameter(`id`, i) as string;
						const requestType = this.getNodeParameter(`request_type`, i) as string;
						const endpoint = `requests/${requestType}/${id}/decline`;
						const idempotencyKey = uuid();
						headers = { 'X-Qonto-Idempotency-Key': idempotencyKey };
						const declinedNote = this.getNodeParameter('declined_note', i) as string;
						body.declined_note = declinedNote;

						responseData = await qontoApiRequest.call(this, headers, 'POST', endpoint, body, {});
					}
				}
			} catch (error) {
				// ------------------------
				//      SEND RESULTS
				// ------------------------

				if (this.continueOnFail()) {
					returnData.push({ error: error.message });
					continue;
				}
				throw error;
			}
			Array.isArray(responseData)
				? returnData.push(...responseData)
				: returnData.push(responseData);
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
