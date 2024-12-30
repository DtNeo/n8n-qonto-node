import {
	IExecuteFunctions,
	IExecuteSingleFunctions,
	ILoadOptionsFunctions,
	IDataObject,
	NodeApiError,
	IHttpRequestMethods,
	IHttpRequestOptions,
} from 'n8n-workflow';

/**
 * Make an API request to Qonto
 *
 * @param {IExecuteFunctions} this
 * @param {IDataObject} headers
 * @param {string} method
 * @param {string} endpoint
 * @param {IDataObject} body
 * @param {IDataObject} query
 * @returns {Promise<any>}
 */
export async function qontoApiRequest(
	this: IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions,
	headers: IDataObject,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
): Promise<any> {
	const authenticationMethod = this.getNodeParameter('authentication', 0) as string;
	const credentials = await this.getCredentials(authenticationMethod === 'logKey' ? 'qontoApi' : 'qontoOAuth2Api');

	const baseUrl =
		credentials.environment === 'sandbox'
			? 'https://thirdparty-sandbox.staging.qonto.co/v2'
			: 'https://thirdparty.qonto.com/v2';

	const url = `${baseUrl}/${endpoint}`;

	// Ensure that url is always defined
	if (!url || typeof url !== 'string') {
		throw new NodeApiError(this.getNode(), { message: 'The URL for the API request is invalid.' });
	}

	const options: IHttpRequestOptions = {
		method,
		url, // `url` is now guaranteed to be a string
		qs: query,
		body,
		headers: {
			...headers,
			'Content-Type': 'application/json',
		},
		json: true,
	};

	// Handle authentication
	if (authenticationMethod === 'logKey') {
		options.headers!.Authorization = `${credentials.login}:${credentials.secretKey}`;
		return this.helpers.httpRequest!(options);
	} else {
		return this.helpers.httpRequestWithAuthentication!.call(this, 'qontoOAuth2Api', options);
	}
}

/**
 * Handles a Qonto listing by returning all items or up to a limit.
 *
 * @param {IDataObject} headers
 * @param {IHttpRequestMethods} method
 * @param {string} endpoint
 * @param {IDataObject} body
 * @param {IDataObject} query
 * @param {number} i
 * @returns {Promise<IDataObject[]>}
 */
export async function handleListing(
	this: IExecuteFunctions,
	headers: IDataObject,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
	i: number,
): Promise<IDataObject[]> {
	const returnData: IDataObject[] = [];
	let responseData;

	const returnAll = this.getNodeParameter('returnAll', i) as boolean;
	const limit = this.getNodeParameter('limit', i, 0) as number;

	query.current_page = 1;

	try {
		do {
			responseData = await qontoApiRequest.call(this, headers, method, endpoint, body, query);

			if (!responseData[endpoint]) {
				throw new NodeApiError(this.getNode(), {
					message: 'Unexpected API response format',
				});
			}

			returnData.push(...responseData[endpoint]);

			if (!returnAll && returnData.length >= limit) {
				return returnData.slice(0, limit);
			}

			query.current_page++;
		} while (responseData.meta.current_page < responseData.meta.total_pages);

		return returnData;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}
