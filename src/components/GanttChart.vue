<template>
  <div style="min-height: 300px; color: black" ref="gantt"></div>
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
          {unit: "month", step: 1, format: "%Y年 %M"},
          {unit: "day", step: 1, format: "%m/%d (%D)"}
        ];

        // Cấu hình chung
        gantt.config.date_format = "%Y-%m-%d";
        gantt.config.drag_progress = false;
        gantt.config.drag_task = false;
        gantt.config.drag_resize = false;
        gantt.config.drag_move = false;
        gantt.config.drag_links = false;
        gantt.config.editable = false;
        gantt.config.step = 1;
        gantt.config.column_width = 70;


        // Cột dữ liệu bên trái
        gantt.config.columns = [
          {name: "id", label: "ID", width: 30, align: "center"},
          {name: "text", label: "text", width: 100, tree: true},
          {name: "start_date", label: "start_date", width: 90, align: "center", resize: true},
          {name: "end_date", label: "end_date", width: 90, align: "center", resize: true},
          {name: "start_child", label: "start_child", width: 90, align: "center"},
          {name: "end_child", label: "end_child", width: 90, align: "center"},
          // {name: "progress", label: "progress", width: 80, align: "center", template: gantt.config.progress}
        ];

        gantt.templates.progress_text = function (start, end, task) {
          if (task.start_child && task.end_child) {
            const columnWidth = gantt.config.column_width;

            const startDate = new Date(task.start_date);
            startDate.setHours(0, 0, 0, 0);

            const startChild = new Date(task.start_child);
            startChild.setHours(0, 0, 0, 0);

            const dayDifferenceStart = (startChild - startDate) / (1000 * 60 * 60 * 24);
            const taskStartToProgressStart = dayDifferenceStart * columnWidth;

            const endChild = new Date(task.end_child);
            endChild.setHours(0, 0, 0, 0);

            const dayDifferenceProgress = (endChild - startChild) / (1000 * 60 * 60 * 24);
            const progressWidth = dayDifferenceProgress * columnWidth;

            // Log để kiểm tra giá trị
            console.log("Day Difference Start: ", dayDifferenceStart);
            console.log("Task Start to Progress Start: ", taskStartToProgressStart);
            console.log("Progress Width: ", progressWidth);

            // Tạo và trả về HTML cho thanh progress
            return `<div class='custom-progress' style='left:${taskStartToProgressStart}px; width:${progressWidth}px;'></div>`;
          }
          return "";
        };

        // Khởi tạo dữ liệu
        const tasks = {
          data: [
            {
              id: 1, text: "DEV", start_date: "2024-09-01", duration: 10, start_child: "2024-09-02", end_child: "2024-09-07",
            },
            {
              id: 2, text: "TEST", start_date: "2024-09-05", duration: 15, start_child: "2024-09-06", end_child: "2024-09-10"
            },
            {
              id: 3, text: "UAT", start_date: "2024-09-10", duration: 10, start_child: "2024-09-10", end_child: "2024-09-17"
            }
          ]
        };

        gantt.init(this.$refs.gantt);
        gantt.parse(tasks);

        gantt.attachEvent("onTaskClick", (id, e) => {
          console.log(e)
          console.log(id)

          return false;  // Dừng click mặc định
        });

        gantt.attachEvent("onGridClick", function (id, column, e) {
          // Kiểm tra cột mà người dùng click vào
          console.log(e)
          if (column === "start_date" || column === "end_date" || column === "progress") {
            // Ngăn không cho thực hiện action click trên các cột này
            return false;
          }
          return false;  // Cho phép click vào các phần còn lại (ví dụ: phần text)
        });

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

/* Layer tùy chỉnh progress */
.custom-progress {
  position: absolute;
  height: 28px;
  background-color: green;
}

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

.gantt_grid_data .gantt_cell[data-column="start_date"],
.gantt_grid_data .gantt_cell[data-column="end_date"],
.gantt_grid_data .gantt_cell[data-column="progress"] {
  pointer-events: none;  /* Ngăn chặn click */
}
</style>
