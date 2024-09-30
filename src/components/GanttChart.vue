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

        // Header calendar
        gantt.locale.date.month_short = [
          "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"
        ];
        gantt.locale.date.day_full = [
          "日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"
        ];
        gantt.locale.date.day_short = ["日", "月", "火", "水", "木", "金", "土"];
        gantt.config.scales = [//format
          { unit: "month", step: 1, format: "%Y年 %M" },
          { unit: "day", step: 1, format: "%m/%d (%D)" },
          // { unit: "day", step: 1, format: "%D" },
        ];


        // Config common
        gantt.config.date_format = "%Y-%m-%d";

        gantt.config.drag_progress = true;

        gantt.config.drag_task = false;
        gantt.config.drag_resize = false;
        gantt.config.drag_move = false;

        gantt.config.drag_links = false;

        gantt.config.editable = true;

        // Data column left
        gantt.config.columns = [
          { name: "id", label: "ID", width: 30, align: "center" },
          { name: "text", label: "text", width: 100, tree: true },//folder
          { name: "start_date", label: "start_date", width: 90, align: "center", resize: true },
          { name: "end_date", label: "end_date", width: 90, align: "center", resize: true },
          { name: "duration", label: "duration", width: 50, align: "center" },
          { name: "progress", label: "progress", width: 80, align: "center", template: gantt.config.progress }, // Thanh tiến trình
          { name: "add", width: 40 }
        ];

        gantt.init(this.$refs.gantt);

        gantt.templates.task_class = function (start, end, task) {
          if (task.id === 2) {
            return "task-color-2";
          }
          return "";
        };

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
            }
          ],
          // links: [
          //   { id: 1, source: 1, target: 2, type: "0" },
          //   { id: 2, source: 2, target: 3, type: "0" }
          // ]
        };

        gantt.parse(tasks);

        // gantt.attachEvent("onTaskCreated", function() {
        // //
        // });

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

.gantt_task_line {
  background-color: #45AD51;
}

.gantt_task_progress {
  background-color: green;
}

/* Text */
.gantt_grid_head_cell, .gantt_grid_data {
  font-size: 12px;
  text-align: center;
}

/* Date */
.gantt_task_date {
  color: black !important;
  font-weight: 600;
}

/* Header left */
.gantt_grid_head_cell, .gantt_grid_scale_cell {
  color: black !important;
  font-weight: 600;
}

/* header calendar */
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
