<template>
    <ion-page>
        <ion-header :translucent="true" class="ion-no-border" >
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary">
                        <ion-icon :icon="grid" ></ion-icon>
                    </ion-menu-button>
                </ion-buttons>
                <ion-title>{{ timeOfDay }}</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <div class="theForm">
                <div class="start" >
                    <ion-icon :icon="addCircle"></ion-icon>
                    <img :src="TasckyLogo" alt="logo">
                    <div class="intro">
                        <h1>Hey!</h1>
                        <p>Welcome to tascky . You can add a new task and swipe left or right on any task to see options.</p>
                    </div>
                </div>
                <ion-list lines="none" >
                    <h3>Add new task</h3>
                    <ion-item>
                        <!-- <ion-label position="floating">Task</ion-label> -->
                        <ion-input aria-label="Task" placeholder="add new task" v-model="newTaskForm.title" ></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-select placeholder="select category" v-model="newTaskForm.category" >
                            <ion-select-option
                                v-for="(i, index) in categories" :key="index"
                                :value="i"
                            >
                                {{ i }}
                            </ion-select-option>
                        </ion-select>
                    </ion-item>
                    <div class="addBtnCont">
                        <ion-button expand="block" shape="round" @click="addTask" :disabled=" newTaskForm.title === '' ? true:false">Add Task</ion-button>
                    </div>
                </ion-list>
            </div>
            <Done v-if="sent" />
            <Loading v-if="sending" />
            <h4>Categories</h4>
            <div class="cats">
                    <ion-nav-link v-for="(i, index) in cats" :key="index" :router-link="`/folder/${i.link}`" >
                        <div class="oneCat" :class="i.iconTypeColor" >
                            <ion-icon :icon="i.icon"></ion-icon>
                            <span>{{ i.name }}</span>
                        </div>
                    </ion-nav-link>
            </div>
            <div class="completeTasks">
                <h4>Pending Tasks</h4>
                <AllItem />
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>

import { IonPage, IonHeader, IonNavLink, IonSelect, IonThumbnail, IonSelectOption, IonIcon, IonList, IonItem, IonInput, IonLabel, IonButton, IonContent, IonButtons, IonMenuButton, IonTitle, IonToolbar,  } from "@ionic/vue"
import { checkmarkCircle, notificationsCircle, stopCircle, addCircle, listCircle, alertCircle, pauseCircle, grid } from "ionicons/icons"
import AllItem from "@/components/AllItem.vue"
import Loading from "@/components/Loading.vue"
import Done from "@/components/Done.vue"
import { ref, onMounted, watch } from "vue"
import { doc, setDoc } from "firebase/firestore"; 
import { Store } from "@/firebase/config"
import MaleIcon from "/male.png"
import TasckyLogo from "/tasckyLogo.png"
import { useCookie } from "vue-cookie-next"

const { getCookie } = useCookie()
let loggedInUserId = ref(getCookie('loggedInUserId'))

const cats = [
    { icon: listCircle, name: 'All Available Tasks', iconTypeColor: 'blue', link: 'Tasks' },
    { icon: checkmarkCircle, name: 'Complete Tasks', iconTypeColor: 'green', link: 'Complete' },
    { icon: notificationsCircle, name: 'Pending Tasks', iconTypeColor: 'yellow', link: 'Pending' },
    { icon: stopCircle, name: 'Paused Tasks', iconTypeColor: 'orange', link: 'Pause' }
]

const categories = [ 'Family', 'Friends', 'Work', 'Personal', 'Health', ]

const newTaskForm = ref({
    title: '',
    category: '',
    status: 'pending'   
})

const sending = ref(false)
const sent = ref(false)

const addTask = async () => {
    try {
        // console.log(newTaskForm.value)
        sending.value = true
        const taskId = newTaskForm.value.title.replace(/\ /g, '-')
        await setDoc(doc(Store, "users", loggedInUserId.value, 'tasks', taskId), newTaskForm.value);
        // console.log('done')
        sending.value = false
        sent.value = true
        setTimeout(() => {
            sent.value = false
            newTaskForm.value.title = ''
            newTaskForm.value.category = ''
        }, 2000);
    } catch (error) {
        console.log('sorry', error)
    }
}

//for time of day
const timeOfDay = ref('');
const newHour = ref(new Date().getHours());

