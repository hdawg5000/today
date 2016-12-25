var stocks = ["OPXA", "GSAT", "AAPL", "ZEN", "MSFT", "GOOG", "NFLX", "TSLA"];

$(document).ready(function () {
    $('#stocks').hide();
    for (var i = 0; i < stocks.length; i++) {
        var name = stocks[i];
        JSON.stringify(name);
        name.replace(/"/g, '');
        console.log(name);
        $.ajax({
            type: 'GET'
            , dataType: 'jsonp'
            , url: "https://finance.google.com/finance/info?client=ig&q=NSE:" + name
            , success: function (response) {
                response = response.substring(6, response.length);
                response = response.substring(0, response.length - 3);
                response = JSON.parse(response);
                loadStocks(response);
            }
            , error: function () {
                $('#stocks').append('<tr class="failed">Failed to retrieve stock data for ' + name + '</tr>');
            }
        });

    }
    $('#loading_icon_stocks').hide();
    $('#stocks').fadeIn(2000);
    // Update stock prices every 7 seconds
    //setInterval(refreshStockPrices, 5000);
});

// Initial load of stocks data into table
function loadStocks(response, name) {
    if (response.t == null) {
        $('#stocks').append('<tr class="failed">Failed to retrieve stock data for ' + name + '</tr>');
    } else {
        if (response.c > 0) {
            $('#stocks').append('<tr><td>' + response.t + '</td><td id="positive">$' + response.l + '</td><td id="positive">' + response.c + '</td></tr>');
        } else if (response.c < 0) {
            $('#stocks').append('<tr><td>' + response.t + '</td><td id="negative">$' + response.l + '</td><td id="negative">' + response.c + '</td></tr>');
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
            , url: "https://finance.google.com/finance/info?client=ig&q=NSE:" + name
            , success: function (response) {
                response = response.substring(6, response.length);
                response = response.substring(0, response.length - 3);
                response = JSON.parse(response);
                loadStocks(response);
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
    var sym = document.getElementById("symbol").value;
    if (sym !== null) {
        sym = sym.toUpperCase();
        console.log(sym);
        $('#symbol').attr('disabled', 'disabled');
        $('#sub_sym').attr('disabled', 'disabled');

        for (var i = 0; i < stocks.length; i++) {
            if (stocks[i] == sym) {
                exists = true;
                break;
            }
        }

        if (!exists) {
            //check if symbol is valid symbol
            var valid = false;

            stocks[stocks.length] = sym;
            refreshStockPrices();
            document.getElementById("symbol").value = '';
        } else {
            //highlight existing table row
            document.getElementById("symbol").value = '';
            $('.error_msg').show().delay(5000).fadeOut(1000);
        }
        $('#symbol').removeAttr('disabled');
        $('#sub_sym').removeAttr('disabled');
    }
};