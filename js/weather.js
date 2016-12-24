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

    $.ajax({
        type: 'GET'
        , dataType: 'JSON'
        , url: "https://api.wunderground.com/api/0d0d35fa410cfe29/forecast/q/WI/Madison.json"
        , success: function (response) {
            load(response);
        }
        , error: function (response) {
            $('#weather').html("Something went wrong. Try refreshing");
        }

    });

    $('#refresh').click(function () {
        $('#weather').hide();
        $('#day').hide();
        $('#refresh').hide();
        $('#loading_icon').show();
        $.ajax({
            type: 'GET'
            , dataType: 'JSON'
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

function load(response) {
    console.log(response);
    $('#weather').html(response.forecast.simpleforecast.forecastday[0].conditions);
    $('#day').html("Today is " + response.forecast.simpleforecast.forecastday[0].date.weekday + ", " +
        response.forecast.simpleforecast.forecastday[0].date.monthname + " " + response.forecast.simpleforecast.forecastday[0].date.day + ", " +
        response.forecast.simpleforecast.forecastday[0].date.year);
    $('#loading_icon').hide();
    $('#day').fadeIn(3000);
    $('#weather').prepend('<img src="' + response.forecast.simpleforecast.forecastday[0].icon_url + '"/></br>');
    $('#weather').delay(500).fadeIn(3000);

    //Load tomorrow's weather
    //$('#tomorrow').html(response.forecast.simpleforecast.forecastday[1].date.weekday_short + ' ' + response.forecast.simpleforecast.forecastday[1].conditions);

    //    $('#refresh').delay(10000).show();
}

function updateTime() {
    var today = new Date();
}

updateTime();
// Refresh every minute
setInterval(updateTime, 1000);