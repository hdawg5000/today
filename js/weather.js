var day = new Date();
var hour = day.getHours();

$(document).ready(function () {

    if (hour < 12) {
        $('#greeting').html("Good morning, Hammad");
    } else if (hour >= 12 && hour <= 17) {
        $('#greeting').html("Good afternoon, Hammad");
    } else {
        $('#greeting').html("Good evening, Hammad");
    }

    $('#weather').hide();
    $('#day').hide();
    $('#refresh').hide();

    var a1 = $.ajax({
        type: 'GET'
        , dataType: 'JSONP'
        , url: "https://api.wunderground.com/api/0d0d35fa410cfe29/forecast/q/WI/Madison.json"
    });

    var a2 = $.ajax({
        type: 'GET'
        , dataType: 'JSONP'
        , url: "http://api.wunderground.com/api/0d0d35fa410cfe29/conditions/q/WI/Madison.json"
    });

    $.when(a1, a2).done(function (r1, r2) {
        load(r1[0]);
        today(r2[0]);
    });

    $('#refresh').click(function () {
        $('#weather').hide();
        $('#day').hide();
        $('#refresh').hide();
        $('#loading_icon').show();
        $.ajax({
            type: 'GET'
            , dataType: 'JSONP'
            , url: "https://api.wunderground.com/api/0d0d35fa410cfe29/forecast/q/WI/Madison.json"
            , success: function (response) {
                load(response);
            }
            , error: function (response) {
                $('#weather').html("Something went wrong. Try refreshing");
            }

        });
    });
});

function today(response) {
    $('#current_temperature').html("It is currently " + response.current_observation.temp_f + "&deg;");
    $('#current_weather').html(" and " + response.current_observation.weather.toLowerCase() + " in " + response.current_observation.display_location.city);
    $('#current_weather').delay(500).fadeIn(3000);
    $('#weather_img').html('<img src="' + response.current_observation.icon_url + '"/></br>');
}

function load(response) {
    $('#date').html("Today is " + response.forecast.simpleforecast.forecastday[0].date.weekday + ", " +
        response.forecast.simpleforecast.forecastday[0].date.monthname + " " + response.forecast.simpleforecast.forecastday[0].date.day + ", " +
        response.forecast.simpleforecast.forecastday[0].date.year);
    //    $('#current_weather').html(response.forecast.simpleforecast.forecastday[0].conditions);
    $('#loading_icon').hide();
    $('#date').fadeIn(3000);

    //Load tomorrow's weather
    $('#tomorrow_day').html(response.forecast.simpleforecast.forecastday[1].date.weekday_short);
    $('#tomorrow_temperature_high').html(" H:" + response.forecast.simpleforecast.forecastday[1].high.fahrenheit);
    $('#tomorrow_temperature_low').html(" L:" + response.forecast.simpleforecast.forecastday[1].low.fahrenheit);
    $('#tomorrow_weather').html(response.forecast.simpleforecast.forecastday[1].conditions);
    $('#weather_img_tomorrow').html('<img src="' + response.forecast.simpleforecast.forecastday[1].icon_url + '"/>');

    //Load day after tomorrow's weather
    $('#day_after_tomorrow_day').html(response.forecast.simpleforecast.forecastday[2].date.weekday_short);
    $('#day_after_tomorrow_temperature_high').html(" H:" + response.forecast.simpleforecast.forecastday[2].high.fahrenheit);
    $('#day_after_tomorrow_temperature_low').html(" L:" + response.forecast.simpleforecast.forecastday[2].low.fahrenheit);
    $('#day_after_tomorrow_weather').html(response.forecast.simpleforecast.forecastday[2].conditions);
    $('#day_after_tomorrow_weather_img').html('<img src="' + response.forecast.simpleforecast.forecastday[2].icon_url + '"/>');


    //$('#tomorrow').html(response.forecast.simpleforecast.forecastday[1].date.weekday_short + ' ' + response.forecast.simpleforecast.forecastday[1].conditions);

    //    $('#refresh').delay(10000).show();
}