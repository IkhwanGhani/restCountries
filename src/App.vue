<template>
    <v-app>
        <!-- APP HEADER -->
        <app-header></app-header>

        <!-- CONTENT -->
        <v-content>
            <transition name="slide">
                <router-view></router-view>
            </transition>
        </v-content>
    </v-app>
</template>

<script>
import AppHeader from '@/components/AppHeader'

export default {
    components: {
        'app-header': AppHeader,
    },
    data() {
        return {

        }
    }
}
</script>
