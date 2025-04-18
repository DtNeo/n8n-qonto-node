import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IExecuteFunctions,
} from 'n8n-workflow';

import { NodeConnectionType } from 'n8n-workflow';

import isEmpty from 'lodash/isEmpty';

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
	suplierInvoicesOperations,
  clientsInvoicesOperations,
  creditNotesOperations,
  clientsOperations,
  teamsOperations,
  statementsOperations,
  insuranceContractsOperations,
  cardsOperations,
} from './descriptions';

import { v4 as uuid } from 'uuid';

export class Qonto implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Qonto',
		name: 'qonto',
		icon: 'file:Qonto.svg',
		group: ['output'],
		version: 2,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Qonto API',
		defaults: {
			name: 'Qonto',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
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
					{ name: 'Attachment', value: 'attachment' },
					{ name: 'Attachments in a Transaction', value: 'attachmentsInATransaction' },
					{ name: 'Beneficiary', value: 'beneficiaries' },
					{ name: 'Card', value: 'cards' },
					{ name: 'Client', value: 'clients' },
					{ name: 'Client Invoice', value: 'clientsInvoices' },
					{ name: 'Credit Note', value: 'creditNotes' },
					{ name: 'External Transfer', value: 'externalTransfers' },
					{ name: 'Insurance Contract', value: 'insuranceContracts' },
					{ name: 'Internal Transaction', value: 'internalTransactions' },
					{ name: 'Label', value: 'labels' },
					{ name: 'Membership', value: 'memberships' },
					{ name: 'Organization', value: 'organizations' },
					{ name: 'Request', value: 'requests' },
					{ name: 'Statement', value: 'statements' },
					{ name: 'Supplier Invoice', value: 'suplierInvoices' },
					{ name: 'Team', value: 'teams' },
					{ name: 'Transaction', value: 'transactions' },
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
			...suplierInvoicesOperations,
      ...clientsInvoicesOperations,
      ...creditNotesOperations,
      ...clientsOperations,
      ...teamsOperations,
      ...statementsOperations,
      ...insuranceContractsOperations,
      ...cardsOperations,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		let headers: IDataObject = {};
		const query: IDataObject = {};

		let responseData;
		const returnData: IDataObject[] = [];

		for (let i = 0; i < items.length; i++) {
			try {

// ------------------------
//      EXTERNAL TRANSFERS
// ------------------------
if (resource === 'externalTransfers') {

	// -----------------------------------------
	// SHOW AN EXTERNAL TRANSFER
	// GET /external_transfers/:id
	// -----------------------------------------
	if (operation === 'showAnExternalTransfer') {
		const id = this.getNodeParameter('id', i) as string;
		const endpoint = `external_transfers/${id}`;

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			{},
		);
	}

	// -----------------------------------------
	// CREATE AN EXTERNAL TRANSFER (using existing beneficiary)
	// POST /external_transfers
	// -----------------------------------------
	if (operation === 'createAnExternalTransfer') {
		const endpoint = 'external_transfers';

		const idempotencyKey = uuid();
		headers = {
			...headers,
			'X-Qonto-Idempotency-Key': idempotencyKey,
		};

		const externalTransfer: IDataObject = {
			beneficiary_id: this.getNodeParameter('beneficiary_id', i) as string,
			debit_iban:     this.getNodeParameter('debit_iban', i)     as string,
			reference:      this.getNodeParameter('reference', i)      as string,
			note:           this.getNodeParameter('note', i)           as string,
			currency:       this.getNodeParameter('currency', i)       as string,
			scheduled_date: this.getNodeParameter('scheduled_date', i) as string,
			amount:         this.getNodeParameter('amount', i)         as string,
			attachment_ids: this.getNodeParameter('attachment_ids', i) as IDataObject,
		};

		const body: IDataObject = {
			external_transfer: externalTransfer,
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'POST',
			endpoint,
			body,
			{},
		);
	}

	// -----------------------------------------
	// CREATE EXTERNAL TRANSFER WITH CREDITOR DATA
	// POST /external_transfers/checkout
	// -----------------------------------------
	if (operation === 'createExternalTransfersWithCreditorData') {
		const endpoint = 'external_transfers/checkout';

		const idempotencyKey = this.getNodeParameter('idempotency_key', i, null) as string | null;
		headers = {
			...headers,
			'X-Qonto-Idempotency-Key': idempotencyKey || uuid(),
		};

		const debit_iban = this.getNodeParameter('debit_iban', i) as string;

		const externalTransfer: IDataObject = {
			credit_iban:            this.getNodeParameter('credit_iban', i)            as string,
			credit_account_name:    this.getNodeParameter('credit_account_name', i)    as string,
			credit_account_currency:this.getNodeParameter('credit_account_currency', i)as string,
			reference:              this.getNodeParameter('reference', i)              as string,
			note:                   this.getNodeParameter('note', i)                   as string,
			currency:               this.getNodeParameter('currency', i)               as string,
			scheduled_date:         this.getNodeParameter('scheduled_date', i)         as string,
			amount:                 this.getNodeParameter('amount', i)                 as string,
			attachment_ids:         this.getNodeParameter('attachment_ids', i)         as IDataObject,
		};

		const body: IDataObject = {
			debit_iban,
			external_transfer: externalTransfer,
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'POST',
			endpoint,
			body,
			{},
		);
	}

	// -----------------------------------------
	// LIST EXTERNAL TRANSFERS
	// GET /external_transfers
	// -----------------------------------------
	if (operation === 'listExternalTransfers') {
		const endpoint = 'external_transfers';

		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!isEmpty(filters)) {
			if (filters.scheduled_date_from) {
				query.scheduled_date_from = filters.scheduled_date_from;
			}
			if (filters.scheduled_date_to) {
				query.scheduled_date_to = filters.scheduled_date_to;
			}
			if (filters.status) {
				query['status[]'] = filters.status;
			}
			if (filters.updated_at_from) {
				query.updated_at_from = filters.updated_at_from;
			}
			if (filters.updated_at_to) {
				query.updated_at_to = filters.updated_at_to;
			}
			if (filters.beneficiary_ids) {
				query['beneficiary_ids[]'] = filters.beneficiary_ids;
			}
		}

		responseData = await handleListing.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			query,
			i,
		);
	}
}

