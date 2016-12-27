var stocks = ["OPXA", "GSAT", "AAPL", "ZEN", "MSFT", "GOOG", "NFLX", "TSLA"];

$(document).ready(function () {
    $('#stocks').hide();
    $('#submit_form').hide();
    for (var i = 0; i < stocks.length; i++) {
        var name = stocks[i];
        JSON.stringify(name);
        name.replace(/"/g, '');

        $.ajax({
            type: 'GET'
            , dataType: 'JSONP'
            , url: "https://finance.google.com/finance/info?client=ig&q=NSE:" + name
            , success: function (response) {
                loadStocks(response[0]);
            }
            , error: function () {
                $('#stocks').append('<tr class="failed">Failed to retrieve stock data for ' + name + '</tr>');
            }
        });

    }
    $('#loading_icon_stocks').hide();
    $('#stocks').fadeIn(2000);
    $('#submit_form').delay(4000).show();

    // Update stock prices every 5 seconds
    var d = new Date();
    if (d.getDay() < 6 && d.getHours >= 8) {
        setInterval(refreshStockPrices, 5000);
    }

    //$('#submit_form').css('margin-top', 50 * stocks.length + 'px');
    //$('#submit_form').css('margin-top', 50 + $('#submit_form'.css('margin-top')));
});

// Initial load of stocks data into table
function loadStocks(response) {
    if (response.t == null) {
        $('#stocks').append('<tr class="failed">Failed to retrieve stock data for ' + name + '</tr>');
    } else {
        if (response.c > 0) {
            $('#stocks').append('<tr><td>' + response.t + '</td><td id="positive">$' + response.l_cur + '</td><td id="positive"><i class="fa fa-caret-up" aria-hidden="true"></i>' + response.c.substring(1, response.c.length) + '</td></tr>');
        } else if (response.c < 0) {
            $('#stocks').append('<tr><td>' + response.t + '</td><td id="negative">$' + response.l_cur + '</td><td id="negative"><i class="fa fa-caret-down" aria-hidden="true"></i>' + response.c.substring(1, response.c.length) + '</td></tr>');
        }
    }
}

// Update stock prices
function refreshStockPrices() {
    $('tr').remove();
    for (var i = 0; i < stocks.length; i++) {
        var name = stocks[i];
        JSON.stringify(name);
        name.replace(/"/g, '');
        console.log(name);
        $.ajax({
            type: 'GET'
            , dataType: 'JSONP'
            , url: "https://finance.google.com/finance/info?client=ig&q=NSE:" + name
            , success: function (response) {
                loadStocks(response[0]);
            }
            , error: function () {
                $('#stocks').append('<tr class="failed">Failed to retrieve stock data for ' + name + '</tr>');
            }
        });
    }
}

// Add stock names to stocks array
function addStockName() {
    var exists = false;
    var sym = document.getElementById("symbol").value.toUpperCase();

    if (!(sym === '')) {
        //Check to see if sym is a valid symbol
        loadStocks(response[0], sym);
        $('#symbol').attr('disabled', 'disabled');
        $('#sub_sym').attr('disabled', 'disabled');

        for (var i = 0; i < stocks.length; i++) {
            if (stocks[i] === sym) {
                exists = true;
                break;
            }
        }

        if (!exists) {
            stocks[stocks.length] = sym;
            document.getElementById("symbol").value = '';
        } else {
            //highlight existing table row
            document.getElementById("symbol").value = '';
            $('.error_msg').html("'" + sym + "' is already on the list!").show().delay(2000).fadeOut(1000);
        }
    } else {
        console.log("Value is" + valid);
        $('.error_msg').html("'" + sym + "' is not a valid symbol!").show().delay(1000).fadeOut(1000);
    }
    $('#symbol').removeAttr('disabled');
    $('#sub_sym').removeAttr('disabled');
}
//else {
//        $('.error_msg').html("Please type a symbol").show().delay(1000).fadeOut(1000);
//    }