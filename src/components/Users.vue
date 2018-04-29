<template>
    <div>
        <b-breadcrumb :items="breadcrumbs"/>
        <h1>{{$t('users')}} <small class="text-muted">({{rows.length}})</small></h1>
        <template>
            <vue-good-table
                :columns="columns"
                :rows="rows"
                @on-row-click="showUserDetails"
                styleClass="vgt-table condensed text-nowrap table-signed-up-users"
                v-bind:search-options="{
                    enabled: true,
                    placeholder: $t('search')
                }"
                v-bind:paginationOptions="{
                    enabled: true,
                    perPage: 20,
                    perPageDropdown: [20, 50],
                    dropdownAllowAll: true,
                    nextLabel: $t('next'),
                    prevLabel: $t('previous'),
                    rowsPerPageLabel: $t('per-page'),
                    ofLabel: $t('of'),
                    allLabel: $t('all'),
                }"
            >
                <template slot="table-row" slot-scope="props">
                    <div v-if="props.column.field === 'avatar'">
                        <div v-if="props.row.user_metadata && props.row.user_metadata.legion_thumbnail">
                            <img v-bind:src="props.row.user_metadata.legion_thumbnail" width="50" />
                        </div>
                        <div v-else>
                            <img src="https://images.501st.com/memberdata/templates/tk_thumb.gif" alt="" width="50">
                        </div>
                    </div>
                    <div v-if="props.column.field === 'username'">
                        <div v-if="props.row.user_metadata && props.row.user_metadata.username">
                            {{props.row.user_metadata.username}}
                        </div>
                    </div>
                    <div v-if="props.column.field === 'email'">
                        {{props.row.email}}
                    </div>
                    <div v-if="props.column.field === 'legion-id'">
                        {{getLegionId(props.row)}}
                    </div>
                    <div v-if="props.column.field === 'costumes'">
                        {{getCostumeCount(props.row)}}
                    </div>
                </template>
                <div slot="emptystate">
                    {{$t('users-loading')}}
                </div>
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
            this.$router.push('user/' + row.row.user_id.replace('|', '-'))
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
                    tdClass: 'text-left',
                    field: 'avatar'
                },
                {
                    label: this.$t('name'),
                    tdClass: 'text-left',
                    field: 'username',
                    filterable: true
                },
                {
                    label: this.$t('email'),
                    tdClass: 'text-left',
                    field: 'email',
                    filterable: true
                },
                {
                    label: this.$t('501st-legion-id'),
                    tdClass: 'text-right',
                    field: 'legion-id',
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
