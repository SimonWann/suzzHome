import axios from 'axios'
const su = axios.create({
    baseURL: 'http://192.168.3.19:3333/',
    timeout: 10000000,
    method: 'get',
    headers: {'X-Requested-With': 'XMLHttpRequest'},
})
// const soNet = new WebSocket('ws://192.168.3.19:3334')
// soNet.onopen = function(){
//   this.send('hello, websockt')
//   this.onmessage = function(event) {
//     console.log(event)
//   }
// }

export default {
  state: () => ({
    isShow: true,
    currentMenu: -1,
    fileBlob: [],
    //已下载二进制数组
    finished: false,
    //下载完成状态
    isDowning: false,
    //下载状态
    downloadingFile: {},
    //正在下载的任务
    downloadingTask: [],
    downloadedTask: [],
    play: {
      url: 'http://192.168.3.19:3333/大地惊雷.True.Grit.2010.BD-1080p.X264.AAC-99Mp4.mp4/index.m3u8',
      isReady: false
    },
    isCoded: true,
    isDelete: false
  }),
  mutations: {
    toggleMenu(state: any) {
      state.isShow = !state.isShow
    },
    closeMenu(state: any) {
      state.isShow = false
    },
    curMenu(state: any, data: string) {
      state.currentMenu = data
    },
    splitFile(state: any, data: any) {
      if(data.data.size === 0) {
        state.finished = true
        state.isDowning = false
        state.downloadedTask.push(new Blob(state.fileBlob))
      }
      state.isDowning = true
      // console.log(data)
      state.downloadingTask[0].file.curSize = state.fileBlob.length * 65536
      state.fileBlob.push(data.data)
    },
    //将流文件组合到一次,并添加到内存队列
    pushTask(state: any, data: any) {
      state.downloadingTask.push(data)
      if(state.downloadingTask.length === 1){
        state.downloadingFile = state.downloadingTask[0]
        //初始化当前任务的显示详情
      }
    },
    playVideo(state: any, data: any) {
      if(data === 403){
        state.isCoded = false
      }
      state.play.url = `http://192.168.3.19:3333/${data.file.name.name}/index.m3u8`
      console.log(data)
      state.play.isReady = true
    },
    //添加下载任务
    clearDone(state: any, data: any) {
      state.finished = false
      state.downloadingTask.shift()
      state.downloadedTask.shift()
      state.fileBlob = []
      //清空二进制数组
      state.downloadingFile = state.downloadingTask[0]
      //更新当前任务的显示详情
    },
    closeVide(state: any, data: any) {
      state.play.isReady = false
    },
    //关闭视频
    notCoded(state: any, data: any) {
      state.isCoded = false
      setTimeout(() => {
        state.isCoded = true
      }, 1500);
    },
    // 关闭警告
    delete(state: any, data: any) {
      if(data){
        state.isDelete = true
        setTimeout(() => {
          state.isDelete = false
        }, 1500);
      }
    }
  },
  actions: {
    addDownload(ctx: any, data: any) {
      // console.log(data)
      data.curSize = 0
      const senddata = {
        path: ctx.rootState.init.profile.currentPath,
        file: data
      }
      ctx.commit('pushTask', senddata)
      
    },
    download(ctx: any, data: any) {
      const soNet = new WebSocket('ws://192.168.3.19:3334/download')
      soNet.onopen = function(){
        this.send(encodeURIComponent(JSON.stringify(ctx.state.downloadingTask[0])))
        console.log(ctx.state.downloadingTask[0])
        this.onmessage = function(event) {
          ctx.commit('splitFile', event)
          if(ctx.state.finished){
            this.close()
          }
        }
      }
      //请求ws服务并下载,一次只能下载一个文件
    },
    playVideo(ctx: any, data: any) {
      data.curSize = 0
      const senddata = {
        path: ctx.rootState.init.profile.currentPath,
        file: data
      }
      su('/playVideo', {
        method: 'post',
        data: senddata
      }).then(data => {
        ctx.commit('playVideo', data.data)
      }).catch(err => {
        ctx.commit('notCoded')
      })
    },
    delete(ctx: any, data: any) {
      data.curSize = 0
      const senddata = {
        path: ctx.rootState.init.profile.currentPath,
        file: data
      }
      su('/delete', {
        method: 'post',
        data: senddata
      }).then(data => {
        ctx.commit('delete', data.data)
        ctx.dispatch('readDirAll')
      })
    },
    rename(ctx: any, data: any) {
      data.curSize = 0
      const senddata = {
        path: ctx.rootState.init.profile.currentPath,
        file: data
      }
      su('/rename', {
        method: 'post',
        data: senddata
      }).then(data => {
        ctx.commit('rename', data.data)
        ctx.dispatch('readDirAll')
      })
    }
  }
}