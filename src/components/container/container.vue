<template>
    <div class="constainer-box">
        <div class="container-fluid">
            <v-header></v-header>
            <menu-left></menu-left>
            <div>container</div>
        </div>
    </div>
</template>


<script>
import header from '../header/header'
import menuLeft from '../menuLeft/menuLeft'
export default{
    data () {
        return {

        }
    },
    components: { 
        'v-header': header,
        'menu-left': menuLeft
    }
}
</script>


<style lang="scss">
.constainer-box {
    background-color: #ccc;
    overflow-y: auto;
} 
</style>