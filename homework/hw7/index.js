$(document).ready(function(){
    var title_url = "//cis.gvsu.edu/~scrippsj/cs371/hw/hw07/getTitles.php";
    var movie_url = "//cis.gvsu.edu/~scrippsj/cs371/hw/hw07/getMovie.php";
    var titles = [];
    var description = ""
    $.getJSON(title_url, function(data) {
        titles = data;
        console.log(titles);
    });
    $.get((movie_url + "?id=1"), function(data) {
        description = data;
        console.log(description);
    });
})
