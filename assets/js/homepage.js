
var getUserRepos = function(user) {
    // format the github API url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make a request to the url and format to JSON
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};

getUserRepos();