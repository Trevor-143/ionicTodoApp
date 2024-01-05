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
                        <ion-input placeholder="type task" v-model="newTaskForm.title" ></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-select placeholder="Select category" v-model="newTaskForm.category" >
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
                    <div class="addBtnCont">
                        <ion-button expand="block" @click="addTask" >Add Task</ion-button>
                    </div>
                </ion-list>
            </div>
            <!-- <Done /> -->
            <h4>Categories</h4>
            <div class="cats">
                <div class="oneCat" v-for="(i, index) in cats" :key="index" :class="i.iconTypeColor" >
                    <ion-icon :icon="i.icon"></ion-icon>
                    <span>{{ i.name }}</span>
                </div>
            </div>
            <div class="completeTasks">
                <h4>Completed Tasks</h4>
                <AllItem />
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>

import { IonPage, IonHeader, IonSelect, IonSelectOption, IonIcon, IonList, IonItem, IonInput, IonLabel, IonButton, IonContent, IonButtons, IonMenuButton, IonTitle, IonToolbar,  } from "@ionic/vue"
import { addCircle, listCircle, checkmarkCircle, alertCircle, pauseCircle } from "ionicons/icons"
import AllItem from "@/components/AllItem.vue"
import Loading from "@/components/Loading.vue"
import Done from "@/components/Done.vue"
import { ref } from "vue"
import { doc, setDoc } from "firebase/firestore"; 
import { Store } from "@/firebase/config"

const cats = [
    { icon: listCircle, name: 'All Tasks', iconTypeColor: 'blue' },
    { icon: checkmarkCircle, name: 'Complete Tasks', iconTypeColor: 'green' },
    { icon: alertCircle, name: 'Pending Tasks', iconTypeColor: 'yellow' },
    { icon: pauseCircle, name: 'Paused Tasks', iconTypeColor: 'orange' }
]

const categories = [ 'Family', 'Friends', 'Work', 'Personal', 'Health', ]

const newTaskForm = ref({
    title: '',
    category: '',
    status: 'pending'   
})

const addTask = async () => {
    console.log(newTaskForm.value)
    const taskId = newTaskForm.value.title.replace(/\ /g, '-')
    await setDoc(doc(Store, "users", "userid-1", 'tasks', taskId), newTaskForm.value);
    console.log('done')
}

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
    border-radius: 1rem;
    margin-bottom: 1rem;
    margin: 0.8rem;
    padding: 0.3rem 0;
    background-color: #f3f3f3;
}
.addBtnCont {
    display: flex;
    align-items: center;
    justify-content: center;
}
ion-button {
    --border-radius: 1.5rem;
    --padding-top: 1rem;
    --padding-bottom: 1rem;
    font-weight: 800;
    margin: 0.5rem 0.7rem;
    margin-top: 1rem;
}
h4 {
    margin: 1rem;
    margin-left: 1.5rem;
}
.cats {
    /* background-color: red; */
    margin: 1rem;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
    font-weight: 600;
}
.blue {
    background-color: rgb(0, 0, 255, 0.2);
    padding: 1rem;
    text-align: center;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.blue ion-icon {
    margin-bottom: 1rem;
    font-size: 3rem;
    /* color: rgb(0, 0, 255); */
    color: #ffffff;
}
.green {
    background-color: rgb(0, 128, 0, 0.2);
    padding: 1rem;
    text-align: center;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.green ion-icon {
    margin-bottom: 1rem;
    font-size: 3rem;
    /* color: rgb(0, 128, 0); */
    color: #ffffff;
}
.yellow {
    background-color: rgb(255, 0, 0, 0.2);
    padding: 1rem;
    text-align: center;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.yellow ion-icon {
    margin-bottom: 1rem;
    font-size: 3rem;
    /* color: rgb(255, 0, 0); */
    color: #ffffff;
}
.orange {
    background-color: rgb(255, 165, 0, 0.2);
    padding: 1rem;
    text-align: center;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.orange ion-icon {
    margin-bottom: 1rem;
    font-size: 3rem;
    /* color: rgb(255, 165, 0); */
    color: #ffffff;
}
.completeTasks h4 {
    margin: 0;
    margin-top: 2rem;
    margin-left: 1.5rem;
    margin-bottom: -0.5rem;
}
</style>