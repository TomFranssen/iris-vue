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
                        <b-row class="form-row" v-for="(costume, index) in user.user_metadata.costumes" v-bind:key="costume.name">
                            <b-col sm="3"><label>{{$t('costume')}} {{index + 1}}</label></b-col>
                            <b-col sm="7">
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
                            <b-col sm="2">
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
//                costumes: [
//                    `A'Sharad Hett`,
//                    `AT-ST Driver`,
//                    `AT-RT Driver`,
//                    `AT-AT Commander`,
//                    `AT-AT Driver`,
//                    `Imperial Combat Driver`,
//                    `Imperial Troop Transport Driver`,
//                    `Snow Scout`,
//                    `Snowtrooper`,
//                    `Snowtrooper Commander`,
//                    `Galactic Marine`,
//                    `Wampa`,
//                    `4-LOM`,
//                    `Aurra Sing: The Phantom Menace`,
//                    `Bo Katan`,
//                    `Boba Fett: The Empire Strikes Back`,
//                    `Boushh`,
//                    `Cad Bane in Denal Disguise`,
//                    `Deliah Blue`,
//                    `Dengar`,
//                    `ARC Trooper (TCW): Blitz`,
//                    `Greedo`,
//                    `Jango Fett: AOTC`,
//                    `Kal Skirata`,
//                    `Mandalorian Super Commando: Captain`,
//                    `Pre Vizsla`,
//                    `Snaggletooth - Zutton`,
//                    `Zam Wesell`,
//                    `ARC Trooper (TCW): Colt`,
//                    `ARC Trooper (TCW): Echo`,
//                    `ARC Trooper (TCW): Fives`,
//                    `ARC Trooper (TCW): Hammer`,
//                    `ARC Trooper (TCW): Havoc`,
//                    `ARC Trooper: Alpha`,
//                    `ARC Trooper: Heavy Gunner (Beta)`,
//                    `ARC Trooper: Null Class`,
//                    `ARC Trooper: Standard`,
//                    `Clone Trooper: AOTC: Captain`,
//                    `Clone Trooper: AOTC: Commander`,
//                    `Clone Trooper: AOTC: Lieutenant`,
//                    `Clone Trooper: AOTC: Sergeant`,
//                    `Clone Trooper: AOTC: Standard Trooper, Phase I`,
//                    `Clone Trooper: CW: 41st (Green Company)`,
//                    `Clone Trooper: CW: Boil`,
//                    `Clone Trooper: CW: Coruscant Guard`,
//                    `Clone Trooper: CW: Denal`,
//                    `Clone Trooper: CW: Draa`,
//                    `Clone Trooper: CW: Echo (Blue Handprint)`,
//                    `Clone Trooper: CW: Echo (For Hevy)`,
//                    `Clone Trooper: CW: Fives (For Hevy)`,
//                    `Clone Trooper (CW): Boost, Phase 2`,
//                    `Clone Trooper: CW: Hardcase, Phase 1`,
//                    `Clone Trooper: CW: Jek`,
//                    `Clone Trooper: CW: Scythe`,
//                    `Clone Trooper: CW: Squawk`,
//                    `Clone Trooper: CW: Standard Trooper`,
//                    `Clone Trooper: CW: Waxer`,
//                    `Clone Trooper: Scuba Trooper (2D CW Series)`,
//                    `Clone Trooper: Training Fatigues`,
//                    `Clone Trooper (CW): Comet, Phase 2`,
//                    `Clone Trooper (CW): Dogma, Phase 2`,
//                    `Clone Trooper (CW): Hardcase, Phase 2`,
//                    `Clone Trooper (CW): Jesse, Phase 2`,
//                    `Clone Trooper (CW): Sergeant Neyo, Phase 2`,
//                    `Clone Trooper (CW): Shock Trooper`,
//                    `Clone Trooper (CW): Sinker, Phase 2`,
//                    `Clone Trooper (CW): Standard Trooper, Phase 2`,
//                    `Clone Trooper (ROTS): 187th Attack Battalion`,
//                    `Clone Trooper (ROTS): 212th Attack Battalion`,
//                    `Clone Trooper (ROTS): 327th Star Corps`,
//                    `Clone Trooper (ROTS): 41st Elite Corps`,
//                    `Clone Trooper (ROTS): 442nd Siege Battalion`,
//                    `Clone Trooper (ROTS): 501st Vader's Fist`,
//                    `Clone Trooper (ROTS): Shock Trooper`,
//                    `Clone Trooper (ROTS): Soldier`,
//                    `Clone Captain (TCW): Keeli`,
//                    `Clone Captain: Rex (Cold Weather Gear)`,
//                    `Clone Captain: Rex (Phase I, CW)`,
//                    `Clone Captain: Rex (Phase II, CW)`,
//                    `Clone Commander: Appo (Phase II, CW)`,
//                    `Clone Commander: Appo (Phase II, ROTS)`,
//                    `Clone Commander: Bacara`,
//                    `Clone Commander: Blackout`,
//                    `Clone Commander: Bly (Phase I, CW)`,
//                    `Clone Commander: Bly (Phase II, ROTS)`,
//                    `Clone Commander: Cody (Phase I, CW)`,
//                    `Clone Commander: Cody (Phase II, ROTS)`,
//                    `Clone Commander: Deviss`,
//                    `Clone Commander: Doom`,
//                    `Clone Commander: Fil`,
//                    `Clone Commander: Fox (Phase I, CW)`,
//                    `Clone Commander: Fox (Phase II, CW)`,
//                    `Clone Commander: Ganch (Phase I)`,
//                    `Clone Commander: Ganch (Phase II)`,
//                    `Clone Commander: Gree (Phase I, CW)`,
//                    `Clone Commander: Gree (Phase II, ROTS)`,
//                    `Clone Commander: Jet`,
//                    `Clone Commander: Neyo`,
//                    `Clone Commander: Stone`,
//                    `Clone Commander: Thire (Phase 1, CW)`,
//                    `Clone Commander: Thorn`,
//                    `Clone Commander: Trauma`,
//                    `Clone Commander: Vill`,
//                    `Clone Commander: Wolffe (Season 2)`,
//                    `Clone Commander: Wolffe (Season 3)`,
//                    `Clone Commander: Wolffe (Season 4)`,
//                    `Clone Pilot (AOTC)`,
//                    `Clone Pilot: CW: Axe`,
//                    `Clone Pilot: CW: Broadside`,
//                    `Clone Pilot: CW: Goji`,
//                    `Clone Pilot: CW: Matchstick`,
//                    `Clone Pilot: CW: Oddball`,
//                    `Clone Pilot: CW: Swoop`,
//                    `Republic Commando: Atin`,
//                    `Republic Commando: Boss`,
//                    `Republic Commando: Darman`,
//                    `Republic Commando: Fi`,
//                    `Republic Commando: Fixer`,
//                    `Republic Commando: Grunt`,
//                    `Republic Commando: Niner`,
//                    `Republic Commando: Scorch`,
//                    `Republic Commando: Sev`,
//                    `Airborne Trooper, 187th Attack Battalion`,
//                    `Airborne Trooper, 212th Parjai Squad`,
//                    `Airborne Trooper, 501st`,
//                    `ARF Trooper (Camo Deco)`,
//                    `ARF Trooper (White Armor)`,
//                    `ARF Trooper: Boil (Camo Deco)`,
//                    `ARF Trooper: Sgt. Boomer`,
//                    `ARF Trooper: Sgt. Hound`,
//                    `ARF Trooper: Waxer (Camo Deco)`,
//                    `ARF Trooper: Wiley`,
//                    `Utapau Shadow Trooper`,
//                    `Stormtrooper: ANH Hero`,
//                    `Stormtrooper: ANH Stunt`,
//                    `Stormtrooper: Commander`,
//                    `Stormtrooper: Concept Armor`,
//                    `Stormtrooper: Death Trooper`,
//                    `Stormtrooper: ESB`,
//                    `Stormtrooper: First Order`,
//                    `Stormtrooper: Heavy Weapons Trooper`,
//                    `Stormtrooper: Incinerator Trooper`,
//                    `Stormtrooper: Legacy Era Female`,
//                    `Stormtrooper: ROTJ`,
//                    `Stormtrooper: Sky Trooper`,
//                    `Arica: Blue Dancer Disguise`,
//                    `Arica: Bodysuit`,
//                    `Eleena Daru`,
//                    `Guri`,
//                    `Prince Xizor`,
//                    `Sinya`,
//                    `Darth Maladi`,
//                    `Darth Malgus `,
//                    `Darth Nihilus: COTF`,
//                    `Darth Nihilus: KOTOR`,
//                    `Darth Revan`,
//                    `Darth Talon`,
//                    `Darth Traya`,
//                    `Sith Acolyte (SWTOR)`,
//                    `Starkiller: Concept Sith Robes`,
//                    `Starkiller: Dark Lord's Armor (Hoth)`,
//                    `Starkiller: Heavy Training Gear (Raxus Prime)`,
//                    `Starkiller: Light Training Gear (Felucia)`,
//                    `Starkiller: Training Gear (TIE Factory)`,
//                    `Visas Marr: KOTOR II`,
//                    `Visas Marr: Unseen, Unheard`,
//                    `Asajj Ventress: Clone Wars `,
//                    `Asajj Ventress: Concept`,
//                    `Asajj Ventress: Night Sister`,
//                    `Asajj Ventress: Sash Belt`,
//                    `Brakiss`,
//                    `Mara Jade: Black bodysuit`,
//                    `Mara Jade: Black Nebula`,
//                    `Maris Brood`,
//                    `Night Sisters: Dark Force Witch`,
//                    `Imperial Gunner`,
//                    `Armand Isard`,
//                    `Imperial Officer: Admiral Daala - Flight Suit`,
//                    `Imperial Officer: Admiral Daala - Olive Drab`,
//                    `Imperial Officer: Director of Intelligence Isard`,
//                    `Imperial Officer: Grand Admiral Thrawn`,
//                    `Imperial Officer: Grand Moff Tarkin`,
//                    `Imperial Officer: Imperial Grand Admiral`,
//                    `Imperial Officer: Imperial Security Bureau`,
//                    `Imperial Officer: Juno Eclipse - Dress Uniform`,
//                    `Imperial Officer: Juno Eclipse - Rogue Shadow`,
//                    `Imperial Officer: Line Officer, (Olive Drab)`,
//                    `Imperial Officer: Moff Nyna Calixte`,
//                    `Imperial Officer: Staff Officer, (Black)`,
//                    `Imperial Officer: Warrant Officer`,
//                    `Imperial Crew: Bridge Crew`,
//                    `Imperial Crew: Mechanical Crew`,
//                    `Imperial Crew: Scanning Crew`,
//                    `Imperial Navy Trooper`,
//                    `Imperial Navy Trooper: Dress Uniform`,
//                    `TIE Pilot: 181st`,
//                    `TIE Pilot: 181st Fighter Wing, Dress Uniform`,
//                    `TIE Pilot: ANH`,
//                    `TIE Pilot: Reserve Pilot`,
//                    `TIE Pilot: RotJ`,
//                    `TIE Pilot: Baron Fel`,
//                    `Gamorrean Guard`,
//                    `Garindan`,
//                    `Jawa`,
//                    `Malakili (Rancor Keeper)`,
//                    `Ponda Baba`,
//                    `Tonnika Sisters (blue)`,
//                    `Tonnika Sisters (green)`,
//                    `Tusken Raider: ANH (male)`,
//                    `Tusken Raider: AOTC (female)`,
//                    `Tusken Raider: AOTC (male)`,
//                    `Biker Scout`,
//                    `Kashyyyk Trooper (white variant)`,
//                    `Kaskyyyk Trooper`,
//                    `Darth Maul`,
//                    `Darth Maul: Black Sun`,
//                    `Darth Sidious: TPM AOTS (Pre-scarring)`,
//                    `Darth Tyranus: AOTC`,
//                    `Darth Tyranus: ROTS`,
//                    `Darth Tyranus: TCW, Sleepwear`,
//                    `Darth Vader: ANH`,
//                    `Darth Vader: ESB`,
//                    `Darth Vader: Pre-Armor`,
//                    `Darth Vader: ROTJ`,
//                    `Darth Vader: ROTS`,
//                    `Emperor Palpatine: ROTS (Brown Battle Robe)`,
//                    `Emperor Palpatine: ROTS (Red Senate Robe)`,
//                    `Emperor Palpatine: ROTS ESB ROTJ (Black Sith Robe)`,
//                    `Kylo Ren`,
//                    `Captain Argyus`,
//                    `Carnor Jax`,
//                    `Kir Kanos`,
//                    `Royal Guard: AOTC`,
//                    `Royal Guard: ROTJ`,
//                    `Royal Guard: ROTS`,
//                    `Royal Guard: TFU`,
//                    `Senate Guard: TFU`,
//                    `Shadow Guard: TFU`,
//                    `EVO Trooper`,
//                    `General Weir`,
//                    `Imperial Navy Commando`,
//                    `Magma Trooper`,
//                    `Novatrooper`,
//                    `Novatrooper Elite`,
//                    `Novatrooper Medic`,
//                    `Novatrooper Sentinel`,
//                    `Shadow Scout`,
//                    `Shadow Stormtrooper`,
//                    `Shadow Stormtrooper: The Force Unleashed`,
//                    `Swamp Trooper`,
//                    `Sandtrooper`,
//                    `Imperial Officer: Imperial Cadet`
//                ]
            }
        },
        mounted () {
            this.getPrivateUser()
            this.getPrivateCostumes()
        }
    }
</script>

<style>
    /*.sbx-google__submit {*/
        /*display: none !important;*/
    /*}*/
    /*.sbx-google__reset {*/
        /*right: 10px;*/
    /*}*/
    /*.form-row {*/
        /*margin-bottom: 10px;*/
    /*}*/
</style>

