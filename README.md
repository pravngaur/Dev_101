# Developer 101 : Controllers

This branch has the changes required to support the following DIY's requirements. We will implement the following parts of the overall approach:

* Exten the profile object to accommodate the weather preference, create a custom attribute.
* Extend the Account controller to persist & retrieve this preference.

# Implementation Changes to be done:

* Create a custom cartridge custom_app_dev101
* Update the cartridge path to: custom_app_dev101:app_storefront_base
* Extended the Profile System Object to have an additional attribute which holds the value for product's preferred season of usage. Enum of Strings: WINTER, SUMMER, RAIN. 
* Inherit the Account.js controller in the new cartridge.

> Please try doing these changes yourself first & then compare with this branch.

# Configuration changes required:
1) Adding custom profile attribute: 
* You can do that by importing the profile_extension.xml file in sites folder.
* Or do that manually by updating the profile system object to add a custom attribute named 'weather_preference' as enum of strings type:

![Attribute config](https://github.com/pravngaur/Dev_101/blob/DIY_Controllers/custom_app_dev101/docs/profile_attr_1.png)

Values:

![Attribute values](https://github.com/pravngaur/Dev_101/blob/DIY_Controllers/custom_app_dev101/docs/profile_attr_2.png)

