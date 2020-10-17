import { Octokit } from '@octokit/core';

const octokit = new Octokit({
  auth: process.env.ACCESS_TOKEN,
  baseUrl: 'https://api.github.com/repos/zerolab-fe/awesome-nodejs',
});

/**
 * get 请求
 * @param url string
 * @param _data object
 */
export async function get(url: string, _data = {}) {
  const { status, data } = await octokit.request(url, _data);

  if (status !== 200) {
    return { code: status, data: [], msg: 'error' };
  }

  return { code: status, data, msg: 'success' };
}

