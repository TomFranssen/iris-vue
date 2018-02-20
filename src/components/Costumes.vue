<template>
    <div>
        <b-breadcrumb :items="breadcrumbs"/>
        <h1>{{$t('costumes')}}</h1>
        <template>
            <vue-good-table
                :columns="columns"
                :rows="rows"
                :globalSearch="true"
                styleClass="table table-bordered condensed"
            >
                <template slot="table-row" scope="props">
                    <td class="text-left">{{ props.row.name }}</td>
                </template>
            </vue-good-table>
        </template>

        <form action="#">
            <b-row class="form-row">
                <b-col sm="3"><label for="name">{{$t('name')}}:</label></b-col>
                <b-col sm="9">
                    <b-form-input v-validate="'required'" name="name" v-model.trim="name" id="name" size="sm" type="text"></b-form-input>
                    <p class="text-danger" v-if="errors.has('name')">{{ errors.first('name') }}</p>
                </b-col>
            </b-row>
            <b-row class="form-row">
                <b-col>
                    <b-button v-on:click="saveCostume" size="lg" variant="primary">
                        {{$t('save-costume')}}
                    </b-button>
                </b-col>
            </b-row>
        </form>

    </div>
</template>

<script>
    import Axios from 'axios'
    Axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
    import { getPrivateCostumes } from '../utils/costume-api'

    export default {
        name: 'events',
        methods: {
            getPrivateCostumes () {
                getPrivateCostumes().then((costumes) => {
                    this.rows = costumes
                })
            },
            saveCostume: function () {
                const self = this
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        if (confirm('Do you want to add this costume?')) {
                            Axios.post(`${process.env.API_URL}/api/private/costumes`, this.$data)
                                .then(function (response) {
                                    if (response.data.message) {
                                        alert(response.data.message)
                                        self.$router.push('costumes')
                                    } else {
                                        console.log(response)
                                    }
                                })
                                .catch(function (error) {
                                    console.log(error)
                                })
                        }
                        return
                    }
                    alert('Please correctly fill in all the fields.')
                    this.$el.querySelector('[data-vv-id=' + this.$validator.errors.items[0].id + ']').scrollIntoView()
                })
            }
        },
        data () {
            return {
                breadcrumbs: [{
                    text: 'Home',
                    to: '/'
                }, {
                    text: this.$t('costumes'),
                    active: true
                }],
                name: '',
                columns: [
                    {
                        label: this.$t('name'),
                        tdClass: 'text-right',
                        field: 'name',
                        filterable: true
                    }
                ],
                rows: []
            }
        },
        mounted () {
            this.getPrivateCostumes()
        }
    }
</script>

