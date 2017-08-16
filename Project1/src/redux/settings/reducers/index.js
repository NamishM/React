
const initialState = {
  users: {
    tasking: {
      canCreateTasks: false,
      canDeleteTasks: false,
      canUpdateTasks: false,
    },
  },
  system: {},
};

export const settings = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SET_DEFAULT_USER_PROFILE':
      return {
        ...state,
        users: {
          ...state.users,
          tasking: {
            ...state.users.tasking,
            canCreateTasks: action.taskingSettings.canCreateTasks,
            canDeleteTasks: action.taskingSettings.canDeleteTasks,
            canUpdateTasks: action.taskingSettings.canUpdateTasks,
          },
        },
      };
    case 'GET_ENABLE_TASKING_FETCH_STATUS_FAILED':
    case 'GET_ENABLE_TASKING_FETCH_STATUS_SUCCEEDED':
      return {
        ...state,
        users: {
          ...state.users,
          tasking: {
            ...state.users.tasking,
            canCreateTasks: action.isTaskingEnabled ?
              state.users.tasking.canCreateTasks : false,
            canDeleteTasks: action.isTaskingEnabled ?
              state.users.tasking.canDeleteTasks : false,
            canUpdateTasks: action.isTaskingEnabled ?
              state.users.tasking.canUpdateTasks : false,
          },
        },
      };
    default:
      return state;
  }
};
