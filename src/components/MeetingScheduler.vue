<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <v-row>
          <v-col cols="4">
            <v-select
              v-model="location"
              :items="locations"
              label="Location"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="building"
              :items="buildings"
              label="Building"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="room"
              :items="rooms"
              label="Room"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-sheet height="700" width="100%">
            <v-calendar
              ref="calendar"
              v-model="calendarValue"
              :type="calendarType"
              :events="events"
              :event-overlap-mode="calendarMode"
              :event-overlap-threshold="30"
              :event-color="getEventColor"
              @change="getEvents"
            ></v-calendar>
          </v-sheet>
        </v-row>
      </v-col>
      <v-col cols="4">
        <v-row justify="center">
          <v-btn
            x-large
            color="blue"
            class="ma-5 white--text"
          >
            <v-icon
              left
              dark
            >
              mdi-plus-circle-outline
            </v-icon>
            Book New Meeting
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'MeetingScheduler',
    data: () => ({
      location: null,
      building: null,
      room: null,
      locations: ['SOCOM HQ', 'DEL', 'Narnia'],
      buildings: [151, 152, 153, 154, 155],
      rooms: [1, 2, 3, 4, 5],
      calendarValue: '',
      calendarType: 'week',
      calendarTypes: ['day', 'week', 'month'],
      calendarMode: 'column',
      calendarModes: ['stack', 'column'],
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party']
    }),
    methods: {
      getEvents ({ start, end }) {
        const events = []

        const min = new Date(`${start.date}T00:00:00`)
        const max = new Date(`${end.date}T23:59:59`)
        const days = (max.getTime() - min.getTime()) / 86400000
        const eventCount = this.rnd(days, days + 20)

        for (let i = 0; i < eventCount; i++) {
          const allDay = this.rnd(0, 3) === 0
          const firstTimestamp = this.rnd(min.getTime(), max.getTime())
          const first = new Date(firstTimestamp - (firstTimestamp % 900000))
          const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
          const second = new Date(first.getTime() + secondTimestamp)

          events.push({
            name: this.names[this.rnd(0, this.names.length - 1)],
            start: first,
            end: second,
            color: this.colors[this.rnd(0, this.colors.length - 1)],
            timed: !allDay,
          })
        }

        this.events = events
      },
      getEventColor (event) {
        return event.color
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
    }
  }
</script>
