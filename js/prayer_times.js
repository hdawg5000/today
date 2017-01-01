$(document).ready(function () {
    $('#loading_icon_pt').show();
    $.ajax({
        type: 'GET'
        , url: "https://api.aladhan.com/timingsByCity?city=Madison&state=Wisconsin&country=US&method=2"
        , success: function (response) {
            //store table and keys in variables
            var $table = $('#pt_table');
            var keys = Object.keys(response.data.timings);

            //Hide spinner
            $('#loading_icon_pt').hide();

            //Fill in table with timings
            $table.append("<tr><td>" + keys[0] + "</td><td>" + moment(response.data.timings.Fajr, "HH:mm").format("h:mma") + "</td></tr>");
            $table.append("<tr><td>" + keys[1] + "</td><td>" + moment(response.data.timings.Sunrise, "HH:mm").format("h:mma") + "</td></tr>");
            $table.append("<tr><td>" + keys[2] + "</td><td>" + moment(response.data.timings.Dhuhr, "HH:mm").format("h:mma") + "</td></tr>");
            $table.append("<tr><td>" + keys[3] + "</td><td>" + moment(response.data.timings.Asr, "HH:mm").format("h:mma") + "</td></tr>");
            $table.append("<tr><td>" + keys[4] + "</td><td>" + moment(response.data.timings.Sunset, "HH:mm").format("h:mma") + "</td></tr>");
            $table.append("<tr><td>" + keys[5] + "</td><td>" + moment(response.data.timings.Maghrib, "HH:mm").format("h:mma") + "</td></tr>");
            $table.append("<tr><td>" + keys[6] + "</td><td>" + moment(response.data.timings.Isha, "HH:mm").format("h:mma") + "</td></tr>");
        }
        , error: function () {
            //Hide spinner
            //$('#loading_icon_pt').hide();

            $('#pt_table').append("<tr>Something went wrong loading data. Please try refreshing the page.</tr>");
        }
    });
});