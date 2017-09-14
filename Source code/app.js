function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function() {
    $("form").on("submit", function(e) {
        e.preventDefault();
        // prepare the request
        var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#pac-input").val()).replace(/%20/g, "+"),
            maxResults: 10,
            order: "viewCount",
            publishedAfter: "2015-01-01T00:00:00Z"
        });
        // execute the request
        request.execute(function(response) {
            var results = response.result;
            $("#results").html("");
            $.each(results.items, function(index, item) {
                $.get("item.html", function(data) {
                    $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
                });
            });
            resetVideoHeight();
        });
    });

    $(window).on("resize", resetVideoHeight);
});

function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 5/10);
}

function init() {
    gapi.client.setApiKey("AIzaSyBOGDwq8niJAUJ3bdMpCfMLXbJcbKW8Ioc");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
}