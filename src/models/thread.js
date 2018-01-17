import { queryThread, deleteThread } from '../services/api';

export default {
  namespace: 'thread',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryThread, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *deleteThread({ payload, callback }, { call, put, select }) {
      const response = yield call(deleteThread, payload);

      // delete item
      let { list, pagination } = yield select(state => state.thread.data);
      for (let i in list) {
        if (list[i].tid == payload.tid) {
          
          // delete array row
          list.splice(i, 1);
          
          break
        }
      }
      yield put({
        type: 'save',
        payload: { list, pagination },
      });

      return response
    },
  },

  reducers: {
    save(state, action) {
      let { list, pagination } = action.payload

      // add key
      for (let row of list) {
        row.key = row.tid
      }

      return {
        ...state,
        data: { list, pagination },
      };
    },
  },
};