// ------------------------
//      BENEFICIARIES
// ------------------------
if (resource === 'beneficiaries') {

	// -----------------------------------------
	// LIST BENEFICIARIES
	// GET /beneficiaries
	// -----------------------------------------
	if (operation === 'listBeneficiaries') {
		const endpoint = 'beneficiaries';

		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!isEmpty(filters)) {

			if (filters.iban) {
				query.iban = filters.iban as string;
			}

			if (typeof filters.trusted !== 'undefined') {
				query.trusted = filters.trusted;
			}

			if (filters.status) {
				query['status[]'] = filters.status;
			}

			if (filters.updated_at_from) {
				query.updated_at_from = filters.updated_at_from;
			}
			if (filters.updated_at_to) {
				query.updated_at_to = filters.updated_at_to;
			}
		}

		responseData = await handleListing.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			query,
			i,
		);
	}

	// -----------------------------------------
	// SHOW A BENEFICIARY
	// GET /beneficiaries/:id
	// -----------------------------------------
	if (operation === 'showBeneficiary') {
		const id = this.getNodeParameter('id', i) as string;
		const endpoint = `beneficiaries/${id}`;

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			{},
		);
	}

	// -----------------------------------------
	// UNTRUST A LIST OF BENEFICIARIES
	// PATCH /beneficiaries/untrust
	// -----------------------------------------
	if (operation === 'untrustBeneficiaries') {
		const endpoint = 'beneficiaries/untrust';

		const ids = this.getNodeParameter('ids', i) as string[];

		const body: IDataObject = {
			ids,
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'PATCH',
			endpoint,
			body,
			{},
		);
	}
}

