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
                    perPage: 100,
                    perPageDropdown: [20, 50, 100],
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
                    <div v-if="props.column.field === 'email-verified'">
                        <span v-if="props.row.identities[0].isSocial">
                            <span v-bind:class="'fa fa-' + props.row.identities[0].connection"></span>&nbsp;
                        </span>
                        <span v-if="props.row.email_verified" class="fa fa-check"><span class="sr-only">✅</span></span>
                        <span v-else class="fa fa-times"><span class="sr-only">❌</span></span>
                    </div>
                    <div v-if="props.column.field === 'groups'">
                        <div v-if="props.row.app_metadata && props.row.app_metadata.authorization">
                            <span class="add-comma-after"  v-bind:key="group" v-for="group in props.row.app_metadata.authorization.groups">
                            {{group}}</span>
                        </div>
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
                    field: 'costumes',
                    filterable: true
                },
                {
                    label: this.$t('has-email-verified'),
                    tdClass: 'text-right',
                    field: 'email-verified',
                    filterable: true
                },
                {
                    label: this.$t('groups'),
                    tdClass: 'text-right',
                    field: 'groups',
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
