import moment from 'moment';
import TimeSeriesLocations from './TimeSeriesLocations';
import ExposomicsLocation from './ExposomicsLocation';

/**
 * `ExposomicsLocationManager` adds Exposomics-specific helper functions to `TimeSeriesLocations`. In particular, the constructor
 * takes the array of `places` provided by the front-end and converts them into `ExposomicsLocation` objects. The `getLocation` functionality
 * is inherited from `TimeSeriesLocations`.
 */
export default class ExposomicsLocationManager extends TimeSeriesLocations {
  /**
   * For each place in `places`, extract the start time, end time, and location, and add those to the data representation in the base class `TimeSeriesLocations`
   * @param {Array.<Object>} places A json object of location and time data from the Google Api
   */
  constructor(places) {
    super();

    for (const p of places) {
      const start = moment(p.fromDate);
      const end = moment(p.toDate);
      const location = new ExposomicsLocation(p);

      this.addPlace(location, start, end); // addPlace is a method inherited from TimeSeriesLocations
    }
  }

  /**
   * Returns a list of all user-submitted counties.
   *
   * @return {Array.<String>}
   */

  getCountyList() {
    const result = [];

    for (const locationObject of this.locationObjects) {
      const county = locationObject.location.getCounty();
      result.push(county);
    }
    return result;
  }
}
