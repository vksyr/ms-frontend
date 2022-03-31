<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <v-row v-if="filtersLoading">
          <v-col cols="12" class="text-center">
            <v-progress-circular
              indeterminate
              color="primary"
              class="ma-5"
            ></v-progress-circular>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="4">
            <v-select
              v-model="site"
              :items="sites"
              @change="selectLocation($event)"
              label="Location"
            >
              <template v-slot:item="{ item }">
                {{ item.name }}
              </template>
              <template v-slot:selection="{ item }">
                {{ item.name }}
              </template>
            </v-select>
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="building"
              :items="buildings"
              :disabled="buildingSelectDisabled"
              @change="selectBuilding($event)"
              label="Building"
            >
              <template v-slot:item="{ item }">
                {{ item.name }}
              </template>
              <template v-slot:selection="{ item }">
                {{ item.name }}
              </template>
            </v-select>
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="room"
              :items="rooms"
              :disabled="roomSelectDisabled"
              label="Room"
            >
              <template v-slot:item="{ item }">
                {{ item.name }}
              </template>
              <template v-slot:selection="{ item }">
                {{ item.name }}
              </template>
            </v-select>
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
          <v-btn
            x-large
            color="blue"
            class="ma-5 white--text"
            @click="openNewMeetingDialog()"
          >
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
            <v-alert v-if="!upcomingTodayMeetings" color="primary" dark>
              There are no more meetings today
            </v-alert>
            <meeting-card
              v-for="(meeting, index) in todayMeetings"
              :key="index"
              :dateTime="meeting.start"
              :site="meeting.site"
              :building="meeting.building"
              :room="meeting.room"
              v-else
            />
          </v-sheet>
        </v-row>
        <v-row>
          <v-sheet min-height="200" width="100%" class="ma-5">
            <h3 class="mb-3">Upcoming</h3>
            <v-alert v-if="!upcomingFutureMeetings" color="primary" dark>
              There are no upcoming meetings
            </v-alert>
            <meeting-card
              v-for="(meeting, index) in futureMeetings"
              :key="index"
              :dateTime="meeting.start"
              :site="meeting.site"
              :building="meeting.building"
              :room="meeting.room"
              v-else
            />
          </v-sheet>
        </v-row>
      </v-col>
    </v-row>
    <v-dialog v-model="showNewMeetingDialog" width="500">
      <v-card>
        <v-card-title class="text-h5 white--text primary">
          Book New Meeting
        </v-card-title>

        <v-card-text>
          <v-row v-if="filtersLoading">
            <v-col cols="12" class="text-center">
              <v-progress-circular
                indeterminate
                color="primary"
                class="ma-5"
              ></v-progress-circular>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="4">
              <v-select
                v-model="site"
                :items="sites"
                @change="selectLocation($event)"
                label="Location"
              >
                <template v-slot:item="{ item }">
                  {{ item.name }}
                </template>
                <template v-slot:selection="{ item }">
                  {{ item.name }}
                </template>
              </v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="building"
                :items="buildings"
                :disabled="buildingSelectDisabled"
                @change="selectBuilding($event)"
                label="Building"
              >
                <template v-slot:item="{ item }">
                  {{ item.name }}
                </template>
                <template v-slot:selection="{ item }">
                  {{ item.name }}
                </template>
              </v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="room"
                :items="rooms"
                :disabled="roomSelectDisabled"
                label="Room"
              >
                <template v-slot:item="{ item }">
                  {{ item.name }}
                </template>
                <template v-slot:selection="{ item }">
                  {{ item.name }}
                </template>
              </v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-dialog
                ref="dateDialog"
                v-model="dateDialog"
                :return-value.sync="date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="dateDialog = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dateDialog.save(date)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-col cols="4">
              <v-dialog
                ref="startTimeDialog"
                v-model="startTimeDialog"
                :return-value.sync="startTime"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="startTime"
                    label="Start Time"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="startTimeDialog"
                  v-model="startTime"
                  format="24hr"
                  :allowed-minutes="allowedStep"
                  full-width
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="startTimeDialog = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.startTimeDialog.save(startTime)"
                  >
                    OK
                  </v-btn>
                </v-time-picker>
              </v-dialog>
            </v-col>
            <v-col cols="4">
              <v-dialog
                ref="endTimeDialog"
                v-model="endTimeDialog"
                :return-value.sync="endTime"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="endTime"
                    label="End Time"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="endTimeDialog"
                  v-model="endTime"
                  format="24hr"
                  :allowed-minutes="allowedStep"
                  full-width
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="endTimeDialog = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.endTimeDialog.save(endTime)"
                  >
                    OK
                  </v-btn>
                </v-time-picker>
              </v-dialog>
            </v-col>
          </v-row>
          <v-row>
            <v-alert v-if="showMeetingConflictWarning" color="danger" dark>
              This meeting location/time has either already been booked or
              conflicts with another meeting
            </v-alert>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="saveEvent"> Book </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import MeetingCard from './MeetingCard.vue'

