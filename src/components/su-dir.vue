<template>
  <div id="dir">
      <div id='dirTitle'>
          <div id="name">{{name}}</div>
          <ph-list-dashes :size="16" weight="bold" color="#7e8087" />
      </div>
        <ul>
            <li v-for="(item, index) in dir" > 
                <dir-item :dirPath="''" :depth="1" :dirList="item" ></dir-item>
            </li>
        </ul>
  </div>
</template>

<script lang="ts">
import {reactive, ref, defineComponent, computed} from "vue"
import { useStore } from 'vuex'
import dirItem from './su-dir-item.vue'

export default defineComponent({
  name: 'suDir',
  components: {
    dirItem
  },
  setup() {
      const name = ref('我的文件夹')
      const ycolor = ref('#f9c440')
      const scolor = ref('#fafafa')
      const store = useStore()
      let dir = reactive({})
      dir = computed(() => {
            // console.log(store.state.init.profile.userDir)
        return store.state.init.profile.userDir.data?.filter((val: any, index: number) =>{
            return val.data instanceof Array
        })
      })

    const hitColor = computed((index: number) => {
        // console.log(index)
        return 
    })
    let childDirPadding = ref(8)
      return{
          name,
          dir,
          childDirPadding
      }
  }
})
</script>

<style lang="less">
    @silver1: #fafafa;
    @silver3: #d4d4d4;
    @silver5: #abacae;
    @silver7: #7e8087;
    @silver9: #555761;
    @banana5: #f9c440;
    @banana7: #d48e15;
    @straberry: #ed5353;
    @keyframes opacity {
        from{
            opacity: 50%;
        }
        to{
            opacity: 100%;
        }
    }
    #dir{
        overflow: hidden;
        border-right: 1px solid #d4d4d4;
        background: @silver1;
        width: calc(100% - 1px);
        height: 100%;
        color: @silver7;
        font-family: sans-serif;
        font-size: 14px;
        // border: 1px #000 solid;
        #dirTitle{
            padding: 10px;
            #name{
                font-size: 16px;
                
            }
            svg{
                cursor: pointer;
                opacity: 50%;
                &:hover{
                    animation: opacity 0.7s forwards;
                }
            }
            display: flex;
            justify-content: space-between;
            flex-wrap: nowrap;
        }
        ul{
            padding: 0px;
            margin: 0px;
            list-style: none;
            li{
                display: block;
            }
        }
    }
</style>
