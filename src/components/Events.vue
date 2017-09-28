<template>
    <div class="events">
        <template>
            <b-table striped hover :items="events" :fields="fields">
                <template slot="startDate" scope="data">
                    {{data.item.eventDates[0].startDate | moment}}
                </template>
                <template slot="city" scope="data">
                    {{data.item.addressInformation.city}}
                </template>
            </b-table>
        </template>
    </div>
</template>

<script>
    import axios from 'axios'
    import moment from 'moment'

    export default {
        name: 'events',
        methods: {
            moment: function () {
                return moment()
            }
        },
        filters: {
            moment: function (date) {
                return moment(date).format('MMMM Do YYYY')
            }
        },
        data () {
            return {
                fields: [
                    {
                        key: 'name',
                        sortable: true
                    },
                    {
                        key: 'startDate',
                        sortable: true
                    },
                    {
                        key: 'city',
                        sortable: true
                    }
                ],
                events: [
                    {
                        'name': '',
                        'eventDates': [
                            {
                                'startDate': '',
                                'endDate': ''
                            }
                        ],
                        'addressInformation': {
                            'city': ''
                        }
                    }
                ]
            }
        },

        created () {
            axios.get('http://localhost:3001/api/events')
                .then(response => {
                    console.log(response.data)
                    this.events = response.data
                })
                .catch(e => {
                    this.errors.push(e)
                })
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

    a {
        color: #35495E;
    }
</style>
