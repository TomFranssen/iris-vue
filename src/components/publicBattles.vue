<template>
    <div>
        <h3 class="text-center">Login for events</h3>
        <div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/4oy6El408pM8o" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/ah-4oy6El408pM8o">via GIPHY</a></p>
    </div>
</template>

<script>
    import { isLoggedIn } from '../utils/auth'
    import { getPublicStartupBattles } from '../utils/events-api'

    export default {
        name: 'publicBattles',
        data () {
            return {
                publicBattles: ''
            }
        },
        methods: {
            isLoggedIn () {
                return isLoggedIn()
            },
            getPublicStartupBattles () {
                getPublicStartupBattles().then((battles) => {
                    this.publicBattles = battles
                })
            }
        },
        mounted () {
            this.getPublicStartupBattles()
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
