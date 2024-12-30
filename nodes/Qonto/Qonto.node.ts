import {
	IBinaryData,
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
		name: 'Qonto',
		icon: 'file:Qonto.svg',
		group: ['output'],
		version: 1.2,
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
					{ name: 'External Transfer', value: 'externalTransfers' },
					{ name: 'Internal Transaction', value: 'internalTransactions' },
					{ name: 'Label', value: 'labels' },
					{ name: 'Membership', value: 'memberships' },
					{ name: 'Organization', value: 'organizations' },
					{ name: 'Request', value: 'requests' },
					{ name: 'Transaction', value: 'transactions' },
					{ name: 'Supplier Invoice', value: 'suplierInvoices' },
					{ name: 'Client Invoice', value: 'clientsInvoices' },
					{ name: 'Credit Note', value: 'creditNotes' },
					{ name: 'Client', value: 'clients' },
					{ name: 'Team', value: 'teams' },
					{ name: 'Statement', value: 'statements' },
					{ name: 'Insurance Contract', value: 'insuranceContracts' },
					{ name: 'Card', value: 'cards' },
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

					// ------------------------
					//      SUPPLIER INVOICES
					// ------------------------

					if (resource === 'suplierInvoices') {
						// Get a list of supplier invoices
						if (operation === 'listSupplierInvoices') {
							const endpoint = `supplier_invoices`;
							const filters = this.getNodeParameter('filters', i) as IDataObject;
							if (!isEmpty(filters)) {
								query.status = filters.status;
								query.start_date = filters.start_date;
								query.end_date = filters.end_date;
							}

							responseData = await handleListing.call(this, headers, 'GET', endpoint, {}, query, i);
						}

						// Create supplier invoices with attachments
						if (operation === 'createSupplierInvoices') {
							const endpoint = `supplier_invoices/bulk`;

							const invoices = this.getNodeParameter('supplierInvoices', i) as IDataObject[];
							const organizationId = this.getNodeParameter('organizationId', i) as string;

							body.organization_id = organizationId;
							body.supplier_invoices = invoices.map((invoice) => ({
								invoice_number: invoice.invoiceNumber,
								invoice_date: invoice.invoiceDate,
								amount: invoice.amount,
								currency: invoice.currency,
								attachment_ids: invoice.attachmentIds,
							}));

							headers = { 'Content-Type': 'application/json' };

							responseData = await qontoApiRequest.call(this, headers, 'POST', endpoint, body, {});
						}
					}

						// ------------------------
						//      CLIENT INVOICES
						// ------------------------

						if (resource === 'clientsInvoices') {
							// Get a list of client invoices
							if (operation === 'listClientInvoices') {
								const endpoint = `client_invoices`;
								const filters = this.getNodeParameter('filters', i) as IDataObject;
								if (!isEmpty(filters)) {
									query.status = filters.status;
									query.start_date = filters.start_date;
									query.end_date = filters.end_date;
								}

								responseData = await handleListing.call(this, headers, 'GET', endpoint, {}, query, i);
							}

							// Create a client invoice
							if (operation === 'createClientInvoice') {
								const endpoint = `client_invoices`;

								const organizationId = this.getNodeParameter('organizationId', i) as string;
								const clientInvoice = this.getNodeParameter('clientInvoice', i) as IDataObject;

								body.organization_id = organizationId;
								body.client_invoice = {
									invoice_number: clientInvoice.invoiceNumber,
									invoice_date: clientInvoice.invoiceDate,
									due_date: clientInvoice.dueDate,
									amount: clientInvoice.amount,
									currency: clientInvoice.currency,
									description: clientInvoice.description,
								};

								headers = { 'Content-Type': 'application/json' };

								responseData = await qontoApiRequest.call(this, headers, 'POST', endpoint, body, {});
							}
						}

							// ------------------------
							//      CREDIT NOTES
							// ------------------------

							if (resource === 'creditNotes') {
								// Get a list of credit notes
								if (operation === 'listCreditNotes') {
									const endpoint = `credit_notes`;
									const filters = this.getNodeParameter('filters', i) as IDataObject;
									if (!isEmpty(filters)) {
										query.status = filters.status;
										query.start_date = filters.start_date;
										query.end_date = filters.end_date;
									}

									responseData = await handleListing.call(this, headers, 'GET', endpoint, {}, query, i);
								}

								// Get details of a specific credit note
								if (operation === 'getCreditNoteDetails') {
									const creditNoteId = this.getNodeParameter('creditNoteId', i) as string;
									const endpoint = `credit_notes/${creditNoteId}`;

									responseData = await qontoApiRequest.call(this, headers, 'GET', endpoint, {}, {});
								}
							}

								// ------------------------
								//      CLIENTS
								// ------------------------

								if (resource === 'clients') {
									// Get a list of clients
									if (operation === 'listClients') {
										const endpoint = `clients`;
										const filters = this.getNodeParameter('filters', i) as IDataObject;
										if (!isEmpty(filters)) {
											query.status = filters.status;
											query.start_date = filters.start_date;
											query.end_date = filters.end_date;
										}

										responseData = await handleListing.call(this, headers, 'GET', endpoint, {}, query, i);
									}

									// Get client details
									if (operation === 'getClientDetails') {
										const clientId = this.getNodeParameter('clientId', i) as string;
										const endpoint = `clients/${clientId}`;

										responseData = await qontoApiRequest.call(this, headers, 'GET', endpoint, {}, {});
									}

									// Create a client
									if (operation === 'createClient') {
										const endpoint = `clients`;

										const organizationId = this.getNodeParameter('organizationId', i) as string;
										const clientData = {
											name: this.getNodeParameter('clientName', i) as string,
											email: this.getNodeParameter('email', i) as string,
											phone_number: this.getNodeParameter('phoneNumber', i, null) as string | null,
											address: this.getNodeParameter('address', i, null) as string | null,
										};

										body.organization_id = organizationId;
										body.client = clientData;

										headers = { 'Content-Type': 'application/json' };

										responseData = await qontoApiRequest.call(this, headers, 'POST', endpoint, body, {});
									}
								}

									// ------------------------
									//      TEAMS
									// ------------------------

									if (resource === 'teams') {
										// List teams in an organization
										if (operation === 'listTeams') {
											const endpoint = `teams`;
											const organizationId = this.getNodeParameter('organizationId', i) as string;

											query.organization_id = organizationId;

											responseData = await handleListing.call(this, headers, 'GET', endpoint, {}, query, i);
										}

										// Create a new team
										if (operation === 'createTeam') {
											const endpoint = `teams`;

											const organizationId = this.getNodeParameter('organizationId', i) as string;
											const teamData = {
												name: this.getNodeParameter('teamName', i) as string,
												description: this.getNodeParameter('teamDescription', i, null) as string | null,
											};

											body.organization_id = organizationId;
											body.team = teamData;

											headers = { 'Content-Type': 'application/json' };

											responseData = await qontoApiRequest.call(this, headers, 'POST', endpoint, body, {});
										}
									}

										// ------------------------
										//      STATEMENTS
										// ------------------------

										if (resource === 'statements') {
											// List statements
											if (operation === 'listStatements') {
												const endpoint = `statements`;
												const organizationId = this.getNodeParameter('organizationId', i) as string;

												query.organization_id = organizationId;

												const filters = this.getNodeParameter('filters', i) as IDataObject;
												if (!isEmpty(filters)) {
													query.start_date = filters.start_date;
													query.end_date = filters.end_date;
												}

												responseData = await handleListing.call(this, headers, 'GET', endpoint, {}, query, i);
											}

											// Show statement details
											if (operation === 'showStatement') {
												const statementId = this.getNodeParameter('statementId', i) as string;
												const endpoint = `statements/${statementId}`;

												responseData = await qontoApiRequest.call(this, headers, 'GET', endpoint, {}, {});
											}
										}

											// ------------------------
											//      INSURANCE CONTRACTS
											// ------------------------

											if (resource === 'insuranceContracts') {
												// Create a new insurance contract
												if (operation === 'createInsuranceContract') {
													const endpoint = `insurance_contracts`;

													const organizationId = this.getNodeParameter('organizationId', i) as string;
													const contractData = {
														name: this.getNodeParameter('contractName', i) as string,
														start_date: this.getNodeParameter('startDate', i) as string,
														end_date: this.getNodeParameter('endDate', i, null) as string | null,
														coverage_details: this.getNodeParameter('coverageDetails', i, null) as string | null,
													};

													body.organization_id = organizationId;
													body.contract = contractData;

													headers = { 'Content-Type': 'application/json' };

													responseData = await qontoApiRequest.call(this, headers, 'POST', endpoint, body, {});
												}

												// Get details of an insurance contract
												if (operation === 'getInsuranceContract') {
													const contractId = this.getNodeParameter('contractId', i) as string;
													const endpoint = `insurance_contracts/${contractId}`;

													responseData = await qontoApiRequest.call(this, headers, 'GET', endpoint, {}, {});
												}

												// Update an insurance contract
												if (operation === 'updateInsuranceContract') {
													const contractId = this.getNodeParameter('contractId', i) as string;
													const endpoint = `insurance_contracts/${contractId}`;

													const updateData = {
														name: this.getNodeParameter('contractName', i, null) as string | null,
														end_date: this.getNodeParameter('endDate', i, null) as string | null,
														coverage_details: this.getNodeParameter('coverageDetails', i, null) as string | null,
													};

													body.contract = updateData;

													headers = { 'Content-Type': 'application/json' };

													responseData = await qontoApiRequest.call(this, headers, 'PATCH', endpoint, body, {});
												}

												// Upload a PDF for a specific insurance contract
												if (operation === 'uploadInsuranceContractPDF') {
													const contractId = this.getNodeParameter('contractId', i) as string;
													const pdfFile = this.getNodeParameter('pdfFile', i) as string;
													const endpoint = `insurance_contracts/${contractId}/upload`;

													body.pdf_file = pdfFile;

													headers = { 'Content-Type': 'application/json' };

													responseData = await qontoApiRequest.call(this, headers, 'POST', endpoint, body, {});
												}
											}

												// ------------------------
												//      CARDS
												// ------------------------

												if (resource === 'cards') {
													// List cards
													if (operation === 'listCards') {
														const endpoint = `cards`;
														const organizationId = this.getNodeParameter('organizationId', i) as string;

														query.organization_id = organizationId;

														const filters = this.getNodeParameter('filters', i) as IDataObject;
														if (!isEmpty(filters)) {
															query.status = filters.status;
														}

														responseData = await handleListing.call(this, headers, 'GET', endpoint, {}, query, i);
													}

													// Create a new virtual (virtual, flash, advertising) card
													if (operation === 'createVirtualCard') {
														const endpoint = `cards`;

														const organizationId = this.getNodeParameter('organizationId', i) as string;
														const cardData = {
															type: this.getNodeParameter('cardType', i) as string,
															name: this.getNodeParameter('cardName', i) as string,
															spending_limit: this.getNodeParameter('spendingLimit', i, null) as number | null,
															currency: this.getNodeParameter('currency', i) as string,
														};

														body.organization_id = organizationId;
														body.card = cardData;

														headers = { 'Content-Type': 'application/json' };

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
