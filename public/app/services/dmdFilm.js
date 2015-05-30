dmdApp.factory('dmdFilm', function($http, $q) {

    var minVote = 6; //I get angry if its really bad
    var api_key = '?api_key=eb012db0eee1007efd6f2a0ec9affd53';
    var base_url = 'http://api.themoviedb.org/';
    var vote_average = '&vote_average.gte=' + minVote;
    var release_date = '2000/01/01'; // for some reason production value makes me like a movie to a degree

    var  getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    return {
        getFeatured : function() {
            //TODO: set 200 to be dynamic based on api page limit
            var page_num = getRandomInt(0, 200);
            var urlone = base_url + '3/discover/movie' + api_key + vote_average + '&page=' + page_num + '&sortby=popularity.asc&release_date.gte=' + release_date;
            var dfd = $q.defer();
            $http.get(urlone)
                .then(function(response){
                    var idx = getRandomInt(0, 19);
                    var urltwo = base_url + '3/movie/'+ response.data.results[idx].id + api_key;
                    return $http.get(urltwo);
                }, function(reason) {
                    dfd.reject(reason);
                })
                .then(function(result){
                    dfd.resolve(result.data);
                }, function(reason) {
                    dfd.reject(reason);
                });
            return dfd.promise;
        },

        getFilmById : function(id) {
            var dfd = $q.defer();
            var url = base_url + '3/movie/' + id + api_key;
            $http.get(url)
                .then(function(result){
                    dfd.resolve(result.data);
                });
            return dfd.promise;
        }

    }

});