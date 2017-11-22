<template>
  <div class="hello">
    <div>
      <scroll :finishFlag="finishFlag" @refreshData="refreshData" @loadmoreData="loadmoreData" ref="scroll">
        <ul slot="content">
          <li v-for="item in list">{{item}}</li>
        </ul>
      </scroll>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import  scroll  from './scroll'
import { getUser } from "@/util/axios"
export default {
  name: 'HelloWorld',
  data () {
    return {
      list:['Core Docs','Core Docs'],
      time:0,
      finishFlag:false//是否已经获取全部数据
    }
  },
  components:{
    scroll
  },
  methods:{
    //刷新触发的函数，重新获取数据
    async refreshData () {
      var a = await getUser()
      this.list = ['Core Docs','Core Docs','Core Docs','Core Docs','Core Docs','Core Docs','Core Docs','Core Docs']
      this.$refs.scroll.returnRefresh()//必须，触发srcoll获取数据完毕
    },
    //向下滚动，获取更多数据
    async loadmoreData () {
      if(this.time>=3){
        this.finishFlag = true//告诉组件是不是已经获取全部数据
      }
      var a =  await getUser()
      var newArr = ['99','88','77','66','99','88','77','66']
      this.list = this.list.concat(newArr)
      this.$refs.scroll.returnLoadmore()//必须，触发srcoll获取数据完毕
      this.time++
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.tag{
  /*position: relative;*/
  /*top:-20px;*/
  padding: 10px 0;
  /*box-sizing: border-box;*/
}
.div{
  height: 100px;
  overflow: hidden;
  border:1px solid red;
}
/*li{
  height: 103px;
}*/
ul {
  list-style-type: none;
  padding: 0;
}

li {
  /*height: 200px;*/
}

a {
  color: #42b983;
}
</style>
