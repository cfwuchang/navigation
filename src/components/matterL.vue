<template>
  <div class="conten">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-menu
          default-active="1"
          class="ul"
          background-color="#eee"
          active-text-color="#ffd04b"
        >
          <el-menu-item
            :key="i"
            v-for="(tag, i) in listL"
            :index="(i + 1).toString()"
            @click="setActiveItem(i)"
          >
            <span slot="title">{{ tag.name }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <div class="cen">
          <el-carousel
          indicator-position='none'
            arrow="never"
            :autoplay="false"
            trigger="click"
            ref="carousel"
          >
            <el-carousel-item
              :key="index"
              v-for="(tag, index) in listL"
              name="index"
              :id="index"
            >
              <div v-if="!tag.action" @click="addHandler($event,index)" class="active">
                <img src="../assets/bianji.png" alt="编辑" />
              </div>
              <div v-if="tag.action" @click="addHandler($event,index)" class="active">
                <img src="../assets/baocun.png" alt="保存" />
              </div>
              <el-tabs v-model="editableTabsValue">
                <div>{{tag.name}}</div>
                <el-tab-pane
                  v-for="(item, i) in tag.editableTabs"
                  :key="i"
                  :label="item.title"
                  :name="item.name"
                  class="tab"
                >
                  <div v-for="(list, j) in item.content" :key="j" class="list">
                    <a :href="list.url">
                      <div class="divL">
                        <img :src="list.icom" alt="icon" referrerpolicy='no-referrer' />
                      </div>
                      <div class="divR">
                        <span>{{ list.name }}</span>
                      </div>
                    </a>
                    <div
                      v-if="tag.action"
                      class="remove"
                      @click="removeHandler(index, i, j)"
                    >
                      <img :src="require('../assets/shanchu.png')" alt="删除" />
                    </div>
                  </div>
                  <div v-if="tag.action" class="add">
                    <img
                      :src="require('../assets/zengjia.png')"
                      alt="增加"
                      @click="dialogFormVisible = true,postal=[index,i]"
                    />
                  </div>
                </el-tab-pane>
                
              </el-tabs>
            </el-carousel-item>
          </el-carousel>
          <el-dialog title="添加网站" :visible.sync="dialogFormVisible" width=600px>
            <el-form :model="form">
              <el-form-item label="网站名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="网站地址" :label-width="formLabelWidth">
                <el-input v-model="form.url" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addsHandler">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "middleL",
  props: {
    msg: String,
  },
  
  data() {
    return {
      editableTabsValue: "1",
      listL: [
        {
          name: "自定义",
      action: false,
          editableTabs: [
            {
              title: "我的常用",
              name: "1",
              content: [
                {
                  icom: "https://www.sina.com.cn/favicon.ico",
                  url: "https://www.sina.com.cn",
                  name: "新浪",
                },
                {
                  icom: "https://weibo.com/favicon.ico",
                  url: "https://weibo.com/",
                  name: "微博",
                },
                {
                  icom: "https://www.zhihu.com/favicon.ico",
                  url: "https://www.zhihu.com/explore",
                  name: "知乎",
                },
                {
                  icom: "https://www.taobao.com/favicon.ico",
                  url: "https://www.taobao.com/",
                  name: "淘宝",
                },
                {
                  icom: "https://www.bilibili.com/favicon.ico",
                  url: "https://www.bilibili.com/",
                  name: "bilibili"
                },
                {
                  icom: "https://www.acfun.cn/favicon.ico",
                  url: "https://www.acfun.cn/",
                  name: "acfin"
                },
                {
                  icom: "https://www.iqiyi.com/favicon.ico",
                  url: "https://www.iqiyi.com/",
                  name: "爱奇艺"
                },
                {
                  icom: "https://www.12306.cn/index/images/favicon.ico",
                  url: "https://www.12306.cn/index/",
                  name: "12306",
                },
                 {
                  icom: "https://you.163.com/favicon.ico",
                  url: "https://you.163.com/",
                  name: "严选",
                },
                {
                  icom: "https://xm.58.com/favicon.ico",
                  url: "https://xm.58.com/",
                  name: "58同城",
                },
                {
                  icom: "https://www.runoob.com/favicon.ico",
                  url: "https://www.runoob.com/",
                  name: "菜鸟教程",
                },
                {
                  icom: "https://juejin.cn/favicon.ico",
                  url: "https://juejin.cn/",
                  name: "掘金",
                },
                {
                  icom: "https://github.com/favicon.ico",
                  url: "https://github.com/",
                  name: "github",
                },
                {
                  icom: "https://www.infoq.com/favicon.ico",
                  url: "https://www.infoq.com/",
                  name: "infoq",
                },
                {
                  icom: "https://www.csdn.net/favicon.ico",
                  url: "https://www.csdn.net/",
                  name: "csdn",
                },
                {
                  icom: "https://cdn.segmentfault.com/r-6bca97bc/favicon.ico",
                  url: "https://segmentfault.com/",
                  name: "segmentfault",
                },
                {
                  icom: "https://toutiao.io/favicon.ico",
                  url: "https://toutiao.io/posts/hot/7",
                  name: "开发者头条",
                },
                {
                  icom: "http://www.chinaunix.net/www/static/images/li.png",
                  url: "http://www.chinaunix.net/",
                  name: "ChinaUnix",
                },
                {
                  icom: "http://www.itpub.net/favicon.ico",
                  url: "http://www.itpub.net/",
                  name: "ITPUB",
                },
                {
                  icom: "https://static2.cnodejs.org/public/images/cnode_icon_32.png",
                  url: "https://cnodejs.org/",
                  name: "CNode",
                },
               
              ],
            },
            {
              title: "我的记录",
              name: "2",
              content: []
            },
          ],
        },
        {
          name: "生活服务",
      action: false,

          editableTabs: [
            {
              title: "生活服务",
              name: "1",
              content:  [
                {
                  icom: "https://www.eastmoney.com/favicon.ico",
                  url: "https://www.eastmoney.com/",
                  name: "东方财富网",
                },
               {
                  icom: "https://xm.58.com/favicon.ico",
                  url: "https://xm.58.com/",
                  name: "58同城",
                },
                {
                  icom: "https://xm.fang.com/favicon.ico",
                  url: "https://xm.fang.com/",
                  name: "房天下",
                },
                {
                  icom: "https://www.autohome.com.cn/favicon.ico",
                  url: "https://www.autohome.com.cn/xiamen/",
                  name: "汽车之家",
                },
                {
                  icom: "https://www.pcauto.com.cn/favicon.ico",
                  url: "https://www.pcauto.com.cn/",
                  name: "天平洋汽车"
                },
                {
                  icom: "https://www.pcauto.com.cn/favicon.ico",
                  url: "https://www.pcauto.com.cn/",
                  name: "中国天气"
                },
                {
                  icom: "https://zhihu.com/favicon.ico",
                  url: "https://zhuanlan.zhihu.com/",
                  name: "知乎专栏"
                },
                {
                  icom: "https://ip138.com/favicon.ico",
                  url: "https://ip138.com/",
                  name: "ip查询网",
                },
                 {
                  icom: "https://www.cngold.org/favicon.ico",
                  url: "https://www.cngold.org/",
                  name: "金投网",
                },
                {
                  icom: "https://www.xiachufang.com/favicon.ico",
                  url: "https://www.xiachufang.com/",
                  name: "下厨房",
                },
                {
                  icom: "https://www.jia.com/favicon.ico",
                  url: "https://www.jia.com/",
                  name: "下厨房",
                },
                {
                  icom: "https://www.gucheng.com/favicon.ico",
                  url: "https://www.gucheng.com/",
                  name: "股城网",
                },
                {
                  icom: "http://www.pcbaby.com.cn/favicon.ico",
                  url: "http://www.pcbaby.com.cn/",
                  name: "亲子网",
                },
                {
                  icom: "https://finance.sina.com.cn/favicon.ico",
                  url: "https://finance.sina.com.cn/",
                  name: "新浪财经",
                },
                {
                  icom: "https://www.dpfile.com/app/pc-common/dp_favicon.a4af753914321c8e82e402e2b4be01d7.ico",
                  url: "https://www.dianping.com/",
                  name: "大众点评",
                },
                {
                  icom: "https://www.kuaidi100.com/favicon.ico",
                  url: "https://www.kuaidi100.com/",
                  name: "快递100",
                },
                {
                  icom: "https://detail.zol.com.cn/favicon.ico",
                  url: "https://detail.zol.com.cn/",
                  name: "中关村在线",
                },
                {
                  icom: "https://www.8684.cn/favicon.ico",
                  url: "https://www.8684.cn/",
                  name: "8684",
                },
                {
                  icom: "https://wannianli.tianqi.com/favicon.ico",
                  url: "https://wannianli.tianqi.com/",
                  name: "天气万年历",
                },
               
              ],
            },
            {
              title: "求职",
              name: "2",
              content: [
                {
                  icom: "https://www.tianyancha.com/favicon.ico",
                  url: "https://www.tianyancha.com/",
                  name: "天眼查",
                },
                {
                  icom: "https://www.yjbys.com/favicon.ico",
                  url: "https://www.yjbys.com/",
                  name: "应届生毕业网",
                },
                {
                  icom: "https://www.zhaopin.com/favicon.ico",
                  url: "https://www.zhaopin.com/",
                  name: "智联招聘",
                },
                {
                  icom: "https://www.jobui.com/favicon.ico",
                  url: "https://www.jobui.com/",
                  name: "职友网",
                },
                {
                  icom: "https://xm.ganji.com/favicon.ico",
                  url: "https://xm.ganji.com/zhaopin",
                  name: "赶集网",
                },
                {
                  icom: "https://xm.58.com/favicon.ico",
                  url: "https://58.com",
                  name: "58同城",
                },
                {
                  icom: "https://www.51job.com/favicon.ico",
                  url: "https://www.51job.com/",
                  name: "前程无忧",
                },
                {
                  icom: "https://www.zhipin.com/favicon.ico",
                  url: "https://www.zhipin.com/",
                  name: "Boss直招",
                },
                {
                  icom: "https://www.51job.com/favicon.ico",
                  url: "https://www.51job.com/",
                  name: "前程无忧",
                },
                {
                  icom: "https://www.chinahr.com/favicon.ico",
                  url: "https://www.chinahr.com/",
                  name: "新华英才",
                },
                {
                  icom: "https://www.lagou.com/favicon.ico",
                  url: "https://www.lagou.com/",
                  name: "拉勾网",
                },
                {
                  icom: "https://www.51test.net/favicon.ico",
                  url: "https://www.51test.net/",
                  name: "无忧考网",
                },
              ]
            },
          ],
        },
        {
          name: "动漫、影视",
      action: false,

          editableTabs: [

            {
               title: "动漫",
              name: "1",
              content:[
                {
                  icom: "http://www.pytsg.cn/statics/img/favicon.ico",
                  url: "http://www.pytsg.cn/",
                  name: "樱花动漫网",
                },
                {
                  icom: "https://www.37ws.com/favicon.ico",
                  url: "https://www.37ws.com/",
                  name: "风车动漫",
                },
                {
                  icom: "http://www.dongmanwang.com/favicon.ico",
                  url: "http://www.dongmanwang.com/",
                  name: "动漫网",
                },
                {
                  icom: "https://www.bilibili.com/favicon.ico",
                  url: "https://www.bilibili.com/",
                  name: "bilili",
                },
                {
                  icom: "https://www.acfun.cn/favicon.ico",
                  url: "https://www.acfun.cn/zhaopin",
                  name: "AcFun",
                },
                {
                  icom: "https://oss.piliacg.cn/wp-content/uploads/2021/12/cropped-%E7%94%BB%E6%9D%BF-1162-LOGO.png?x-oss-process=image/quality,q_7/resize,m_fill,w_32,h_32",
                  url: "https://piliacg.cn/",
                  name: "piliacg",
                },
                {
                  icom: "https://www.5dm.app/favicon.ico",
                  url: "https://www.5dm.app/",
                  name: "5dm.one",
                },
                {
                  icom: "	https://www.angdm.com/template/agedm2/image/favicon.ico",
                  url: "https://www.angdm.com/",
                  name: "ANG动漫",
                },
                {
                  icom: "http://www.dmdm2020.com/template/mytheme/statics/icon/icon1.png",
                  url: "https://www.dmdm2020.com",
                  name: "哆咪动漫",
                },
                {
                  icom: "http://www.acgnya.com/upload/site/20220731-1/a29e12227cbdc70d59386eba09a39342.png",
                  url: "http://www.acgnya.com",
                  name: "avgNya",
                },
                {
                  icom: "https://www.omofun.tv/upload/mxprocms/20220520-1/f3b5b6502888444c83f989e028ace944.png",
                  url: "https://www.omofun.tv",
                  name: "omoFun动漫",
                },
                {
                  icom: "http://www.995dm.com/favicon.ico",
                  url: "http://www.995dm.com",
                  name: "久久动漫",
                },
                {
                  icom: "http://www.zzzfun.com/favicon.ico",
                  url: "http://www.zzzfun.com",
                  name: "ZzzFun动漫",
                },
              {
                  icom: "https://tu.678dd.cn/favicon.ico",
                  url: "https://tu.678dd.cn",
                  name: "御宅图社",
                },
              {
                  icom: "",
                  url: "https://www.cycacg.com/",
                  name: "次元城动漫",
                },
                {
                  icom: "	https://www.17skr.com/template/jable/statics/icon/apple-touch-icon.png",
                  url: "https://www.17skr.com/",
                  name: "路漫漫在线动漫",
                },
                {
                  icom: "http://www.dmd85.com/favicon.ico",
                  url: "http://www.dmd85.com/",
                  name: "动漫岛",
                },
              ]
            },
            {
              title: "影视",
              name: "2",
              content: [
                 {
                  icom: "https://www.iqiyi.com/favicon.ico",
                  url: "https://www.iqiyi.com/",
                  name: "爱奇艺",
                },
                {
                  icom: "https://v.qq.com/favicon.ico",
                  url: "https://v.qq.com/",
                  name: "腾讯视频",
                },
                {
                  icom: "https://www.youku.com/favicon.ico",
                  url: "http://www.dongmanwang.com/",
                  name: "优酷",
                },
                {
                  icom: "https://www.mgtv.com/favicon.ico",
                  url: "https://www.mgtv.com",
                  name: "芒果TV",
                },
                {
                  icom: "https://movie.douban.com/favicon.ico",
                  url: "https://movie.douban.com/",
                  name: "豆瓣电影",
                },
                {
                  icom: "https://kh666.cc/mxtheme/images/favicon.png",
                  url: "https://kh666.cc/",
                  name: "好看影视",
                },
                {
                  icom: "https://tv.cctv.com/favicon.ico",
                  url: "https://tv.cctv.com",
                  name: "CCTV",
                },
                {
                  icom: "https://www.itv.com/hub/assets/img/favicon.ico",
                  url: "https://www.itv.com/",
                  name: "iTV",
                },
                {
                  icom: "https://www.meijutt.net/favicon.ico",
                  url: "https://www.meijutt.net/",
                  name: "美剧天堂",
                },
                {
                  icom: "https://www.mgtv.com/favicon.ico",
                  url: "http://www.bbzmj.com/",
                  name: "美剧网",
                },
                {
                  icom: "https://51mjw.com/packs/images/logo_icon.png",
                  url: "https://51mjw.com/",
                  name: "51美剧网",
                },
                {
                  icom: "http://www.jiashiyuan.net/Public/js/p.png",
                  url: "http://www.jiashiyuan.net/",
                  name: "韩剧TV",
                },
                {
                  icom: "https://www.aimeijuapp.com/static/favicon.ico",
                  url: "https://www.aimeijuapp.com/",
                  name: "爱美剧app",
                },
              {
                  icom: "https://tu.678dd.cn/favicon.ico",
                  url: "https://tu.678dd.cn",
                  name: "御宅图社",
                },
              {
                  icom: "https://www.cycacg.com/mxtheme/images/load.gif",
                  url: "https://www.cycacg.com/",
                  name: "次元城动漫",
                },
                {
                  icom: "	https://www.17skr.com/template/jable/statics/icon/apple-touch-icon.png",
                  url: "https://www.17skr.com/",
                  name: "路漫漫在线动漫",
                },
                {
                  icom: "http://www.dmd85.com/favicon.ico",
                  url: "http://www.dmd85.com/",
                  name: "动漫岛",
                },
              ]
            },
          ],
        },
        {
          name: "游戏、直播",
      action: false,

          editableTabs: [
            {
              title: "游戏1、",
              name: "1",
              content: [
                {
                  icom: "http://www.baidu.com/favicon.ico",
                  url: "http://wan.baidu.com/home?idfrom=4084/",
                  name: "百度游戏",
                },
                {
                  icom: "http://baiduzm.37.com/favicon.ico",
                  url: "http://baiduzm.37.com/?uid=3339811",
                  name: "37网游",
                },
                {
                  icom: "https://4366yy.381pk.com/favicon.ico",
                  url: "https://4366yy.381pk.com/1251/",
                  name: "9377页游",
                },
                {
                  icom: "http://www.7k7k.com/favicon.ico",
                  url: "http://www.7k7k.com",
                  name: "7K7K小游戏",
                },
                {
                  icom: "http://www.4399.com/favicon.ico",
                  url: "http://www.4399.com/",
                  name: "51游戏",
                },
                {
                  icom: "https://oss.piliacg.cn/wp-content/uploads/2021/12/cropped-%E7%94%BB%E6%9D%BF-1162-LOGO.png?x-oss-process=image/quality,q_7/resize,m_fill,w_32,h_32",
                  url: "https://piliacg.cn/",
                  name: "4399游戏",
                },
                
              ]
            },
            {
              title: "直播",
              name: "2",
              content: [
                {
                  icom: "https://www.douyu.com/favicon.ico",
                  url: "https://www.douyu.com",
                  name: "斗鱼直播",
                },{
                  icom: "https://www.huya.com/favicon.ico",
                  url: "https://www.huya.com",
                  name: "虎牙直播",
                },{
                  icom: "https://live.bilibili.com/favicon.ico",
                  url: "https://live.bilibili.com",
                  name: "哔哩直播",
                },{
                  icom: "https://douyin.com/favicon.ico",
                  url: "https://live.douyin.com",
                  name: "抖音直播",
                },{
                  icom: "https://kuaishou.com/favicon.ico",
                  url: "https://live.kuaishou.com",
                  name: "快手直播",
                },{
                  icom: "https://www.zhanqi.tv/favicon.ico",
                  url: "https://www.zhanqi.tv",
                  name: "战旗直播",
                },{
                  icom: "https://live.qq.com/favicon.ico",
                  url: "https://live.qq.com",
                  name: "企鹅直播",
                },
                {
                  icom: "https://www.longzhu.com/favicon.ico",
                  url: "https://www.longzhu.com",
                  name: "龙珠直播",
                },
                {
                  icom: "https://www.yy.com/favicon.ico",
                  url: "https://www.yy.com",
                  name: "YY直播",
                },
                {
                  icom: "https://www.zhibo.tv/favicon.ico",
                  url: "https://www.zhibo.tv",
                  name: "中国体育直播",
                },
                {
                  icom: "http://yangshizhibo.com/%79%73%7a%62/%69%6d%67/%66%6f%6f%74%5f%34%5f%32%2e%70%6e%67",
                  url: "http://www.yangshizhibo.com",
                  name: "易视电视直播",
                },
              ]
            },
          ],
        },
        {
          name: "音乐、图片",
      action: false,

          editableTabs: [
            {
              title: "音乐",
              name: "1",
              content: [
                {
                  icom: "https://y.qq.com/favicon.ico",
                  url: "https://y.qq.com",
                  name: "QQ音乐",
                },{
                  icom: "https://www.kugou.com/favicon.ico",
                  url: "https://www.kugou.com",
                  name: "酷狗音乐",
                },{
                  icom: "https://s1.music.126.net/style/favicon.ico?v20180823=",
                  url: "https://music.163.com",
                  name: "网易云音乐",
                },{
                  icom: "http://www.kuwo.cn/favicon.ico",
                  url: "http://www.kuwo.cn",
                  name: "酷我音乐",
                },{
                  icom: "https://music.91q.com/favicon.ico",
                  url: "https://music.91q.com",
                  name: "千千音乐",
                },{
                  icom: "https://tools.liumingye.cn/favicon.ico",
                  url: "http://tools.liumingye.cn/music/?page=searchPage",
                  name: "MYFREEMP3",
                },{
                  icom: "https://thewind.xyz/favicon.ico",
                  url: "https://thewind.xyz",
                  name: "无名音乐",
                },
                {
                  icom: "https://music.y444.cn/favicon.ico",
                  url: "https://music.y444.cn/#",
                  name: "下歌吧",
                },
                {
                  icom: "https://www.musicenc.com/favicon.ico",
                  url: "https://www.musicenc.com",
                  name: "MusicEnc",
                },
                {
                  icom: "http://www.shoujiduoduo.com/favicon.ico",
                  url: "http://www.shoujiduoduo.com",
                  name: "铃声多多",
                },
                {
                  icom: "https://www.9ku.com/favicon.ico",
                  url: "https://www.9ku.com",
                  name: "九酷音乐",
                },{
                  icom: "https://music.douban.com/favicon.ico",
                  url: "https://music.douban.com",
                  name: "豆瓣音乐",
                },{
                  icom: "https://music.migu.cn/favicon.ico",
                  url: "https://music.migu.cn",
                  name: "咪咕音乐",
                },{
                  icom: "https://www.hifini.com/favicon.ico",
                  url: "https://www.hifini.com",
                  name: "HiFiNi音乐分享地",
                },
              ]
            },
            {
              title: "图片",
              name: "2",
              content:
              [
                {
                  icom: "https://wallhaven.cc/favicon.ico",
                  url: "https://wallhaven.cc",
                  name: "Wallhaven",
                },{
                  icom: "https://desk.zol.com.cn/favicon.ico",
                  url: "https://desk.zol.com.cn",
                  name: "中关村壁纸",
                },{
                  icom: "https://image.baidu.com/favicon.ico",
                  url: "https://image.baidu.com",
                  name: "百度图片",
                },{
                  icom: "https://bz.zzzmh.cn/favicon.ico",
                  url: "https://bz.zzzmh.cn",
                  name: "极简壁纸",
                },{
                  icom: "http://www.netbian.com/favicon.ico",
                  url: "http://www.netbian.com",
                  name: "彼岸桌面",
                },{
                  icom: "https://wallpaperscraft.com/public/img/general/favicon.ico?v=5a6c65de",
                  url: "https://wallpaperscraft.com",
                  name: "围巾壁纸",
                },{
                  icom: "http://wallpaperswide.com/favicon.ico",
                  url: "http://wallpaperswide.com",
                  name: "宽壁纸",
                },
                {
                  icom: "https://www.enterdesk.com/favicon.ico",
                  url: "https://www.enterdesk.com",
                  name: "回车桌面",
                },
                {
                  icom: "https://wall.alphacoders.com/favicon.ico",
                  url: "https://wall.alphacoders.com/?lang=Chinese",
                  name: "Abyss壁纸",
                },
                {
                  icom: "https://www.iconfont.cn/favicon.ico",
                  url: "https://www.iconfont.cn/",
                  name: "iconfont",
                },
                {
                  icom: "https://www.pexels.com/assets/static/images/meta/favicon.ico",
                  url: "https://www.pexels.com/zh-cn/",
                  name: "Pexels",
                },{
                  icom: "https://www.photock.asia/favicon.ico",
                  url: "https://www.photock.asia/",
                  name: "Photock",
                },{
                  icom: "https://pngimg.com/favicon.ico",
                  url: "https://pngimg.com/",
                  name: "Pixabay",
                },{
                  icom: "https://www.hippopx.com/public/css/favicon.ico",
                  url: "https://www.hippopx.com/zh",
                  name: "Hippopx",
                },{
                 
                  url: "https://www.chamberofcommerce.org/findaphoto/",
                  name: "FindA.Photo",
                },{
                  icom: "https://unsplash.com/favicon.ico",
                  url: "https://unsplash.com/",
                  name: "Unsplash",
                },
              ]
            },
          ],
        },
        {
          name: "软件、资源",
      action: false,

          editableTabs: [
            {
              title: "软件",
              name: "1",
              content: [
                {
                  icom: "https://www.onlinedown.net/favicon.ico",
                  url: "https://www.onlinedown.net/",
                  name: "华军软件园",
                },{
                  icom: "https://duote.com//favicon.ico",
                  url: "https://duote.com/",
                  name: "多特",
                },{
                  icom: "https://skin.liqucn.com/webv5/images/favicon.ico",
                  url: "https://www.liqucn.com/",
                  name: "历趣",
                },{
                  icom: "http://www.downza.cn/favicon.ico",
                  url: "http://www.downza.cn/",
                  name: "下载之家",
                },
                {
                  icom: "http://www.ddooo.com/favicon.ico",
                  url: "http://www.ddooo.com/",
                  name: "多多软件",
                },{
                  icom: "https://www.pc6.com/favicon.ico",
                  url: "https://www.pc6.com/",
                  name: "PC6下载",
                },{
                  icom: "https://pc.qq.com/favicon.ico",
                  url: "https://pc.qq.com/",
                  name: "腾讯软件中心",
                },{
                  icom: "http://www.downyi.com/favicon.ico",
                  url: "http://www.downyi.com/",
                  name: "当易网",
                },{
                  icom: "",
                  url: "https://www.romzhijia.net/",
                  name: "ROM之家",
                },{
                  icom: "https://www.win7zhijia.cn/favicon.ico",
                  url: "https://www.win7zhijia.cn/",
                  name: "win7之家",
                },{
                  icom: "https://dl.pconline.com.cn/favicon.ico",
                  url: "https://dl.pconline.com.cn/",
                  name: "太平洋电脑网",
                },{
                  icom: "https://xiazai.zol.com.cn/favicon.ico",
                  url: "https://xiazai.zol.com.cn/",
                  name: "中关村软件",
                },{
                  icom: "http://www.appchina.com/favicon.ico",
                  url: "http://www.appchina.com/",
                  name: "应用汇",
                },{
                  icom: "https://www.52pojie.cn/favicon.ico",
                  url: "https://www.52pojie.cn/",
                  name: "吾爱破解",
                },
                {
                  icom: "http://rutracker.org/favicon.ico",
                  url: "http://rutracker.org/",
                  name: "RuTracker",
                },
              ]
            },
            {
              title: "资源",
              name: "2",
              content: [
                {
                  icom: "http://static.ypz1.com/img/favicon.ico",
                  url: "http://www.yunpz.net/",
                  name: "云铺子",
                },
                {
                  icom: "https://www.nmme.cc/favicon.ico",
                  url: "https://www.nmme.cc/",
                  name: "橘子盘搜",
                },
                {
                  icom: "https://ujuso.com/favicon.ico",
                  url: "https://ujuso.com/",
                  name: "优聚搜",
                },
                {
                  icom: "http://www.wanwangsou.com/favicon.ico",
                  url: "http://www.wanwangsou.com/",
                  name: "万网搜",
                },{
                  icom: "http://www.xuesousou.com/favicon.ico",
                  url: "http://www.xuesousou.com/",
                  name: "学搜搜",
                },{
                  icom: "https://www.pan131.com/favicon.ico",
                  url: "https://www.pan131.com/",
                  name: "盘131",
                },{
                  icom: "https://www.58wangpan.com/favicon.ico",
                  url: "https://www.58wangpan.com/",
                  name: "58盘",
                },{
                  icom: "https://www.wuyasou.com/template/default/images/wuyasou_favicon.ico",
                  url: "https://www.wuyasou.com/",
                  name: "乌鸦搜",
                },{
                  url: "https://yiso.fun/",
                  name: "易搜",
                },
                {
                  icom: "https://www.alipansou.com/favicon.ico",
                  url: "https://www.alipansou.com/",
                  name: "猫狸盘搜",
                },
                {
                  icom: "https://www.sopandas.com/favicon.ico",
                  url: "https://www.sopandas.com/",
                  name: "熊猫盘搜",
                },
                {
                  icom: "https://www.xiaobaipan.com/static/assets/ico/favicon.png",
                  url: "https://www.xiaobaipan.com/",
                  name: "小白盘",
                },{
                  icom: "https://www.xiaoso.net/favicon.ico",
                  url: "https://www.xiaoso.net/",
                  name: "小不点",
                },{
                  icom: "https://www.sobaidupan.com/favicon.ico",
                  url: "https://www.sobaidupan.com/",
                  name: "搜盘",
                },
              ]
            },
          ],
        },
        {
          name: "技术教学",
      action: false,
          editableTabs: [
            {
              title: "Tab 1",
              name: "1",
              content: [
                {
                  icom: "https://www.smartedu.cn/favicon.ico",
                  url: "https://www.smartedu.cn/",
                  name: "智慧教育",
                },
                {
                  icom: "https://open.163.com/favicon.ico",
                  url: "https://open.163.com/",
                  name: "网易公开课",
                },
                {
                  icom: "https://www.runoob.com/favicon.ico",
                  url: "https://www.runoob.com/",
                  name: "菜鸟教程",
                },
                {
                  icom: "https://le.ouchn.cn/favicon.ico",
                  url: "https://le.ouchn.cn/",
                  name: "终身教育平台",
                },{
                  icom: "https://www.csdn.net/favicon.ico",
                  url: "https://www.csdn.net/",
                  name: "CSDN",
                },{
                  icom: "https://edu-image.nosdn.127.net/32a8dd2a-b9aa-4ec9-abd5-66cd8751befb.png?imageView=&quality=100",
                  url: "https://www.icourse163.org/",
                  name: "中国大学MOOC",
                },{
                  icom: "https://github.com/favicon.ico",
                  url: "https://github.com/",
                  name: "github",
                },{
                  icom: "https://www.oschina.net/favicon.ico",
                  url: "https://www.oschina.net/",
                  name: "OSCHINA",
                },{
                  icom: "https://leetcode-cn.com/favicon.ico",
                  url: "https://leetcode-cn.com/",
                  name: "力扣",
                },
                {
                  icom: "https://www.nowcoder.com/favicon.ico",
                  url: "https://www.nowcoder.com/",
                  name: "牛客网",
                },
              {
                  icom: "hhttps://i2.hdslb.com/bfs/face/e4b1c5a29f7c0b71f45deea19e3781c6938fca44.jpg",
                  url: "http://dasai.lanqiao.cn/",
                  name: "蓝桥",
                },
              ]
            },
          ],
        },
      ],
      dialogFormVisible: false,
      postal:[],
      form: {
        name: "",
        url: "",
      },
      formLabelWidth: "120px",
    };
  },
  created(){
    if (sessionStorage.getItem('List')){
    this.listL=JSON.parse(sessionStorage.getItem('List'))
    }
    if (sessionStorage.getItem('historyList')){
      console.log( this.listL[0].editableTabs[1].content);
    this.listL[0].editableTabs[1].content=JSON.parse(sessionStorage.getItem('historyList'))
    }
  },

  methods: {
    // clickHandler(e){
    //   console.log(e);
    // },
    setActiveItem(index) {
      this.$refs.carousel.setActiveItem(index);
    },
    addHandler(e,index) {
      console.log(e,index);
      this.listL[index].action = !this.listL[index].action;
      let sp = document.querySelector(".el-carousel__container");
      if (sp) {
        if (!sp.contains(e.target)) {
          //这句是说如果我们点击到了id为myPanel以外的区域
          this.action = !this.action;
          console.log(3);
        }
      }
    },
    removeHandler(index, i, j) {
      var aa = this.listL[index].editableTabs[i].content;
      aa.splice(j, 1);
      this.listL[index].editableTabs[i].content = aa;
      sessionStorage.setItem('List',JSON.stringify(this.listL));
    },
    addsHandler(){
      var aa=this.listL[this.postal[0]].editableTabs[this.postal[1]].content
      aa.push({
          icom: this.form.url+"/favicon.ico",
          url: this.form.url,
          name: this.form.name,
      })
      this.listL[this.postal[0]].editableTabs[this.postal[1]].content=aa
      sessionStorage.setItem('List',JSON.stringify(this.listL));
      this.dialogFormVisible=false
    },
  },
};
</script>

