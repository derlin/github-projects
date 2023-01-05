# Showcase Of My GitHub Projects


<div align="center">
↓↓ See the result here ↓↓<br>
<b>✨✨<a href="https://derlin.github.io/github-projects" target="_blank">https://derlin.github.io/github-projects</a>✨✨</b>
</div>

## Inspiration

This repository is a fork of https://github.com/chamodperera/projects, which is itself a fork of https://github.com/2KAbhishek/projects.

It was presented in a great dev.to article: [I Made a Web App to Showcase all your GitHub Projects 😍✨](
https://dev.to/2kabhishek/i-made-a-web-app-to-showcase-all-your-github-projects-le3). Start there if you want to do the same.


### Create your own

If you want to do the same, you can:

- Fork the repo
- Clone it
- Open up `script.js` and update the `username` variable to your GitHub username.
- Open up `index.html` and update the `title` tag to make it your username.
- You may also want to update the favicon too, update the `link` tag in `index.html`
- Push your changes
- Go to repo settings on GitHub and enable GitHub Pages.

The site should be live on `https://<your-username>.github.io/projects`.

#### Number Of Repos

The number of repos is controlled by the `maxPages` variable, the GitHub API supports 100 repos per page max.
If you have less than 100 repos, set `maxPages` to 1, if you have 300 then 3.

You can also edit the fetch query to reduce the `per page` repo count.
> There's no pagination, all repos are shown on the same page.

#### Authenticated Requests

If you are working locally and notice the API is not sending over data, it might be because of the rate limiting on GitHub API requests.

You can either wait for an hour or set up a personal access token on GitHub and pass it in the header (see the commented `headers` constant
in `script.js`).

#### Programming Language Icons

This project uses [Devicon](https://devicon.dev/) for adding language icons, if the language name and icon are not being
displayed correctly for any of your repos, update `devicons` mapping in `script.js`.