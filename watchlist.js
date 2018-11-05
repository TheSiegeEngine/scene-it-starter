var moviesList = document.getElementById('movies-list');
var savedMovies = JSON.parse(localStorage.getItem('watchList'));

console.log(savedMovies);
function renderMovies(movieArray){
    if(movieArray==null){
        return `<div class="w-30 ht-100 bg-light h3 text-dark text-center mx-auto pt-2">No Movies In Watchlist</div>`
    }
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


moviesList.innerHTML = renderMovies(savedMovies).join('');