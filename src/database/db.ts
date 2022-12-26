import { IJob, IJobPriority } from '@/constants';
import { TABLES, IGetJobListConfig } from './types';

class LocalDB {
  private static instance: LocalDB;
  protected db: IDBDatabase;

  constructor() {
    if (!LocalDB.instance) {
      LocalDB.instance = this;
    }
    return LocalDB.instance;
  }

  async initDatabase(): Promise<boolean> {
    return new Promise((resolve) => {
      const request: IDBOpenDBRequest = indexedDB.open('localDB', 1);
      request.onsuccess = (event) => {
        this.onSuccess(event);
        resolve(true);
      };
      request.onupgradeneeded = this.onupgradeneeded;
      request.onerror = () => {
        resolve(false);
      };
    });
  }

  onSuccess(event: any) {
    this.db = event.target.result;
  }

  onupgradeneeded(event: any) {
    const db: IDBDatabase = event.target.result;
    const jobPrioritiesStore: IDBObjectStore = db.createObjectStore(
      TABLES.jobPriorities,
      { keyPath: 'id' }
    );

    jobPrioritiesStore.createIndex('id', 'id', { unique: true });
    jobPrioritiesStore.createIndex('name', 'name', { unique: true });

    const jobListStore: IDBObjectStore = db.createObjectStore(TABLES.jobList, {
      keyPath: 'id',
      autoIncrement: true
    });

    jobListStore.createIndex('name', 'name');
    jobListStore.createIndex('priority', 'priority');
  }

  async add(table: string, data: any): Promise<any> {
    const store: IDBObjectStore = this.db
      .transaction(table, 'readwrite')
      .objectStore(table);
    return new Promise((resolve, reject) => {
      const request: IDBRequest = store.put(data);
      request.onsuccess = () => {
        resolve(true);
      };
      request.onerror = (error: any) => {
        reject(error);
      };
    });
  }

  async update(table: string, data: any): Promise<any> {
    const store: IDBObjectStore = this.db
      .transaction(table, 'readwrite')
      .objectStore(table);
    return new Promise((resolve, reject) => {
      const request: IDBRequest = store.put(data);
      request.onsuccess = () => {
        resolve(true);
      };
      request.onerror = (error: any) => {
        reject(error);
      };
    });
  }

  async remove(table: string, id: string): Promise<any> {
    const store: IDBObjectStore = this.db
      .transaction(table, 'readwrite')
      .objectStore(table);
    return new Promise((resolve, reject) => {
      const request: IDBRequest = store.delete(id);
      request.onsuccess = () => {
        resolve(true);
      };
      request.onerror = (error: any) => {
        reject(error);
      };
    });
  }

  async getJobPriorities(): Promise<IJobPriority[]> {
    const jobPriorityStore: IDBObjectStore = this.db
      .transaction(TABLES.jobPriorities, 'readwrite')
      .objectStore(TABLES.jobPriorities);
    return new Promise((resolve, reject) => {
      const request: IDBRequest = jobPriorityStore.getAll();
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = (error: any) => {
        reject(error);
      };
    });
  }

  async getJobList(getConfig?: IGetJobListConfig): Promise<Array<IJob>> {
    const config = {
      sort: 'priority',
      filter: 'all',
      direction: 'next',
      search: '',
      ...getConfig
    };
    const { sort, direction, search, filter } = config;

    const jobListStore: IDBObjectStore = this.db
      .transaction(TABLES.jobList, 'readwrite')
      .objectStore(TABLES.jobList);

    const index: IDBIndex = jobListStore.index(sort);

    const query = filter === 'all' ? null : IDBKeyRange.only(filter);

    return new Promise((resolve, reject) => {
      const list: Array<IJob> = [];

      const request: IDBRequest = index.openCursor(
        query,
        direction as IDBCursorDirection
      );

      request.onsuccess = (event: any) => {
        const cursor: IDBCursorWithValue = event.target.result;
        if (cursor) {
          if (cursor.value.name.includes(search)) {
            list.push(cursor.value);
          }
          cursor.continue();
        } else {
          resolve(list);
        }
      };

      request.onerror = (error: any) => {
        reject(error);
      };
    });
  }
}

export const IndexDB = new LocalDB();
