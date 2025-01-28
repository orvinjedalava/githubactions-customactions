// install these packages inside the action folder ( e.g. .github/actions/deploy-s3-javascript )
// npm init -y ( creates a new package.json file)
// npm install @actions/core @actions/github @actions/exec

const core = require('@actions/core');
// used to communicate with the GitHub API
const github = require('@actions/github');

const exec = require('@actions/exec');

function run() {
  // 1) Get some input values
  const bucket = core.getInput('bucket', { required: true });
  const bucketRegion = core.getInput('bucket-region', { required: true });
  const distFolder = core.getInput('dist-folder', { required: true });

  // 2) Upload files to S3
  const s3Uri = `s3://${bucket}`;
  // IMPORTANT: Create an access key in AWS to access the bucket.
  // Please see this repository's Github Secrets to store the access key and secret key.
  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

  // core.notice('Hello from my custom JavaScript Action!');
  const websiteURL = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;
  core.setOutput('website-url', websiteURL);
}

run();