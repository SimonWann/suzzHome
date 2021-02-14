<template>
  <div id="downAside">
      <router-link active-class="hit" to="/a"><ph-trash :size="20" :color="color" weight="bold" /></router-link>
      <router-link active-class="hit" to="/a"><ph-gear :size="20" :color="color" weight="bold" /></router-link>
      <a :class="{hit: hit}" @click.prevent="openTran"><ph-lightning :size="20" :color="color" weight="bold" /></a>
  </div>
</template>

<script lang="ts">
import {reactive, ref, defineComponent, computed} from "vue"
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
      const color = ref('#d4d4d4')
      let store = useStore()
      function openTran(){
          store.commit('tranOpen')
      }
      const hit = computed(() => {
          return store.state.uiSetting.isTranClose
      })
      return {
          color,
          store,
          openTran,
          hit
      }
  }
})
</script>

<style lang="less" scoped>
@keyframes bck {
        from{
            background: #222222;
        }
        to{
            background: #110;
        }
    }
  #downAside{
      height: 18%;
      padding: 10px 0px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      a{
            padding: 3px 9px 3px 10px;
            &:hover{
            animation: bck 0.5s forwards;
            }
        }
        .hit{
            background: #110;
            border-left: 2px solid #d4d4d4 ;
            padding-left: 8px;
        }
  }
</style>
