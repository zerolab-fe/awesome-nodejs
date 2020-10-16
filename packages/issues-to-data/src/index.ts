import { get } from './utils';

(async () => {
  const response = await get('GET /issues');
  console.log('response', response);
})();
