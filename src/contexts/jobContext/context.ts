import { IJobContext } from './props';
import { Context, createContext } from 'react';

export const JobContext: Context<IJobContext> = createContext<IJobContext>({
  priorities: [],
  setPriorities: () => {}
});
