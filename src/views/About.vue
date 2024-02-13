<template>
    <ion-page>
        <ion-header :translucent="true" class="ion-no-border" >
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary">
                        <ion-icon :icon="menu" ></ion-icon>
                    </ion-menu-button>
                </ion-buttons>
                <ion-title>About</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div class="content">
                <img src="/tasckyLogo.png" alt="Tascky logo">
                <div class="rem">
                    <ion-text>
                        Introducing Tascky, the ultimate todo app that helps you stay organized and on top of your tasks! With our app, you can easily add new todos, delete them when they’re no longer needed, mark them as complete when you’re done, and even pause them when you need a break. Our app is designed to be user-friendly and intuitive, so you can focus on what really matters - getting things done! Whether you’re a busy professional, a student, or just someone who wants to stay on top of their tasks, our app has everything you need to stay organized and productive. So why wait? Download our app today and start getting things done!
                    </ion-text>
                </div>
                <div class="rem">
                    <ion-text>
                        Remember your can swipe on any task. Swipe right to pause and redo a task. Swipe left to complete and delete a task.
                    </ion-text>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonText, IonThumbnail, IonContent, IonToolbar, IonButtons, IonMenuButton, IonIcon, IonTitle } from "@ionic/vue"
import { menu } from "ionicons/icons"

</script>

<style scoped>

.md body ion-toolbar {
    --padding-top: 10px;
    /* --padding-start: 10px; */
    --padding-end: 10px;
    --padding-bottom: 10px;
}
.ios body ion-toolbar {
    --padding-top: 20px;
    --padding-start: 20px;
    --padding-end: 20px;
    --padding-bottom: 20px;
}
ion-content .content {
    padding: 1rem;
    margin: 1rem;
    background-color: #f7f7f7;
    border-radius: 1rem;
}
img {
    /* margin-bottom: 1.5rem; */
    width: 50px;
}
.rem {
    margin-top: 2rem;
    border-radius: 1rem;
}
@media (prefers-color-scheme: dark) {
    ion-content .content {
        padding: 1rem;
        margin: 1rem;
        background-color: #303030;
        border-radius: 1rem;
    }
    .rem {
        background-color: #000000;
        padding: 1rem;
        margin-top: 2rem;
        border-radius: 1rem;
    }
}
</style>