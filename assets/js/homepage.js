
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");//do NOT FORGET the #'s!!!
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var getUserRepos = function(user) {
    // format the github API url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";//ex: "facebook" for 'user' leads to facebook repos

    //make a request to the url and format to JSON
    fetch(apiUrl)
        .then(function(response) {
        //request was successful
        if (response.ok) {//if response IS TRUE
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
                displayRepos(data, user);
           });
        } else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error){
        //notice this ".catch()" getting chained onto the end of the ".then()" method
        //this is the Fetch API's way of handling network errors
        alert("Unable to connect to Github");
    });
};

var formSubmitHandler = function(event) {
    event.preventDefault(); //stops browser from repeating the default action of this event
    // get value from input element
    var username = nameInputEl.value.trim();//trim removes whitespace in a string

    if (username) {//"IF" there is a value to 'username'.....
    getUserRepos(username);//then run this function
    nameInputEl.value = "";//clears this form after functions are ran and sets to "null"
    } else {
    alert("Please enter a GitHub username");
    }
            //console.log(event);
    };

var displayRepos = function (repos, searchTerm) {//this function accepts both the array of repository data and the term we searched for as parameters
    //check if API returned any repos
    //we put this above "fetch" function because we want this to run first
    if(repos.length === 0) {//IF there are NO repos...then the repoContainerEl will NOT be created and display that message
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    //clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    //console.log(repos);
    //console.log(searchTerm);
    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;
    
        // create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";//All these made from individual css attributes
    
        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;
    
        // append title to container
        repoEl.appendChild(titleEl);
    
        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {//get this from JSON
        statusEl.innerHTML =
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
        statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";//got the fas fa-check-square and other icon from "font awesome" website
        }

        // append status to container
        repoEl.appendChild(statusEl);

        // append entire, function-made repoEl container to the dom
        repoContainerEl.appendChild(repoEl);
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);