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
=======
![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-starter

This repo contains example nodes to help you get started building your own custom integrations for [n8n](n8n.io). It includes the node linter and other dependencies.

To make your custom node available to the community, you must create it as an npm package, and [submit it to the npm registry](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry).

## Prerequisites

You need the following installed on your development machine:

* [git](https://git-scm.com/downloads)
* Node.js and pnpm. Minimum version Node 18. You can find instructions on how to install both using nvm (Node Version Manager) for Linux, Mac, and WSL [here](https://github.com/nvm-sh/nvm). For Windows users, refer to Microsoft's guide to [Install NodeJS on Windows](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows).
* Install n8n with:
  ```
  pnpm install n8n -g
  ```
* Recommended: follow n8n's guide to [set up your development environment](https://docs.n8n.io/integrations/creating-nodes/build/node-development-environment/).

## Using this starter

These are the basic steps for working with the starter. For detailed guidance on creating and publishing nodes, refer to the [documentation](https://docs.n8n.io/integrations/creating-nodes/).

1. [Generate a new repository](https://github.com/n8n-io/n8n-nodes-starter/generate) from this template repository.
2. Clone your new repo:
   ```
   git clone https://github.com/<your organization>/<your-repo-name>.git
   ```
3. Run `pnpm i` to install dependencies.
4. Open the project in your editor.
5. Browse the examples in `/nodes` and `/credentials`. Modify the examples, or replace them with your own nodes.
6. Update the `package.json` to match your details.
7. Run `pnpm lint` to check for errors or `pnpm lintfix` to automatically fix errors when possible.
8. Test your node locally. Refer to [Run your node locally](https://docs.n8n.io/integrations/creating-nodes/test/run-node-locally/) for guidance.
9. Replace this README with documentation for your node. Use the [README_TEMPLATE](README_TEMPLATE.md) to get started.
10. Update the LICENSE file to use your details.
11. [Publish](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry) your package to npm.

## More information

Refer to our [documentation on creating nodes](https://docs.n8n.io/integrations/creating-nodes/) for detailed information on building your own nodes.

## License

[MIT](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md)
>>>>>>> upstream/master
