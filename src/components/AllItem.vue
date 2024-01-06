<template>
    <ion-list lines="none" >
      <ion-item-sliding v-for="task in allTasks" :key="task.id">
        <ion-item-options side="start">
          <ion-item-option color="warning" class="onTheLeft" >
            <ion-icon slot="start" :icon="pauseCircle"></ion-icon>
            Pause
          </ion-item-option>
        </ion-item-options>
  
        <ion-item>
          <ion-label> {{ task.title }} </ion-label>
        </ion-item>
  
        <ion-item-options side="end" class="onTheRightCont" >
          <ion-item-option class="onTheRight" color="success" >
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
  </template>
  
  <script setup>
    import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList } from '@ionic/vue';
    import { pauseCircle, checkmarkCircle, trash } from 'ionicons/icons';
    import { onBeforeMount, ref } from "vue"

    const props = defineProps(['tasks'])
    const allTasks = ref([])

    onBeforeMount(() => {
      allTasks.value = props.tasks
    })

    // console.log(props.tasks)

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
</style>