// ------------------------
//      ATTACHMENTS
// ------------------------
if (resource === 'attachments') {

	// -----------------------------------------
	// UPLOAD AN ATTACHMENT
	// POST /attachments
	// -----------------------------------------
	if (operation === 'uploadAttachment') {
		const endpoint = 'attachments';

		const idempotencyKey = uuid();
		headers = {
			...headers,
			'X-Qonto-Idempotency-Key': idempotencyKey,
			'Content-Type': 'application/json',
		};

		const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;

		const fileBuffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
		const base64File = fileBuffer.toString('base64');

		const fileName = this.getNodeParameter('fileName', i, 'upload.bin') as string;

		const body: IDataObject = {
			attachments: [
				{
					file: base64File,
					filename: fileName,
				},
			],
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'POST',
			endpoint,
			body,
			{},
		);
	}

	// -----------------------------------------
	// SHOW ATTACHMENT
	// GET /attachments/:attachment_id
	// -----------------------------------------
	if (operation === 'showAttachment') {
		const attachmentId = this.getNodeParameter('id', i) as string;
		const endpoint = `attachments/${attachmentId}`;

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			{},
		);
	}
}

// ------------------------
//      LABELS
// ------------------------
if (resource === 'labels') {

	// -----------------------------------------
	// LIST LABELS
	// GET /labels
	// -----------------------------------------
	if (operation === 'listLabels') {
		const endpoint = 'labels';

		const organizationId = this.getNodeParameter('organizationId', i) as string;
		query.organization_id = organizationId;

		responseData = await handleListing.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			query,
			i,
		);
	}

	// -----------------------------------------
	// SHOW LABEL
	// GET /labels/:label_id
	// -----------------------------------------
	if (operation === 'showLabel') {
		const labelId = this.getNodeParameter('id', i) as string;
		const endpoint = `labels/${labelId}`;

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			{},
		);
	}
}


// ------------------------
//      MEMBERSHIPS
// ------------------------
if (resource === 'memberships') {
		// ------------------------
	// LIST MEMBERSHIPS
	// GET /memberships
	// ------------------------
	if (operation === 'listMemberships') {
		const endpoint = 'memberships';

		responseData = await handleListing.call(this, headers, 'GET', endpoint, {}, {}, i);
	}

	// ------------------------
	// GET A SINGLE MEMBERSHIP
	// GET /memberships/:membership_id
	// ------------------------
	if (operation === 'getMembership') {
		const membershipId = this.getNodeParameter('membership_id', i) as string;
		const endpoint = `memberships/${membershipId}`;

		responseData = await handleListing.call(this, headers, 'GET', endpoint, {}, {}, i);
	}

	// ------------------------
	// CREATE & INVITE A MEMBERSHIP
	// POST /memberships/invite_employee_or_accountant
	// ------------------------
	if (operation === 'createMembership') {
		const endpoint = 'memberships/invite_employee_or_accountant';

		const email     = this.getNodeParameter('email', i) as string;
		const firstName = this.getNodeParameter('first_name', i) as string;
		const lastName  = this.getNodeParameter('last_name', i) as string;
		const role      = this.getNodeParameter('role', i) as string;
		const teamId    = this.getNodeParameter('team_id', i, '') as string;

		const body: IDataObject = {
			membership: {
				email,
				first_name: firstName,
				last_name : lastName,
				role,
			},
		};

		if (teamId) {
			(body.membership as IDataObject).team_id = teamId;
		}

		responseData = await handleListing.call(this, headers, 'POST', endpoint, body, {}, i);
	}
}

// ------------------------
//      ORGANIZATIONS
// ------------------------
if (resource === 'organizations') {

	// -----------------------------------------
	// GET ORGANIZATION AND ITS BANK ACCOUNTS
	// GET /organization
	// -----------------------------------------
	if (operation === 'getOrganizationAndItsBank_accounts') {
		const endpoint = 'organization';

		const includeExternalAccounts = this.getNodeParameter('include_external_accounts', i) as boolean;

		const query: IDataObject = {};
		if (includeExternalAccounts) {
			query.include_external_accounts = 'true';
		}

		// Appel de l'API
		responseData = await qontoApiRequest.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			query,
		);
	}
}

