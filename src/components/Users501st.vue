<template>
    <div>
        <b-breadcrumb :items="breadcrumbs"/>
        <h1>
            {{info.unit.name}}
        </h1>

        <h2 class="mt-4 mb-2">
            {{$t('staff')}}
            <small class="text-muted">
                ({{officerLength}})
            </small>
        </h2>
        <vue-good-table
            v-bind:rows="info.unit.officers"
            v-bind:columns="officerColumns"
            :globalSearch="true"
            styleClass="table condensed table-bordered table-striped"
        >
            <template slot="table-row" slot-scope="props">
                <div v-if="props.column.field === 'office'">
                    {{props.row.office}}
                </div>
                <div v-if="props.column.field === 'full-name'">
                    {{props.row.fullName}}
                </div>
                <div v-if="props.column.field === 'office-acronym'">
                    {{props.row.officeAcronym}}
                </div>
                <div v-if="props.column.field === 'legion-id'">
                    {{getLegionId(props.row)}}
                </div>
                <div v-if="props.column.field === 'profile-url'">
                    <a v-bind:href="props.row.profileUrl" class="btn btn-primary">
                        View 501st profile
                    </a>
                </div>
            </template>
        </vue-good-table>

        <h2 class="mt-4 mb-2">
            {{$t('members')}}
            <small class="text-muted">
                ({{info.unit.unitSize}}
            </small>
        </h2>

        <vue-good-table
            v-bind:rows="info.unit.members"
            v-bind:columns="memberColumns"
            :globalSearch="true"
            styleClass="table condensed table-bordered table-striped"
        >
            <template slot="table-row" slot-scope="props">
                <div v-if="props.column.field === 'thumbnail'">
                    <img v-bind:src="props.row.thumbnail" width="50" />
                </div>
                <div v-if="props.column.field === 'legion-id'">
                    {{getLegionId(props.row)}}
                </div>
                <div v-if="props.column.field === 'link'">
                    <a v-bind:href="props.row.link" class="btn btn-primary">
                        View 501st profile
                    </a>
                </div>
            </template>
        </vue-good-table>
    </div>
</template>

<script>
import { get501stUsers } from '../utils/users-api'

export default {
    name: 'events',
    methods: {
        get501stUsers () {
            get501stUsers().then((info) => {
                this.info = info
            })
        },
        getLegionId (rowObj) {
            return rowObj.legionId.replace('&nbsp;', ' ')
        }
    },
    computed: {
        officerLength: function () {
            if (this.info && this.info.unit.officers) {
                return this.info.unit.officers.length
            }
        }
    },
    data () {
        return {
            breadcrumbs: [{
                text: 'Home',
                to: '/'
            }, {
                text: '501st Users',
                active: true
            }],
            info: {
                name: '',
                unit: {
                    unitSize: '',
                    officers: [],
                    members: []
                }
            },
            officerColumns: [
                {
                    label: 'Office',
                    field: 'office',
                    filterable: true
                },
                {
                    label: 'Full name',
                    field: 'full-name',
                    filterable: true
                },
                {
                    label: 'Office Acronym',
                    field: 'office-acronym',
                    filterable: true
                },
                {
                    label: 'Legion ID',
                    field: 'legion-id',
                    filterable: true
                },
                {
                    label: '501st Profile',
                    field: 'profile-url',
                    filterable: true
                }
            ],
            memberColumns: [
                {
                    label: 'Thumbnail',
                    field: 'thumbnail',
                    filterable: true
                },
                {
                    label: 'Legion ID',
                    field: 'legion-id',
                    filterable: true
                },
                {
                    label: '501st Profile',
                    field: 'link',
                    filterable: true
                }
            ]
        }
    },
    mounted () {
        this.get501stUsers()
    }
}
</script>
