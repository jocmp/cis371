$(document).ready(function(){
    var titleUrl = "//cis.gvsu.edu/~scrippsj/cs371/hw/hw07/getTitles.php";
    var movieUrl = "//cis.gvsu.edu/~scrippsj/cs371/hw/hw07/getMovie.php";
    var titles = [];
    $.getJSON(titleUrl, function(data) {
        titles = data;
        for (title in titles) {
            $("#title-select").append("<option>" +
                titles[title] + "</option>");
        }
        $.get((movieUrl + "?id=1"), function(data) {
            updateMovieDescription(data);
        
        });
    });
    $('#title-select').on('change', function() {
        var option = $("#title-select").prop("selectedIndex");
        $.get((movieUrl + "?id=" + (option + 1)), function(data) {
            updateMovieDescription(data);
        });
    });

    function updateMovieDescription(description) {
        var plot = "<h3>Plot</h3>";
        var cast = "<h3>Cast</h3>";
        
        var tableIndex = description.indexOf("<table");
        plot += "<p>" + description.substring(0, tableIndex) + "</p>";
        cast += description.substring(tableIndex, tableIndex + "<table".length);
        cast += " class=\"table table-hover\"";
        var borderTag = "border=\"1\"";
        var borderIndex = description.indexOf(borderTag); 
        var borderEndIndex = borderTag.length + borderIndex;
        cast += description.substring(borderEndIndex, description.length);
                
        $("#plot").empty();
        $("#cast").empty();
        
        $("#plot").append(plot);
        $("#cast").append(cast); 
    }
})
