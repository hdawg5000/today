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
            $table.append("<tr id='fajr'><td>" + keys[0] + "</td><td>" + moment(response.data.timings.Fajr, "HH:mm").format("h:mma") + "</td></tr>");
            $table.append("<tr id='sunrise'><td>" + keys[1] + "</td><td>" + moment(response.data.timings.Sunrise, "HH:mm").format("h:mma") + "</td></tr>");
            $table.append("<tr id='dhuhr'><td>" + keys[2] + "</td><td>" + moment(response.data.timings.Dhuhr, "HH:mm").format("h:mma") + "</td></tr>");
            $table.append("<tr id='asr'><td>" + keys[3] + "</td><td>" + moment(response.data.timings.Asr, "HH:mm").format("h:mma") + "</td></tr>");
            $table.append("<tr id='sunset'><td>" + keys[4] + "</td><td>" + moment(response.data.timings.Sunset, "HH:mm").format("h:mma") + "</td></tr>");
            $table.append("<tr id='maghrib'><td>" + keys[5] + "</td><td>" + moment(response.data.timings.Maghrib, "HH:mm").format("h:mma") + "</td></tr>");
            $table.append("<tr id='isha'><td>" + keys[6] + "</td><td>" + moment(response.data.timings.Isha, "HH:mm").format("h:mma") + "</td></tr>");

            //Create new date object to compare current time with next prayer time
            var currentTime = moment().hour() + ":" + moment().minute();

            //Find current prayer and add currentPlayer class to table row to highlight green, signifying current prayer
            if (currentTime.substring(0, 2) <= parseInt(response.data.timings.Sunrise.substring(0, 2)) &&
                currentTime.substring(0, 2) === parseInt(response.data.timings.Fajr.substring(0, 2))) {
                if (currentTime.substring(3, 5) >= parseInt(response.data.timings.Fajr.substring(3, 5))) {
                    $('#fajr').addClass('currentPrayer');
                }
            } else if (currentTime.substring(0, 2) <= parseInt(response.data.timings.Sunrise.substring(0, 2))) {
                if (currentTime.substring(3, 5) < parseInt(response.data.timings.Sunrise.substring(3, 5))) {
                    $('#fajr').addClass('currentPrayer');
                } else {
                    $('#sunrise').addClass('currentPrayer');
                }
            } else if (currentTime.substring(0, 2) <= parseInt(response.data.timings.Dhuhr.substring(0, 2))) {
                if (currentTime.substring(3, 5) < parseInt(response.data.timings.Dhuhr.substring(3, 5))) {
                    $('#dhuhr').addClass('currentPrayer');
                } else {
                    $('#asr').addClass('currentPrayer');
                }
            } else if (currentTime.substring(0, 2) <= parseInt(response.data.timings.Asr.substring(0, 2))) {
                if (currentTime.substring(3, 5) < parseInt(response.data.timings.Asr.substring(3, 5))) {
                    $('#asr').addClass('currentPrayer');
                } else {
                    $('#maghrib').addClass('currentPrayer');
                }
            } else if (currentTime.substring(0, 2) <= parseInt(response.data.timings.Maghrib.substring(0, 2))) {
                if (currentTime.substring(3, 5) < parseInt(response.data.timings.Maghrib.substring(3, 5))) {
                    $('#asr').addClass('currentPrayer');
                } else {
                    $('#maghrib').addClass('currentPrayer');
                }
            } else if (currentTime.substring(0, 2) <= parseInt(response.data.timings.Isha.substring(0, 2))) {
                if (currentTime.substring(3, 5) < parseInt(response.data.timings.Isha.substring(3, 5))) {
                    $('#maghrib').addClass('currentPrayer');
                } else {
                    $('#isha').addClass('currentPrayer');
                }
            } else {
                $('#isha').addClass('currentPrayer');
            }
        }
        , error: function () {
            //Hide spinner
            //$('#loading_icon_pt').hide();

            $('#pt_table').append("<tr>Something went wrong loading data. Please try refreshing the page.</tr>");
        }
    });
});