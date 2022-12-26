import { EVENT, IJob } from '@/constants';
import { IndexDB } from '@/database';
import { useEffect, useState } from 'react';

export const useJobList = () => {
  const [list, setList] = useState<IJob[]>([]);

  useEffect(() => {
    const getList = (data?: any) =>
      IndexDB.getJobList(data).then((list) => {
        setList(list);
      });

    function eventListenerFactory(): EventListener {
      const query = {};
      return (event: CustomEvent) => {
        Object.assign(query, event.detail);
        getList(query);
      };
    }
    const handleEventListener = eventListenerFactory();

    getList();

    document.addEventListener(EVENT.listRefresh, handleEventListener);

    return () => {
      document.removeEventListener(EVENT.listRefresh, handleEventListener);
    };
  }, []);
  return list;
};
