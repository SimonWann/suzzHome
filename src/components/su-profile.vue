<template>
  <div id="profile">
      <div id="notification">
          <ph-bell-simple :size="20" weight="bold" color="#555761" />
      </div>
      <div id="info">{{name}}</div>
  </div>
</template>

<script lang="ts">
import {reactive, ref, defineComponent} from "vue"
export default defineComponent({
  setup() {
      let name = ref('SimonWann')
      return{
          name
      }
  }
})
</script>

<style lang="less" scoped>
@silver7: #7e8087;
@silver9: #555761;
    #profile{
        border: 1px solid #d4d4d4;
        height: 36px;
        background: #fafafa;
        display: flex;
        flex-direction: row-reverse; 
        align-items: center;
        padding-right: 10px;
        color: @silver9;
        font-family: sans-serif;
        div{
            padding: 0px 5px;
            &:first-child{
                padding-top: 2px;
            }
        }
        overflow: hidden;
    }
</style>
