import axios from 'axios'
const info = require('./ip.config.ts')


const su = axios.create({
    baseURL: `http://${info.address}:${info.port}/`,
    timeout: 1000,
    method: 'get',
    headers: {'X-Requested-With': 'XMLHttpRequest'},
})
export default {
  state: () => ({
    isMdDir: false,
    uploadQueue: [],
    currentTask: {
      isDone: false,
      isExit: false
    }
  }),
  mutations: {
    mkdir(state: any, data: any) {
      if(data) {
        // console.log(data, 1)
        state.isMdDir = true
        setTimeout(() => {
          state.isMdDir = false
        }, 1500);
      }
    },
    upload(state: any, data: any) {
      let tmp: Uint8Array[] = []
      let size = 154112
      for(let i=0;i<=data.files.byteLength;i=i+size) {
        tmp.push(data.files.slice(i, i+size))
      }
      //切割二进制数据为1mb片段
      // console.log('二进制数据:',data.files.byteLength)
      data.files = tmp
      state.uploadQueue.push(data)
      // console.log(state.uploadQueue)
    },
    done(state: any, data: any) {
      state.currentTask.isDone = true
    },
    undone(state: any, data: any) {
      state.currentTask.isDone = false
    },
    startLoad(state: any, data: any) {
      state.currentTask.isExit = true
    },
    endLoad(state: any, data: any) {
      state.currentTask.isExit = false
    }
  },
  actions: {
    mkdir(ctx: any, data: any) {
      su('/mkdir', {
        method: 'post',
        data
      }).then(data => {
        ctx.commit('mkdir', data.data)
        ctx.dispatch('readDirAll')
      })
    },
    upload(ctx: any, data: any) {
      const soNet = new WebSocket(`ws://${info.address}:${info.soPort}/uploadInfo`)
      let files = data.data
      data = {
        name: data.file.name,
        size: data.file.size,
        type: data.file.type,
        lastModified: data.file.lastModified,
        lastModifiedData: data.file.lastModifiedData,
        currentPath: data.currentPath
      }
      soNet.onopen = function(){
        this.send(encodeURIComponent(JSON.stringify(data)))
        // console.log(data)
        this.onmessage = function(event) {
          if(event.data == 1) {
            ctx.commit('upload', {files, fileInfo: data})
          }
        }
      }
    },
    uploadNow(ctx: any, data: any) {
      if(ctx.state.uploadQueue.length === 0) {
        ctx.commit('endLoad')
        return false
      }
      const soNet = new WebSocket(`ws://${info.address}:${info.soPort}/upload`)
      let file
      soNet.onopen = async function(){
        let cnt = 0
        file = ctx.state.uploadQueue.shift().files
        await this.send('1')
        ctx.commit('startLoad')
        ctx.commit('undone')
        // 1代表开始传输数据
        await file.forEach(async (val, index) => {
          await this.send(val)
          cnt++
          // console.log(cnt)
        })
        if(cnt >= file.length - 1) {
          console.log(file.length)
          soNet.send('3')
          // 3 让服务端知道文件已经发送完
        }
        this.onmessage = function(e) {
          if(e.data == 1 && ctx.state.uploadQueue.length > 0) {
            ctx.dispatch('uploadNow')
          } else if(e.data == 1){
            console.log('done')
            ctx.commit('done')
            ctx.dispatch('readDirAll')
          }
        }
      }
    }
  }
}