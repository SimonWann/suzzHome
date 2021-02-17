<template>
  <div id="playerr" v-if="isShow">
    该视频还未编码,无法播放 :(
  </div>
  <div id="remove" v-if="isShow2" >
    删除成功
  </div>
  <div id="download" v-if="isShow3">
    正在下载，请点击左下角闪电图标.
  </div>
  <div id="renameSuc" v-if="isShow4">
    重命名成功！
  </div>
  <div id="copy" v-if="isShow5">
    复制失败
  </div>
  <div id="mkdirAlert" v-if="isShow6">
    文件夹创建成功！
  </div>
</template>

<script lang="ts">
import {reactive, ref, defineComponent, watch} from "vue"
import {useStore} from "vuex"
export default defineComponent({
  name: 'suAlert',
  setup() {
    const store = useStore()
    let isShow1 = ref(false)
    let isShow2 = ref(false)
    let isShow3 = ref(false)
    let isShow4 = ref(false)
    let isShow5 = ref(false)
    let isShow6 = ref(false)
    watch(() => store.state.moreMenu.isCoded, (val, p) => {
      if(!val) {
        isShow1.value = false
      } else {
        isShow1.value = true
      }
    })
    watch(() => store.state.moreMenu.isDelete, (val, p) => {
      if(val) {
        isShow2.value = true
      } else {
        isShow2.value = false
      }
    })
    watch(() => store.state.moreMenu.isDowning, (val, p) => {
      if(val) {
        isShow3.value = true
        setTimeout(() => {
          isShow3.value = false
        }, 2500);
        //下载提示的自动关闭
      }
    })
    watch(() => store.state.moreMenu.fileRename.isOk, (val, p) => {
      if(val) {
        isShow4.value = true
      } else {
        isShow4.value = false
      }
    })
    watch(() => store.state.moreMenu.isCopied, (val, p) => {
      if(val) {
        isShow5.value = false
      } else {
        isShow5.value = true
      }
    })
    watch(() => store.state.itemSet.isMdDir, (val, p) => {
      console.log(val)
      if(val) {
        isShow6.value = true
      } else {
        isShow6.value = false
      }
    })
    return {
      isShow1,
      isShow2,
      isShow3,
      isShow4,
      isShow5,
      isShow6
    }
  }
})
</script>

<style lang="less" scoped>
@strawberry5: #c6262e;
@strawberry3: #ed5353;
@strawberry1: #ff8c82;
@lime1: #d1ff82;
@lime3: #9bdb4d;
@lime5: #68b723;
@banana1: #fff394;
@banana3: #ffe16b;
@banana5: #f9c440;
@banana7: #d48e15;
@keyframes in {
  from{
    opacity: 0%;
    top: 40%;
  }
  to{
    opacity: 100%;
    top: 50%;
  }
}
  div{
    animation: in 0.5s ease-out forwards;
    padding: 0px 100px;
    height: 60px;
    border-radius: 3px;
    position: absolute;
    z-index: 4;
    left: 50%;
    top: 6%;
    transform: translate(-50%);
    line-height: 60px;
    text-align: center;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1px;
    #playerr{
      border: 1px solid @strawberry3;
      color: @strawberry5;
      background: @strawberry1;
      box-shadow: 0px 0px 5px @strawberry3;
    }
    #remove{
      border: 1px solid @lime3;
      color: @lime5;
      background: @lime1;
      box-shadow: 0px 0px 5px @lime3;
    }
    #download{
      border: 1px solid @banana3;
      color: @banana7;
      background: @banana1;
      box-shadow: 0px 0px 5px @banana3;
    }
    #renameErr{
      border: 1px solid @lime3;
      color: @lime5;
      background: @lime1;
      box-shadow: 0px 0px 5px @lime3;
    }
    #renameSuc{
      border: 1px solid @lime3;
      color: @lime5;
      background: @lime1;
      box-shadow: 0px 0px 5px @lime3;
    }
    #copy{
      border: 1px solid @strawberry3;
      color: @strawberry5;
      background: @strawberry1;
      box-shadow: 0px 0px 5px @strawberry3;
    }
    #mkdirAlert{
      border: 1px solid @lime3;
      color: @lime5;
      background: @lime1;
      box-shadow: 0px 0px 5px @lime3;
    }
  }

</style>
