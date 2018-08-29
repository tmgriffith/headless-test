var express = require('express');
var router = express.Router();
// var mongoose = require('mongoose');
// var db = require('../data/index.js');
// var fs = require('fs');

var puppeteer = require('puppeteer');
var postBody1;
var postBody2;
var file = '../data.txt';
/* GET magnum page. */

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://Adsinc:Ads123!!@ds137102.mlab.com:37102/user-data');

var dataSchema = new mongoose.Schema({
  firstname: String,
  lastName: String,
  shippingAddress1: String,
  shippingZip: String,
  shippingCity: String,
  shippingState: String,
  shippingCountry: String,
  phone: String,
  email: String,
  x: String,
  y: String,
  billingSameAsShipping: String,
  billingFirstName: String,
  billingLastName: String,
  billingAddress1: String,
  billingZip: String,
  billingCity: String,
  billingState: String,
  billingCountry: String,
  creditCardType: String,
  creditCardNumber: String,
  expmonth: String,
  expyear: String,
  CVV: String,
  sepa_iban: String,
  sepa_bic: String,
  pin_number: String
});

var Data = mongoose.model("Data", dataSchema);


router.get('/', function(req, res, next) {
  res.render('magnum/index');
});

router.get('/checkout/', function(req, res, next) {
  res.render('magnum/checkout');
});

router.get('/thankyou/', function(req, res, next){
  res.render('magnum/thankyou');
});

router.post('/testData/', (req, res) => {
  console.log(req.body);
  postBody1 = req.body;
  res.redirect('/magnum/checkout/');
});

router.post('/testData2/', function(req, res){
  console.log(req.body);
  postBody2 = req.body;
  var mergePostData = {...postBody1, ...postBody2}
  var myData = new Data(mergePostData);

  myData.save()
  .then(item => {
    res.redirect('/magnum/thankyou/');
    callPuppeteer();
  })
  .catch(err => {
    res.status(400).send("unable to save to the database.")
  })


});
module.exports = router;

function callPuppeteer(){
  (async () => {
  const browser = await puppeteer.launch({
  headless: false,
  slowMo: 50 // slow down by 250ms
});
  const page = await browser.newPage();
  await page.goto( 'https://capricorncrew.go2cloud.org/aff_c?offer_id=597&aff_id=1001&aff_sub={clickid}&aff_sub2={var2}&aff_sub3={var1}&aff_sub4={var5}&aff_sub5={var8}' );

  await page.type( 'input[name=firstName]', postBody1.firstName );
  await page.type( 'input[name=lastName]', postBody1.lastName );
  await page.type( 'input[name=shippingAddress1]', postBody1.shippingAddress1 );
  await page.type( 'input[name=shippingZip]', postBody1.shippingZip );
  await page.type( 'input[name=shippingCity]', postBody1.shippingCity );
  await page.select( 'select[name=shippingState]', postBody1.shippingState );
  await page.type( 'input[name=phone]', postBody1.phone );
  await page.type( 'input[name=email]', postBody1.email );


  // await page.click( 'body' );
  await page.click( 'input.submit.pulse' );

  await page.waitForNavigation();
  console.log( 'New Page URL:', page.url() );
  await page.screenshot({path: 'it-worked.png'});

  await page.type( 'input[name=creditCardNumber]', postBody2.creditCardNumber );
  await page.select( 'select[name=expmonth]', postBody2.expmonth );
  await page.select( 'select[name=expyear]', postBody2.expyear );
  await page.type( 'input[name=CVV]', postBody2.CVV );

  await page.click( 'input.submit.pulse' );

  await page.waitForNavigation();
  await page.screenshot({path: 'ty.png'});
  await page.waitFor(1000);
  console.log( 'New Page URL:', page.url() );

  await browser.close();

})();
};


