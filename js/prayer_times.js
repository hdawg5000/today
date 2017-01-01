$(document).ready(function () {
    $('#loading_icon_pt').show();
    $.ajax({
        type: 'GET'
        , url: "https://api.aladhan.com/timingsByCity?city=Madison&state=Wisconsin&country=US&method=2"
        , success: function (response) {
            console.log(response);
            var $table = $('#pt_table');
            var keys = Object.keys(response.data.timings);
            $('#loading_icon_pt').hide();
            $table.append("<tr><td>" + keys[0] + "</td><td>" + response.data.timings.Fajr + "am</td></tr>");
            $table.append("<tr><td>" + keys[1] + "</td><td>" + response.data.timings.Sunrise + "</td></tr>");
            $table.append("<tr><td>" + keys[2] + "</td><td>" + response.data.timings.Dhuhr + "</td></tr>");
            $table.append("<tr><td>" + keys[3] + "</td><td>" + response.data.timings.Asr + "</td></tr>");
            $table.append("<tr><td>" + keys[4] + "</td><td>" + response.data.timings.Sunset + "</td></tr>");
            $table.append("<tr><td>" + keys[5] + "</td><td>" + response.data.timings.Maghrib + "</td></tr>");
            $table.append("<tr><td>" + keys[6] + "</td><td>" + response.data.timings.Isha + "</td></tr>");
        }
        , error: function (response, xhr) {
            console.log("Something went wrong");
        }
    });
});