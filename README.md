# Salesforce B2C Commerce Developer 101 : Search

This branch has the changes required to support the following DIY's requirements. We will implement the following parts of the overall approach:

* Change the product search behaviour based on the customer's local weather conditions i.e. in winters, customers should get woolen products as search results while in summers, cottons & sneakers should appear as search results.

# Implementation Changes to be done:

* Extend the product system object to have a custom attribute which denotes the preferred weather for this product. Update the searchable attributes.
* Make the changes to the search behaviour based on account preference or service response.

_Please try doing these changes yourself first & then compare with this branch._

# Configuration changes required:

1) **Extending product system object to have an additional attribute 'preferred_season': 
The value of this attribute should be same as of the profile attribute.

* You can do that by importing the product_metadata.xml file in sites folder.	
* Or do that manually by updating the product system object to add a custom attribute named 'preferred_season' as enum of strings type:	

![Attribute config](https://github.com/pravngaur/Dev_101/blob/DIY_Search/custom_app_dev101/docs/Screenshot%202020-05-08%20at%203.29.01%20PM.png)	

Values:	

![Attribute values](https://github.com/pravngaur/Dev_101/blob/DIY_Search/custom_app_dev101/docs/Screenshot%202020-05-08%20at%203.36.46%20PM.png)

2) **Extending sitePreferences system object to have an additional attribute 'enableWeatherSearchTerm': 

* You can do that by importing the custom_preference.xml file in sites folder.	
* Or do that manually by updating the sitePreferences system object to add a custom attribute named 'enableWeatherSearchTerm' as boolean type:	

![Attribute config](https://github.com/pravngaur/Dev_101/blob/DIY_WeatherService/custom_app_dev101/docs/site_pref.png)	

