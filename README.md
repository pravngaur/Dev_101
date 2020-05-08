# Salesforce B2C Commerce Developer 101 : Weather Webservice Integration

> For this sample implementation, i have used the API from https://www.weatherapi.com/api-explorer.aspx. You are free to use the service of your choice

This branch has the changes required to support the following DIY's requirements. We will implement the following parts of the overall approach:

* If customer has not set the account preference, then call a external web service to get the weather details for the customer's location of request.

# Implementation Changes to be done:

* Implement an external service integration, if preference not set in account.
* Make the changes to the search behaviour based on account preference or service response.

_Please try doing these changes yourself first & then compare with this branch._

# Configuration changes required:

1) **Extending ServiceCredential system object to have an additional attribute 'weatherAPIKey': 
_For the service that i have used, it is required to send an APIkey in request for authentication. OOTB ServiceCredential does not has this attribute. Other attributes might be used if you do not want to extend the object._

* You can do that by importing the service_credentials.xml file in sites folder.	
* Or do that manually by updating the ServiceCredential system object to add a custom attribute named 'weatherAPIKey' as string type.
