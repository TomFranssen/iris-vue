<template>
    <div>
        <h1>
            {{$t('my-sign-ups')}}
        </h1>
        <vue-good-table
            v-if="rows.length > 0"
            :columns="columns"
            :rows="rows"
            :sortable="false"
            @on-row-click="showEventDetails"
            styleClass="table condensed table-bordered table-striped text-nowrap"
            v-bind:search-options="{
                enabled: true,
                placeholder: $t('search-for-name')
            }"
        >
            <template slot="table-row" slot-scope="props">
                <div v-if="props.column.field === 'group'" class="group-icon text-center">
                    <i v-bind:class="{'visible': props.row.groupDutchGarrison}" class="fa fa-empire mr-2"></i>
                    <i v-bind:class="{'visible': props.row.groupDuneSeaBase}" class="fa fa-rebel"></i>
                </div>
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
                    <div v-for="(eventDate, index) in props.row.eventDates" v-bind:key="eventDate.date + index">
                        {{eventDate.signedUpUsers.length + eventDate.guests.length}} / {{eventDate.availableSpots}}
                    </div>
                </div>
                <div v-if="props.column.field === 'dates'">
                    <div v-for="(eventDate, index) in props.row.eventDates" v-bind:key="eventDate.date + index">
                        {{eventDate.date  | moment("dddd D-M-YYYY") }}
                    </div>
                </div>
            </template>
        </vue-good-table>
        <div v-else>
            <b-alert show variant="danger">
                {{$t('signed-up-for-no-events')}}
            </b-alert>
        </div>
    </div>
</template>
<script>
import { getPrivateSignedUpEvents } from '../utils/events-api'

export default {
    name: 'YourEvents',
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
        getDaysCount: function (rowObject) {
            return rowObject.eventDates.length
        },
        showEventDetails: function (row, index) {
            this.$router.push('event/' + row.row._id)
        },
        getPrivateSignedUpEvents () {
            getPrivateSignedUpEvents().then((events) => {
                // Sort events on date first and then on name
                this.rows = events.sort(function (a, b) {
                    let adate = new Date(a.eventDates[0].date)
                    let bdate = new Date(b.eventDates[0].date)
                    let rv = adate - bdate
                    if (rv === 0) {
                        rv = a.name.localeCompare(b.name)
                    }
                    return rv
                })
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
            }
            this.columns[1].filterOptions = locations.filter(onlyUnique)
        }
    },
    data () {
        return {
            columns: [
                {
                    label: this.$t('group'),
                    field: 'group',
                    tdClass: 'group-icon'
                },
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
        this.getPrivateSignedUpEvents()
    }
}
</script>