<style lang="less">
.conten {
  .ul {
    border-radius: 5px !important;
    padding: 5px 0;
  }
  .cen {
    background: #eee;
    // height: 500px;
    border-radius: 5px;
    .active {
      position: absolute;
      right: 20px;
      top: 2px;
      z-index: 99;
    }
  }
  .el-tabs {
    padding: 0 20px;
  }
  .el-carousel__container{
    height: 402px;
  }
  .tab {
    display: flex;
    flex-wrap: wrap;

    .list {
      width: 120px;
      height: 40px;
      margin: 5px 10px;
      background: #fff;
      border-radius: 5px;
      box-shadow: 5px 2px 5px #888888;
      position: relative;
      a {
        height: 100%;
        text-decoration: none;
        color: #000;
        display: flex;
        .divL {
          width: 40px;
          height: 40px;
          img {
            width: 20px;
            height: 20px;
            margin: 10px;

          }
        }
        .divR {
          line-height: 40px;
          font-size: 14px;
          overflow: hidden;
          text-overflow:ellipsis;
          margin-left: 5px;
        }
      }
      .remove {
        position: absolute;
        width: 14px;
        width: 14px;
        top: -5px;
        right: -5px;
        img {
          width: 100%;
        }
      }
    }
    .add:hover{
      box-shadow: 5px 2px 5px #888888;
    }
    .add {
      width: 100px;
      margin: 5px 10px;

      background: #fff;
      border-radius: 5px;
      box-shadow: 1px 1px 3px #888888;
      height: 32px;
      img {
        width: 20px;
        margin-top: 6px;
      }
    }
  }
}
</style>