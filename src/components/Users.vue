<template>
    <div>
        <b-breadcrumb :items="breadcrumbs"/>
        <h1>{{$t('users')}}</h1>
        <template>
            <vue-good-table
                :columns="columns"
                :rows="rows"
                :onClick="showUserDetails"
                styleClass="table condensed table-bordered table-striped"
            >
                <template slot="table-row" scope="props">
                    <td width="50" v-if="props.row.user_metadata && props.row.user_metadata.legion_thumbnail">
                        <img v-bind:src="props.row.user_metadata.legion_thumbnail" width="50" />
                    </td>
                    <td v-if="props.row.user_metadata && props.row.user_metadata.username">
                        {{props.row.user_metadata.username}}
                    </td>
                    <td>{{props.row.email}}</td>
                    <td>{{getLegionId(props.row)}}</td>
                    <td>{{getCostumeCount(props.row)}}</td>
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
                    return rowObject.user_metadata.legion_id.toString()
                }
                return ''
            },
            getCostumeCount: function (rowObject) {
                if (rowObject.user_metadata && rowObject.user_metadata.costumes) {
                    return rowObject.user_metadata.costumes.length
                }
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
                    text: this.$t('users'),
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
                        field: 'user_metadata.username',
                        filterable: true
                    },
                    {
                        label: this.$t('email'),
                        tdClass: 'text-right',
                        field: 'email',
                        filterable: true
                    },
                    {
                        label: this.$t('501st-legion-id'),
                        tdClass: 'text-right',
                        field: this.getLegionId,
                        filterable: true
                    },
                    {
                        label: this.$t('costumes'),
                        tdClass: 'text-right',
                        field: 'costumes'
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
