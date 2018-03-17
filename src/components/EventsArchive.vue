<template>
    <div>
        <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
        <h1>{{$t('events-archive')}}</h1>
        <template>
            <vue-good-table
                :columns="columns"
                :rows="rows"
                :sortable="false"
                :defaultSortBy="{field: getFirstDate, type: 'asc'}"
                :onClick="showEventDetails"
                styleClass="table condensed table-bordered table-striped"
            >
                <template slot="table-row" slot-scope="props">
                    <td class="text-left">{{ props.row.name }}</td>
                    <td class="text-right">{{ props.row.city }}</td>
                    <td class="text-right">{{ getDaysCount(props.row) }}</td>
                    <td class="text-right">{{ getSignups(props.row) }}</td>
                    <td class="text-right">
                        <div v-for="eventDate in props.row.eventDates" v-bind:key="eventDate.date">
                            {{ eventDate.date | moment("dddd D-M-YYYY")}}
                        </div>
                    </td>
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
            for (let row of this.rows) {
                locations.push(row.city)
            }
            this.columns[1].filterOptions = locations
        },
        showEventDetails: function (row, index) {
            this.$router.push('event/' + row._id)
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
                    tdClass: 'text-right',
                    filterable: true
                },
                {
                    label: this.$t('location'),
                    tdClass: 'text-right',
                    field: 'city',
                    filterable: true,
                    filterDropdown: true,
                    filterOptions: []
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
        this.getPrivateArchivedEvents()
    }

}
</script>
