<template>
    <div>
        <h2>Dashboard</h2>
        <p>Yay you made it!</p>

        <div>
            {{isLoggedIn()}}
        </div>

    </div>
</template>


<script>
    import { isLoggedIn } from '../utils/auth'

    export default {
        name: 'dashbaord',
        methods: {
            isLoggedIn () {
                return isLoggedIn()
            }
        }
    }
</script>
