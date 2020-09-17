$(document).ready(function() {
  $('#search-button').on("click", function() {
    var searchValue = $('#search-value').val();

   $('#search-value').val("");

   searchWeather(searchValue);
  });

  $(".history").on("click", "li", function() {
    searchWeather($(this).text());
  });
  function makeRow(text)
{ 
  var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
    $("history").append(li); 
}
function searchWeather(searchValue) {
  $.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=aa30bc1432776fd50e3ced16cdf70e6f",
    method: "GET",
    dataType: "json",
    success: function(data) {
      if (history.indexOf(searchValue) === -1) {
        history.push(searchValue);
        window.localStorage.setItem("history", JSON.stringify(history.indexOf));
        makeRow(searchValue);
      }
      $("#today").empty();

      var history = JSON.parse(window.localStorage.getItem("history")) || [];
      if(history.length > 0) {
        searchWeather(history[history.length-1]);
      }
      for (var i = 0; i < history.length; i++) {
        makeRow(history)[i];
      }

      var card = $("<div>").addClass("card");
      var wind = $("<p>").addClass("card-text").text("Wind Speeed: " + data.wind.speed + "MPH");
      var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
      var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + "F");
      var cardBody = $("<div>").addClass("card-body");

      cardBody.append(temp, humid, wind);
      card.append(cardBody);
      $("today").append(card);
    }
  })
}