// ------------------------
//      ATTACHMENTS IN TRANSACTIONS
// ------------------------
if (resource === 'attachmentsInATransaction') {

	// ------------------------------------------
	// UPLOAD ATTACHMENT TO A TRANSACTION
	// POST /transactions/{transaction_id}/attachments
	// ------------------------------------------
	if (operation === 'uploadAttachmentToATransaction') {
		const transactionId = this.getNodeParameter('transaction_id', i) as string;

		const endpoint = `transactions/${transactionId}/attachments`;

		const idempotencyKey = uuid();
		headers = {
			...headers,
			'X-Qonto-Idempotency-Key': idempotencyKey,
		};

		const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;
		const fileBuffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
		const base64File = fileBuffer.toString('base64');

		const body: IDataObject = {
			file: base64File,
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'POST',
			endpoint,
			body,
			{}
		);
	}

	// ------------------------------------------
	// LIST ATTACHMENTS IN A TRANSACTION
	// GET /transactions/{transaction_id}/attachments
	// ------------------------------------------
	if (operation === 'listAttachmentsInATransaction') {
		const transactionId = this.getNodeParameter('id', i) as string;
		const endpoint = `transactions/${transactionId}/attachments`;

		responseData = await qontoApiRequest.call(this, headers, 'GET', endpoint, {}, {});
	}

	// ------------------------------------------
	// REMOVE ALL ATTACHMENTS FROM A TRANSACTION
	// DELETE /transactions/{transaction_id}/attachments
	// ------------------------------------------
	if (operation === 'removeAllAttachmentsFromATransaction') {
		const transactionId = this.getNodeParameter('id', i) as string;
		const endpoint = `transactions/${transactionId}/attachments`;

		responseData = await qontoApiRequest.call(this, headers, 'DELETE', endpoint, {}, {});
	}

	// ------------------------------------------
	// REMOVE A SINGLE ATTACHMENT FROM A TRANSACTION
	// DELETE /transactions/{transaction_id}/attachments/{attachment_id}
	// ------------------------------------------
	if (operation === 'removeAnAttachmentFromATransaction') {
		const transactionId = this.getNodeParameter('transaction_id', i) as string;
		const attachmentId = this.getNodeParameter('attachment_id', i) as string;

		const endpoint = `transactions/${transactionId}/attachments/${attachmentId}`;

		responseData = await qontoApiRequest.call(this, headers, 'DELETE', endpoint, {}, {});
	}
}

// ------------------------
//      TRANSACTIONS
// ------------------------
if (resource === 'transactions') {

	// -----------------------------------------
	// LIST TRANSACTIONS
	// GET /transactions
	// -----------------------------------------
	if (operation === 'listTransactions') {
		const endpoint = 'transactions';
		const iban = this.getNodeParameter('iban', i) as string;
		query.iban = iban;

		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!isEmpty(filters)) {
			if (filters.status) {
				query['status[]'] = filters.status as string[];
			}
			if (filters.updated_at_from) {
				query.updated_at_from = filters.updated_at_from;
			}
			if (filters.updated_at_to) {
				query.updated_at_to = filters.updated_at_to;
			}
			if (filters.emitted_at_from) {
				query.emitted_at_from = filters.emitted_at_from;
			}
			if (filters.emitted_at_to) {
				query.emitted_at_to = filters.emitted_at_to;
			}
			if (filters.settled_at_from) {
				query.settled_at_from = filters.settled_at_from;
			}
			if (filters.settled_at_to) {
				query.settled_at_to = filters.settled_at_to;
			}
			if (filters.side) {
				query.side = filters.side;
			}
			if (filters.operation_type) {
				query['operation_type[]'] = filters.operation_type as string[];
			}
			if (typeof filters.with_attachments !== 'undefined') {
				query.with_attachments = filters.with_attachments;
			}
			if (filters.labels) {
				query.labels = filters.labels;
			}
			if (filters.attachments) {
				query.attachments = filters.attachments;
			}
		}

		responseData = await handleListing.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			query,
			i,
		);
	}

	// -----------------------------------------
	// SHOW A TRANSACTION
	// GET /transactions/:transaction_id
	// -----------------------------------------
	if (operation === 'showTransaction') {
		const id = this.getNodeParameter('id', i) as string;
		const endpoint = `transactions/${id}`;

		responseData = await qontoApiRequest.call(
			this,
			{},
			'GET',
			endpoint,
			{},
			{},
		);
	}
}

