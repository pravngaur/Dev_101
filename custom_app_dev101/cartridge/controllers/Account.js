'use strict';

/**
 * Extending Account controller in order to 'replace' SaveProfile route.
 * Since we are adding a new attribute to transaction -- it's good to do the entire profile update at once,
 * hence replacing the route not appending to it.
 */

var server = require('server');
var page = module.superModule;
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
server.extend(page);

server.replace('SaveProfile',
server.middleware.https,
csrfProtection.validateAjaxRequest,
function (req, res, next) {
    var Transaction = require('dw/system/Transaction');
    var CustomerMgr = require('dw/customer/CustomerMgr');
    var Resource = require('dw/web/Resource');
    var URLUtils = require('dw/web/URLUtils');
    var accountHelpers = require('*/cartridge/scripts/helpers/accountHelpers');

    var formErrors = require('*/cartridge/scripts/formErrors');

    var profileForm = server.forms.getForm('profile');

    // form validation
    if (profileForm.customer.email.value.toLowerCase()
        !== profileForm.customer.emailconfirm.value.toLowerCase()) {
        profileForm.valid = false;
        profileForm.customer.email.valid = false;
        profileForm.customer.emailconfirm.valid = false;
        profileForm.customer.emailconfirm.error =
            Resource.msg('error.message.mismatch.email', 'forms', null);
    }

    var result = {
        firstName: profileForm.customer.firstname.value,
        lastName: profileForm.customer.lastname.value,
        phone: profileForm.customer.phone.value,
        email: profileForm.customer.email.value,
        confirmEmail: profileForm.customer.emailconfirm.value,
        password: profileForm.login.password.value,
        weatherPref: profileForm.customer.weatherPref.htmlValue,
        profileForm: profileForm
    };
    if (profileForm.valid) {
        res.setViewData(result);
        this.on('route:BeforeComplete', function (req, res) { // eslint-disable-line no-shadow
            var formInfo = res.getViewData();
            var customer = CustomerMgr.getCustomerByCustomerNumber(
                req.currentCustomer.profile.customerNo
            );
            var profile = customer.getProfile();
            var customerLogin;
            var status;

            Transaction.wrap(function () {
                status = profile.credentials.setPassword(
                    formInfo.password,
                    formInfo.password,
                    true
                );

                if (status.error) {
                    formInfo.profileForm.login.password.valid = false;
                    formInfo.profileForm.login.password.error =
                        Resource.msg('error.message.currentpasswordnomatch', 'forms', null);
                } else {
                    customerLogin = profile.credentials.setLogin(
                        formInfo.email,
                        formInfo.password
                    );
                }
            });

            delete formInfo.password;
            delete formInfo.confirmEmail;

            if (customerLogin) {
                Transaction.wrap(function () {
                    profile.setFirstName(formInfo.firstName);
                    profile.setLastName(formInfo.lastName);
                    profile.setEmail(formInfo.email);
                    profile.setPhoneHome(formInfo.phone);
                    // TODO: In productionize code, you ideally should store 'WINTER' in custom preferences(or someehere else as config).
                    // Should not hard code it
                    profile.custom.weather_preference = formInfo.weatherPref;
                });

                // Send account edited email
                accountHelpers.sendAccountEditedEmail(customer.profile);

                delete formInfo.profileForm;
                delete formInfo.email;

                res.json({
                    success: true,
                    redirectUrl: URLUtils.url('Account-Show').toString()
                });
            } else {
                if (!status.error) {
                    formInfo.profileForm.customer.email.valid = false;
                    formInfo.profileForm.customer.email.error =
                        Resource.msg('error.message.username.invalid', 'forms', null);
                }

                delete formInfo.profileForm;
                delete formInfo.email;

                res.json({
                    success: false,
                    fields: formErrors.getFormErrors(profileForm)
                });
            }
        });
    } else {
        res.json({
            success: false,
            fields: formErrors.getFormErrors(profileForm)
        });
    }
    return next();
}
);
module.exports = server.exports();
