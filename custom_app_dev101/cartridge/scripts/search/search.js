/* eslint-disable no-undef */

/**
 * Overiding this script in order to implement the functionality for influencing
 * the search results based on the profile weather custom attribute.
 */
'use strict';

var baseModule = module.superModule;

/**
 * Sets the additional search term based on the weather preference of customer set in her/his account
 *
 * @param {dw.catalog.ProductSearchModel} productSearch - Product search object
 * @returns {void}
 */
function updateSearchTerm(productSearch) {
    var isPrefEnabled = dw.system.Site.current.preferences.custom && dw.system.Site.current.preferences.custom.enableWeatherSearchTerm;
    if (customer.profile && customer.profile.custom.weather_preference && isPrefEnabled) {
        var weatherPreference = customer.profile.custom.weather_preference;
        productSearch.setSearchPhrase(weatherPreference);
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
