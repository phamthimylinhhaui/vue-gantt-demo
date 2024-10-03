<template>
  <div>
    <div class="table-container" style="padding-top: 37px; width: 450px">
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

    <div class="gantt-container">
      <g-gantt-chart
          chart-start="2024-09-01 08:00"
          chart-end="2024-10-30 17:00"
          precision="day"
          bar-start="myBeginDate"
          bar-end="myEndDate"
      >
        <g-gantt-row label="Development" :bars="devBarList" />
        <g-gantt-row label="Testing" :bars="testBarList" />
      </g-gantt-chart>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Dữ liệu cho "Development"
const devs = [
  {
    myBeginDate: "2024-09-05 08:00",
    myEndDate: "2024-09-10 17:00",
    ganttBarConfig: {
      id: "dev-1",
      label: "Frontend Development",
      style: {
        backgroundColor: "#4CAF50",
        borderRadius: "4px",
        color: "white",
      },
    },
  },
  {
    myBeginDate: "2024-09-11 08:00",
    myEndDate: "2024-09-15 17:00",
    ganttBarConfig: {
      id: "dev-2",
      label: "Backend Development",
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
      id: "test-1",
      label: "Unit Testing",
      style: {
        backgroundColor: "#FF9800",
        borderRadius: "4px",
        color: "white",
      },
    },
  },
  {
    myBeginDate: "2024-09-21 08:00",
    myEndDate: "2024-09-25 17:00",
    ganttBarConfig: {
      id: "test-2",
      label: "Integration Testing",
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
.table-container {
  position: relative;
}

.resource-table {
  position: fixed;
  left: 0;
  width: 450px;
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
  height: 80px !important;
}

.resource-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

/* Container của Gantt chart */
.gantt-container {
  margin-left: 450px;
  overflow: hidden;
  overflow-x: auto !important; /* Cho phép cuộn ngang */
  //white-space: nowrap!important; /* Đảm bảo nội dung không xuống dòng */
  //display: block !important; /* Đảm bảo nội dung không bị bó hẹp */
}

.gantt-container div {
  width: 100%;
  overflow-x: auto !important;
}

/* Đảm bảo biểu đồ chiếm toàn bộ chiều ngang */
.g-gantt-chart {
  min-width: 1000px!important; /* Đặt chiều rộng tối thiểu để có thể cuộn */
  //display: inline-block;
}
</style>
