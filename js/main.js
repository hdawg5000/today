$(document).ready(function () {
    //Store nav elements and add click event listeners for each
    var navElements = document.getElementById("nav");

    for (var i = 0; i < navElements.children.length; i++) {
        navElements.children[i].addEventListener("click", loadDashboard);
    }

    //Update which dashbaord to show based on nav selection
    function loadDashboard() {
        var $dash = $('.dashboard');
        var $dash_stocks = $(".dashboard_stocks");
        var $dash_prayer_times = $(".dashboard_prayer_times");

        //If clicked element doesn't have class, then proceed
        if (!(this.classList.contains("active_nav"))) {
            for (var i = 0; i < navElements.children.length; i++) {
                navElements.children[i].classList.remove("active_nav");
            }
            this.classList.add("active_nav");
        }

        if (this.classList.contains("wt")) {
            if ($dash.hasClass("hide")) {
                $dash.removeClass("hide");
            }
            $dash.css("float", "none");
            $dash_stocks.addClass("hide");
            $dash_prayer_times.addClass("hide");
        } else if (this.classList.contains("st")) {
            if ($dash_stocks.hasClass("hide")) {
                $dash_stocks.removeClass("hide");
            }
            $dash_stocks.css("float", "none");
            $dash.addClass("hide");
            $dash_prayer_times.addClass("hide");
        } else if (this.classList.contains("prt")) {
            if ($dash_prayer_times.hasClass("hide")) {
                $dash_prayer_times.removeClass("hide");
            }
            $dash_prayer_times.css("float", "none");
            $dash.addClass("hide");
            $dash_stocks.addClass("hide");
        } else {
            $dash.removeClass("hide");
            $dash_stocks.removeClass("hide");
            $dash_prayer_times.removeClass("hide");
            $dash.css("float", "left");
            $dash_stocks.css("float", "right");
            $dash_prayer_times.css("float", "left");
        }
    }
});