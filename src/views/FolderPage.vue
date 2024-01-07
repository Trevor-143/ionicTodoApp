<template>
  <ion-page>
    <ion-header :translucent="true" class="ion-no-border" >
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary">
            <ion-icon :icon="grid" ></ion-icon>
          </ion-menu-button>
        </ion-buttons>
        <ion-title>{{ $route.params.id }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $route.params.id }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list lines="none" >
        <ion-item-sliding v-if="tasksCollection.length > 0" v-for="task in tasksCollection" :key="task.id">
          <ion-item-options side="start">
            <ion-item-option color="warning" class="onTheLeft" @click="changeTaskStatus(task.id, getStatusButtonText(task.status))" >
              <ion-icon slot="start" :icon="pauseCircle"></ion-icon>
              <!-- {{ task.status === 'pause' ? 'Resume':'Pause' }} -->
              {{ getButtonText(task.status) }}
            </ion-item-option>
          </ion-item-options>
    
          <ion-item>
            <ion-label> 
              <span>
                <ion-icon 
                :icon="getIcon(task.status)"
                :class="{ 
                  'redIcon': task.status === 'pending',
                  'orangeIcon': task.status === 'pause',
                  'greenIcon': task.status === 'complete'
                }" ></ion-icon> {{ task.title }}</span>
            </ion-label>
          </ion-item>
    
          <ion-item-options side="end" class="onTheRightCont" >
            <ion-item-option class="onTheRight" color="success" @click="changeTaskStatus(task.id, 'complete')" >
              <ion-icon slot="start" :icon="checkmarkCircle"></ion-icon>
              Complete
            </ion-item-option>
            <ion-item-option class="onTheRight"  color="danger">
              <ion-icon slot="start" :icon="trash"></ion-icon>
              Delete
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
        <div v-else class="substitute">
          <img :src="NoTaskImage" alt="empty tasks container">
          <div class="noInfo">
            <h1>No {{$route.params.id}} {{ $route.params.id === 'Tasks' ? '':'tasks' }}</h1>
            <div class="dash"></div>
          </div>
        </div>
      </ion-list>
    </ion-content>
    <Loading v-if="loading" />
    <Done v-if="done" />
  </ion-page>
</template>

<script setup>
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonIcon, IonPage, IonTitle, IonToolbar, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList } from '@ionic/vue';
import AllItem from "@/components/AllItem.vue"
import { checkmarkCircle, notificationsCircle, stopCircle, grid, pauseCircle, trash } from "ionicons/icons"
import { Store } from "@/firebase/config"
import { collection, query, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { onMounted, ref, watchEffect, watch } from "vue"
import { useRoute } from "vue-router"
import Loading from "@/components/Loading.vue"
import Done from "@/components/Done.vue"
import NoTaskImage from "/noTasks.jpeg"

const userId = 'userid-1'
const tasksCollection = ref([])
const route = useRoute();
const taskID = ref(route.params.id);

const getIcon = (status) => {
  switch (status) {
    case 'pending':
      return notificationsCircle;
    case 'pause':
      return stopCircle;
    case 'complete':
      return checkmarkCircle;
    // Add more cases as needed
    default:
      return ''; // Default icon or handle unknown status
  }
}

const loading = ref(false)
const done = ref(false)

watch(() => route.params.id, (newId, oldId) => {
  handleRouteParamChange(newId, oldId);
  getTasks(newId)
});

function handleRouteParamChange(newId, oldId) {
  console.log(`Route parameter changed from ${oldId} to ${newId}`);
}

const getTasks = (newId) => {
  const q = query(collection(Store, "users", userId, 'tasks'));
  if (newId != undefined) {
    if ( newId === 'Pause' || newId === 'Complete' || newId === 'Pending' ) {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const tempTasks = [];
        // const theTask = taskID.value.toLowerCase()
        querySnapshot.forEach((doc) => {
          if( doc.data().status === newId.toLowerCase() ) {
            const eachTask = {
              id: doc.id,
              ...doc.data()
            }
            tempTasks.push(eachTask);
          }
        });
        // console.log(tempTasks)
        tasksCollection.value = tempTasks
      });
    } else {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const tempTasks = [];
        // const theTask = taskID.value.toLowerCase()
        querySnapshot.forEach((doc) => {
          const eachTask = {
            id: doc.id,
            ...doc.data()
          }
          tempTasks.push(eachTask);
        });
        // console.log(tempTasks)
        tasksCollection.value = tempTasks
      });
    }
  }
}

