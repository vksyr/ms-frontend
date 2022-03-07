<template>
  <v-card outlined>
    <v-row>
      <v-col cols="5">
        <v-card-title>
          {{ time }}
        </v-card-title>
        <v-card-subtitle>
          {{ location }}
        </v-card-subtitle>
      </v-col>
      <v-col cols="5">
        <v-card-title>
          {{ room }}
        </v-card-title>
        <v-card-subtitle>
          {{ building }}
        </v-card-subtitle>
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
    time: {
      type: String,
      required: false
    },
    location: {
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
  methods: {}
}
</script>
