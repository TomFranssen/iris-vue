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
                    perPage: 200,
                    perPageDropdown: [20, 50, 100, 200],
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
        },
        sortCostumeCount: function (x, y, col, rowX, rowY) {
            rowX.user_metadata = rowX.user_metadata || {}
            rowY.user_metadata = rowY.user_metadata || {}
            rowX.user_metadata.costumes = rowX.user_metadata.costumes || {}
            rowY.user_metadata.costumes = rowY.user_metadata.costumes || {}

            const rowXcostumes = rowX.user_metadata.costumes.length ? rowX.user_metadata.costumes.length : 0
            const rowYcostumes = rowY.user_metadata.costumes.length ? rowY.user_metadata.costumes.length : 0

            return (rowXcostumes < rowYcostumes ? -1 : (rowXcostumes > rowYcostumes ? 1 : 0))
        },
        sortLegionId: function (x, y, col, rowX, rowY) {
            rowX.user_metadata = rowX.user_metadata || {}
            rowY.user_metadata = rowY.user_metadata || {}
            rowX.user_metadata.legion_id = rowX.user_metadata.legion_id || 0
            rowY.user_metadata.legion_id = rowY.user_metadata.legion_id || 0

            const rowXlegionId = parseInt(rowX.user_metadata.legion_id ? rowX.user_metadata.legion_id : 0)
            const rowYlegionId = parseInt(rowY.user_metadata.legion_id ? rowY.user_metadata.legion_id : 0)

            return (rowXlegionId < rowYlegionId ? -1 : (rowXlegionId > rowYlegionId ? 1 : 0))
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
                    filterable: true,
                    sortFn: this.sortLegionId
                },
                {
                    label: this.$t('costumes'),
                    tdClass: 'text-right',
                    field: 'costumes',
                    filterable: true,
                    sortFn: this.sortCostumeCount
                },
                {
                    label: this.$t('has-email-verified'),
                    tdClass: 'text-right',
                    field: 'email-verified',
                    filterable: true,
                    sortable: false
                },
                {
                    label: this.$t('groups'),
                    tdClass: 'text-right',
                    field: 'groups',
                    filterable: true,
                    sortable: false
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