const changeTaskStatus = async (id, newStatus) => {
  loading.value = true
  const taskRef = doc(Store, "users", userId, 'tasks', id);
  try {
    await updateDoc(taskRef, {
      status: newStatus
    });
    loading.value = false
    done.value = true
    setTimeout(() => {
      done.value = false
    }, 2000);
  } catch (error) {
    console.log('sorry but, ', error)
  }
}

const getStatusButtonText = (status) => {
  switch (status) {
    case 'pending':
      return 'pause';
    case 'pause':
      return 'pending';
    default:
      return 'pending';
  }
}

const getButtonText = (status) => {
  switch (status) {
    case 'pause':
      return 'Resume';
    case 'pending':
      return 'Pause';
    case 'complete':
      return 'Redo';
    default:
      return ''; // Handle unknown status
  }
}

onMounted(() => {
  getTasks(taskID.value)
  console.log(taskID.value)
})

// const filterTask = (tasks, taskStatus) => {
//   if (taskStatus === "all tasks") {
//     return tasks;
//   }
//   const filtered = tasks.filter((task) =>
//     task.status.toLowerCase().includes(taskStatus.toLowerCase())
//   );
//   if (filtered.length > 0) {
//     return filtered;
//   } else {
//     return tasks;
//   }
// };

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
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
ion-list {
    background: rgb(255, 0, 0, 0);
    padding: 1rem;
}
ion-item-sliding {
    margin: 0.5rem 0;
    margin-right: 0.5rem;
    border-radius: 0.5rem;
}
ion-item {
  --background: #f4f4f4;
  border-radius: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0px 10px 23px -20px rgba(0,0,0,0.75);
  -webkit-box-shadow: 0px 10px 23px -20px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 10px 23px -20px rgba(0,0,0,0.75);
}
ion-item ion-icon {
  margin-right: 0.5rem;
  font-size: 2rem;
}
ion-label {
  padding: 0.3rem 0.2rem;
}
ion-label span {
  display: flex;
  align-items: center;
}
ion-item-option {
    border-radius: 1rem;
    margin-bottom: 1.2rem;
  box-shadow: 0px 10px 23px -20px rgba(0,0,0,0.75);
  -webkit-box-shadow: 0px 10px 23px -20px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 10px 23px -20px rgba(0,0,0,0.75);
}
ion-icon {
  font-size: 30px;
}
.onTheLeft  {
    margin-right: 0.5rem;
    color: #fff;
}
.onTheRight {
    margin-left: 0.5rem;
}
.onTheRightCont {
    margin-left: 1.5rem;
}
.redIcon {
  color: red;
  animation: alternate linear infinite 0.5s notifying;
}
@keyframes notifying {
  0% {
    transform: rotateZ(-45deg);
  }
  100% {
    transform: rotateZ(45deg);
  }
}
.orangeIcon {
  color: #ffc800;
}
.greenIcon {
  color: #00b700;
}
.substitute {
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
}
.substitute img {
  width: 100%;
  display: block;
}
.noInfo {
  position: absolute;
  right: 0;
  bottom: 0;
  /* background-color: rgba(0,0,0,0.2); */
  color: #000000;
  font-weight: 800;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 1rem;
}

.dash {
  height: 5px;
  width: 5rem;
  border-radius: 1rem;
  margin: 0.5rem auto;
  background-color: red;
}

@media (prefers-color-scheme: dark) {
  ion-item {
    --background: #000000;
  }
  .onTheLeft, .onTheRight {
    color: #000000;
  }
  .ios body ion-item {
    --background: #1f1f1f;
  }
}

</style>
