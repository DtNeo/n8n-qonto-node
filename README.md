# n8n-nodes-qonto

This is an n8n community node. It lets you use app/Qont in your n8n workflows.

Qonto's API is organized around REST. It uses built-in HTTP features, like HTTP authentication and HTTP verbs, which are understood by off-the-shelf HTTP clients. JSON is returned in all API responses, including errors.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  <!-- delete if no auth needed -->  
[Compatibility](#compatibility)  
[Usage](#usage)  <!-- delete if not using this section -->  
[Resources](#resources)  
[Version history](#version-history)  <!-- delete if not using this section -->  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

[API Documentation requests](https://api-doc.qonto.com/docs/business-api/6434cbb9d968d-qonto)

Actual Status of Qonto node:

    attachment Operations,
    	GET - Ok
    	POST - No, need Oauth2
    attachmentsInATransaction Operations,
    	GET - Ok
    	POST - No, need Oauth2
    	DELETE - No, need Oauth2
    beneficiaries Operations,
    	GET - Ok
    	PATCH - ?
    externalTransfers Operations,
    	GET - Ok
    	POST - No, need Oauth2
    internalTransactions Operations,
    	POST - No, need Oauth2
    labels Operations,
    	GET - Ok
    memberships Operations,
    	GET - Ok
    organizations Operations,
    	GET - Ok
    requests Operations,
    	GET - Ok
    	POST - No, need Oauth2
    transactions Operations
    	GET - Ok

    Pagination - Ok
    Filters - Ok

## Credentials

### login:key

Find it on your our qonto account.
[Qonto help French version](https://help.qonto.com/fr/articles/4359624-ou-trouver-mon-identifiant-et-ma-cle-secrete-api)
[API documentation](https://api-doc.qonto.com/docs/business-api/ZG9jOjQ2NDA2-introduction)

### Oauth2

Need a request to Qonto team.

## Compatibility

Only one version. Not all works

## Usage

There are basics usages and more intenses.
To stay simple use the login:key authentification. Find it on your our qonto account.
You will be able to have all basics informations. Organization and its bank_accounts (balance too !), Beneficiaires, Labels, Memberships, Transactions ...
With that, you have access to your bank account without going in to the website !

More intenses usages :
Connexion Oauth2 requires.
Create transactions, upload attachment, changes beneficiaire and even autorize and refuse request transaction !

API Qonto give you a lot of opportunities.


## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [qonto API documentation](https://api-doc.qonto.com/docs/business-api/)

## Version history

Version 1.