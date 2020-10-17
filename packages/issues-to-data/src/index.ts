import { get, generateJson } from './utils';

type Data = {
  [key: string]: any;
};

async function getLabels(): Promise<string[]> {
  console.log('getLabels start...');
  const { code, data } = await get('/labels');
  if (code !== 200) {
    return [];
  }

  const lables: string[] = data.map(({ name }: { name: string }) => name);
  console.log('getLabels end...');

  return lables;
}

async function getIssues(labels: string) {
  console.log(`label ${labels} start...`);

  const { code, data } = await get('/issues', { labels });
  if (code !== 200) {
    return [];
  }

  const issues: string[] = data.map(({ title, body }: { title: string; body: string }) => {
    const reg = /```json([\s\S]*)```/;
    const jsonStr = reg.exec(body)?.[1] ?? '';
    const { repoUrl, description } = JSON.parse(jsonStr);

    return {
      title,
      repoUrl,
      description,
    };
  });
  console.log(`label ${labels} end...`);

  return issues;
}

async function main() {
  const data: Data = {};
  try {
    const labels = await getLabels();

    for (let i = 0; i < labels.length; i++) {
      const element = labels[i];
      data[element] = await getIssues(element);
    }
  } catch (error) {
    console.log(error);
    return;
  }

  generateJson(data);
}

main();
