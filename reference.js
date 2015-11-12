// 'use strict';
//
// $(document).ready(init);
//
//
//
// function init() {
//   $('#go').click(goClicked);
//   $('body').on("keypress", inputEnter);
//
// }
//
// function inputEnter(e) {
//   if(e.which === 13) {
//     goClicked(e);
//   }
// }
//
// function goClicked(e) {
//   console.log('go Clicked');
//
//   var $inputCS = $('#inputCS').val().split(", ");
//   console.log($inputCS[0], $inputCS[1]);
//   $.get("http://api.wunderground.com/api/daf9b48cc5c4fd1b/conditions/q/" + $inputCS[1] + "/" + $inputCS[0] + ".json", {
//     dataType: 'jsonp',
//     method: 'GET'
//   })
//
//     .success(function(data){
//     var dateNow = new Date();
//     var hourNow = dateNow.getHours();
//     var percHour = (hourNow / 24) * 100;
//
//
//     var temp = data.current_observation.temp_f
//     // var weatherIcon = "http://www.clipartbest.com/cliparts/dir/ayg/diraygx5T.png"
//     var weatherIcon = data.current_observation.icon_url
//     // actual provided icon looked too shitty.
//     var full = data.current_observation.display_location.full
//     var zip = data.current_observation.display_location.zip
//     var time = data.current_observation.local_time_rfc822
//     console.log(percHour);
//     $('.progress.progress-striped.active').attr("id", "showBar");
//     $('.progress-bar').attr("style", "width: " + percHour + "%");
//     $('#query').text(full + " " + zip + ", " + time);
//     $('table').attr('class', "show");
//     $('#one').text("Currently:");
//     $('#outputTemp').text(temp + "°F");
//     $('#two').text("Conditions:");
//     $('#icon').attr("src", weatherIcon);
//     console.log($('.progress-bar'));
//     console.log('data:', data);
//     console.log($('#icon'));
//   })
//   .fail(function(error) {
//     console.log('error:', error);
//
//   });
//
// }
//
//
// //----------- TRAIL API SAMPLE
//
//
$(function(){
  $('.search').on('click', function(event){
    get_trails();
  });
  function get_trails (){
    location_value = $('#location-input').val();
    place_array = [];
    $('#trail_api_result').html("<h4>Loading results...</h4>");
    $('#search_title').html('<h2>Outdoor Activities Near ' + location_value + '</h2><ul>');
    $.getJSON('https://outdoor-data-api.herokuapp.com/api.json?api_key=4016165acc967a9800153c77a3528d83&q[city_cont]='+location_value+'&radius=15&callback=?', function(data) {
      $('#trail_api_result').empty();
      $.each(data.places, function() {
        place = this;
        activity_links = [];
        $.each(place.activities, function(){
          activity = this;
          activity_links.push("<a href='"+activity.url+"'>"+activity.activity_type_name+"</a>");
        });

        if (activity_links.length > 0){$('#trail_api_result').append("<li>"+ place.name + " ["+activity_links.join(", ")+"]</li>");}
      });
    });
  }
});
