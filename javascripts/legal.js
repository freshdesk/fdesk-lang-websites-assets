/*
 * The conditions here are extensive/exhaustive to ensure
 * that we apply signup restrictions only strictly where
 * necessary. However, these restrictions depend strictly
 * on the accuracy of the responses from the Maxmind service.
 * ----
 * The first set of conditions ensure that only signups
 * from Russia/Ukraine are impacted in a worst-case scenario
 * ----
 * The second/third conditions cover the presence of necessary
 * data in the geoLocation object.
 * ----
 * The fourth set of conditions cover a variety of possibilities
 * that can indicate a sign-up attempt from the Crimean region.
 * The presence of multiple conditions ensures that the conditions
 * continue to be applied even if a user from this region tries to
 * tamper with the geoLocation object in the localStorage store.
 */

var geoLocation = JSON.parse(localStorage.getItem("maxmind_location"));
// console.log(`geolocation ${geoLocation.country}`)
// console.log(geoLocation.country);
if (
  (
    geoLocation.country.geoname_id === 690791 ||
    geoLocation.country.names.en === 'Ukraine' ||
    geoLocation.country.geoname_id === 2017370 ||
    geoLocation.country.names.en === 'Russia'
  ) &&
  geoLocation.hasOwnProperty('subdivisions') &&
  geoLocation.subdivisions.length > 0 &&
  (
    geoLocation.subdivisions[0].iso_code === 40 ||
    geoLocation.subdivisions[0].iso_code === 43 ||
    geoLocation.subdivisions[0].geoname_id === 703883 ||
    geoLocation.subdivisions[0].names.en === 'Autonomous Republic of Crimea' ||
    geoLocation.subdivisions[0].names.en === 'Crimea'
  )
) {
  // Disable all submit buttons
  jQuery('input[type="submit"]').removeClass('btn-block').addClass('btn-disabled');

  // Remove data attributes which enable signup to prevent users
  // from trying to submit despite teh disabled buttons.
  var attributes = ['action', 'data-list-id'];
  jQuery.each(attributes, function (index, value) {
    jQuery('form').removeAttr(value);
  });
}
