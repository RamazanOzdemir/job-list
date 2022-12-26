import { Priority } from '@/constants';
import { IndexDB, TABLES } from '@/database';

export const getJobPriorities = async (): Promise<Array<Priority>> => {
  const list = [
    {
      id: '1',
      name: 'Urgent'
    },
    {
      id: '2',
      name: 'Regular'
    },
    {
      id: '3',
      name: 'Trivial'
    }
  ];
  list.forEach((priority) => {
    IndexDB.update(TABLES.jobPriorities, priority);
  });
  return Promise.resolve(list);
};
