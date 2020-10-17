import fs from 'fs';
import resolveCwd from 'resolve-cwd';
import { Octokit } from '@octokit/core';

const octokit = new Octokit({
  auth: process.env.ACCESS_TOKEN || 'fa7c36a245646c3ebdad5d31dd9083d6cc510418',
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

/**
 * 生成 json
 * @param data object
 */
export async function generateJson(data: object): Promise<void> {
  console.log('generate json start...');
  const filePath = resolveCwd.silent('./data.json');
  if (filePath) {
    fs.writeFileSync(filePath, JSON.stringify(data));
  }
  console.log('generate json end...');
}