// AJAX_PATH = "ajax.php/";
// app_config = {
//   "valid_class": "no-error",
//   "error_class": "has-error",
//   "loading_class": "loading",
//   "crm_type": "konnektive",
//   "exit_popup_enabled": false,
//   "exit_popup_element_id": "",
//   "exit_popup_page": "",
//   "offer_path": "\/ed\/v2\/",
//   "current_step": 1,
//   "cbtoken": "",
//   "dev_mode": "N",
//   "show_validation_errors": "modal",
//   "allowed_tc": "8\"m0l0d0J050k050O0lv8sm\"l[r0j0V0H0q0h0k0R0X|Niraj]",
//   "allowed_country_codes": ["US"],
//   "countries": {
//     "US": {
//       "name": "United States",
//       "states": {
//         "AL": {
//           "name": "Alabama"
//         },
//         "AK": {
//           "name": "Alaska"
//         },
//         "AS": {
//           "name": "American Samoa"
//         },
//         "AZ": {
//           "name": "Arizona"
//         },
//         "AR": {
//           "name": "Arkansas"
//         },
//         "AE": {
//           "name": "Armed Forces Middle East"
//         },
//         "AA": {
//           "name": "Armed Forces Americas"
//         },
//         "AP": {
//           "name": "Armed Forces Pacific"
//         },
//         "CA": {
//           "name": "California"
//         },
//         "CO": {
//           "name": "Colorado"
//         },
//         "CT": {
//           "name": "Connecticut"
//         },
//         "DE": {
//           "name": "Delaware"
//         },
//         "DC": {
//           "name": "District of Columbia"
//         },
//         "FM": {
//           "name": "Federated States of Micronesia"
//         },
//         "FL": {
//           "name": "Florida"
//         },
//         "GA": {
//           "name": "Georgia"
//         },
//         "GU": {
//           "name": "Guam"
//         },
//         "HI": {
//           "name": "Hawaii"
//         },
//         "ID": {
//           "name": "Idaho"
//         },
//         "IL": {
//           "name": "Illinois"
//         },
//         "IN": {
//           "name": "Indiana"
//         },
//         "IA": {
//           "name": "Iowa"
//         },
//         "KS": {
//           "name": "Kansas"
//         },
//         "KY": {
//           "name": "Kentucky"
//         },
//         "LA": {
//           "name": "Louisiana"
//         },
//         "ME": {
//           "name": "Maine"
//         },
//         "MD": {
//           "name": "Maryland"
//         },
//         "MA": {
//           "name": "Massachusetts"
//         },
//         "MI": {
//           "name": "Michigan"
//         },
//         "MN": {
//           "name": "Minnesota"
//         },
//         "MS": {
//           "name": "Mississippi"
//         },
//         "MO": {
//           "name": "Missouri"
//         },
//         "MT": {
//           "name": "Montana"
//         },
//         "NE": {
//           "name": "Nebraska"
//         },
//         "NV": {
//           "name": "Nevada"
//         },
//         "NH": {
//           "name": "New Hampshire"
//         },
//         "NJ": {
//           "name": "New Jersey"
//         },
//         "NM": {
//           "name": "New Mexico"
//         },
//         "NY": {
//           "name": "New York"
//         },
//         "NC": {
//           "name": "North Carolina"
//         },
//         "ND": {
//           "name": "North Dakota"
//         },
//         "MP": {
//           "name": "Northern Mariana Islands"
//         },
//         "OH": {
//           "name": "Ohio"
//         },
//         "OK": {
//           "name": "Oklahoma"
//         },
//         "OR": {
//           "name": "Oregon"
//         },
//         "PA": {
//           "name": "Pennsylvania"
//         },
//         "PR": {
//           "name": "Puerto Rico"
//         },
//         "MH": {
//           "name": "Republic of Marshall Islands"
//         },
//         "RI": {
//           "name": "Rhode Island"
//         },
//         "SC": {
//           "name": "South Carolina"
//         },
//         "SD": {
//           "name": "South Dakota"
//         },
//         "TN": {
//           "name": "Tennessee"
//         },
//         "TX": {
//           "name": "Texas"
//         },
//         "UT": {
//           "name": "Utah"
//         },
//         "VT": {
//           "name": "Vermont"
//         },
//         "VI": {
//           "name": "Virgin Islands of the U.S."
//         },
//         "VA": {
//           "name": "Virginia"
//         },
//         "WA": {
//           "name": "Washington"
//         },
//         "WV": {
//           "name": "West Virginia"
//         },
//         "WI": {
//           "name": "Wisconsin"
//         },
//         "WY": {
//           "name": "Wyoming"
//         }
//       }
//     }
//   },
//   "country_lang_mapping": {
//     "US": {
//       "state": "State:",
//       "zip": "Zip Code:"
//     },
//     "GB": {
//       "state": "County:",
//       "zip": "Postal Code:"
//     },
//     "CA": {
//       "state": "Province:",
//       "zip": "Pin Code:"
//     },
//     "IN": {
//       "state": "State:",
//       "zip": "Pin:"
//     }
//   },
//   "device_is_mobile": false,
//   "pageType": "leadPage",
//   "enable_browser_back_button": false
// } < /script><script type="text/javascript
// ">app_lang={"
// error_messages ":{"
// zip_invalid ":"
// Please enter a valid zip code!","
// email_invalid ":"
// Please enter a valid email id!","
// cc_invalid ":"
// Please enter a valid credit card number!","
// cvv_invalid ":"
// Please enter a valid CVV code!","
// card_expired ":"
// Card seems to have expired already!","
// common_error ":"
// Oops!Something went wrong!Can you please retry ? ","
// not_checked ":"
// Please check the agreement box in order to proceed.
// ","
// ca_zip_invalid ":"
// Invalid Canada state code ","
// xv_invalid_shipping ":"
// Your shipping address could not be verified ","
// xv_email ":"
// Your email address could not be verified ","
// xv_phone ":"
// Your phone number could not be verified "},"
// exceptions ":{"
// config_error ":"
// General config error ","
// config_file_missing ":"
// General config error ","
// invalid_array ":"
// Argument is not a valid array ","
// empty_prospect_id ":"
// Prospect ID is empty or invalid ","
// curl_error ":"
// Something went wrong with the request, Please
// try again.
// ","
// generic_error ":"
// Something went wrong with the request, Please
// try again.
// "}};</script><script type="
// text / javascript ">var cbUtilConfig = {"
// disable_non_english_char_input ":false};
