/* eslint-disable no-undef */

/**
 * Overiding this script in order to implement the functionality for influencing
 * the search results based on the profile weather custom attribute.
 */
'use strict';

var baseModule = module.superModule;

/**
 * @description
 * Sets the additional search term based on the weather preference of customer set in her/his account.
 * If the account preference is set, use that as the search query param(q).
 * If preference is not set, then call the weather API.
 *
 * @param {dw.catalog.ProductSearchModel} productSearch - Product search object
 * @returns {void}
 */
function updateSearchTerm(productSearch) {
    var isPrefEnabled = dw.system.Site.current.preferences.custom && dw.system.Site.current.preferences.custom.enableWeatherSearchTerm;
    if (isPrefEnabled) {
        if (customer.profile && 'SUMMER'.equals(customer.profile.custom.weather_preference) && 'WINTER'.equals(customer.profile.custom.weather_preference) && 'RAIN'.equals(customer.profile.custom.weather_preference)) { // if profile preference is set
            var weatherPreference = customer.profile.custom.weather_preference;
            productSearch.setSearchPhrase(weatherPreference);
        } else { // call the weather API service
            var weatherService = require('../services/weatherAPI/callWeatherService');
            var jsonResponse = weatherService().call('Delhi');
            if (jsonResponse.msg && jsonResponse.msg === 'OK') {
                productSearch.setSearchPhrase(jsonResponse.object);
            }
        }
    }
}

/**
 * Sets the relevant product search model properties, depending on the parameters provided
 *
 * @param {dw.catalog.ProductSearchModel} productSearch - Product search object
 * @param {Object} httpParams - Query params
 * @param {dw.catalog.Category} selectedCategory - Selected category
 * @param {dw.catalog.SortingRule} sortingRule - Product grid sort rule
 */
function setProductProperties(productSearch, httpParams, selectedCategory, sortingRule) {
    baseModule.setProductProperties(productSearch, httpParams, selectedCategory, sortingRule);
    updateSearchTerm(productSearch);
}

module.exports = {
    addRefinementValues: baseModule.addRefinementValues,
    setProductProperties: setProductProperties
};
