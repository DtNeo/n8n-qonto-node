import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class QontoOAuth2Api implements ICredentialType {
	name = 'qontoOAuth2Api';
	extends = ['oAuth2Api'];
	displayName = 'Qonto OAuth2 API';
	documentationUrl =
		'https://www.notion.so/Qonto-Sandbox-Useful-Information-3f1e39b04dbc4ea380bdd46500f9762f';
	properties: INodeProperties[] = [
		{
			displayName: 'Environment Type',
			name: 'environment',
			type: 'options',
			options: [
				{
					name: 'Production',
					value: 'production',
				},
				{
					name: 'Sandbox',
					value: 'sandbox',
				},
			],
			default: 'production',
		},
		{
			displayName: 'Authorization URL',
			name: 'authUrl',
			type: 'hidden',
			required: true,
			default:
				'={{ $self["environment"] === "sandbox" ? "https://sandbox.staging.qonto.co/oauth2/auth" : "https://oauth.qonto.com/oauth2/auth" }}',
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden',
			required: true,
			default:
				'={{ $self["environment"] === "sandbox" ? "https://sandbox.staging.qonto.co/oauth2/token" : "https://oauth.qonto.com/oauth2/token" }}',
		},
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'authorizationCode',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'body',
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'string',
			required: true,
			default: '',
			description: 'All scope details here: https://api-doc.qonto.com/docs/business-api/6434cbb9d968d-qonto',
		},
		{
			displayName: 'X-Qonto-Staging-Token',
			name: 'XQontoStagingToken',
			type: 'string',
			required: false,
			default: '',
			description: 'For Machine-to-Machine access append the HTTP header below: X-Qonto-Staging-Token:',
		},
		{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden',
			required: false,
			default: '',
			description: '',
		},
	];
}
