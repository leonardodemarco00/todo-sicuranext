import React from "react";
import { v4 as uuidv4 } from "uuid";
import { isInThePast } from "../utils";
import { getLocalStorage } from "../utils";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [data, setData] = React.useState(getLocalStorage());
  const [isCardModalOpen, setIsCardModalOpen] = React.useState(false);
  const [isEditableModalOpen, setIsEditableModalOpen] = React.useState(false);

  const toggleCardModal = () => setIsCardModalOpen(!isCardModalOpen);
  const toggleEditableModal = () =>
    setIsEditableModalOpen(!isEditableModalOpen);

  const createColumn = (title) => {
    setData({
      ...data,
      columns: [
        ...data.columns,
        {
          id: uuidv4(),
          title: title,
          tasks: [],
        },
      ],
    });
  };

  const deleteColumn = (id) => {
    const newData = data.columns.filter((column) => {
      return column.id !== id;
    });
    setData({
      ...data,
      columns: newData,
    });
  };

  const addTaskToColumn = (title, content) => {
    const doneTasks = [];
    const newTask = { id: uuidv4(), ...content };

    const newData = data.columns.map((column) => {
      column.tasks.forEach((task) => {
        if (task.done) doneTasks.push(task);
      });

      if (column.title.toLowerCase() !== title.toLowerCase()) {
        return column;
      }
      return {
        ...column,
        tasks: [...column.tasks, newTask],
      };
    });

    doneTasks.push(newTask);

    setData({
      ...data,
      columns: newData,
      storage: doneTasks,
    });

    setIsCardModalOpen(false);
  };

  const activeColumns = data.columns.map((column) => {
    return { title: column.title, id: column.id };
  });

  const editCards = (id, content) => {
    const newData = data.columns.map((column) => {
      if (!column.tasks.find((x) => x.id === id)) {
        return column;
      }
      return {
        ...column,
        tasks: column.tasks.map((el) => {
          if (el.id === id) {
            return { id, ...content };
          }
          return el;
        }),
      };
    });

    const newStorage = data.storage.map((task) => {
      if (task.id === id) {
        return { id, ...content };
      }
      return task;
    });

    setData({
      ...data,
      columns: newData,
      storage: newStorage,
    });

    setIsEditableModalOpen(false);
  };

  const removeTask = (id) => {
    const newData = data.columns.map((column) => {
      if (!column.tasks.find((x) => x.id === id)) {
        return column;
      }
      return {
        ...column,
        tasks: column.tasks.filter((el) => {
          return el.id !== id;
        }),
      };
    });

    setData({
      ...data,
      columns: newData,
    });
  };

  const filterByDateAsc = () => {
    const filteredData = data.columns.map((column) => {
      console.log(
        column.tasks.sort((objA, objB) => {
          const c = new Date(objA.data);
          const d = new Date(objB.data);
          return Number(c) - Number(d);
        })
      );
      return {
        ...column,
        tasks: column.tasks.sort((objA, objB) => {
          const c = new Date(objA.data);
          const d = new Date(objB.data);
          return Number(c) - Number(d);
        }),
      };
    });

    setData({
      ...data,
      columns: filteredData,
    });
  };

  const filterByDateDec = () => {
    const filteredData = data.columns.map((column) => {
      console.log(
        column.tasks.sort((objA, objB) => {
          const c = new Date(objA.data);
          const d = new Date(objB.data);
          return Number(d) - Number(c);
        })
      );

      return {
        ...column,
        tasks: column.tasks.sort((objA, objB) => {
          const c = new Date(objA.data);
          const d = new Date(objB.data);
          return Number(d) - Number(c);
        }),
      };
    });

    setData({
      ...data,
      columns: filteredData,
    });
  };

  const filterToDoTask = () => {
    const filteredData = data.columns.map((column) => {
      const filteredTasks = column.tasks.filter((task) => {
        return isInThePast(new Date(task.data));
      });
      return {
        ...column,
        tasks: filteredTasks,
      };
    });

    setData({
      ...data,
      columns: filteredData,
    });
  };

  const filterPastTask = () => {
    const filteredData = data.columns.map((column) => {
      const filteredTasks = column.tasks.filter((task) => {
        return !isInThePast(new Date(task.data));
      });
      console.log(filteredTasks);
      return {
        ...column,
        tasks: filteredTasks,
      };
    });

    setData({
      ...data,
      columns: filteredData,
    });
  };

  return (
    <AppContext.Provider
      value={{
        data,
        createColumn,
        deleteColumn,
        isCardModalOpen,
        toggleCardModal,
        activeColumns,
        addTaskToColumn,
        isEditableModalOpen,
        toggleEditableModal,
        editCards,
        removeTask,
        filterByDateAsc,
        filterByDateDec,
        filterToDoTask,
        filterPastTask,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
