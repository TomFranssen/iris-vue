<template>
    <div>
        <b-breadcrumb :items="breadcrumbs"/>

        <h1>{{$t('user-details')}}</h1>
        <div>
            <b-row class="form-row">
                <b-col cols="5" md="4" lg="2">{{$t('username')}}:</b-col>
                <b-col>
                    {{user.user_metadata.username}}
                </b-col>
            </b-row>
        </div>
        <div>
            <b-row class="form-row">
                <b-col cols="5" md="4" lg="2">{{$t('legion_thumbnail')}}:</b-col>
                <b-col>
                    <img v-bind:src="user.user_metadata.legion_thumbnail" alt="">
                </b-col>
            </b-row>
        </div>
        <div>
            <b-row class="form-row">
                <b-col cols="5" md="4" lg="2">{{$t('501st-legion-id')}}:</b-col>
                <b-col>
                    {{getLegionId(user)}}
                </b-col>
            </b-row>
        </div>
        <div>
            <b-row class="form-row">
                <b-col cols="5" md="4" lg="2">{{$t('email')}}:</b-col>
                <b-col>
                    {{user.email}}
                </b-col>
            </b-row>
        </div>

        <div>
            <b-row class="form-row">
                <b-col cols="5" md="4" lg="2">{{$t('501st-costumes')}}:</b-col>
                <b-col>
                    <div class="costume-row mb-1 clearfix" v-for="costume in myDgCostumes" v-bind:key="costume.costumeId">
                        <img class="float-left" v-bind:src="costume.thumbnail" alt="">
                        <h5 class="card-title">{{costume.costumeName}}</h5>
                    </div>
                </b-col>
            </b-row>
        </div>
        <div>
            <b-row class="form-row">
                <b-col cols="5" md="4" lg="2">{{$t('extra-costumes')}}:</b-col>
                <b-col>
                    <div v-for="(costume, index) in user.user_metadata.costumes" v-bind:key="index">
                        {{costume.name}}
                    </div>
                </b-col>
            </b-row>
        </div>

        <h1>{{$t('signed-up-for-events')}}</h1>

        <div>
            <ul v-if="signedupEvents.length > 0" class="list-unstyled">
              <li v-for="event in signedupEvents" v-bind:key="event._id">
                <a v-bind:href="'/event/' + event._id">
                    {{ event.name }}
                </a>
              </li>
            </ul>
            <div v-else>
                {{$t('no-signups-for-member')}}
            </div>
        </div>

        <div v-if="$store.getters.isDgGec">
            <h1>{{$t('edit-user')}}</h1>
            <form action="">
                <b-row class="form-row">
                    <b-col cols="5" md="4" lg="2"><label for="username">{{$t('username')}}:</label></b-col>
                    <b-col>
                        <b-form-input name="username" v-model.trim="user.user_metadata.username" id="username" size="sm" type="text"></b-form-input>
                        <p class="text-danger" v-if="errors.has('username')">{{ errors.first('username') }}</p>
                    </b-col>
                </b-row>
                <b-row class="form-row">
                    <b-col cols="5" md="4" lg="2"><label for="username">{{$t('legion_thumbnail')}}:</label></b-col>
                    <b-col>
                        <b-form-input name="legion_thumbnail" v-model.trim="user.user_metadata.legion_thumbnail" id="legion_thumbnail" size="sm" type="text"></b-form-input>
                        <p class="text-danger" v-if="errors.has('legion_thumbnail')">{{ errors.first('legion_thumbnail') }}</p>
                    </b-col>
                </b-row>
                <b-row class="form-row">
                    <b-col cols="5" md="4" lg="2"><label for="legion-id">{{$t('501st-legion-id')}}:</label></b-col>
                    <b-col>
                        <b-form-input name="legion-id" v-model.trim="user.user_metadata.legion_id" id="legion-id" size="sm" type="text"></b-form-input>
                        <p class="text-danger" v-if="errors.has('legion-id')">{{ errors.first('legion-id') }}</p>
                    </b-col>
                </b-row>
                <b-row class="form-row" v-for="(costume, index) in user.user_metadata.costumes" v-bind:key="index">
                    <b-col cols="5" md="4" lg="2"><label>{{$t('extra-costume')}} {{index + 1}}</label></b-col>
                    <b-col>
                        <v-select placeholder="test" label="name" v-model="user.user_metadata.costumes[index]" v-bind:options="costumes"></v-select>
                        <p class="text-danger" v-if="errors.has('costume-' + index)">{{ errors.first('costume-' + index + 1) }}</p>
                    </b-col>
                    <b-col cols="12" sm="4" md="3" lg="2" class="mb-2 mt-2 mb-sm-0 mt-sm-0">
                        <button class="pull-right btn btn-block btn-default" type="button" v-on:click="removeCostume(index)">
                            <i class="fa fa-times" aria-hidden="true"></i>
                            {{$t('remove')}}
                        </button>
                    </b-col>
                </b-row>
                <div class="clearfix">
                    <button class="btn btn-secondary pull-right btn-block-xs" type="button" v-on:click="addCostume">
                        <i class="fa fa-plus" aria-hidden="true"></i>
                        {{$t('add-costume')}}
                    </button>
                </div>
                <b-row class="form-row">
                    <b-col>
                        <b-button v-on:click="saveUser" class="btn-block-xs mt-5 mt-sm-0" size="lg" variant="primary">
                            <i class="fa fa-floppy-o" aria-hidden="true"></i>
                            {{$t('save-user')}}
                        </b-button>
                    </b-col>
                </b-row>
            </form>
        </div>
    </div>
