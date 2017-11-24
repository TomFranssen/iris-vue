<template>
    <div>
        <b-breadcrumb :items="breadcrumbs"/>
        <div class="row">
            <div class="col">
                <h1>User details</h1>
                <div>
                    {{user.user_metadata.username}}
                </div>
                <div>
                    {{user.email}}
                </div>
                <div>
                    <img v-bind:src="user.picture" alt="">
                </div>
                <div>
                    {{getLegionId(user)}}
                </div>
                <div>
                    <img v-bind:src="getLegionThumbnail(user)" alt="">
                </div>
            </div>
            <div class="col">
                <h1>Edit user</h1>
                <form action="">
                    <b-row class="form-row">
                        <b-col sm="3"><label for="username">{{$t('username')}}:</label></b-col>
                        <b-col sm="9">
                            <b-form-input name="username" v-model.trim="user.user_metadata.username" id="username" size="sm" type="text"></b-form-input>
                            <p class="text-danger" v-if="errors.has('username')">{{ errors.first('username') }}</p>
                        </b-col>
                    </b-row>
                    <b-row class="form-row">
                        <b-col sm="3"><label for="legion-id">{{$t('501st-legion-id')}}:</label></b-col>
                        <b-col sm="9">
                            <b-form-input name="legion-id" v-model.trim="user.user_metadata.legion_id" id="legion-id" size="sm" type="text"></b-form-input>
                            <p class="text-danger" v-if="errors.has('legion-id')">{{ errors.first('legion-id') }}</p>
                        </b-col>
                    </b-row>
                        <b-row class="form-row" v-for="(costume, index) in user.user_metadata.costumes" v-bind:key="index">
                            <b-col sm="3"><label>{{$t('costume')}} {{index + 1}}</label></b-col>
                            <b-col sm="5">
                                <vue-instant
                                    v-on:input="changed()"
                                    v-model="costume.name"
                                    v-bind:suggestion-attribute="suggestionAttribute"
                                    v-bind:disabled="false"
                                    v-bind:show-autocomplete="true"
                                    v-bind:autofocus="false"
                                    v-bind:suggestions="suggestions"
                                    v-bind:name="'costume-'"
                                    placeholder="Start typing to search for costumes"
                                    type="google"
                                >
                                </vue-instant>
                                <p class="text-danger" v-if="errors.has('costume-' + index)">{{ errors.first('costume-' + index + 1) }}</p>
                            </b-col>
                            <b-col sm="4">
                                <button class="pull-right btn btn-block btn-default" type="button" v-on:click="removeCostume(index)">
                                    <i class="fa fa-times" aria-hidden="true"></i>
                                    {{$t('remove-costume')}}
                                </button>
                            </b-col>
                        </b-row>
                    <button class="btn btn-primary" type="button" v-on:click="addCostume">
                        <i class="fa fa-plus" aria-hidden="true"></i>
                        {{$t('add-costume')}}
                    </button>
                    <b-row class="form-row">
                        <b-col>
                            <b-button v-on:click="saveUser" size="lg" variant="primary">
                                {{$t('save-user')}}
                            </b-button>
                        </b-col>
                    </b-row>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'
    import { getPrivateUser } from '../utils/users-api'
    import { getPrivateCostumes } from '../utils/costume-api'

    export default {
        name: 'user-details',
        props: ['id'],
        methods: {
            changed: function () {
                const that = this
                this.suggestions = []
                function filterCostume (costume) {
                    const value = that.value.toLowerCase()

                    return (costume.name.toLowerCase().indexOf(value) !== -1)
                }

                this.suggestions = this.costumes.filter(filterCostume)
            },
            getPrivateCostumes () {
                getPrivateCostumes().then((costumes) => {
                    this.costumes = costumes
                })
            },
            addCostume: function () {
                if (typeof this.user.user_metadata.costumes === 'undefined') {
                    this.$set(this.user.user_metadata, 'costumes', [])
                }
                this.user.user_metadata.costumes.push({
                    name: ''
                })
            },
            removeCostume: function (index) {
                this.$delete(this.user.user_metadata.costumes, index)
            },
            getLegionId: function (user) {
                if (user.user_metadata && user.user_metadata.legion_id) {
                    return user.user_metadata.legion_id
                }
                return ''
            },
            getLegionThumbnail: function (user) {
                if (user.user_metadata && user.user_metadata.legion_thumbnail) {
                    return user.user_metadata.legion_thumbnail
                }
                return ''
            },
            getPrivateUser () {
                const userId = this.$route.params.user_id
                getPrivateUser(userId).then((user) => {
                    if (!user.user_metadata) {
                        user.user_metadata = {}
                    }
                    if (!user.user_metadata.legion_id) {
                        user.user_metadata.legion_id = ''
                    }
                    this.user = user
                })
            },
            saveUser: function () {
                const self = this
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        if (confirm('Do you want to change this user?')) {
                            Axios.patch(`${process.env.API_URL}/api/private/user`, this.$data)
                                .then(function (response) {
                                    if (response.data.message) {
                                        alert(response.data.message)
                                        self.$router.push('users')
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
                value: '',
                suggestionAttribute: 'name',
                suggestions: [],
                breadcrumbs: [{
                    text: 'Home',
                    to: '/'
                }, {
                    text: 'Users',
                    to: '/users'
                }, {
                    text: 'User details',
                    active: true
                }],
                user: {
                    user_metadata: {
                        legion_id: '',
                        costumes: [{
                            name: ''
                        }]
                    }
                },
                costumes: []
            }
        },
        mounted () {
            this.getPrivateUser()
            this.getPrivateCostumes()
        }
    }
</script>

<style>
    .sbx-google__submit {
        display: none !important;
    }
    .sbx-google__reset {
        right: 10px;
    }
    .form-row {
        margin-bottom: 10px;
    }
    .sbx-google {
        width: 100%;
    }
</style>

