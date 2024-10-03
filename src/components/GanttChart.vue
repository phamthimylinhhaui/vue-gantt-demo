<template>
  <div style="min-height: 300px; color: black; display: block" ref="gantt"></div>
</template>

<script>
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";

export default {
  name: "GanttChart",
  mounted() {
    if (typeof window !== "undefined") {
      import("dhtmlx-gantt").then((module) => {
        const gantt = module.default || module;

        // Cấu hình ngôn ngữ và lịch
        gantt.locale.date.month_short = [
          "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"
        ];
        gantt.locale.date.day_full = [
          "日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"
        ];
        gantt.locale.date.day_short = ["日", "月", "火", "水", "木", "金", "土"];
        gantt.config.scales = [
          { unit: "month", step: 1, format: "%Y年 %M" },
          { unit: "day", step: 1, format: "%m/%d (%D)" }
        ];

        // Cấu hình chung
        gantt.config.date_format = "%Y-%m-%d";
        gantt.config.drag_progress = true;
        gantt.config.drag_task = true;
        gantt.config.drag_resize = true;
        gantt.config.drag_move = true;
        gantt.config.drag_links = true;
        gantt.config.editable = true;

        // Cột dữ liệu bên trái
        gantt.config.columns = [
          { name: "id", label: "ID", width: 30, align: "center" },
          { name: "text", label: "text", width: 100, tree: true },
          { name: "start_date", label: "start_date", width: 90, align: "center", resize: true },
          { name: "end_date", label: "end_date", width: 90, align: "center", resize: true },
          { name: "progress", label: "progress", width: 80, align: "center", template: gantt.config.progress }
        ];

        // Sử dụng hàm task_class để điều chỉnh màu sắc task
        gantt.templates.task_class = function (start, end, task) {
          if (task.id === 1) {
            return "custom-task-progress";
          }
          return "";
        };

        // Khởi tạo dữ liệu
        const tasks = {
          data: [
            {
              id: 1, text: "DEV", start_date: "2024-09-01", duration: 10, progress: 0.6,
            },
            {
              id: 2, text: "TEST", start_date: "2024-09-05", duration: 15, progress: 0.8,
            },
            {
              id: 3, text: "UAT", start_date: "2024-09-10", duration: 5, progress: 0.3,
            },
            // Nhiệm vụ con biểu thị progress của DEV
            {
              id: 4, text: "Progress DEV", parent: 1, start_date: "2024-09-02", duration: 6,
              progress: 1, type: "task",
              readonly: true // Không cho phép kéo, chỉnh sửa
            }
          ]
        };

        gantt.init(this.$refs.gantt);
        gantt.parse(tasks);

      }).catch(error => {
        console.error("Error loading dhtmlx-gantt:", error);
      });
    }
  },
  beforeUnmount() {
    if (typeof window !== "undefined") {
      import("dhtmlx-gantt").then((module) => {
        const gantt = module.default || module;
        gantt.clearAll();
      });
    }
  },
};
</script>

<style>
div[ref="gantt"] {
  width: 100%;
  height: 500px;
}

/* Tùy chỉnh lớp progress của task */
.custom-task-progress .gantt_task_progress {
  background-color: green;
  width: 60%; /* Điều chỉnh theo tỉ lệ % bạn muốn */
}

/* Các tùy chỉnh khác */
.gantt_task_line {
  background-color: #45AD51;
}

.gantt_task_progress {
  background-color: green;
}

.gantt_grid_head_cell, .gantt_grid_data {
  font-size: 12px;
  text-align: center;
}

.gantt_task_date {
  color: black !important;
  font-weight: 600;
}

.gantt_grid_head_cell, .gantt_grid_scale_cell {
  color: black !important;
  font-weight: 600;
}

.gantt_scale_cell {
  color: white !important;
  font-weight: bold;
  background-color: #3672A9;
}

.gantt_scale_row {
  background-color: #f0f0f0 !important;
}

.task-color-2 {
  background-color: #3DBAD2;
}

.task-color-2 .gantt_task_progress {
  background-color: #2A9CB5;
}
</style>
