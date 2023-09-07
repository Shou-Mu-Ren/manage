import Cookie from 'js-cookie'

export default {
    state: {
        token: ''
    },
    mutations: {
        setToken(state, val) {
            state.token = val
            Cookie.set('token', val)
        },
        clearToken(state) {
            state.token = ''
            Cookie.remove('token')
        },
        getTocken(state) {
            state.token = state.token || Cookie.get('token')
        }
    }
}