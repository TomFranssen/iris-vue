<template>
    <div>
        <div v-show="!isLoggedIn()">
            <h1>
                {{$t('welcome')}}
            </h1>
            <p>
                {{$t('welcome-text-verify')}}
            </p>
            <b-button @click="handleLogin()">{{$t('log-in-sign-up')}}</b-button>
        </div>
        <div v-show="isLoggedIn()">
            <div v-if="rows.length === 0">
                <h1>
                    {{$t('welcome')}}
                </h1>
                <b-alert show variant="danger" v-if="$store.state.profile.email_verified === false">
                    {{$t('verify-email-text')}}
                </b-alert>
                <b-alert show variant="danger" v-if="!this.$store.getters.isMember">
                    {{$t('verify-member')}}
                </b-alert>
                <p v-if="this.$store.getters.isMember && $store.state.profile.email_verified === true">
                    {{$t('welcome-text')}}
                </p>
                <b-button @click="handleLogout()">{{$t('log-out')}}</b-button>
            </div>
            <div v-if="$store.getters.hasCostume">
                <div v-if="rows.length > 0">
                    <h1>
                        {{$t('your-signups')}}
                    </h1>
                    <vue-good-table
                        :columns="columns"
                        :rows="rows"
                        :sortable="false"
                        :defaultSortBy="{field: days, type: 'asc'}"
                        @on-row-click="showEventDetails"
                        styleClass="table condensed table-bordered table-striped text-nowrap"
                        v-bind:search-options="{
                            enabled: true,
                            placeholder: $t('search-for-name')
                        }"
                    >
                        <template slot="table-row" slot-scope="props">
                            <div v-if="props.column.field === 'name'">
                                {{props.row.name}}
                            </div>
                            <div v-if="props.column.field === 'city'">
                                {{props.row.city}}
                            </div>
                            <div v-if="props.column.field === 'days'">
                                {{getDaysCount(props.row)}}
                            </div>
                            <div v-if="props.column.field === 'sign-ups'">
                                <div v-for="eventDate in props.row.eventDates" v-bind:key="eventDate.date">
                                    {{eventDate.signedUpUsers.length + eventDate.guests.length}} / {{eventDate.availableSpots}}
                                </div>
                            </div>
                            <div v-if="props.column.field === 'dates'">
                                <div v-for="eventDate in props.row.eventDates" v-bind:key="eventDate.date">
                                    {{eventDate.date  | moment("dddd D-M-YYYY") }}
                                </div>
                            </div>
                        </template>
                    </vue-good-table>
                </div>
            </div>
            <div v-else>
                <h1>
                    {{$t('welcome')}}
                </h1>
                <b-alert show variant="danger">
                    {{$t('no-costumes')}}
                </b-alert>
            </div>
        </div>
    </div>
</template>
<script>
import { isLoggedIn, login, logout } from '../utils/auth'
import { getPrivateSignedUpEvents } from '../utils/events-api'

export default {
    name: 'Home',
    methods: {
        handleLogin () {
            login()
        },
        handleLogout () {
            logout()
        },
        getSignups: function (rowObject) {
            let totalAvailableSpots = 0
            let totalTakenSpots = 0

            for (let eventDate of rowObject.eventDates) {
                totalAvailableSpots = totalAvailableSpots + eventDate.availableSpots
                totalTakenSpots = totalTakenSpots + eventDate.signedUpUsers.length
            }

            return totalTakenSpots + ' / ' + totalAvailableSpots
        },
        getDaysCount: function (rowObject) {
            return rowObject.eventDates.length
        },
        isLoggedIn () {
            return isLoggedIn()
        },
        showEventDetails: function (row, index) {
            this.$router.push('event/' + row.row._id)
        },
        getPrivateSignedUpEvents () {
            getPrivateSignedUpEvents().then((events) => {
                this.rows = events.sort(function (a, b) {
                    a = new Date(a.eventDates[0].date)
                    b = new Date(b.eventDates[0].date)
                    return a > b ? -1 : a < b ? 1 : 0
                }).reverse() // Sort events on date
                this.populateLocationFilterOptions()
            })
        },
        populateLocationFilterOptions: function () {
            let locations = []
            for (let row of this.rows) {
                locations.push(row.city)
            }
            this.columns[1].filterOptions = locations
        }
    },
    data () {
        return {
            columns: [
                {
                    label: this.$t('name'),
                    field: 'name',
                    tdClass: 'text-left',
                    filterable: true
                },
                {
                    label: this.$t('location'),
                    tdClass: 'text-left',
                    field: 'city',
                    filterable: true,
                    filterDropdown: true,
                    filterOptions: []
                },
                {
                    label: this.$t('days'),
                    tdClass: 'text-center',
                    field: 'days'
                },
                {
                    label: this.$t('signups'),
                    tdClass: 'text-right',
                    field: 'sign-ups'
                },
                {
                    label: this.$t('date'),
                    tdClass: 'text-right',
                    field: 'dates'
                }
            ],
            rows: []
        }
    },
    mounted () {
        if (this.isLoggedIn()) {
            this.getPrivateSignedUpEvents()
        }
        if (this.$route.query.redirect) {
            localStorage.setItem('redirectUrl', this.$route.query.redirect)
        }
    }
}
</script>
