import $ from 'jquery';
import Promise from 'promise';

const API_KEY = 'JGLSPSKTo83V3c0y2Rd0EpJuqnp0seLnQkwNekyC';

/**
 * Get APOD (Astronomy Picture of the Day) data
 *
 * @return {Promise}
 */
export function getApodData(lat, lon) {

  return new Promise ((resolve, reject) => {

    if (isNaN(lat) || isNaN(lon)) {
      reject(new Error('Params type error'));
      return;
    }

    var url = 'https://api.nasa.gov/planetary/earth/imagery?lat=' + lat + '&lon=' + lon +
              '&cloud_score=True&api_key=' + API_KEY;

    $.ajax({
      url: url
    })
      .done((data /*, textStatus, jqXHR*/) => {
        if (typeof console === 'object') console.info(data);

        // data:
        //   response example: https://api.nasa.gov/planetary/apod?concept_tags=True&api_key=DEMO_KEY
        // textStatus:
        //   'success'

        resolve(data);

      })
      .fail((/*jqXHR, textStatus, errorThrown*/) => {

        reject(new Error('Ajax Error'));

      })
    ;
  });

}
