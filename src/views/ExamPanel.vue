<!--
 * @Date         : 2020-05-15 10:27:03
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-15 10:39:36
 * @FilePath     : \kaoshi\src\views\ExamPanel.vue
 * @Description  : 考试面板（答题进度）
-->
<template>
  <div>
    <BackBar>答题进度</BackBar>
    <main>
      <div class="title">答题进度：</div>
      <div class="desc">未答题目数： {{noAnswer}}题</div>
      <div class="panel">
        <ul class="list">
          <li>1</li>
        </ul>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  data () {
    return {
      noAnswer: 0,
      //
      list: []
    }
  }
}
</script>
