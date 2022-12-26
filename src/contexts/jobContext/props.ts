import { IJobPriority } from '@/constants';

export interface IJobContext {
  priorities: IJobPriority[];
  setPriorities: (data: IJobPriority[]) => void;
}
