$(document).ready(function () {
    //Show spinner image
    $('#loading_icon_pt').show();

    $.ajax({
        type: 'GET'
        , url: "https://api.aladhan.com/timingsByCity?city=Madison&state=Wisconsin&country=US&method=2"
        , success: function (response) {
            //store table and keys of JSON object in variables
            var $table = $('#pt_table');
            var keys = Object.keys(response.data.timings);

            //Hide spinner
            $('#loading_icon_pt').hide();

            //Load current time and call updateTime method every second
            updateTime();
            setInterval(updateTime, 1000);

            //Fill in table with timings
            for (var i = 0; i < keys.length - 2; i++) {
                $table.append("<tr id='" + keys[i].toLowerCase() + "'><td><i class='fa fa-caret-right' aria-hidden='true'></i>" + keys[i] + "</td><td>" + moment(response.data.timings[keys[i]], "HH:mm").format("h:mma") + "</td></tr>");
            }

            //Create new moment object to compare current time with next prayer time
            var currentTime = moment().format("HH:mm");
            console.log(currentTime);
            console.log(response.data.timings[keys[3]]);

            /*Find current prayer and add currentPlayer class to table row in order to highlight green,
            signifying current prayer */
            var count = 0;
            while (count++ !== keys.length - 2) {
                if (currentTime.substring(0, 2) < parseInt(response.data.timings[keys[count + 1]].substring(0, 2))) {
                    if (currentTime.substring(3, 5) < parseInt(response.data.timings[keys[count]].substring(3, 5))) {
                        $('#' + keys[count - 1].toLowerCase()).addClass('currentPrayer');
                    } else {
                        $('#' + keys[count].toLowerCase()).addClass('currentPrayer');
                    }
                    break;
                } else if (currentTime.substring(0, 2) == parseInt(response.data.timings[keys[count]].substring(0, 2))) {
                    if (currentTime.substring(3, 5) < parseInt(response.data.timings[keys[count]].substring(3, 5))) {
                        $('#' + keys[count - 1].toLowerCase()).addClass('currentPrayer');
                    } else {
                        if (keys[count] === "Sunrise" || keys[count] === "Sunset") {
                            $('#' + keys[count + 1].toLowerCase()).addClass('currentPrayer');
                        } else {
                            $('#' + keys[count].toLowerCase()).addClass('currentPrayer');
                        }
                    }
                    break;
                }
            }
        }
        , error: function () {
            //Hide spinner
            //$('#loading_icon_pt').hide();

            $('#pt_table').append("<tr>Something went wrong loading the data. Please try refreshing the page.</tr>");
        }
    });
});

function updateTime() {
    $('#current_time').html(moment().format("h:mm:ssa") + " CST");
}