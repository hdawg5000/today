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
            , url: "https://finance.google.com/finance/info?client=ig&q=NSE:" + name
            , success: function (response) {
                response = response.substring(6, response.length);
                response = response.substring(0, response.length - 3);
                response = JSON.parse(response);
                loadStocks(response);
            }
            , error: function (xhr, textStatus, errorMessage) {
                //                console.log(xhr.status);
                //                if (xhr.status === 200) {
                //                    $.ajax(this);
                //                    return;
                //                }

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

        //Add stock price to table. If price > 0, set id to positive. Else, set to negative
        var price = response.c;
        price = price.substring(0, 1) + " $" + price.substring(1, price.length);
        if (response.c > 0) {
            $('#stocks').append('<tr><td>' + response.t + '</td><td id="positive">$' + response.l + '</td><td id="positive">' + price + '</td></tr>');
        } else if (response.c < 0) {
            $('#stocks').append('<tr><td>' + response.t + '</td><td id="negative">$' + response.l + '</td><td id="negative">' + price + '</td></tr>');
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
            , dataType: 'JSON'
            , url: "http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=" + name
            , success: function (response, name) {
                loadStocks(response, name);
            }
            , error: function (xhr, textStatus, errorMessage) {
                console.log(xhr.status);
                if (xhr.status == 501) {
                    $.ajax(this);
                    return;
                }

                //$('#stocks').append('<tr class="failed">Failed to retrieve stock data for ' + name + '</tr>');
            }
        });
    }
}

// Add stock names to stocks array
function addStockName(name) {
    stocks[stocks.length] = name;
};