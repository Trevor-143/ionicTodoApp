<template>
    <ion-page>
        <ion-header :translucent="true" class="ion-no-border" >
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>Good Morning</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <div class="theForm">
                <h3> <ion-icon :icon="addCircle"></ion-icon> <span>Hey, Add new Task</span> </h3>
                <ion-list lines="none" >
                    <ion-item>
                        <ion-label position="floating">Task</ion-label>
                        <ion-input placeholder="Enter text"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-select placeholder="Select category">
                            <ion-select-option 
                            v-for="(i, index) in categories" :key="index"
                            :value="i"
                            >
                                {{ i }}
                            </ion-select-option>
                            <!-- <ion-select-option value="apples">Apples</ion-select-option>
                            <ion-select-option value="oranges">Oranges</ion-select-option>
                            <ion-select-option value="bananas">Bananas</ion-select-option> -->
                        </ion-select>
                    </ion-item>
                    <ion-button expand="block" >Add Task</ion-button>
                </ion-list>
            </div>
            <div class="cats" v-for="(i, index) in cats" :key="index">
                <div class="oneCat">
                    <ion-icon :icon="i.icon"></ion-icon>
                    <span>{{ i.name }}</span>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>

import { IonPage, IonHeader, IonSelect, IonSelectOption, IonIcon, IonList, IonItem, IonInput, IonLabel, IonButton, IonContent, IonButtons, IonMenuButton, IonTitle, IonToolbar,  } from "@ionic/vue"
import { addCircle, listCircle, checkmarkCircle, alertCircle, pauseCircle } from "ionicons/icons"

const cats = [
    { icon: listCircle, name: 'All Tasks' },
    { icon: checkmarkCircle, name: 'Complete Tasks' },
    { icon: alertCircle, name: 'Pending Tasks' },
    { icon: pauseCircle, name: 'Paused Tasks' }
]

const categories = [ 'Family', 'Friends', 'Work', 'Personal', 'Health', ]

</script>

<style scoped>
ion-title {
    font-weight: 700;
}
.theForm {
    height: fit-content;
    display: flex;
    /* align-items: center; */
    flex-direction: column;
    /* justify-content: center; */
}
h3 {
    margin: 0.5rem;
    display: flex;
    align-items: center;
    margin-top: 2rem;
    margin-left: 1rem;
}
h3 ion-icon {
    color: #4c8dff;
    font-size: 2rem;
    margin-right: 1rem;
}
h3 span {
    font-size: 0.8rem;
}
ion-list {
    width: 100%;
    /* margin: 0.5rem; */
} 
ion-item {
    --ion-item-background: #f3f3f3;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    margin: 0.8rem;
    padding: 0.3rem 0;
    background-color: #f3f3f3;
}
ion-button {
    --border-radius: 0.5rem;
    --padding-top: 1rem;
    --padding-bottom: 1rem;
    font-weight: 800;
    margin: 0.5rem;
    margin-top: 2rem;
}
</style>