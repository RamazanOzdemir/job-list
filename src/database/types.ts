export enum TABLES {
  jobPriorities = 'jobPriorities',
  jobList = 'jobList'
}

export interface IGetJobListConfig {
  sort?: 'priority' | 'name';
  direction?: IDBCursorDirection;
  search?: string;
  filter?: string;
}
