<template>
  <v-app>
    <v-main>
      <meeting-scheduler />
    </v-main>
  </v-app>
</template>

<script>
import MeetingScheduler from './components/MeetingScheduler.vue'

export default {
  name: 'App',

  components: {
    MeetingScheduler
  },

  data: () => ({
    //
  })
}
</script>
