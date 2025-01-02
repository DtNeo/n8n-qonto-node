## Realase version

package.json
  "version": "0.1.2"
Qonto.node.json
	"nodeVersion": "2"
Qonto.node.ts
	version: 2

# n8n-nodes-qonto

This is an n8n community node. It lets you use app/Qonto in your n8n workflows.

Qonto's API is organized around REST. It uses built-in HTTP features, like HTTP authentication and HTTP verbs, which are understood by off-the-shelf HTTP clients. JSON is returned in all API responses, including errors.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

[API Documentation requests](https://api-doc.qonto.com/docs/business-api/6434cbb9d968d-qonto)

## Credentials

### login:key

Find it on your our qonto account.
[API documentation](https://api-doc.qonto.com/docs/business-api/72b66de24898e-introduction)

### Oauth2

Portal Connect Partners : https://getqonto.atlassian.net/servicedesk/customer/portal/5

## Usage

You will be able to have all basics informations: 
- Organization and its bank_accounts (balance too !),
- Beneficiaires,
- Labels
- Memberships
- Transactions
- And more 

WIth Connexion Oauth2 you can do more:
Create transactions, upload attachment, changes beneficiaire and even autorize and refuse request transaction !


## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [qonto API documentation](https://api-doc.qonto.com/docs/business-api/)

