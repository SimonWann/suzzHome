<template>
  <div id="upAside" >
      <router-link active-class="hit" to="/a"><ph-leaf :size="20" :color="color" weight="bold" /></router-link>
     <router-link active-class="hit" to="/"><ph-cloud :size="20" :color="color" weight="bold" /></router-link>
      <router-link active-class="hit" to="/b"><ph-clock :size="20" :color="color" weight="bold" /></router-link>
      <router-link active-class="hit" to="/c"><ph-share-network :size="20" :color="color" weight="bold" /></router-link>
      <router-link active-class="hit" to="/d"><ph-users :size="20" :color="color" weight="bold" /></router-link>
      <router-link active-class="hit" to="/e"><ph-chat-dots :size="20" :color="color" weight="bold" /></router-link>
  </div>
</template>

<script lang="ts">
import {reactive, ref, defineComponent} from "vue"
import asideClick from './asideClick.vue'

export default defineComponent({
    components: {
        
    },
  setup() {
      const color = ref('#d4d4d4')
      const isHit = ref('false')
      return {
          color,
          isHit
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
  #upAside{
      height: 40%;
      padding: 10px 0px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
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
