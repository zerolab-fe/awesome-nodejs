import { Octokit } from '@octokit/core';

const octokit = new Octokit({
  auth: process.env.ACCESS_TOKEN,
  baseUrl: 'https://api.github.com/repos/zerolab-fe/awesome-nodejs',
});

export async function get(url: string) {
  const { status, data } = await octokit.request(`GET ${url}`);

  if (status !== 200) {
    return { code: status, data: [], msg: 'error' };
  }

  return { code: status, data, msg: 'success' };
}
