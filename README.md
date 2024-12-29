<<<<<<< HEAD
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

    SANDBOX didn't work. I don't know why... URL ?
    Now PROD works on Oauth2 (Thank you Jon)

    attachment Operations,
    	GET - Ok
    	POST - Need to be test in SANDBOX Oauth2
    attachmentsInATransaction Operations,
    	GET - Ok
    	POST - No, Need to be test in SANDBOX Oauth2
    	DELETE - No, Need to be test in SANDBOX Oauth2
    beneficiaries Operations,
    	GET - Ok
    	PATCH - ?
    externalTransfers Operations,
    	GET - Ok
    	POST - Need to be test in SANDBOX Oauth2
    internalTransactions Operations,
    	POST - Need to be test in SANDBOX Oauth2
    labels Operations,
    	GET - Ok
    memberships Operations,
    	GET - Ok
    organizations Operations,
    	GET - Ok
    requests Operations,
    	GET - Ok
    	POST - Need to be test in SANDBOX Oauth2
    transactions Operations
    	GET - Ok

    Pagination - Ok
    Filters - Ok
    X-Qonto-Idempotency-Key - with uuid "import { v4 as uuid } from 'uuid';" - seems ok


## Credentials

### login:key

Find it on your our qonto account.
[Qonto help French version](https://help.qonto.com/fr/articles/4359624-ou-trouver-mon-identifiant-et-ma-cle-secrete-api)
[API documentation](https://api-doc.qonto.com/docs/business-api/ZG9jOjQ2NDA2-introduction)

### Oauth2

Portal Connect Partners : https://getqonto.atlassian.net/servicedesk/customer/portal/5

## Compatibility

Qonto API 2.0

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

## Version history

Version 2.
