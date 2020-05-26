<!--
 * @Date         : 2020-05-25 17:44:57
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-25 17:54:32
 * @FilePath     : \kaoshi\src\views\OpenSubject.vue
 * @Description  : 开通科目
-->
<style lang="scss" scoped>
 main{
    margin:.8rem;
    font-size: .3rem;
    .title,.level,.fee{
      font-size: .32rem;
      margin-bottom: .5rem;
    }
 }
  footer{
    position: fixed;
    width: 100%;
    bottom: 1rem;
    left: 0;
    height: .8rem;
    font-size: .32rem;
    .cell{
      height: 100%;
      margin: 0 auto;
      line-height: .8rem;
      text-align: center;
      background: #eee;
      width: 2.5rem;
      border-radius: .1rem;
    }
  }
</style>
<template>
  <div>
    <BackBar>开通科目</BackBar>
    <main>
      <div class="title">科目名称：</div>
      <div class="level">会员等级：</div>
      <div class="fee">开通费用： </div>
    </main>
         <footer>
       <div class="cell" @click="open">开通科目</div>
     </footer>
  </div>
</template>
<script>
export default {

}
</script>
