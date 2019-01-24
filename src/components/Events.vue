<template>
    <div>
        <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
        <h1>
            {{$t('events')}}
            <span v-if="$store.getters.isDgMember">
                Dutch Garrison
            </span>
            <span v-if="$store.getters.isDgMember && $store.getters.isDsbMember">
                &
            </span>
            <span v-if="$store.getters.isDsbMember">
                Dune Sea Base
            </span>
            <small class="text-muted">({{rows.length}})</small>
        </h1>
        <div v-if="$store.getters.hasCostume">
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
                    <div v-if="props.column.field === 'group'" class="group-icon text-center">
                        <i v-bind:class="{'visible': props.row.groupDutchGarrison}" class="fa fa-empire mr-2"></i>
                        <i v-bind:class="{'visible': props.row.groupDuneSeaBase}" class="fa fa-rebel"></i>
                    </div>
                    <a class="event-table-name-link" v-if="props.column.field === 'name'"  v-bind:href="'event/' + props.row._id" v-on:click.stop>
                        {{props.row.name}}
                    </a>
                    <div v-if="props.column.field === 'city'">
                        {{props.row.city}}
                    </div>
                    <div v-if="props.column.field === 'days'">
                        {{getDaysCount(props.row)}}
                    </div>
                    <div v-if="props.column.field === 'sign-ups'">
                        <div v-for="(eventDate, index) in props.row.eventDates" v-bind:key="index">
                            {{eventDate.signedUpUsers.length + eventDate.guests.length}} / {{eventDate.availableSpots}}
                        </div>
                    </div>
                    <div v-if="props.column.field === 'dates'">
                        <div v-for="(eventDate, index) in props.row.eventDates" v-bind:key="index">
                            {{eventDate.date  | moment("dddd D-M-YYYY") }}
                        </div>
                    </div>
                </template>
            </vue-good-table>
            <div class="mt-4 button-group">
                <router-link v-if="$store.getters.isGec" class="btn btn-primary mr-md-3" v-bind:to="'/add-event'">
                    <i class="fa fa-plus" aria-hidden="true"></i> {{$t('add-event')}}
                </router-link>
                <router-link class="btn btn-primary" v-bind:to="'/events-archive'">
                    <i class="fa fa-archive" aria-hidden="true"></i> {{$t('view-archive')}}
                </router-link>
            </div>
        </div>
        <div v-else>
            <b-alert show variant="danger">
                {{$t('no-costumes')}}
            </b-alert>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import { isLoggedIn } from '../utils/auth'
import { getPrivateEvents } from '../utils/events-api'

export default {
    name: 'events',
    methods: {
        getDaysCount: function (rowObject) {
            return rowObject.eventDates.length
        },
        moment: function () {
            return moment()
        },
        isLoggedIn () {
            return isLoggedIn()
        },
        getPrivateEvents () {
            getPrivateEvents().then((events) => {
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
                if (row.city) {
                    locations.push(row.city)
                }
            };
            locations = locations.filter(onlyUnique)
            locations = locations.sort(function (a, b) {
                if (a < b) return -1
                else if (a > b) return 1
                return 0
            })
            this.columns[2].filterOptions.filterDropdownItems = locations
        },
        showEventDetails: function (row, index) {
            this.$router.push('event/' + row.row._id)
        },
        sortDays: function (x, y, col, rowX, rowY) {
            return (rowX.eventDates.length < rowY.eventDates.length ? -1 : (rowX.eventDates.length > rowY.eventDates.length ? 1 : 0))
        }
    },
    data () {
        return {
            breadcrumbs: [{
                text: 'Home',
                to: '/'
            }, {
                text: this.$t('events'),
                active: true
            }],
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
                    field: 'days',
                    sortFn: this.sortDays
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
        this.getPrivateEvents()
    }

}
</script>
