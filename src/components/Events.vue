<template>
    <div>
        <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
        <h1>{{$t('events')}}</h1>
        <template>
            <vue-good-table
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
        </template>
    </div>
</template>

<script>
    import moment from 'moment'
    import { isLoggedIn } from '../utils/auth'
    import { getPrivateEvents } from '../utils/events-api'

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
            getPrivateEvents () {
                getPrivateEvents().then((events) => {
                    this.rows = events
                })
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
                    text: 'Events',
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
            this.getPrivateEvents()
        }

    }
</script>

<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: block;
        margin: 0 10px;
    }
</style>
