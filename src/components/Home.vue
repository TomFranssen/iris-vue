<template>
    <div>
        <h1>
            Welcome to IRIS
        </h1>

        <pre>
            {{$store.state.profile}}
        </pre>

        <b-alert show variant="danger" v-if="$store.state.profile.email_verified === false">
            {{$t('verify-email-text')}}
        </b-alert>

    </div>
</template>
<script>
    export default {
        name: 'Home'
    }
</script>
