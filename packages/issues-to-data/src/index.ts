import { get, generateJson, generateMarkdown, push, Data, DataItem } from './utils';

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

async function getIssues(labels: string): Promise<DataItem[]> {
  console.log(`label ${labels} start...`);

  const { code, data } = await get('/issues', { labels, state: 'closed' });
  if (code !== 200) {
    return [];
  }

  const issues: DataItem[] = data.map(({ title, body }: { title: string; body: string }) => {
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
      const issueArr = await getIssues(element);
      if (!issueArr.length) {
        continue;
      }
      data[element] = issueArr;
    }
  } catch (error) {
    console.log(error);
    return;
  }

  await generateJson(data);
  generateMarkdown(data);
  push();
}

main();
