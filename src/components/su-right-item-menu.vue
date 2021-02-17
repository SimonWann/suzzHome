<template>
  <div ref="rightMenu" id="itemRightMenu" v-show="isShow">
    <li v-for="(val, index) in items" @click="submit(val)">{{val}}</li>
  </div>
</template>

<script lang="ts">
import {reactive, ref, defineComponent, watch, onMounted} from "vue"
import { useStore } from 'vuex'
export default defineComponent({
  name: 'suRightItemMenu',
  props: ['isShow', 'where'],
  setup(props: any) {
    const store = useStore()
    const items = reactive(['粘贴'])
    const rightMenu = ref()
    function submit(val) {
      if(val === '粘贴') {
        store.dispatch('paste')
      }
    }
    onMounted(() => {
      watch(() => props.isShow, (val, p) => {
        if(val) {
          rightMenu.value.style.left = `${props.where.x}px`
          rightMenu.value.style.top = `${props.where.y}px`
        }
      })
    })
    return {
      items,
      rightMenu,
      submit
    }
  }
})
</script>

<style lang="less" scoped>
@silver9: #555761;
@silver7: #7e8087;
@silver1: #fafafa;
@silver3: #d4d4d4;
@silver5: #abacae;
  #itemRightMenu{
    padding: 5px 10px;
    height: 20px;
    width: 50px;
    border: 1px solid @silver9;
    list-style: none;
    background: @silver7;
    border-radius: 3px;
    color: @silver1;
    font: 400 12px sans-serif;
    position: fixed;
    z-index: 4;
    cursor: default;
    li{
      border-radius: 3px;
      padding: 2px 8px 3px 8px;
      &:hover{
        background: @silver1;
        color: @silver7;
      }
    }
  }
</style>
