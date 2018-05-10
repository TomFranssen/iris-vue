<template>
    <div>
        <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
        <h1>{{$t('events-archive')}} <small class="text-muted">({{rows.length}})</small></h1>
        <template>
            <vue-good-table
                :columns="columns"
                :rows="rows"
                @on-row-click="showEventDetails"
                styleClass="table condensed table-bordered table-striped text-nowrap"
                :sort-options="{
                    enabled: true
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
        </template>
    </div>
</template>

<script>
import moment from 'moment'
import { isLoggedIn } from '../utils/auth'
import { getPrivateArchivedEvents } from '../utils/events-api'

export default {
    name: 'events',
    filters: {
        moment: function (date) {
            return moment(date).format('D-MM-YYYY')
        }
    },
    methods: {
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
        getPrivateArchivedEvents () {
            getPrivateArchivedEvents().then((events) => {
                this.rows = events
                this.populateLocationFilterOptions()
            })
        },
        populateLocationFilterOptions: function () {
            let locations = []
            function onlyUnique (value, index, self) {
                return self.indexOf(value) === index
            }

            for (let row of this.rows) {
                locations.push(row.city)
            };
            this.columns[1].filterOptions.filterDropdownItems = locations.filter(onlyUnique)
        },
        showEventDetails: function (row, index) {
            console.log(row)
            this.$router.push('event/' + row.row._id)
        }
    },
    data () {
        return {
            breadcrumbs: [{
                text: 'Home',
                to: '/'
            }, {
                text: this.$t('events'),
                to: '/events'
            }, {
                text: this.$t('events-archive'),
                active: true
            }],
            columns: [
                {
                    label: this.$t('name'),
                    field: 'name',
                    tdClass: 'text-left',
                    filterOptions: {
                        enabled: true,
                        placeholder: this.$t('search-for-name'),
                        filterDropdownItems: []
                    }
                },
                {
                    label: this.$t('location'),
                    tdClass: 'text-left',
                    field: 'city',
                    filterable: true,
                    filterOptions: {
                        enabled: true,
                        placeholder: this.$t('choose-city'),
                        filterDropdownItems: []
                    }
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
        this.getPrivateArchivedEvents()
    }

}
</script>
