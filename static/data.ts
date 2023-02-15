  export interface IColumn {
    id: string;
    title: string;
    taskIds: string[];
  }
  
  export interface IColumns {
    [key: string]: IColumn;
  }
  
  export interface IData {
    columns: IColumns;
    columnOrder: string[];
  }
  
  export const initialData: IData = {
    columns: {
      "column-1": {
        id: "column-1",
        title: "to do",
        taskIds: ["task-1", "task-2", "task-3"]
      },
      "column-2": {
        id: "column-2",
        title: "doing...",
        taskIds: ["task-4"]
      },
      "column-3": {
        id: "column-3",
        title: "done",
        taskIds: []
      }
    },
    columnOrder: ["column-1", "column-2", "column-3"]
  };
  