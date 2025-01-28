// install these packages inside the action folder ( e.g. .github/actions/deploy-s3-javascript )
// npm init -y ( creates a new package.json file)
// npm install @actions/core @actions/github @actions/exec
const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
  core.notice('Hello from my custom JavaScript Action!');
}

run();