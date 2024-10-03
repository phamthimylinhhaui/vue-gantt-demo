<template>
  <GanttChart/>
  <VueGanttastic/>
  <h1>test</h1>
  <Ganttastic :tasks="tasks" :locale="locale" />
</template>

<script>
import GanttChart from './components/GanttChart.vue'
import VueGanttastic from './components/VueGanttastic.vue'
import Ganttastic from 'vue-ganttastic';

export default {
  name: 'App',
  components: {
    VueGanttastic,
    GanttChart,
    Ganttastic
  },
  data() {
    return {
      tasks: [
        { id: 1, label: 'タスク 1', from: '2024-10-01', to: '2024-10-03' },
        { id: 2, label: 'タスク 2', from: '2024-10-03', to: '2024-10-06' },
        { id: 3, label: 'タスク 3', from: '2024-10-06', to: '2024-10-08' }
      ],
      locale: {
        monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日']
      }
    };
  }
}


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>