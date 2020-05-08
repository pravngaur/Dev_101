/* eslint-disable quote-props */

var StringUtils = require('dw/util/StringUtils');

var mockObj = {
    'location': {
        'name': 'Bengaluru',
        'region': 'Karnataka',
        'country': 'India',
        'lat': 12.98,
        'lon': 77.58,
        'tz_id': 'Asia/Kolkata',
        'localtime_epoch': 1588895530,
        'localtime': '2020-05-08 5:22'
    },
    'current': {
        'last_updated_epoch': 1588895110,
        'last_updated': '2020-05-08 05:15',
        'temp_c': 23.0,
        'temp_f': 73.4,
        'is_day': 0,
        'condition': {
            'text': 'Partly cloudy',
            'icon': '//cdn.weatherapi.com/weather/64x64/night/116.png',
            'code': 1003
        },
        'wind_mph': 0.0,
        'wind_kph': 0.0,
        'wind_degree': 155,
        'wind_dir': 'SSE',
        'pressure_mb': 1013.0,
        'pressure_in': 30.4,
        'precip_mm': 0.0,
        'precip_in': 0.0,
        'humidity': 100,
        'cloud': 50,
        'feelslike_c': 25.6,
        'feelslike_f': 78.1,
        'vis_km': 6.0,
        'vis_miles': 3.0,
        'uv': 1.0,
        'gust_mph': 10.1,
        'gust_kph': 16.2
    }
};

/**
 * @description analyzes the API response to evaluate the weather.
 * This is a dummy implementation, there is no right or wrong - change it if you wish to.
 *
 * @param {Object} jsonResponse response from service
 * @returns {string} weather literal 'SUMMER' OR 'WINTER' OR 'RAIN'
 */
function analyzeWeatherResponse(jsonResponse) {
    var weatherConditions;
    if (jsonResponse && jsonResponse.current) {
        if (jsonResponse.current.cloud >= 50) {
            weatherConditions = 'RAIN';
        } else if (jsonResponse.current.temp_c >= 25) {
            weatherConditions = 'SUMMER';
        } else {
            weatherConditions = 'WINTER';
        }
    }
    return weatherConditions;
}

/**
 * @param {dw.svc.HTTPService} svc service instance
 * @param {dw.net.HTTPClient} client HTTP client
 * @returns {string} weather conditions
 */
function parseResponse(svc, client) {
    var jsonResponse = JSON.parse(client.text);
    var weatherConditions;
    if (jsonResponse && jsonResponse.current) {
        weatherConditions = analyzeWeatherResponse(jsonResponse);
    }
    return weatherConditions;
}

var serviceDefinition = {
    /**
     * Get record(s)
     *
     * @param {dw.svc.HTTPService} svc service instance as configured in BM
     * @param {string} city current customer location
     */
    createRequest: function (svc, city) {
        var svcCredential = svc.getConfiguration().credential;
        if (svcCredential.custom.weatherAPIKey) {
            // logger
        }
        svc.setURL(StringUtils.format('{0}?q={1}&key={2}', svc.getURL(), city, svcCredential.custom.weatherAPIKey));
        svc.addHeader('Content-Type', 'application/json');
        svc.setRequestMethod('GET');
    },
    parseResponse: parseResponse,
    mockCall: function () {
        return {
            statusCode: 200,
            statusMessage: 'Success',
            text: JSON.stringify(mockObj)
        };
    }
};

/**
 *
 * @description returns the weather API service object.
 * @returns {dw/svc/Service} service instance
 */
function getService() {
    var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
    var serviceName = 'weatherAPIService';
    return LocalServiceRegistry.createService(serviceName, serviceDefinition);
}

module.exports = getService;