// ------------------------
//      INTERNAL TRANSFERS
// ------------------------
if (resource === 'internalTransactions') {
	// CREATE INTERNAL TRANSFER
	if (operation === 'createInternalTransfer') {
		const endpoint = 'internal_transfers';
		const idempotencyKey = uuid();
		headers = { 'X-Qonto-Idempotency-Key': idempotencyKey };

		const internalTransfer = {
			debit_iban:  this.getNodeParameter('debit_iban', i)  as string,
			credit_iban: this.getNodeParameter('credit_iban', i) as string,
			reference:   this.getNodeParameter('reference', i)   as string,
			currency:    this.getNodeParameter('currency', i)    as string,
			amount:      this.getNodeParameter('amount', i)      as string,
		};

		const body = {
			internal_transfer: internalTransfer,
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'POST',
			endpoint,
			body,
			{},
		);
	}
}

// ------------------------
//      REQUESTS
// ------------------------
if (resource === 'requests') {

	// -----------------------------------------
	// LIST REQUESTS
	// GET /requests
	// -----------------------------------------
	if (operation === 'listRequests') {
		const endpoint = 'requests';

		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!isEmpty(filters)) {

			if (filters.status) {
				query['status[]'] = filters.status;
			}

			if (filters.request_type) {
				query['request_type[]'] = filters.request_type;
			}

			if (filters.created_at_from) {
				query.created_at_from = filters.created_at_from;
			}
			if (filters.processed_at_from) {
				query.processed_at_from = filters.processed_at_from;
			}
		}

		responseData = await qontoApiRequest.call(
			this,
			{},
			'GET',
			endpoint,
			{},
			query,
		);
	}

	// -----------------------------------------
	// APPROVE A REQUEST
	// POST /requests/:request_type/:request_id/approve
	// -----------------------------------------
	if (operation === 'approveARequest') {
		const requestId   = this.getNodeParameter('id', i) as string;
		const requestType = this.getNodeParameter('request_type', i) as string;

		const endpoint = `requests/${requestType}/${requestId}/approve`;

		const idempotencyKey = uuid();
		headers = {
			...headers,
			'X-Qonto-Idempotency-Key': idempotencyKey,
		};

		const body: IDataObject = {};
		const debitIban = this.getNodeParameter('debit_iban', i) as string;
		if (debitIban) {
			body.debit_iban = debitIban;
		}

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'POST',
			endpoint,
			body,
			{},
		);
	}

	// -----------------------------------------
	// DECLINE A REQUEST
	// POST /requests/:request_type/:request_id/decline
	// -----------------------------------------
	if (operation === 'declineARequest') {
		const requestId   = this.getNodeParameter('id', i) as string;
		const requestType = this.getNodeParameter('request_type', i) as string;

		const endpoint = `requests/${requestType}/${requestId}/decline`;

		const idempotencyKey = uuid();
		headers = {
			...headers,
			'X-Qonto-Idempotency-Key': idempotencyKey,
		};

		const body: IDataObject = {};
		const declinedNote = this.getNodeParameter('declined_note', i) as string;
		if (declinedNote) {
			body.declined_note = declinedNote;
		}

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'POST',
			endpoint,
			body,
			{},
		);
	}
}

