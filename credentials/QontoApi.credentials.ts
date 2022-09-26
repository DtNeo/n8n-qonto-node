import {
		ICredentialType,
		INodeProperties,
} from 'n8n-workflow';

export class QontoApi implements ICredentialType {
		name = 'qontoApi';
		displayName = 'Qonto API';
		documentationUrl = 'https://api-doc.qonto.com/docs/business-api';
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
						displayName: 'login',
						name: 'login',
						type: 'string',
						default: 'scep-1111',
				},
				{
						displayName: 'secret key',
						name: 'secretKey',
						type: 'string',
						default: 'f8952b8244c0ce693c8f793a07e807f8',
				},
		];
}