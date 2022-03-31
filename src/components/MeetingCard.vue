<template>
  <v-card outlined>
    <v-row>
      <v-col cols="5">
        <v-card-title>
          {{ time }}
        </v-card-title>
        <v-card-subtitle>
          {{ site }}
        </v-card-subtitle>
      </v-col>
      <v-col cols="5">
        <v-card-title> Room {{ room }} </v-card-title>
        <v-card-subtitle> Building {{ building }} </v-card-subtitle>
      </v-col>
      <v-col cols="2" align-self="center">
        <v-btn block elevation="0" color="white" height="88" class="px-0">
          <v-icon dark> mdi-dots-vertical </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'MeetingCard',
  props: {
    dateTime: {
      type: Date,
      required: false
    },
    site: {
      type: String,
      required: false
    },
    building: {
      type: String,
      required: false
    },
    room: {
      type: String,
      required: false
    }
  },
  data: () => ({}),
  methods: {},
  computed: {
    time() {
      let hours = this.dateTime.getHours()
      let minutes = this.dateTime.getMinutes()
      let time = ''

      if (hours < 10) {
        time = `0${hours}`
      } else {
        time = `${hours}`
      }

      if (minutes === 0) {
        time = `${time}00`
      } else {
        time = `${time}${minutes}`
      }

      return time
    }
  }
}
</script>
