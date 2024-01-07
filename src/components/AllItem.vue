<template>
    <ion-list lines="none" >
        <ion-item-sliding v-if="allTasks.length > 0" v-for="task in allTasks" :key="task.id">
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
            <h1>No pending tasks</h1>
            <div class="dash"></div>
          </div>
        </div>
      </ion-list>
      <Loading v-if="loading" />
      <Done v-if="done" />
  </template>
  
<script setup>
    import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList } from '@ionic/vue';
    import { checkmarkCircle, notificationsCircle, stopCircle, grid, pauseCircle, trash } from 'ionicons/icons';
    import { onMounted, ref } from "vue"
    import { collection, query, where, getDocs } from "firebase/firestore";
    import { Store } from "@/firebase/config"
    import Loading from "@/components/Loading.vue"
    import Done from "@/components/Done.vue"
    import NoTaskImage from "/noTasks.jpeg"

    
    const loading = ref(false)
    const done = ref(false)
    const allTasks = ref([])

    const userId = 'userid-1'
    
    const getCompleted = async () => {
      const q = query(collection(Store, "users", userId, 'tasks'), where("status", "==", "pending"));
      const querySnapshot = await getDocs(q);

      // console.log('stating')
      const tTemp = []
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        const oneTask = {
          id: doc.id,
          ...doc.data()
        }
        tTemp.push(oneTask)
      });

      allTasks.value = tTemp
      // console.log(allTasks.value)
      // console.log('ending')
    }

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
      getCompleted()
    })    

</script>

<style scoped>
ion-list {
    background: rgb(255, 0, 0, 0);
    padding: 1rem;
}
ion-item-sliding {
    margin: 0.5rem 0;
    margin-right: 0.5rem;
    border-radius: 0.5rem;
    /* box-shadow: 0px 10px 23px -20px rgba(0,0,0,0.75);
-webkit-box-shadow: 0px 10px 23px -20px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 10px 23px -20px rgba(0,0,0,0.75); */
}
ion-item {
    --background: #f4f4f4;
    border-radius: 1rem;
}
ion-item-option {
    border-radius: 1rem;
}
ion-icon {
  font-size: 30px;
}
.onTheLeft  {
    margin-right: 0.5rem;
}
.onTheRight {
    margin-left: 0.5rem;
}
.onTheRightCont {
    margin-left: 1.5rem;
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
    color: #ffffff;
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