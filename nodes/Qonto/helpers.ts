import {
	IExecuteFunctions,
	IExecuteSingleFunctions,
	IHookFunctions,
	ILoadOptionsFunctions
} from 'n8n-core';

import {
	ICredentialDataDecryptedObject,
	IDataObject,
	IHttpRequestMethods,
	IHttpRequestOptions,
	INodePropertyOptions,
	IPollFunctions,
	NodeApiError,
	NodeOperationError
} from 'n8n-workflow';

import {
	flow,
	isEmpty,
	omit
} from 'lodash';

import {
	OptionsWithUri
} from 'request';


/**
 * Make an API request to Qonto
 *
 * @param {IHookFunctions} this
 * @param {string} method
 * @param {string} url
 * @param {object} body
 * @returns {Promise<any>}
 */


export async function qontoApiRequest(
	this: IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions,
	headers: IDataObject,
	method: string,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
): Promise<any> { // tslint:disable-line:no-any

	const uri = '' as string;
	const qs: IDataObject = {};

	const options = {
		headers,
		method,
		body,
		qs,
		uri,
		json: true,
	};

	options.qs = query;

	const authenticationMethod = this.getNodeParameter('authentication', 0) as string;
	try {
		if (authenticationMethod === 'logKey') {
			const credentials = await this.getCredentials('qontoApi');
			const authUrl = credentials.environment === 'sandbox' ? 'https://thirdparty-sandbox.staging.qonto.co' : 'https://thirdparty.qonto.com';
			options.uri = `${authUrl}/v2/${endpoint}`;
			options.headers!.Authorization = `${credentials!.login}:${credentials!.secretKey}`;

			return await this.helpers.request!.call(this, options);
		} else {
			const credentials = await this.getCredentials('qontoOAuth2Api') as ICredentialDataDecryptedObject;
			const authUrl = credentials.environment === 'sandbox' ? 'https://thirdparty-sandbox.staging.qonto.co' : 'https://thirdparty.qonto.com';		
			options.uri = `${authUrl}/v2/${endpoint}`;
			headers = {'Authorization': `Bearer ${credentials.accessToken}`, 'X-Qonto-Staging-Token': credentials.XQontoStagingToken};
			
			//@ts-ignore
			return await this.helpers.requestOAuth2.call(this, 'qontoOAuth2Api', options, { tokenType: 'Bearer' });
		}
	} catch(error) {
		throw new NodeApiError(this.getNode(), error);
	}
}
/**
 * Handles a Qonto listing by returning all items or up to a limit.
 */
export async function handleListing(
	this: IExecuteFunctions,
	headers: IDataObject,
	method: string,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
	i: number,
) {
	const returnData: IDataObject[] = [];
	let responseData;

	const returnAll = this.getNodeParameter('returnAll', i) as boolean;
	const limit = this.getNodeParameter('limit', i, 0) as number;

	query.current_page = 1;

	do {
		responseData = await qontoApiRequest.call(this, {}, 'GET', endpoint, {}, query);
		returnData.push.apply(returnData, responseData[endpoint]);
		if (!returnAll && returnData.length >= limit) {
			return returnData.slice(0, limit);
		}
		query.current_page++;
	} while (responseData.meta.current_page < responseData.meta.total_pages);

	return returnData;
}