</template>

<script>
import Axios from 'axios'
import { getPrivateUser } from '../utils/users-api'
import { getPrivateCostumes, getDgCostumes } from '../utils/costume-api'
import { getPrivateSignedUpEventsForUser } from '../utils/events-api'

Axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')

export default {
    name: 'user-details',
    props: ['id'],
    computed: {
        myDgCostumes () {
            const legionId = this.user.user_metadata.legion_id
            if (this.dgcostumes && this.dgcostumes.unit && this.dgcostumes) {
                const user = this.dgcostumes.unit.members.find((member) => {
                    return member.legionId.toString() === legionId.toString()
                })
                if (user) {
                    return user.costumes
                }
            }
            return false
        }
    },
    methods: {
        getDgCostumes () {
            getDgCostumes().then((costumes) => {
                this.dgcostumes = costumes
            })
        },
        getPrivateSignedUpEventsForUser (userId) {
            getPrivateSignedUpEventsForUser(userId).then((events) => {
                this.signedupEvents = events.sort(function (a, b) {
                    let adate = new Date(a.eventDates[0].date)
                    let bdate = new Date(b.eventDates[0].date)
                    let rv = adate - bdate
                    if (rv === 0) {
                        rv = a.name.localeCompare(b.name)
                    }
                    return rv
                })
            })
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

                this.getPrivateSignedUpEventsForUser(user.user_id)
            })
        },
        saveUser: function () {
            Axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
            const self = this
            this.$validator.validateAll().then((result) => {
                if (result) {
                    const clone = Object.assign({}, this.$data)
                    delete clone.dgcostumes
                    if (confirm(this.$t('do-you-want-to-change-user'))) {
                        Axios.patch(`${process.env.VUE_APP_API_URL}/api/private/user`, clone)
                            .then(function (response) {
                                if (response.status === 200) {
                                    alert(self.$t('user-saved'))
                                }
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
            signedupEvents: {},
            dgcostumes: [],
            value: '',
            suggestionAttribute: 'name',
            suggestions: [],
            breadcrumbs: [{
                text: 'Home',
                to: '/'
            }, {
                text: this.$t('users'),
                to: '/users'
            }, {
                text: this.$t('user-details'),
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
        this.getDgCostumes()
        this.getPrivateUser()
        this.getPrivateCostumes()
    }
}
</script>

<style>
    .costume-row {
        display: flex;
        align-items: center;
    }
    .costume-row img {
        margin-right: 10px;
    }
    .sbx-google__reset,
    .sbx-google__submit {
        display: none !important;
    }
    .sbx-google__input-placeholder,
    .sbx-google__input {
        padding-right: 5px;
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
