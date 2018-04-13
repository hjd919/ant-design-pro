import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { queryGameAd } from '../services/api';

export default {
    namespace: 'game_ad',

    state: {
        data: {
            list: [],
            pagination: {}
        },
        loading: true,
        submitting: false,
    },

    effects: {
        *query({ }, { call, put }) {
            yield put({ type: 'setLoading', payload: { loading: true } })

            const { data } = yield call(queryGameAd)
            yield put({ type: 'save', payload: { data: data, loading: false } })
        }
    },

    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        }
    },

}