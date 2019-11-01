


var send_data = {}

$(document).ready(function () {
    // reset параметров

    resetFilters();


    getAPIData();


    getCountries(); // выбор городов


    getRegion(); // регион



    $('#countries').on('change', function () {

        $("#region").val("all");
        $("#region").val("all");
        send_data['region'] = '';
        send_data['region'] = '';


        if(this.value == "all")
            send_data['city'] = "";
        else
            send_data['city'] = this.value;

        getregion(this.value);

        getAPIData();
    });


    $('#variety').on('change', function () {


        if(this.value == "all")
            send_data['variety'] = "";
        else
            send_data['variety'] = this.value;
        getAPIData();
    });



    $('#region').on('change', function () {


        send_data['region'] = "";
        $('#region').val("all");
        if(this.value == "all")
            send_data['region'] = "";
        else
            send_data['region'] = this.value;
        getRegion(this.value);
        getAPIData();
    });



    $('#region').on('change', function () {
        if(this.value == "all")
            send_data['region'] = "";
        else
            send_data['region'] = this.value;
        getAPIData();
    });



    $('#sort_by').on('change', function () {
        send_data['sort_by'] = this.value;
        getAPIData();
    });



    $("#display_all").click(function(){
        resetFilters();
        getAPIData();
    })
})



function resetFilters() {
    $("#countries").val("all");
    $("#region").val("all");
    $("#region").val("all");
    $("#variety").val("all");
    $("#sort_by").val("none");


    getregion("all");
    getRegion("all");

    send_data['city'] = '';
    send_data['region'] = '';
    send_data['region'] = '';
    send_data['variety'] = '';
    send_data["sort_by"] = '',
    send_data['format'] = 'json';
}

function putTableData(result) {

    let row;
    if(result["results"].length > 0){
        $("#no_results").hide();
        $("#list_data").show();
        $("#listing").html("");
        $.each(result["results"], function (a, b) {
            row = "<tr> <td>" + b.city + "</td>" +
            "<td>" + b.taster_name + "</td>" +
            "<td title=\"" + b.title + "\">" + b.title.slice(0, 50) + "..." + "</td>" +

                "<td>" + b.price + "</td>" +
                "<td>" + b.region + "</td>" +
                "<td>" + b.region + "</td>" +
                "<td>" + b.winery + "</td>" +
                "<td>" + b.variety + "</td></tr>"
            $("#listing").append(row);
        });
    }
    else{

        $("#no_results h5").html("No results found");
        $("#list_data").hide();
        $("#no_results").show();
    }

    let prev_url = result["previous"];
    let next_url = result["next"];

    if (prev_url === null) {
        $("#previous").addClass("disabled");
        $("#previous").prop('disabled', true);
    } else {
        $("#previous").removeClass("disabled");
        $("#previous").prop('disabled', false);
    }
    if (next_url === null) {
        $("#next").addClass("disabled");
        $("#next").prop('disabled', true);
    } else {
        $("#next").removeClass("disabled");
        $("#next").prop('disabled', false);
    }

    $("#previous").attr("url", result["previous"]);
    $("#next").attr("url", result["next"]);

    $("#result-count span").html(result["count"]);
}

function getAPIData() {
    let url = $('#list_data').attr("url")
    $.ajax({
        method: 'GET',
        url: url,
        data: send_data,
        beforeSend: function(){
            $("#no_results h5").html("Loading data...");
        },
        success: function (result) {
            putTableData(result);
        },
        error: function (response) {
            $("#no_results h5").html("Something went wrong");
            $("#list_data").hide();
        }
    });
}

$("#next").click(function () {

    let url = $(this).attr("url");
    if (!url)
        $(this).prop('all', true);

    $(this).prop('all', false);
    $.ajax({
        method: 'GET',
        url: url,
        success: function (result) {
            putTableData(result);
        },
        error: function(response){
            console.log(response)
        }
    });
})

$("#previous").click(function () {

    let url = $(this).attr("url");
    if (!url)
        $(this).prop('all', true);

    $(this).prop('all', false);
    $.ajax({
        method: 'GET',
        url: url,
        success: function (result) {
            putTableData(result);
        },
        error: function(response){
            console.log(response)
        }
    });
})

function getCity() {

    let url = $("#countries").attr("url");

    $.ajax({
        method: 'GET',
        url: url,
        data: {},
        success: function (result) {

            countries_option = "<option value='all' selected>Город</option>";
            $.each(result["countries"], function (a, b) {
                countries_option += "<option>" + b + "</option>"
            });
            $("#countries").html(countries_option)
        },
        error: function(response){
            console.log(response)
        }
    });
}

function getvariety() {

    let url = $("#variety").attr("url");

    $.ajax({
        method: 'GET',
        url: url,
        data: {},
        success: function (result) {
            winery_options = "<option value='all' selected>ТО</option>";
            $.each(result["variety"], function (a, b) {
                winery_options += "<option>" + b + "</option>"
            });
            $("#variety").html(winery_options)
        },
        error: function(response){
            console.log(response)
        }
    });
}

function getregion(city) {

    let url = $("#region").attr("url");

    let region_option = "<option value='all' selected>Группа показателей</option>";
    $.ajax({
        method: 'GET',
        url: url,
        data: {
            "city": city
        },
        success: function (result) {
            $.each(result["region"], function (a, b) {
                region_option += "<option>" + b + "</option>"
            });
            $("#region").html(region_option)
        },
        error: function(response){
            console.log(response)
        }
    });
}

function getRegion(region) {

    let url = $("#region").attr("url");

    let region_option = "<option value='all' selected>Показатель</option>";
    $.ajax({
        method: 'GET',
        url: url,
        data: {
            "region": region
        },
        success: function (response) {
            $.each(response["region"], function (a, b) {
                region_option += "<option>" + b + "</option>"
            });
            $("#region").html(region_option);
        },
        error: function(response){
            console.log(response)
        }
    });
}