watch(newHour, () => {
  updateGreeting();
});
const updateGreeting = () => {
  const hour = newHour.value;
  if (0 <= hour && hour <= 11) {
    timeOfDay.value = 'Good morning';
  } else if (12 <= hour && hour <= 15) {
    timeOfDay.value = 'Good afternoon';
  } else if (16 <= hour && hour <= 23) {
    timeOfDay.value = 'Good evening';
  }
  // console.log(timeOfDay.value)
}

onMounted(() => {
    updateGreeting()
})

</script>

<style scoped>
ion-toolbar {
    backdrop-filter: blur(10px);
    --background: rgba(255, 255, 255, 0.7);
}
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
.theForm .start {
    margin: 1rem;
    display: flex;
    /* align-items: center; */
    margin-top: 2rem;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    position: relative;
    width: fit-content;
    /* background-color: var(--ion-color-primary); */
    background-color: var(--ion-color-primary);
    padding: 1rem;
    border-radius: 1rem;
    color: #ffffff;
    box-shadow: 0px 7px 32px -11px rgba(0,0,0,0.75);
-webkit-box-shadow: 0px 7px 32px -11px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 7px 32px -11px rgba(0,0,0,0.75);
}
.start ion-icon {
    color: #4c8dff;
    font-size: 2rem;
    margin-right: 0rem;
    display: none;
}
/* .intro {
    background-color: red;
} */
.intro h1 {
    font-weight: 800;
    font-size: 3rem;
    margin: 0;
}
.intro p {
    font-size: 0.9rem;
    color: #ffffff;
}
.start img {
    margin-right: 1rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    /* box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.75);
    -webkit-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.75); */
}
ion-list {
    width: 100%;
    /* margin: 0.5rem; */
}
ion-list h3 {
    margin-left: 1.5rem;
    font-size: 1.2rem;
}
ion-item {
    --ion-item-background: #f3f3f3;
    border-radius: 1rem;
    margin-bottom: 1rem;
    margin: 0.8rem;
    padding: 0.3rem 0;
    background-color: #f3f3f3;
    
}
/* .addBtnCont {
    display: flex;
    align-items: center;
    justify-content: center;
} */
ion-button {
    /* --border-radius: 1rem; */
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
    /* text-align: center; */
    font-size: 0.8rem;
}
.blue {
    background-color: rgb(0, 0, 255, 0.1);
    border-radius: 1rem;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    flex-direction: row;
    padding: 1rem;
}
.blue ion-icon {
    margin-right: 0.5rem;
    font-size: 2rem;
    color: rgb(0, 0, 255);
    /* color: #ffffff; */
}
.green {
    background-color: rgb(0, 128, 0, 0.1);
    /* text-align: center; */
    border-radius: 1rem;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    flex-direction: row;
    padding: 1rem;
}
.green ion-icon {
    margin-right: 0.5rem;
    font-size: 2rem;
    color: rgb(0, 128, 0);
    /* color: #ffffff; */
}
.yellow {
    background-color: rgb(255, 0, 0, 0.1);
    text-align: center;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    flex-direction: row;
    padding: 1rem;
}
.yellow ion-icon {
    margin-right: 0.5rem;
    font-size: 2rem;
    color: rgb(255, 0, 0);
    /* color: #ffffff; */
}
.orange {
    background-color: rgb(255, 165, 0, 0.1);
    padding: 1rem;
    text-align: center;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    flex-direction: row;
    padding: 1rem;
}
.orange ion-icon {
    margin-right: 0.5rem;
    font-size: 2rem;
    color: rgb(255, 165, 0);
    /* color: #ffffff; */
}
.completeTasks h4 {
    margin: 0;
    margin-top: 2rem;
    margin-left: 1.5rem;
    margin-bottom: -0.5rem;
}

@media (prefers-color-scheme: dark) {
    ion-toolbar {
        --background: rgba(0, 0, 0, 0.7);
    }
    ion-list {
        background-color: #131313;
    }
    .theForm .start {
        background-color: #00215a;
    }
    ion-item {
        --ion-item-background: #000000;
        background-color: #000000;
    }
    .ios body ion-item {
        --ion-item-background: #1f1f1f;
        background-color: #1f1f1f;
    }
    h3 {
        color: #f3f3f3;
        margin-bottom: 2rem;
    }
    .intro p {
        color: #ffffff;
    }
}
</style>