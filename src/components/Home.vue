<template>
    <div>
        <h1>
            {{$t('welcome')}}
        </h1>
        <div v-show="!isLoggedIn()">
            <p>
                {{$t('welcome-text-verify')}}
            </p>
            <b-button @click="handleLogin()">{{$t('log-in-sign-up')}}</b-button>
        </div>
        <div v-show="isLoggedIn()">

            <div v-if="!rows">
                <b-alert show variant="danger" v-if="$store.state.profile.email_verified === false">
                    {{$t('verify-email-text')}}
                </b-alert>
                <b-alert show variant="danger" v-if="!this.$store.getters.isMember">
                    {{$t('verify-member')}}
                </b-alert>
                <p v-if="this.$store.getters.isMember">
                    {{$t('welcome-text')}}
                </p>
                <b-button @click="handleLogout()">{{$t('log-out')}}</b-button>
            </div>

            <vue-good-table
                v-if="rows"
                :columns="columns"
                :rows="rows"
                :sortable="false"
                :defaultSortBy="{field: getFirstDate, type: 'asc'}"
                :onClick="showEventDetails"
                styleClass="table condensed table-bordered table-striped"
            >
                <template slot="table-row" scope="props">
                    <td class="text-left">{{ props.row.name }}</td>
                    <td class="text-right">{{ props.row.city }}</td>
                    <td class="text-right">{{ getDaysCount(props.row) }}</td>
                    <td class="text-right">{{ getSignups(props.row) }}</td>
                    <td class="text-right">{{ props.row.eventDates[0].date | moment}}</td>
                </template>
            </vue-good-table>

        </div>
    </div>
</template>
<script>
    import moment from 'moment'
    import { isLoggedIn, login } from '../utils/auth'
    import { getPrivateSignedUpEvents } from '../utils/events-api'

    export default {
        name: 'Home',
        methods: {
            handleLogin () {
                login()
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
            getFirstDate: function (rowObject) {
                return rowObject.eventDates[0].date
            },
            getDaysCount: function (rowObject) {
                return rowObject.eventDates.length
            },
            moment: function () {
                return moment()
            },
            isLoggedIn () {
                return isLoggedIn()
            },
            showEventDetails: function (row, index) {
                this.$router.push('event/' + row._id)
            },
            getPrivateSignedUpEvents () {
                getPrivateSignedUpEvents().then((events) => {
                    this.rows = events
                })
            }
        },
        data () {
            return {
                columns: [
                    {
                        label: this.$t('name'),
                        field: 'name',
                        tdClass: 'text-right',
                        filterable: true
                    },
                    {
                        label: this.$t('location'),
                        tdClass: 'text-right',
                        field: 'city',
                        filterable: true
                    },
                    {
                        label: this.$t('days'),
                        tdClass: 'text-center',
                        field: this.getDaysCount
                    },
                    {
                        label: this.$t('signups'),
                        tdClass: 'text-center',
                        field: this.getSignups
                    },
                    {
                        label: this.$t('date'),
                        field: this.getFirstDate,
                        type: 'date',
                        outputFormat: 'D-MM-YYYY',
                        inputFormat: 'YYYY-MM-DD',
                        tdClass: 'text-right',
                        width: '130px'
                    }
                ],
                rows: []
            }
        },
        mounted () {
            this.getPrivateSignedUpEvents()
        }
    }
</script>
