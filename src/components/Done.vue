<template>
    <div class="load">
        <ion-icon :icon="checkmarkCircle"></ion-icon>
        <h4>Done</h4>
    </div>
  </template>
  
<script setup>
    import { IonIcon } from '@ionic/vue';
    import { checkmarkCircle } from "ionicons/icons"

</script>

<style scoped>

.load {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background-color: #b7faaf;
    height: fit-content;
    width: fit-content;
    margin: auto;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    flex-direction: row;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    box-shadow: 0px 0px 24px -2px rgba(0,0,0,0.75);
    -webkit-box-shadow: 0px 0px 24px -2px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 24px -2px rgba(0,0,0,0.75);
}

h4 {
    margin-left: 1rem;
    /* background-color: red; */
    margin-top: 0.5rem;
}
ion-icon {
    color: green;
    font-size: 2rem;
}
</style>