// ------------------------
//      SUPPLIER INVOICES
// ------------------------
if (resource === 'supplierInvoices') {

	// -----------------------------------------
	// GET A LIST OF SUPPLIER INVOICES
	// GET /supplier_invoices
	// -----------------------------------------
	if (operation === 'listSupplierInvoices') {
		const endpoint = 'supplier_invoices';

		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!isEmpty(filters)) {
			if (filters.status) {
				query.status = filters.status;
			}
			if (filters.start_date) {
				query.start_date = filters.start_date;
			}
			if (filters.end_date) {
				query.end_date = filters.end_date;
			}
		}

		responseData = await handleListing.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			query,
			i,
		);
	}

	// -----------------------------------------
	// CREATE SUPPLIER INVOICES (BULK)
	// POST /supplier_invoices/bulk
	// -----------------------------------------
	if (operation === 'createSupplierInvoices') {
		const endpoint = 'supplier_invoices/bulk';

		const invoices = this.getNodeParameter('supplierInvoices', i) as IDataObject[];
		const organizationId = this.getNodeParameter('organizationId', i) as string;

		const body: IDataObject = {
			organization_id: organizationId,
			supplier_invoices: invoices.map((invoice) => ({
				invoice_number:  invoice.invoiceNumber,
				invoice_date:    invoice.invoiceDate,
				amount:          invoice.amount,
				currency:        invoice.currency,
				attachment_ids:  invoice.attachmentIds,
			})),
		};

		headers = {
			...headers,
			'Content-Type': 'application/json',
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'POST',
			endpoint,
			body,
			{},
		);
	}
}

// ------------------------
//      CLIENT INVOICES
// ------------------------
if (resource === 'clientInvoices') {

	// -----------------------------------------
	// GET A LIST OF CLIENT INVOICES
	// GET /client_invoices
	// -----------------------------------------
	if (operation === 'listClientInvoices') {
		const endpoint = 'client_invoices';

		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!isEmpty(filters)) {
			if (filters.status) {
				query.status = filters.status;
			}
			if (filters.start_date) {
				query.start_date = filters.start_date;
			}
			if (filters.end_date) {
				query.end_date = filters.end_date;
			}
		}

		responseData = await handleListing.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			query,
			i,
		);
	}

	// -----------------------------------------
	// CREATE A CLIENT INVOICE
	// POST /client_invoices
	// -----------------------------------------
	if (operation === 'createClientInvoice') {
		const endpoint = 'client_invoices';

		const organizationId = this.getNodeParameter('organizationId', i) as string;
		const clientInvoice = this.getNodeParameter('clientInvoice', i) as IDataObject;

		const body: IDataObject = {
			organization_id: organizationId,
			client_invoice: {
				invoice_number: clientInvoice.invoiceNumber,
				invoice_date:   clientInvoice.invoiceDate,
				due_date:       clientInvoice.dueDate,
				amount:         clientInvoice.amount,
				currency:       clientInvoice.currency,
				description:    clientInvoice.description,
			},
		};

		headers = {
			...headers,
			'Content-Type': 'application/json',
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'POST',
			endpoint,
			body,
			{},
		);
	}
}

// ------------------------
//      CREDIT NOTES
// ------------------------
if (resource === 'creditNotes') {

	// -----------------------------------------
	// GET A LIST OF CREDIT NOTES
	// GET /credit_notes
	// -----------------------------------------
	if (operation === 'listCreditNotes') {
		const endpoint = 'credit_notes';

		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!isEmpty(filters)) {
			if (filters.status) {
				query.status = filters.status;
			}
			if (filters.start_date) {
				query.start_date = filters.start_date;
			}
			if (filters.end_date) {
				query.end_date = filters.end_date;
			}
		}

		responseData = await handleListing.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			query,
			i,
		);
	}

	// -----------------------------------------
	// GET DETAILS OF A SPECIFIC CREDIT NOTE
	// GET /credit_notes/:credit_note_id
	// -----------------------------------------
	if (operation === 'getCreditNoteDetails') {
		const creditNoteId = this.getNodeParameter('creditNoteId', i) as string;
		const endpoint = `credit_notes/${creditNoteId}`;

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			{},
		);
	}
}

