<!--
              dateFormat="YYYY年MM月DD日"-->
<template>
  <div style="overflow: hidden">
    <table class="custom-grid">
      <tr>
        <th>ID</th>
        <th>Estimate Date</th>
        <th>Reality Date</th>
        <th rowspan="3" colspan="3" id="chartGantt" style="min-width: 100px">
          <g-gantt-chart
              chart-start="2024-10-01 12:00"
              chart-end="2025-10-20 12:00"
              day-label="日"
              month-label="月"
              precision="day"
              bar-start="myBeginDate"
              bar-end="myEndDate"
          >
            <g-gantt-row label="Dev" :bars="row1BarList"/>
            <g-gantt-row label="Test" :bars="row2BarList"/>
          </g-gantt-chart>
        </th>
      </tr>
      <tr>
        <td>1</td>
        <td><input type="date" v-model="row1Start"/><input type="date" v-model="row1End"/></td>
        <td><input type="date" v-model="row1Start2"/><input type="date" v-model="row1End2"/></td>
      </tr>
      <tr>
        <td>2</td>
        <td><input type="date" v-model="row2Start"/><input type="date" v-model="row2End"/></td>
        <td><input type="date" v-model="row2Start2"/><input type="date" v-model="row2End2"/></td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import {ref, watch} from "vue"
import {GGanttChart} from "@infectoone/vue-ganttastic";

// Danh sách các nhiệm vụ trong dòng Dev
const row1BarList = ref([
  {
    myBeginDate: "2024-10-13 00:00",
    myEndDate: "2024-11-15 23:00",
    ganttBarConfig: {
      id: "unique-id-1",
      label: "Estimate",
      style: {
        background: "#4caf50", // Màu xanh cho nhiệm vụ này
        color: "#ffffff",
        opacity: 0.9,
      }
    }
  },
  {
    myBeginDate: "2024-10-12 13:00",
    myEndDate: "2024-10-14 19:00",
    ganttBarConfig: {
      id: "unique-id-23",
      label: "Reality",
      style: {
        background: "#e09b69",
        color: "#ffffff",
        opacity: 0.8,
      }
    }
  }
])

// Danh sách các nhiệm vụ trong dòng Test
const row2BarList = ref([
  {
    myBeginDate: "2024-10-13 00:00",
    myEndDate: "2024-10-14 23:00",
    ganttBarConfig: {
      id: "another-unique-id-3",
      // hasHandles: true,
      label: "Test Task",
      style: {
        background: "#00bcd4", // Màu xanh nhạt cho nhiệm vụ này
        borderRadius: "8px",
        color: "black"
      }
    }
  },
  {
    myBeginDate: "2024-10-12 13:00",
    myEndDate: "2024-10-14 19:00",
    ganttBarConfig: {
      id: "unique-id-21",
      label: "Test Task 2",
      style: {
        background: "pink",
        color: "#ffffff",
        borderRadius: "8px",
      }
    }
  }
])

// Các biến lưu trữ giá trị cho các input date
const row1Start = ref("2024-10-12")
const row1End = ref("2024-10-15")
const row1Start2 = ref("2024-10-12")
const row1End2 = ref("2024-10-15")
const row2Start = ref("2024-10-13")
const row2End = ref("2024-10-14")
const row2Start2 = ref("2024-10-13")
const row2End2 = ref("2024-10-14")

// Cập nhật thời gian của thanh nhiệm vụ khi người dùng chỉnh sửa input
watch([row1Start, row1End], ([newStart, newEnd]) => {
  row1BarList.value[0].myBeginDate = `${newStart} 00:00`
  row1BarList.value[0].myEndDate = `${newEnd} 23:59`
})

watch([row2Start, row2End], ([newStart, newEnd]) => {
  row2BarList.value[0].myBeginDate = `${newStart} 00:00`
  row2BarList.value[0].myEndDate = `${newEnd} 23:59`
})
const customScales = ref([
  {
    unit: "month",
    format: (date) => new Intl.DateTimeFormat('ja-JP', {year: 'numeric', month: 'long'}).format(date) // Định dạng tháng
  },
  {
    unit: "day",
    format: (date) => new Intl.DateTimeFormat('ja-JP', {day: 'numeric'}).format(date) // Định dạng ngày
  }
]);
console.log(customScales.value[0].format(new Date()));

</script>

<style>
.custom-grid {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.custom-grid th, .custom-grid td {
  border: 1px solid #ccc;
  text-align: center;
}

.custom-grid td {
  max-width: 150px;
}

.custom-grid th {
  background-color: #f4f4f4;
}

.custom-ganttastic {
  overflow-x: auto;
}

.g-timeunit {
  min-width: 50px !important;
}
</style>
