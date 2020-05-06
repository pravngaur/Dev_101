/* eslint-disable spaced-comment */
'use strict';

var baseModule = module.superModule;

/**
 * Creates a plain object that contains profile information
 * @param {Object} profile - current customer's profile
 * @param {Object} rawProfile - current customer's raw profile
 * @returns {Object} an object that contains information about the current customer's profile
 */
function getProfileWithWeather(profile, rawProfile) {
    var result;
    if (profile) {
        result = {
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
            phone: profile.phone,
            password: '********',
            weatherPreference: rawProfile.custom.weather_preference
        };
    } else {
        result = null;
    }
    return result;
}

/**
 * Account class that represents the current customer's profile dashboard
 * @param {Object} currentCustomer - Current customer
 * @param {Object} addressModel - The current customer's preferred address
 * @param {Object} orderModel - The current customer's order history
 * @constructor
 */
function account(currentCustomer, addressModel, orderModel) {
    var baseModelObject = new baseModule(currentCustomer, addressModel, orderModel);
    this.profile = getProfileWithWeather(currentCustomer.profile, currentCustomer.raw.profile);
    this.addresses = baseModelObject.addresses;
    this.preferredAddress = baseModelObject.preferredAddress;
    this.orderHistory = baseModelObject.orderHistory;
    this.payment = baseModelObject.payment;
    this.registeredUser = baseModelObject.registeredUser;
    this.isExternallyAuthenticated = baseModelObject.isExternallyAuthenticated;
    this.customerPaymentInstruments = baseModelObject.customerPaymentInstruments;
}

//testing.getCustomerPaymentInstruments = baseModule.getCustomerPaymentInstruments;

module.exports = account;