// ------------------------
//      CLIENTS
// ------------------------
if (resource === 'clients') {

	// -----------------------------------------
	// GET A LIST OF CLIENTS
	// GET /clients
	// -----------------------------------------
	if (operation === 'listClients') {
		const endpoint = 'clients';

		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!isEmpty(filters)) {
			if (filters.status) {
				query.status = filters.status;
			}
			if (filters.start_date) {
				query.start_date = filters.start_date;
			}
			if (filters.end_date) {
				query.end_date = filters.end_date;
			}
		}

		responseData = await handleListing.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			query,
			i,
		);
	}

	// -----------------------------------------
	// GET CLIENT DETAILS
	// GET /clients/:client_id
	// -----------------------------------------
	if (operation === 'getClientDetails') {
		const clientId = this.getNodeParameter('clientId', i) as string;
		const endpoint = `clients/${clientId}`;

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			{},
		);
	}

	// -----------------------------------------
	// CREATE A CLIENT
	// POST /clients
	// -----------------------------------------
	if (operation === 'createClient') {
		const endpoint = 'clients';

		const organizationId = this.getNodeParameter('organizationId', i) as string;

		const clientData = {
			name:         this.getNodeParameter('clientName', i) as string,
			email:        this.getNodeParameter('email', i) as string,
			phone_number: this.getNodeParameter('phoneNumber', i, null) as string | null,
			address:      this.getNodeParameter('address', i, null) as string | null,
		};

		const body: IDataObject = {
			organization_id: organizationId,
			client: clientData,
		};

		headers = {
			...headers,
			'Content-Type': 'application/json',
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'POST',
			endpoint,
			body,
			{},
		);
	}
}

// ------------------------
//      TEAMS
// ------------------------
if (resource === 'teams') {

	// -----------------------------------------
	// LIST TEAMS IN AN ORGANIZATION
	// GET /teams?organization_id=xxx
	// -----------------------------------------
	if (operation === 'listTeams') {
		const endpoint = 'teams';

		const organizationId = this.getNodeParameter('organizationId', i) as string;
		query.organization_id = organizationId;

		responseData = await handleListing.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			query,
			i,
		);
	}

	// -----------------------------------------
	// CREATE A NEW TEAM
	// POST /teams
	// -----------------------------------------
	if (operation === 'createTeam') {
		const endpoint = 'teams';

		const organizationId = this.getNodeParameter('organizationId', i) as string;
		const teamData = {
			name:        this.getNodeParameter('teamName', i) as string,
			description: this.getNodeParameter('teamDescription', i, null) as string | null,
		};

		const body: IDataObject = {
			organization_id: organizationId,
			team: teamData,
		};

		headers = {
			...headers,
			'Content-Type': 'application/json',
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'POST',
			endpoint,
			body,
			{},
		);
	}
}


// ------------------------
//      STATEMENTS
// ------------------------
if (resource === 'statements') {

	// -----------------------------------------
	// LIST STATEMENTS
	// GET /statements?organization_id=xxx
	// -----------------------------------------
	if (operation === 'listStatements') {
		const endpoint = 'statements';

		const organizationId = this.getNodeParameter('organizationId', i) as string;
		query.organization_id = organizationId;

		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!isEmpty(filters)) {
			if (filters.start_date) {
				query.start_date = filters.start_date;
			}
			if (filters.end_date) {
				query.end_date = filters.end_date;
			}
		}

		responseData = await handleListing.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			query,
			i,
		);
	}

	// -----------------------------------------
	// SHOW STATEMENT DETAILS
	// GET /statements/:statement_id
	// -----------------------------------------
	if (operation === 'showStatement') {
		const statementId = this.getNodeParameter('statementId', i) as string;
		const endpoint = `statements/${statementId}`;

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			{},
		);
	}
}

