import $ from 'jquery';
import * as nasaModule from './nasa';

/**
 *
 */
function getAndSetBackgroundImage() {

  Promise.resolve()
    .then(() => {
      var elm = $('#earth__image');
      elm.html('<i class="fa fa-refresh fa-spin fa-3x"></i>');
    })
    .then(() => {
      return nasaModule.getApodData($('#lat').val(), $('#lon').val());
    })
    .then((data) => {
      var elmImage = $('#earth__image'),
          imgElm = document.createElement("img"),
          elmDate = $('#earth__date'),
          elmCloudScore = $('#earth__cloud_score');

      imgElm.src = data.url;
      elmImage.empty().append(imgElm);
      elmDate.html("撮影日付：" + data.date);
      elmCloudScore.html("雲の占有率：" + data.cloud_score);
    })
    .catch((error) => {
      $('#earth__image').empty().html(error.message);
      $('#earth__date').empty();
      $('#earth__cloud_score').empty();

      if (typeof console !== 'object') {
        console.error(error.message);
      }
    })
  ;
}

export default function() {

  $(() => {

    $('#btn-get-image').on('click', () => {
      getAndSetBackgroundImage();
    });

  });

}