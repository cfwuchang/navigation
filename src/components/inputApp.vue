<template>
  <div class="inputApp">
    <div v-if="active" style="white-space: nowrap;overflow: auto;" >
    <el-tag type="info">常用：</el-tag>
      <el-tag
        :key="index"
        v-for="(tag,index) in dynamicTags"
        :disable-transitions="false"
        :type="tag.type"
        @close="handleClose(tag)"
        @click="activehandle(index)"
      >
        <img :src="tag.url_icon" alt="icon" class="img">
        {{ tag.name }}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        :key="dynamicTags.name"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
    <el-tag type="success" @click="handletag">修改</el-tag>

    </div>
    <div v-if="!active">
    <el-tag type="info">常用：</el-tag>
      <el-tag
        :key="tag.name"
        closable
        :type="tag.type"
        v-for="tag in dynamicTags"
        :disable-transitions="false"
        @close="handleClose(tag.name)"
        
      >
        {{ tag.name }}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput"
        >暂时未上线</el-button
      >
    <el-tag type="danger" @click="handletag">保存</el-tag>

    </div>

    <div style="margin-top: 15px">
      <el-input placeholder="搜索一下" @input="inputHandler" @keyup.enter.native="clickHandler" v-model="value" class="input-with-select">
        <el-select v-model="select.name" slot="prepend">
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="clickHandler"></el-button>
      </el-input>
      <el-table :data="list" style="width: 100%" size=mini  v-if="list" @cell-mouse-enter='cellMouseEnter' @cell-click='clickHandler'>
        <el-table-column prop="q" v-if="list[0].q">
      </el-table-column>
      <el-table-column prop="word" v-if="list[0].word">
      </el-table-column>
      <el-table-column prop="0" v-if="list[0][0]">
      </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "inputApp",
  props: {
    msg: String,
  },
  data: () => ({
    value: "",
    dynamicTags: [{ name: '百度', type: 'warning',list_url:'https://www.baidu.com/s?f4s=1',url:'https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&req=2&csor=2&pwd=3',url_icon:'https://www.baidu.com/favicon.ico'},
          { name: '谷歌', type: '',list_url:'https://www.google.com/search?client=firefox-b-d&',url:'',url_icon:'' },
          { name: '夸克', type: '',list_url:'https://quark.sm.cn/s?',url:'',url_icon:'https://quark.sm.cn/favicon.ico' },
          { name: '好搜', type: '',list_url:'https://www.so.com/s?ie=utf-8&fr=none&src=360sou_newhome&ssid=&',url:'https://sug.so.360.cn/suggest?encodein=utf-8&encodeout=utf-8&format=json',url_icon:'https://www.so.com/favicon.ico'},
          { name:'维基百科',type:'',list_url:'',url:'https://zh.wikipedia.org/wiki/Special:%E6%90%9C%E7%B4%A2?search=',url_icon:''},
          { name:'必应',type:'',list_url:'https://www.bing.com/search?form=MOZLBR&pc=MOZI',url:'https://api.bing.com/qsonhs.aspx?type=cb',url_icon:'https://www.bing.com/favicon.ico'},
          { name:'淘宝',type:'',list_url:'https://market.m.taobao.com/app/main-search/h5search-webapp/home.html?g_channelSrp=baiyibutie&g_bizFilter=baiyibutie&g_closeP4P=true&g_closeModues=sc,tab,bizfilter&g_csearchdoor_spm=a21677.13935417&g_historyOn=true&pageType=3&q=',url:'https://suggest.taobao.com/sug?code=utf-8',url_icon:'https://www.taobao.com/favicon.ico'}
        
          
          ],
    inputVisible: false,
    inputValue: "",
    active: true,
    select:{},
    list:'',
  }),
  beforeMount(){
    this.select=this.dynamicTags[0]
  },

  methods: {
    // 修改状态
    handletag() {
      this.active = !this.active;
    },
    // 选中
    activehandle(i){
      for(var j=0;j<this.dynamicTags.length;j++){
        this.dynamicTags[j].type=''
      }
      this.dynamicTags[i].type='warning'
      this.select=this.dynamicTags[i]
      this.list=''
      
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    // input 事件
    inputHandler:function(e){
      console.log(this.select);
      if (!e){
        this.list=[]
      }
        var url=this.select.url
        this.$jsonp(url,{
        wd:e,
        q:e,
        word:e,
        
        type: 'cd'
        }).then((r)=>{
          console.log(r);
          if(this.select.name=='百度'){
            this.list=r.g
          }else if(this.select.name=='谷歌'){
            this.list=r.g
          }else if(this.select.name=='夸克'){
            this.list=r.g
          }else if(this.select.name=='好搜'){
            this.list=r.result
          }
          else if(this.select.name=='维基百科'){
            this.list=r.result
          }else if(this.select.name=='必应'){
            this.list=r.result
          }
          else if(this.select.name=='淘宝'){
            this.list=r.result
          }
        })
    },
    // click 事件
    clickHandler:function(){
      console.log(this);
      var list_url=this.select.list_url
      if (sessionStorage.getItem('historyList')){
        var aa=JSON.parse(sessionStorage.getItem('historyList'))
    }
    var bb={
          icom: this.select.url_icon,
          url: list_url+'&wd='+this.value+'&q='+this.value,
          name: this.value,
      }
      var cc=[]
      cc.push(aa)
      cc.push(bb)
      sessionStorage.setItem('historyList',JSON.stringify(cc));
      window.open(list_url+'&wd='+this.value+'&q='+this.value);
        

    },
    cellMouseEnter(value) {
      if(value.q){
        this.value=value.q
      }else if(value.word){
        this.value=value.word
      }else if(value[0]){
        this.value=value[0]
      }
      },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.inputApp {
  margin: auto;
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .el-select {
    width: 100px;
  }
  .el-button {
    background: #5066ce;
    width: 80px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .img{
    width: 14px;
    margin-right: 5px;
    vertical-align:middle;
    
  }
}
</style>