// ------------------------
//  INSURANCE CONTRACTS
// ------------------------
if (resource === 'insuranceContracts') {

	// -----------------------------------------
	// CREATE A NEW INSURANCE CONTRACT
	// POST /insurance_contracts
	// -----------------------------------------
	if (operation === 'createInsuranceContract') {
		const endpoint = 'insurance_contracts';

		const organizationId = this.getNodeParameter('organizationId', i) as string;

		const contractData = {
			name:             this.getNodeParameter('contractName', i) as string,
			start_date:       this.getNodeParameter('startDate', i) as string,
			end_date:         this.getNodeParameter('endDate', i, null) as string | null,
			coverage_details: this.getNodeParameter('coverageDetails', i, null) as string | null,
		};

		const body: IDataObject = {
			organization_id: organizationId,
			contract: contractData,
		};

		headers = {
			...headers,
			'Content-Type': 'application/json',
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'POST',
			endpoint,
			body,
			{},
		);
	}

	// -----------------------------------------
	// GET DETAILS OF AN INSURANCE CONTRACT
	// GET /insurance_contracts/:contract_id
	// -----------------------------------------
	if (operation === 'getInsuranceContract') {
		const contractId = this.getNodeParameter('contractId', i) as string;
		const endpoint = `insurance_contracts/${contractId}`;

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			{},
		);
	}

	// -----------------------------------------
	// UPDATE AN INSURANCE CONTRACT
	// PATCH /insurance_contracts/:contract_id
	// -----------------------------------------
	if (operation === 'updateInsuranceContract') {
		const contractId = this.getNodeParameter('contractId', i) as string;
		const endpoint = `insurance_contracts/${contractId}`;

		const updateData: IDataObject = {
			name:             this.getNodeParameter('contractName', i, null) as string | null,
			end_date:         this.getNodeParameter('endDate', i, null) as string | null,
			coverage_details: this.getNodeParameter('coverageDetails', i, null) as string | null,
		};

		const body: IDataObject = {
			contract: updateData,
		};

		headers = {
			...headers,
			'Content-Type': 'application/json',
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'PATCH',
			endpoint,
			body,
			{},
		);
	}

	// -----------------------------------------
	// UPLOAD A PDF FOR A SPECIFIC CONTRACT
	// POST /insurance_contracts/:contract_id/upload
	// -----------------------------------------
	if (operation === 'uploadInsuranceContractPDF') {
		const contractId = this.getNodeParameter('contractId', i) as string;
		const pdfFile = this.getNodeParameter('pdfFile', i) as string;

		const endpoint = `insurance_contracts/${contractId}/upload`;

		const body: IDataObject = {
			pdf_file: pdfFile,
		};

		headers = {
			...headers,
			'Content-Type': 'application/json',
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'POST',
			endpoint,
			body,
			{},
		);
	}
}


// ------------------------
//      CARDS
// ------------------------
if (resource === 'cards') {

	// -----------------------------------------
	// LIST CARDS
	// GET /cards
	// -----------------------------------------
	if (operation === 'listCards') {
		const endpoint = 'cards';

		const organizationId = this.getNodeParameter('organizationId', i) as string;
		query.organization_id = organizationId;

		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!isEmpty(filters)) {
			if (filters.status) {
				query.status = filters.status;
			}
		}

		responseData = await handleListing.call(
			this,
			headers,
			'GET',
			endpoint,
			{},
			query,
			i,
		);
	}

	// -----------------------------------------
	// CREATE A NEW VIRTUAL CARD
	// POST /cards
	// -----------------------------------------
	if (operation === 'createVirtualCard') {
		const endpoint = 'cards';

		const organizationId = this.getNodeParameter('organizationId', i) as string;

		const cardData: IDataObject = {
			type:            this.getNodeParameter('cardType', i) as string,
			name:            this.getNodeParameter('cardName', i) as string,
			spending_limit:  this.getNodeParameter('spendingLimit', i, null) as number | null,
			currency:        this.getNodeParameter('currency', i) as string,
		};

		const body: IDataObject = {
			organization_id: organizationId,
			card: cardData,
		};

		headers = {
			...headers,
			'Content-Type': 'application/json',
		};

		responseData = await qontoApiRequest.call(
			this,
			headers,
			'POST',
			endpoint,
			body,
			{},
		);
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
