<template>
    <div>
        <b-breadcrumb :items="breadcrumbs"/>
        <h1>
            {{info.unit.name}}
            <small class="text-muted">
                ({{info.unit.unitSize}} {{$t('members')}})
            </small>
        </h1>

        <h2>{{$t('staff')}}</h2>

        <vue-good-table
            v-bind:rows="info.unit.officers"
            v-bind:columns="officerColumns"
            :globalSearch="true"
            styleClass="table condensed table-bordered table-striped"
        >
            <template slot="table-row" scope="props">
                <td>{{props.row.fullName}}</td>
                <td>{{getLegionId(props.row)}}</td>
                <td>{{props.row.officeAcronym}}</td>
                <td>{{getLegionId(props.row)}}</td>
                <td class="text-right">
                    <a href="" v-bind:href="props.row.link" class="btn btn-primary">
                        View 501st profile
                    </a>
                </td>
            </template>
        </vue-good-table>

        <h2 class="">{{$t('members')}}</h2>

        <vue-good-table
            v-bind:rows="info.unit.members"
            v-bind:columns="memberColumns"
            :globalSearch="true"
            styleClass="table condensed table-bordered table-striped"
        >
            <template slot="table-row" scope="props">
                <td width="50">
                    <img v-bind:src="props.row.thumbnail" width="50" />
                </td>
                <td>{{getLegionId(props.row)}}</td>
                <td class="text-right">
                    <a href="" v-bind:href="props.row.link" class="btn btn-primary">
                        View 501st profile
                    </a>
                </td>
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
                        label: 'Full name',
                        field: 'fullName',
                        filterable: true
                    },
                    {
                        label: 'Office',
                        field: 'office',
                        filterable: true
                    },
                    {
                        label: 'Office Acronym',
                        field: 'officeAcronym',
                        filterable: true
                    },
                    {
                        label: 'Legion ID',
                        field: this.getLegionId,
                        filterable: true
                    },
                    {
                        label: '501st Profile',
                        field: 'profileUrl',
                        filterable: true
                    }
                ],
                memberColumns: [
                    {
                        label: 'Thumnail',
                        field: 'thumbnail',
                        filterable: true
                    },
                    {
                        label: 'Legion ID',
                        field: this.getLegionId,
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
