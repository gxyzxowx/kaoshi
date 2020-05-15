<!--
 * @Date         : 2020-05-13 14:36:44
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-15 14:10:08
 * @FilePath     : \kaoshi\src\views\Exam.vue
 * @Description  : 开始考试
 -->
 <style lang="scss">
.warp-ing {
  font-size: 0.2rem;
  margin: 0.5rem;
  .title-desc {
    font-size: 0.28rem;
  }
  .title-content {
    margin: 0.2rem 0 0.4rem 0;
    font-size: 0.3rem;
    line-height: 0.5rem;
    color: #333;
  }
  .selects {
    font-size: 0.28rem;
    .select {
      .van-checkbox {
        margin-bottom: 0.2rem;
      }
    }
  }
  .footer {
    position: fixed;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    bottom: 1rem;
    left: 0;
    height: 0.9rem;
    .btn {
      width: 2.5rem;
      height: 100%;
      text-align: center;
      background-color: #ddd;
      line-height: 0.9rem;
      font-size: 0.3rem;
      border-radius: 0.05rem;
    }
  }
}
.warp-panel {
  margin: 0.5rem 0.5rem 0.5rem 0.5rem;
  font-size: 0.3rem;
  .panel {
    .desc {
      margin: 0.4rem 0;
    }
    ul.handlelist {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 0.6rem;
        height: 0.6rem;
        border: 1px solid #ddd;
        background-color: #eee;
        margin-right: 0.33rem;
        margin-bottom: 0.25rem;
        text-align: center;
        line-height: 0.6rem;
        &:nth-of-type(7n) {
          margin-right: 0;
        }
      }
    }
  }
  footer {
    position: fixed;
    bottom: 0.5rem;
    width: 100%;
    height: 0.9rem;
    .cel {
      transform: translateX(-0.3rem);
      width: 2.5rem;
      height: 0.9rem;
      margin: 0 auto;
      line-height: 0.9rem;
      text-align: center;
      background-color: #ddd;
      font-size: 0.3rem;
      border-radius: 0.05rem;
    }
  }
}
</style>
<template>
  <div>
    <BackBar>答题中</BackBar>
    <div class="warp-ing" v-show="ifIng">
      <section class="ing">
        <div class="title-desc">
          第{{nowIndex + 1}}题
          （
          <span>{{list[nowIndex]['_type']==0? '多选': '单选'}}</span>）：
        </div>
        <div class="title-content">{{list[nowIndex].title}}</div>
        <div class="selects">
          <div class="select">
            <van-checkbox-group
              v-model="answerlist[nowIndex]"
              :max="list[nowIndex]['_type']"
            >
              <van-checkbox name="a">A. {{list[nowIndex].a}}</van-checkbox>
              <van-checkbox name="b">B. {{list[nowIndex].b}}</van-checkbox>
              <van-checkbox name="c">C. {{list[nowIndex].c}}</van-checkbox>
              <van-checkbox name="d">D. {{list[nowIndex].d}}</van-checkbox>
              <van-checkbox name="e">E. {{list[nowIndex].e}}</van-checkbox>
            </van-checkbox-group>
          </div>
        </div>
      </section>
      <div class="footer">
        <div class="left btn" @click="pre">上一题</div>
        <div class="right btn" @click="next">下一题</div>
      </div>
    </div>
    <div class="warp-panel" v-show="!ifIng">
      <section class="panel">
        <div class="title">答题进度：{{panel.progress}}%</div>
        <div class="desc">未答题目数： {{panel.noAnswerNum}} 个</div>
        <ul class="handlelist">
          <li v-for="(item, index) in panel.noAnswerList" :key="index" @click="choseOne(item)">{{item+1}}</li>
        </ul>
      </section>
      <footer>
        <div class="cel" @click="jiaojuan(1)">交卷</div>
      </footer>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Checkbox, CheckboxGroup, Toast, Dialog } from 'vant'

