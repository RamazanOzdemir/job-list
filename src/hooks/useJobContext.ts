import { IJobContext, JobContext } from '@/contexts';
import { useContext } from 'react';

export const useJobContext = (): IJobContext => useContext(JobContext);
