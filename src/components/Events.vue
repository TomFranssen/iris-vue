<template>
    <div>
        <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
        <h1>{{$t('events')}}</h1>
        <div v-if="$store.getters.hasCostume">
            <vue-good-table
                :columns="columns"
                :rows="rows"
                @on-row-click="showEventDetails"
                styleClass="table condensed table-bordered table-striped text-nowrap"
                :sort-options="{
                    enabled: true,
                    initialSortBy: {field: getFirstDate(this), type: 'asc'}
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
        getFirstDate: function (rowObject) {
            console.log(rowObject)
            // return rowObject.eventDates[0].date
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
        getPrivateEvents () {
            getPrivateEvents().then((events) => {
                this.rows = events
                this.populateLocationFilterOptions()
            })
        },
        populateLocationFilterOptions: function () {
            let locations = []
            for (let row of this.rows) {
                locations.push(row.city)
            };
            this.columns[1].filterOptions.filterDropdownItems = locations // make array values unique
        },
        showEventDetails: function (row, index) {
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
        this.getPrivateEvents()
    }

}
</script>
