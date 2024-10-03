<template>
  <div>
    <FullCalendar
        v-if="calendarPlugins.length > 0"
    :plugins="calendarPlugins"
    :initialView="'resourceTimelineDay'"
    :headerToolbar="headerToolbar"
    :resources="resources"
    :events="events"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TimelineCalendar',
  data() {
    return {
      calendarPlugins: [], // Plugins sẽ được nạp động
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth'
      },
      resources: [
        {id: 'a', title: 'Resource A'},
        {id: 'b', title: 'Resource B'},
        {id: 'c', title: 'Resource C'}
      ],
      events: [
        {id: '1', resourceId: 'a', start: '2024-10-02T09:00:00', end: '2024-10-02T14:00:00', title: 'Event 1'},
        {id: '2', resourceId: 'b', start: '2024-10-02T12:00:00', end: '2024-10-02T18:00:00', title: 'Event 2'}
      ]
    };
  },
  mounted() {
    this.loadFullCalendarPlugins();
  },
  methods: {
    async loadFullCalendarPlugins() {
      // Dynamic import FullCalendar và các plugin
      const fullCalendar = await import('@fullcalendar/vue3');
      console.log(fullCalendar)
      const resourceTimelinePlugin = await import('@fullcalendar/resource-timeline');
      const interactionPlugin = await import('@fullcalendar/interaction');

      // Gán các plugin vào calendarPlugins
      this.calendarPlugins = [
        resourceTimelinePlugin.default || resourceTimelinePlugin,
        interactionPlugin.default || interactionPlugin
      ];
    }
  }
});
</script>

<style scoped>
/* Style nếu cần */
</style>
