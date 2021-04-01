
var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl)
        .then(function(response) {
            //request was successfull
        if (response.ok) {
            response.json().then(function(data) {
                //pass response data to DOM function
                displayIssues(data);
            });
        } else {
            alert("There was a problem with your request!");
        }
    });
};

var displayIssues = function(issues) {
    //check to see if there are any issues in the repo from the start
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issue!";
        return;
    }

    for (var i = 0; i < issues.length; i++) {
        //create a link element to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        //links issue objects to html_url property, which links to the full issue on GitHub
        issueEl.setAttribute("href", issues[i].html_url);
        //opens a new link in a new tab
        issueEl.setAttribute("target", "_blank");
        //links this "display issue" function to the HTML container in order to show up on the page
        issueContainerEl.appendChild(issueEl);
    }

    //create span to hold issue title
    var titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;//puts the corresponding array object issue in text to display
    //append to container
    issueEl.appendChild(titleEl);
    //create a type element
    var typeEl = document.createElement("span");
    //check if issue is an actual issue or a pull request
    if (issues[i].pull_request) {
        typeEl.textContent = "(Pull request)";
    } else {
        typeEl.textContent = "(Issue)";
    }
    //append to container
    issueEl.appendChild(typeEl);
};

getRepoIssues("facebook/react");