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
            <v-select v-model="room" :items="rooms" label="Room"></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-sheet height="750" width="100%" color="blue lighten-2">
            <v-calendar
              ref="calendar"
              v-model="calendarValue"
              color="blue lighten-2"
              :type="calendarType"
              :events="events"
              :event-overlap-mode="calendarMode"
              :event-overlap-threshold="30"
              :first-time="450"
              :interval-format="formatInterval"
              :interval-minutes="30"
              :interval-count="22"
            >
              <template v-slot:event="{ event }">
                <div class="d-flex flex-row justify-space-between ma-1">
                  <div class="d-flex flex-column justify-space-between">
                    <p class="mb-0">{{ formatEventTime(event.start) }}</p>
                    <p class="mb-0">{{ event.name }}</p>
                  </div>
                  <v-btn
                    small
                    icon
                    color="blue lighten-2"
                    class="white"
                    outlined
                    v-if="event.isOpen"
                  >
                    <v-icon>mdi-bookmark-check</v-icon>
                  </v-btn>
                </div>
              </template>
            </v-calendar>
          </v-sheet>
        </v-row>
      </v-col>
      <v-col cols="4">
        <v-row justify="center">
          <v-btn x-large color="blue" class="ma-5 white--text">
            <v-icon left dark> mdi-plus-circle-outline </v-icon>
            Book New Meeting
          </v-btn>
        </v-row>
        <v-row class="mx-2 my-5">
          <h1>My Meetings</h1>
        </v-row>
        <v-row>
          <v-sheet min-height="200" width="100%" class="ma-5">
            <h3 class="mb-3">Today</h3>
            <meeting-card
              v-for="(meeting, index) in todayMeetings"
              :key="index"
              :time="meeting.time"
              :location="meeting.location"
              :building="meeting.building"
              :room="meeting.room"
            />
          </v-sheet>
        </v-row>
        <v-row>
          <v-sheet min-height="200" width="100%" class="ma-5">
            <h3 class="mb-3">Upcoming</h3>
            <meeting-card
              v-for="(meeting, index) in futureMeetings"
              :key="index"
              :time="meeting.time"
              :location="meeting.location"
              :building="meeting.building"
              :room="meeting.room"
            />
          </v-sheet>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MeetingCard from './MeetingCard.vue'

export default {
  name: 'MeetingScheduler',
  components: {
    MeetingCard
  },
  props: {},
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
    events: [
      {
        color: 'blue lighten-2',
        name: 'Open',
        start: new Date(2022, 1, 14, 8, 0, 0),
        end: new Date(2022, 1, 14, 8, 59, 0),
        timed: true,
        isOpen: true
      },
      {
        color: 'blue lighten-2',
        name: 'Open',
        start: new Date(2022, 1, 14, 9, 0, 0),
        end: new Date(2022, 1, 14, 9, 59, 0),
        timed: true,
        isOpen: true
      },
      {
        color: 'blue lighten-2',
        name: 'Open',
        start: new Date(2022, 1, 15, 8, 0, 0),
        end: new Date(2022, 1, 15, 9, 29, 0),
        timed: true,
        isOpen: true
      },
      {
        color: 'indigo darken-2',
        name: 'Booked',
        start: new Date(2022, 1, 15, 9, 30, 0),
        end: new Date(2022, 1, 15, 11, 29, 0),
        timed: true,
        isOpen: false
      },
      {
        color: 'blue lighten-2',
        name: 'Open',
        start: new Date(2022, 1, 16, 8, 0, 0),
        end: new Date(2022, 1, 16, 11, 29, 0),
        timed: true,
        isOpen: true
      }
    ],
    todayMeetings: [
      {
        time: '1100',
        location: 'SOCOM HQ',
        building: 'Building 151',
        room: 'Room 1'
      },
      {
        time: '1200',
        location: 'SOCOM HQ',
        building: 'Building 152',
        room: 'Room 2'
      }
    ],
    futureMeetings: [
      {
        time: '1300',
        location: 'SOCOM HQ',
        building: 'Building 153',
        room: 'Room 3'
      },
      {
        time: '1400',
        location: 'SOCOM HQ',
        building: 'Building 154',
        room: 'Room 4'
      }
    ]
  }),
  methods: {
    formatInterval(date) {
      let time = ''

      if (date.hour < 10) {
        time = `0${date.hour}`
      } else {
        time = `${date.hour}`
      }

      if (date.minute === 30) {
        time = `${time}${date.minute}`
      } else {
        time = `${time}00`
      }

      return time
    },
    formatEventTime(date) {
      let hours = date.getHours()
      let minutes = date.getMinutes()
      let time = ''

      if (hours < 10) {
        time = `0${hours}`
      } else {
        time = `${hours}`
      }

      if (minutes === 30) {
        time = `${time}${minutes}`
      } else {
        time = `${time}00`
      }

      return time
    }
  }
}
</script>

<style scoped>
.v-calendar .v-event-timed {
  cursor: default !important;
}
</style>
