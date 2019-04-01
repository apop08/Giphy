/**************************************************************************************************/
/*!
* file	Giphy.js
* date	3/21/2019
* authors: Alex Poplawski
* brief
The javascript file for the trivia handles all the game logic and drawing for trivia game
*/
/**************************************************************************************************/

// JavaScript function that wraps everything

$(document).ready(function () {
    var topics = ["cat", "dog"];


    function createTopicButton(topic) {
        let newButton = $("<button>");
        newButton.addClass("topicButton");
        newButton.attr("data", topic);
        newButton.text(topic);
        newButton.on("click", function () {
            var topic = $(this).attr("data");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                topic + "&api_key=a52EKIthLuZ5l6qwensATiym6N1oNe9O&limit=10";

            $.ajax({
                url: queryURL,
                method: "GET"
            })
                .then(function (response) {
                    var results = response.data;
                    $("#gifs").empty();
                    for (var i = 0; i < results.length; i++) {
                        var gifDiv = $("<div>");
                        var rating = results[i].rating;

                        var p = $("<p>").text("Rating: " + rating);

                        var gifImage = $("<img class=\"gif\">");
                        gifImage.attr("src", results[i].images.fixed_height_still.url);
                        gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                        gifImage.attr("data-animate", results[i].images.fixed_height.url);
                        gifImage.attr("data-state", "still");
                        gifDiv.prepend(p);
                        gifDiv.prepend(gifImage);

                        $("#gifs").prepend(gifDiv);
                    }
                    $(".gif").on("click", function () {
                        var state = $(this).attr("data-state");
                        if (state == "still") {
                            //console.log($(this).attr("data-animate"));
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                        }
                        else if (state == "animate") {
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                        }

                    });
                });
        });
        $("#topics").append(newButton);
    }

    for (let i in topics) {
        createTopicButton(topics[i]);
    }

    $("#add-topic").on("click", function () {
        var topicToAdd = $("#topic-input").val();
        createTopicButton(topicToAdd);
    });
});