const username = 'derlin';
const maxPages = 2;
const repoList = document.querySelector('.repo-list');
const reposSection = document.querySelector('.repos');
const filterInput = document.querySelector('.filter-repos');

const headers = {};
// const headers = {
//     headers: {
//         Accept: 'application/vnd.github+json',
//         Authorization: '<TOKEN>'
//     }
// };

// get information from github profile
const getProfile = async function () {
    const res = await fetch(
        `https://api.github.com/users/${username}`, headers
    );
    const profile = await res.json();
    displayProfile(profile);
};
getProfile();

// display infomation from github profile
const displayProfile = function (profile) {
    const userInfo = document.querySelector('.user-info');
    userInfo.innerHTML = `
    <figure>
        <img class="profile-pic" alt="user avatar" src=${profile.avatar_url} />
    </figure>
    <div>
        <h2><a href=${profile.blog}><strong>${profile.name}</strong></a></h2>
        <strong>@${profile.login} </strong>
        <p>${profile.bio || "<i>bio not found</i>"}</p>
        <p>
            Repos: ${profile.public_repos} /
            Gists: ${profile.public_gists}
        </p>
    </div>
    `;
};

// get list of user's public repos
const getRepos = async function () {
    let repos = [];
    let res;
    for (let i = 1; i <= maxPages; i++) {
        res = await fetch(
            `https://api.github.com/users/${username}/repos?&sort=pushed&per_page=100&page=${i}`,
            headers
        );
        let data = await res.json();
        repos = repos.concat(data);
    }
    document.getElementById("loading").remove();
    displayRepos(repos);
};
getRepos();

// display list of all user's public repos
const displayRepos = function (repos) {
    filterInput.classList.remove('hide');
    for (const repo of repos) {
        if (repo.fork || !repo.description) continue;
        let listItem = document.createElement('li');
        if (repo.homepage) repo.homepage = `<a class="homepage" href="${repo.homepage}" target="_blank">Home Page</a>`;
        listItem.classList.add('repo');
        listItem.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description} <span class="year">(${repo.created_at.substr(0,4)})</span></p> 
            <span>${devicons[repo.language] || ""} ${repo.language || ""}</span>
            ${repo.homepage ?? ""}
            <a class="view" href=${repo.html_url} target="_blank">View Project</a>`;
        repoList.append(listItem);
    }
};

// dynamic search
filterInput.addEventListener('input', function (e) {
    const search = e.target.value;
    const repos = document.querySelectorAll('.repo');
    const searchLowerText = search.toLowerCase();

    for (const repo of repos) {
        const lowerText = repo.innerText.toLowerCase();
        if (lowerText.includes(searchLowerText)) {
            repo.classList.remove('hide');
        } else {
            repo.classList.add('hide');
        }
    }
});

// for programming language icons
const devicons = {
    Assembly: '<i class="devicon-labview-plain colored"></i>',
    'C#': '<i class="devicon-csharp-plain colored"></i>',
    'C++': '<i class="devicon-cplusplus-plain colored"></i>',
    C: '<i class="devicon-c-plain colored"></i>',
    Clojure: '<i class="devicon-clojure-plain colored"></i>',
    CoffeeScript: '<i class="devicon-coffeescript-plain colored"></i>',
    Crystal: '<i class="devicon-crystal-plain colored"></i>',
    CSS: '<i class="devicon-css3-plain colored"></i>',
    Dart: '<i class="devicon-dart-plain colored"></i>',
    Dockerfile: '<i class="devicon-docker-plain colored"></i>',
    Elixir: '<i class="devicon-elixir-plain colored"></i>',
    Elm: '<i class="devicon-elm-plain colored"></i>',
    Erlang: '<i class="devicon-erlang-plain colored"></i>',
    'F#': '<i class="devicon-fsharp-plain colored"></i>',
    Go: '<i class="devicon-go-plain colored"></i>',
    Groovy: '<i class="devicon-groovy-plain colored"></i>',
    HTML: '<i class="devicon-html5-plain colored"></i>',
    Haskell: '<i class="devicon-haskell-plain colored"></i>',
    Java: '<i class="devicon-java-plain colored" style="color: #ffca2c"></i>',
    JavaScript: '<i class="devicon-javascript-plain colored"></i>',
    Julia: '<i class="devicon-julia-plain colored"></i>',
    'Jupyter Notebook': '<i class="devicon-jupyter-plain colored"></i>',
    Kotlin: '<i class="devicon-kotlin-plain colored" style="color: #796bdc"></i>',
    Latex: '<i class="devicon-latex-plain colored"></i>',
    Lua: '<i class="devicon-lua-plain-wordmark colored" style="color: #0000d0"></i>',
    Matlab: '<i class="devicon-matlab-plain colored"></i>',
    Nim: '<i class="devicon-nixos-plain colored" style="color: #FFC200"></i>',
    Nix: '<i class="devicon-nixos-plain colored"></i>',
    ObjectiveC: '<i class="devicon-objectivec-plain colored"></i>',
    OCaml: '<i class="devicon-ocaml-plain colored"></i>',
    Perl: '<i class="devicon-perl-plain colored"></i>',
    PHP: '<i class="devicon-php-plain colored"></i>',
    PLSQL: '<i class="devicon-sqlite-plain colored"></i>',
    Processing:
        '<i class="devicon-processing-plain colored" style="color: #0096D8"></i>',
    Python: '<i class="devicon-python-plain colored" style="color: #3472a6"></i>',
    R: '<i class="devicon-r-plain colored"></i>',
    Ruby: '<i class="devicon-ruby-plain colored"></i>',
    Rust: '<i class="devicon-rust-plain colored" style="color: #DEA584"></i>',
    Sass: '<i class="devicon-sass-original colored"></i>',
    Scala: '<i class="devicon-scala-plain colored"></i>',
    Shell: '<i class="devicon-bash-plain colored" style="color: #89E051"></i>',
    Solidity: '<i class="devicon-solidity-plain colored"></i>',
    Stylus: '<i class="devicon-stylus-plain colored"></i>',
    Svelte: '<i class="devicon-svelte-plain colored"></i>',
    Swift: '<i class="devicon-swift-plain colored"></i>',
    Terraform: '<i class="devicon-terraform-plain colored"></i>',
    TeX: '<i class="devicon-latex-plain colored"></i>',
    TypeScript: '<i class="devicon-typescript-plain colored"></i>',
    'Vim Script': '<i class="devicon-vim-plain colored"></i>',
    VimL: '<i class="devicon-vim-plain colored"></i>',
    Vue: '<i class="devicon-vuejs-plain colored"></i>',
    null: '<i class="devicon-markdown-original"></i>'
};
