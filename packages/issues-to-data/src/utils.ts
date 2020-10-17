import fs from 'fs';
import { execSync } from 'child_process';
import resolveCwd from 'resolve-cwd';
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

export function push() {
  const REPOSITORY_PATH = `https://x-access-token:${process.env.ACCESS_TOKEN}@github.com/zerolab-fe/awesome-nodejs.git`;

  execSync('git init');
  execSync('git config user.name "li-shuaishuai"');
  execSync('git config user.email "lishuaishuai.it@gmail.com"');
  execSync(`git fetch ${REPOSITORY_PATH}`);
  execSync('git add data.json');
  execSync(`git commit -m "updated in ${new Date().getTime()}"`);
  execSync('git push origin master');
}
