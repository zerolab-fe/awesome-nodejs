import { Octokit } from '@octokit/core';

(async () => {
  const octokit = new Octokit({
    auth: process.env.ACCESS_TOKEN,
    baseUrl: 'https://api.github.com/repos/zerolab-fe/awesome-nodejs',
  });

  const response = await octokit.request('GET /issues');
  console.log("response", response)
})();
