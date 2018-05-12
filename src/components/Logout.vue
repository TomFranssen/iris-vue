<template>
    <div>
        <p>
            {{$t('getting-logged-out')}}
        </p>
    </div>
</template>
<script>
import { logout } from '../utils/auth'

export default {
    name: 'Logout',
    created () {
        if (confirm(this.$t('getting-logged-out'))) {
            logout()
            this.$router.push('/')
        }
    }
}
</script>
