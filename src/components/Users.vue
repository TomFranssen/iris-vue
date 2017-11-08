<template>
    <div>
        <b-breadcrumb :items="breadcrumbs"/>
        <template>
            <vue-good-table
                title="Users"
                :columns="columns"
                :rows="rows"
                :onClick="showUserDetails"
                styleClass="table condensed table-bordered table-striped"
            >
                <template slot="table-row" scope="props">
                    <td width="50">
                        <img v-bind:src="props.row.picture" width="50" height="50" />
                    </td>
                    <td>{{props.row.name}}</td>
                    <td>{{props.row.email}}</td>
                    <td>{{getAllegiancesText(props.row)}}</td>
                    <td>{{getLegionId(props.row)}}</td>
                </template>
            </vue-good-table>
        </template>
    </div>
</template>

<script>
    import moment from 'moment'
    import { isLoggedIn } from '../utils/auth'
    import { getPrivateUsers } from '../utils/users-api'

    export default {
        name: 'events',
        methods: {
            moment: function () {
                return moment()
            },
            isLoggedIn () {
                return isLoggedIn()
            },
            getPrivateUsers () {
                getPrivateUsers().then((users) => {
                    this.rows = users
                })
            },
            getAllegiancesText: function (rowObject) {
                return rowObject.app_metadata.authorization.groups.join()
            },
            getLegionId: function (rowObject) {
                if (rowObject.user_metadata && rowObject.user_metadata.legion_id) {
                    return rowObject.user_metadata.legion_id
                }
                return ''
            },
            showUserDetails: function (row, index) {
                this.$router.push('user/' + row.user_id.replace('|', '-'))
            }
        },
        data () {
            return {
                breadcrumbs: [{
                    text: 'Home',
                    to: '/'
                }, {
                    text: 'Users',
                    active: true
                }],
                columns: [
                    {
                        label: '',
                        tdClass: 'text-right',
                        field: 'picture'
                    },
                    {
                        label: this.$t('name'),
                        tdClass: 'text-right',
                        field: 'name',
                        filterable: true
                    },
                    {
                        label: this.$t('email'),
                        tdClass: 'text-right',
                        field: 'email',
                        filterable: true
                    },
                    {
                        label: this.$t('allegiances'),
                        tdClass: 'text-right',
                        field: this.getAllegiancesText,
                        filterable: true,
                        filterDropdown: true,
                        filterOptions: [
                            { value: 'Dutch Garrison', text: 'Dutch Garrison' },
                            { value: 'Dune Sea Base', text: 'Dune Sea Base' }
                        ]
                    },
                    {
                        label: this.$t('501st-legion-id'),
                        tdClass: 'text-right',
                        field: 'legion',
                        filterable: true
                    }
                ],
                rows: []
            }
        },
        mounted () {
            this.getPrivateUsers()
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