// 全局注册
Vue.use(Dialog)
Vue.use(Toast)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
export default {
  data () {
    return {
      token: '',
      // 考试编码
      number: '',
      type: '',
      // 题目list
      list: [
        {
          id: 442,
          pid: 1,
          mid: null,
          oid: 1,
          case: '',
          title: '题目...',
          a: 'a',
          b: 'b',
          c: 'c',
          d: 'd',
          e: 'e',
          analysis: '',
          answer: 'abc',
          type: 3,
          level: 1
        }
      ],
      listLen: 0,
      // 当前显示的题目的index
      nowIndex: 0,
      // 答案list
      answerlist: [],
      id: {
        pid: 0,
        mid: 0,
        oid: 0
      },
      // 是否为正在答题状态
      ifIng: true,
      panel: {
        // 未答题的索引列表
        noAnswerList: [],
        noAnswerNum: 0
      }
    }
  },
  computed: {
  },
  mounted () {
    this.token = window.sessionStorage.getItem('token')

    this.id = this.$route.query
    // console.log(this.id)
    this.getData()
  },
  watch: {
    ifIng (newV, oldV) {
      console.log(newV)
      if (!newV) {
        // 进入答题 面板页
        // console.log(this.answerlist)
        this.panel.noAnswerList = []
        for (let i = 0; i < this.answerlist.length; i++) {
          if (!this.answerlist[i]) {
            this.panel.noAnswerList.push(i)
          }
        }
        // console.log(this.panel.noAnswerList)
        this.panel.noAnswerNum = this.panel.noAnswerList.length
        console.log(this.panel.noAnswerNum)
        console.log(this.answerlist.length)
        this.panel.progress = parseInt(1 - (this.panel.noAnswerNum / this.answerlist.length)) * 100
      } else {
        // 返回答题中，或者点击单个未答题
      }
    }
  },
  methods: {
    getData () {
      this.$load.show()
      // console.log(this.token)
      this.WR.post('/api/v1/getExercise', {
        token: this.token,
        pid: this.id.pid,
        mid: this.id.mid ? this.id.mid : 0,
        oid: this.id.oid
      }).then(rs => {
        if (rs.code === 0) {
          console.log(JSON.stringify(rs.data.list.length))
          const data = rs.data
          this.number = data.number

          // 遍历list
          data.list.map((item, index, arr) => {
            if (item.type === 3) {
              // max0为多选，1为单选
              arr[index]._type = 0
              // console.log(item)
            } else {
              arr[index]._type = 1
            }
          })
          this.list = data.list
          this.listLen = data.list.length
        } else {
          console.log(JSON.stringify(rs))
        }
        this.$load.hide()
      })
    },
    // 上一题
    pre () {
      if (this.nowIndex <= 0) {
        // 已经是第一题
        Toast('已经是第一题')
      } else {
        this.nowIndex--
      }
    },
    // 下一题
    next () {
      // console.log(this.answerlist.length)
      if (this.nowIndex >= this.listLen - 1) {
        // 已经是最后一题，提示交卷
        Dialog.confirm({
          title: '已经是最后一题',
          message: '是否进入答题总览?'
        })
          .then(() => {
            // on confirm
            this.ifIng = false
          })
          .catch(() => {
            // on cancel
          })
      } else {
        this.nowIndex++
      }
    },
    // 点击返回按钮后
    ifJiaojuan (type) {
      // 判断是否改交卷
      // 1在答题中且从未进入答题面板页面，交卷
      if (this.ifIng && this.panel.noAnswerList.length === 0) {
        this.jiaojuan(type)
        this.$router.push('/')
      } else if (this.ifIng && this.panel.noAnswerList.length !== 0) {
        // 2在答题中，但已已进入过答题面板，返回答题面板
        this.ifIng = false
      } else {
        // 3在答题面板中，返回答题Ing
        this.ifIng = true
      }
    },
    // 交卷
    jiaojuan (type) {
      // / 状态 0=返回未提交 1=提交答题

      const data = this.handleData()
      console.log(type)
      console.log(JSON.stringify(data))
      console.log(this.number)
      console.log(this.token)
      this.WR.post('/api/v1/saveAnswer', {
        token: this.token,
        number: this.number,
        status: type,
        data: JSON.stringify(data)
      }).then(rs => {
        console.log(rs)
      })
    },
    // 交卷或者返回，处理数据
    handleData () {
      const list = []
      this.answerlist.map((item, index) => {
        const str = item.toString()
        list.push({
          id: this.list[index].id,
          userAnswer: str
        })
      })
      // console.log(list)
      return list
    },
    // 在面板中选择一个未答题继续答题
    choseOne (index) {
      console.log(index)
      this.ifIng = true
      this.nowIndex = index
    }
  }
}
</script>
