export default {
    namespaced: true,
    state() {
        return {
            profile: {
                id: '',
                avatar: '',
                nickname: '',
                account: '',
                mobile: '',
                token: ''
            },
            redirectUrl: '/'
        }
    },
    mutations: {
        setUser(state, payload) {
            state.profile = payload
        },
        setRedirectUrl(state, url) {
            state.redirectUrl = url
        }
    }
}