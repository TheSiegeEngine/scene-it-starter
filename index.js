
// var movieData = [
// 	{
// 		Title: "The Dark Knight",
// 		Year: "2008",
// 		imdbID: "tt0468569",
// 		Type: "movie",
// 		Poster:
// 			"https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg"
// 	}]

function renderMovies(movieArray){
    return movieArray.map(function(movieInfo){
        return `
            <div class="movie w-30 mb-3">
                <img class="movieImg w-100" src="${movieInfo.Poster}" />
                <div class="bg-light w-100">
                    <div class="d-flex justify-content-between pt-3 px-3 w-100 ht-100">
                        <span class="h4 text-dark font-weight-bold">${movieInfo.Title}</span>
                        <span class="h4 py-1 px-2 mb-4 font-weight-bold bg-secondary">${movieInfo.Year}</span>
                    </div>
                    <button class="btn btn-primary ml-3 mb-4" onclick='saveToWatchList("${movieInfo.imdbID}")'>Add!</button>
                </div>
            </div>
            `
    });
}

function saveToWatchList(movieID){
    var movie = movieData.find(function(currentMovie){
        return currentMovie.imdbID == movieID;
    });
    var watchListJSON = localStorage.getItem('watchList');

    var watchList = JSON.parse(watchListJSON);
    if (watchList == null){
        watchList = [];
    }

    watchList.push(movie);
    watchListJSON = JSON.stringify(watchList);
    localStorage.setItem('watchList', watchListJSON);
}

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('search-form').addEventListener('submit',function(e){
        e.preventDefault();
        var searchedMovie = document.getElementById('searchBox').value;
        var urlSafeSearchedMovie = encodeURIComponent(searchedMovie);
        axios.get(`http://www.omdbapi.com/?apikey=3430a78&s=${urlSafeSearchedMovie}`).then(function(response){
            document.getElementById("movies-list").innerHTML = renderMovies(response.data.Search).join("");
        });
    })
});
