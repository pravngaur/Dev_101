*To access the all the amazing learning resources, download the B2C Enablement Guide from [HERE](http://sfdc.co/b2cguide).*

# Salesforce B2C Commerce Developer 101
This repo serves as a reference point to all the developers who aspire to learn B2C Commerce Cloud -- understand the application development & exposure to all the essential platform features.
Also, each branch in this repo ties back to the sessions in 'Developer Cert Prep' [Webinar Series](https://sfdc.co/devcertprepdetails)

## Challenge: Brand DIY Business Requirement
This repo takes a practical approach to learning, let me introduce our fictious brand DIY -- they are a high street retailer.  DIY Brand has following custom requirements: 

* Change the product search behaviour based on the customer's local weather conditions i.e. in winters, customers should get woolen products as search results while in summers, cottons & sneakers should appear as search results.
* You also need enable the shoopers to set their weather preferences in their account.
* Create a Toggle switch by which if required, search behaviour can be reverted back to the default one, by supressing this customization.
* If customer has not set the account preference, then call a external web service to get the weather details for the customer's location of request.

## High Level Approach:
*Learning objectives in Bold*

* **System Object Changes** Exten the profile object to accommodate the weather preference, create a custom attribute.
* **Etending a Controller** Extend the Account controller to persist & retrieve this preference.
* **ISMLs, Forms, Models, Resource Properties** Make changes to the required ISMLs, Forms, Models, Resource Properties.
* **Custom Preferences** Implement a custom preference toggle to turn on/off this custom behaviour.
* **Custom Attributes** Extend the product system object to have a custom attribute which denotes the preferred weather for this product. Update the searchable attributes.
* **Service Framework** Implement an external service integration, if preference not set in account.
* **Search Modifications** Make the changes to the search behaviour based on account preference or service response.
* **Payment Provider Integration** Implement PayPal as custom payment service provider.

## Branch Details:
Each branch in this repo contains the changes required to a specific section/component of SFRA(Controllers, ISML...) or Platform(Metadata, Services...).

* [DIY_Controllers](https://github.com/pravngaur/Dev_101/tree/DIY_Controllers) : Controller & Metadata changes.
* [DIY_ISML](https://github.com/pravngaur/Dev_101/tree/DIY_ISML) : changes for ISML, models, forms & learn localization.
* [DIY_Search](https://github.com/pravngaur/Dev_101/tree/DIY_Search) : Search related changes.
* [DIY_Weather Service](https://github.com/pravngaur/Dev_101/tree/DIY_WeatherService) : Integrate with an external service using the Service Framework.

> This repo has all the changes for the DIY's business requirement, idea is that you try on your own first & compare your implementation with this repo.

## What's after this:
If you are done with this business requirement, i would recommend you to implement:

* Cache the service response in Custom Cache, this is to avoid service call for each customer request for the same location. Customers from the location should be served from the same service response.
Learn custom caches implementation from [here](https://github.com/pravngaur/Developer_Labs/tree/CustomCaches).

* Implement the job framework -- call the external service offline for the most visited locations offline & save it in custom object. In real world implementation, after having custom caches, this could give you a very thin improvement but good to learn. BTW, custom caches has limited storage -- so you still might want to do it.

--Best of luck!!
