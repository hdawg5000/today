var stocks = ["OPXAAA", "AAPL", "ZEN", "MSFT", "GOOG", "NFLX", "TSLA"];

$(document).ready(function () {
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

    // Update stock prices every 7 seconds
    setInterval(refreshStockPrices, 5000);
});

// Initial load of stocks data into table
function loadStocks(response, name) {
    if (response.Symbol == null) {
        $('#stocks').append('<tr class="failed">Failed to retrieve stock data for ' + name + '</tr>');
    } else {

        //Append 0 to end of lastprice if hundreths place is missing
        var price = response.LastPrice.toString();
        if ((price.charAt(price.length - 3)) !== '.') {
            price = price + '0';
        }

        //Add stock price to table. If price > 0, set id to positive. Else, set to negative
        if (response.Change > 0) {
            $('#stocks').append('<tr><td>' + response.Symbol + '</td><td id="positive">$' + price + '</td></tr>');
        } else if (response.Change < 0) {
            $('#stocks').append('<tr><td>' + response.Symbol + '</td><td id="negative">$' + price + '</td></tr>');
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