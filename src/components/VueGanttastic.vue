<template>
  <div class="main-container">
    <div class="table-container" style="width: 450px">
      <table class="resource-table">
        <thead>
        <tr class="resource-table-th">
          <th>ID</th>
          <th>start_date</th>
          <th>end_date</th>
          <th>start_child</th>
          <th>end_child</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{ devs[0].ganttBarConfig.id }}</td>
          <td>{{ devs[0].myBeginDate }}</td>
          <td>{{ devs[0].myEndDate }}</td>
          <td>{{ devs[1].myBeginDate }}</td>
          <td>{{ devs[1].myEndDate }}</td>
        </tr>
        <tr>
          <td>{{ tests[0].ganttBarConfig.id }}</td>
          <td>{{ tests[0].myBeginDate }}</td>
          <td>{{ tests[0].myEndDate }}</td>
          <td>{{ tests[1].myBeginDate }}</td>
          <td>{{ tests[1].myEndDate }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div>
      <div class="gantt-container">
        <g-gantt-chart
            chart-start="2024-09-01 08:00"
            chart-end="2024-10-30 17:00"
            precision="day"
            bar-start="myBeginDate"
            bar-end="myEndDate"
            grid
        >
          <g-gantt-row label="Development" :bars="devBarList"/>
          <g-gantt-row label="Testing" :bars="testBarList"/>
        </g-gantt-chart>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

// Dữ liệu cho "Development"
const devs = [
  {
    myBeginDate: "2024-09-05 08:00",
    myEndDate: "2024-09-10 17:00",
    ganttBarConfig: {
      id: "1",
      label: "Estimate Development",
      style: {
        backgroundColor: "#4CAF50",
        borderRadius: "4px",
        color: "white",
      },
    },
  },
  {
    myBeginDate: "2024-09-09 08:00",
    myEndDate: "2024-09-15 17:00",
    ganttBarConfig: {
      id: "2",
      label: "Development",
      style: {
        backgroundColor: "#2196F3",
        borderRadius: "4px",
        color: "white",
      },
    },
  },
];

// Dữ liệu cho "Testing"
const tests = [
  {
    myBeginDate: "2024-09-16 08:00",
    myEndDate: "2024-09-20 17:00",
    ganttBarConfig: {
      id: "1",
      label: "Estimate Testing",
      style: {
        backgroundColor: "#FF9800",
        borderRadius: "4px",
        color: "white",
      },
    },
  },
  {
    myBeginDate: "2024-09-20 08:00",
    myEndDate: "2024-09-25 17:00",
    ganttBarConfig: {
      id: "2",
      label: "Testing",
      style: {
        backgroundColor: "#F44336",
        borderRadius: "4px",
        color: "white",
      },
    },
  },
];

// Tạo reactive dữ liệu cho các thanh Gantt bar trong hàng "Development" và "Testing"
const devBarList = ref(devs);
const testBarList = ref(tests);
</script>

<style scoped>
.main-container {
  position: relative;
}

.table-container {
  position: fixed;
  left: 0;
  width: 440px;
  z-index: 99999;
  background-color: #fff;
}

.resource-table tr {
  height: 40px !important;
  border-bottom: 1px solid black;
  text-align: center;
  font-size: 14px;
}

.resource-table th {
  background-color: #f4f4f4;
  text-align: left;
  font-weight: bold;
  height: 77px !important;
}

.resource-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

/* Container của Gantt chart */
.gantt-container {
  margin-left: 445px;
  overflow: hidden;
  overflow-x: auto !important;
  width: 100%;
}

.gantt-container div {
  width: 100%;
  overflow-x: auto !important;
}

</style>