import sofService from '../services/sofService'

export default {
  name: 'MeetingScheduler',
  components: {
    MeetingCard
  },
  props: {},
  data: () => ({
    site: null,
    building: null,
    room: null,
    sites: null,
    buildings: null,
    rooms: null,
    calendarValue: '',
    calendarType: 'week',
    calendarTypes: ['day', 'week', 'month'],
    calendarMode: 'column',
    calendarModes: ['stack', 'column'],
    events: [],
    filtersLoading: true,
    filtersError: false,
    eventsLoading: true,
    showNewMeetingDialog: false,
    activePicker: null,
    date: null,
    dateDialog: false,
    startTime: null,
    startTimeDialog: false,
    endTime: null,
    endTimeDialog: false,
    showMeetingConflictWarning: false,
    today: new Date()
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
    },
    async getSites() {
      let result = await sofService.getSites()

      if (result.httpStatus === 200 && result.data) {
        this.sites = result.data
      } else {
        this.filtersError = true
      }

      this.filtersLoading = false
    },
    async selectLocation(site) {
      let result = await sofService.getBuildings(site.id)

      if (result.httpStatus === 200 && result.data) {
        this.buildings = this.sortBuildings(result.data)
      } else {
        this.filtersError = true
      }
    },
    async selectBuilding(site) {
      let result = await sofService.getRooms(site.id)

      if (result.httpStatus === 200 && result.data) {
        this.rooms = result.data
      } else {
        this.filtersError = true
      }
    },
    sortBuildings(buildings) {
      return buildings.sort((a, b) => {
        let intA = parseInt(a.name)
        let intB = parseInt(b.name)

        if (isNaN(intA)) {
          return a
        }

        if (isNaN(intB)) {
          return b
        }

        return intA - intB
      })
    },
    openNewMeetingDialog() {
      if (!this.showNewMeetingDialog) {
        this.showNewMeetingDialog = true
      }
    },
    selectDate(date) {
      this.$refs.menu.save(date)
    },
    saveEvent() {
      if (this.date && this.startTime && this.endTime) {
        var dateArr = this.date.split('-')
        var year = parseInt(dateArr[0])
        var month = parseInt(dateArr[1]) - 1
        var day = parseInt(dateArr[2])

        var startTimeArr = this.startTime.split(':')
        var startTimeHour = parseInt(startTimeArr[0])
        var startTimeMinute = parseInt(startTimeArr[1])

        var endTimeArr = this.endTime.split(':')
        var endTimeHour =
          endTimeArr[1] === '00'
            ? parseInt(endTimeArr[0]) - 1
            : parseInt(endTimeArr[0])
        var endTimeMinute =
          endTimeArr[1] === '00' ? 59 : parseInt(endTimeArr[1]) - 1

        var startDateTime = new Date(
          year,
          month,
          day,
          startTimeHour,
          startTimeMinute
        )
        var endDateTime = new Date(year, month, day, endTimeHour, endTimeMinute)

        var event = {
          color: 'primary',
          name: 'Booked',
          start: startDateTime,
          end: endDateTime,
          timed: true,
          isOpen: true,
          site: this.site.name,
          building: this.building.name,
          room: this.room.name
        }

        this.events.push(event)
        this.showNewMeetingDialog = false
      }
    },
    allowedStep: (m) => m % 5 === 0
  },
  computed: {
    buildingSelectDisabled() {
      return !this.site
    },
    roomSelectDisabled() {
      return !this.building
    },
    todayMeetings() {
      if (this.events.count === 0) {
        return []
      } else {
        return this.events.filter(
          (x) =>
            x.start.getYear() === this.today.getYear() &&
            x.start.getMonth() === this.today.getMonth() &&
            x.start.getDay() === this.today.getDay() &&
            x.start.getTime() >= this.today.getTime()
        )
      }
    },
    futureMeetings() {
      if (this.events.count === 0) {
        return []
      } else {
        return this.events.filter(
          (x) =>
            x.start.getYear() >= this.today.getYear() &&
            x.start.getMonth() >= this.today.getMonth() &&
            x.start.getDay() > this.today.getDay() &&
            x.start.getTime() >= this.today.getTime()
        )
      }
    },
    upcomingTodayMeetings() {
      return this.events.some(
        (x) =>
          x.start.getYear() === this.today.getYear() &&
          x.start.getMonth() === this.today.getMonth() &&
          x.start.getDay() === this.today.getDay() &&
          x.start.getTime() >= this.today.getTime()
      )
    },
    upcomingFutureMeetings() {
      return this.events.some(
        (x) =>
          x.start.getYear() >= this.today.getYear() &&
          x.start.getMonth() >= this.today.getMonth() &&
          x.start.getDay() > this.today.getDay() &&
          x.start.getTime() >= this.today.getTime()
      )
    }
  },
  mounted() {
    this.getSites()
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    }
  }
}
</script>

<style scoped>
.v-calendar .v-event-timed {
  cursor: default !important;
}
</style>
