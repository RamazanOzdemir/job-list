export type EventHandler<T> = (event: T) => void;

export interface Priority {
  id: string;
  name: string;
}

export enum SORT {
  priority = 'priority',
  name = 'name'
}

export enum EVENT {
  listRefresh = 'listRefresh',
  deleteJob = 'deleteJob',
  updateJob = 'updateJob'
}

export interface IJob {
  id: string;
  name: string;
  priority: string;
}

export interface IJobPriority {
  id: string;
  name: string;
}

export type IStyledPriorityBox = {
  variant: string;
};
