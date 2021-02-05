import axios from 'axios'
const su = axios.create({
    baseURL: 'http://127.0.0.1:3333/',
    timeout: 1000,
    method: 'get',
    headers: {'X-Requested-With': 'XMLHttpRequest'},
})

interface postBody{
    method: string,
    path: any
}

export default {
    state: () => ({
        profile: {
            userFile: [],
            currentPath: ''
        }
    }),
    getters: {
        fileData: (state: any) => {
            return state.profile.userFile
        }
    },
    mutations: { 
        initUser(state: any, data: object) {
            state.profile.userFile = data
            // console.log(state.profile.userFile)
        },
        changeDir(state: any, data: object) {
            state.profile.userFile = data
        },
        getDirAll(state: any, data: object) {
            console.log(data)
        }
    },
    actions: {
        loadProfile(ctx: any) {
            su('').then((data) => {
                ctx.commit('initUser',data.data)
            })
        },
        readDir(ctx: any, data: any) {
            su('/readDir', 
                {method: 'post',
                 data: {path: data }          
            }
            ).then((data2) => {
                ctx.commit('changeDir',data2.data)
                ctx.state.profile.currentPath = data
                console.log(ctx.state.profile)
            })
        },
        readDirAll(ctx: any, data: any) {
            su('/readDirAll', ).
            then((data2) => {
                ctx.commit('getDirAll',data2.data)
            })
        }
    }
}