function loadRepos() {
  element = document.getElementById("gitRepos");
  element.classList.toggle("hide");

  const loadingStatus = document.querySelector("#gitRepos");

  const gitRepoUrl = "https://api.github.com/users/eddygrove/repos";

  async function getRepoData() {
    let response = await fetch(gitRepoUrl);
    const repoList = document.getElementById("gitRepos");

    if (response.ok) {
      let repoData = await response.json();
      loadingStatus.innerText = " ";
      console.log("loggar repoData: ", repoData);
      for (const item of repoData) {
        createRepoList(repoList, item.name, item.url, item.description);
      }

      // const jsonKeys = Object.keys(json);
      // console.log("loggar jsonKeys: ", jsonKeys);
      // jsonKeys.forEach((jsonKey) => {
      //   console.log("loggar each jsonKey: ", jsonKey);

      //   const jsonItems = json[jsonKey];
      //   console.log("jsonItems: ", jsonItems);
      // });
    } else {
      console.log("HTTP-Error: " + response.status);
    }
  }

  function createRepoList(repoList, name, url, description) {
    const li = document.createElement("li");
    li.innerText = name + "\n " + url + "\n " + description;
    li.classList.add("gitHubStyle");
    repoList.appendChild(li);
  }

  getRepoData();
}

loadRepos();
