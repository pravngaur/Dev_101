# Salesforce B2C Commerce Developer 101 : ISMLs

This branch has the changes required to support the DIY's requirements. We will implement the following parts of the overall approach:

* Make changes to the required ISMLs, Forms, Models, Resource Properties.

# Implementation Changes to be done:

> First complete the [tasks](https://github.com/pravngaur/Dev_101/blob/DIY_Controllers/README.md#implementation-changes-to-be-done) mentioned in DIY_Controllers branch.

* Override the editProfileForm.isml & profileCard.isml in your custom cartridge -- this is to accomodate the additional custom attribute to be persisted & shown.
* Add the required properties(for the new attribute) in the resource bundles.
* Update account.js model to accommodate the new attribute -- this is to show the value of the attribute on profile page.
* Update the profile.xml form to persist the customer's selection in Profile's custom attribute. Remember the possible values a customer can choose should match to the values of enum-of-string in the profile metadata.

_Please try doing these changes yourself first & then compare with this branch. No config changes required for this task._
