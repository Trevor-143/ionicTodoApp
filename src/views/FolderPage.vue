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
        <ion-item-sliding v-for="task in tasksCollection" :key="task.id">
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

const getTasks = () => {
  const q = query(collection(Store, "users", userId, 'tasks'));
  if(taskID.value) {
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
    return
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
  getTasks()
  console.log(taskID.value)
})

watch(() => route.params.id, (newId, oldId) => {
  // Perform actions when $route.params.id changes
  handleRouteParamChange(newId, oldId);
});

// Define the function to handle the route parameter change
function handleRouteParamChange(newId, oldId) {
  // Your logic when $route.params.id changes
  console.log(`Route parameter changed from ${oldId} to ${newId}`);
  // Call other functions or update component state as needed
}

</script>

<style scoped>
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


</style>
