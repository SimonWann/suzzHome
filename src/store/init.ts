import axios from 'axios'
const su = axios.create({
    baseURL: 'http://192.168.3.19:3333/',
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
            currentDir: [],
            //用户当前路径
            currentPath: '',
            //当前路径，在根目录时为空字符串
            userDir: []
            //用户全部路径
        }
    }),
    getters: {
        fileData: (state: any) => {
            // console.log(state.profile.currentDir)
            return state.profile.currentDir
        }
    },
    mutations: { 
        changeDir(state: any, data: any) {
            //items组件的路径跳转
            // console.log(data)
            state.profile.currentDir.hit = false
            //消除上一个目录的选中状态
            state.profile.currentDir = state.profile.currentDir.data[data.fileInd]
            state.profile.currentPath += '/'+ data.fileData.name.name
            state.profile.currentDir.hit = true
            //标记该次点击目录的选中状态
            // console.log(state.profile.currentDir)
        },
        getDirAll(state: any, data: object) {
            state.profile.userDir = {name: {name: '/'}, data, hit: false ,depth: 0}
            state.profile.currentDir = {name: {name: '/'}, data, hit: false ,depth: 0}
            console.log()
            //根路径的初始化
            //点击状态的添加并未全部添加，请用隐性链式操作符
            // console.log(state.profile.currentDir)
        },
        readDir(state: any, data: any){
            //set组件的路径跳转
            // console.log(data.length)
            state.profile.currentDir.hit = false
            if(data.length === 1){
                state.profile.currentPath = ''
                state.profile.currentDir = state.profile.userDir
                state.profile.currentDir.hit = true
                //根路径的重新刷新
            } else {
                state.profile.currentDir = data.reduce((sum: any, val: any, index: number) => {
                    if(index === 0) return sum
                    if(val === '') return sum
                    //跳过根目录，因为已经处理过
                    // console.log(sum, index)
                    return sum.data.filter((val2: any, index2: number) => {
                        if(val2.data instanceof Array && val2.name.name === val){
                            // console.log(val2)
                            return val2
                        }
                    })[0]
                    //将数组转换为userdir类
                    console.log(index)
                }, state.profile.userDir)
                // 将数组中唯一的元素拿出来
                // console.log(state.profile.currentDir)
                state.profile.currentDir.hit = true
                state.profile.currentPath = data.join('/')
                //除根路径外的目录刷新
            }
        },
        dirChangeDir(state: any, data: any){
            //左边栏文件夹目录的路径跳转
            state.profile.currentDir.hit = false
            state.profile.currentDir = data.data
            state.profile.currentPath = data.path
            state.profile.currentDir.hit = true
        }
    },
    actions: {
        readDirAll(ctx: any, data: any) {
            su('/readDirAll' ).
            then((data2) => {
                ctx.commit('getDirAll',data2.data)
            })
        }
    }
}