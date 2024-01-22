<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <ion-content>
          <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
            <ion-refresher-content
              :pulling-icon="chevronDownCircleOutline"
              pulling-text="Pull to refresh"
              refreshing-spinner="circles"
              refreshing-text="Refreshing..."
            >
            </ion-refresher-content>
          </ion-refresher>
          <ion-list id="inbox-list">
            <div class="userContainer">
              <ion-thumbnail>
                <img v-if="loggedInUserImage" :src="`/${loggedInUserImage}.png`" alt="user icon">
                <img v-else src="/tasckyLogo.png" alt="user icon">
              </ion-thumbnail>
              <div class="sideInfo">
                <ion-list-header>{{loggedInUserName}}</ion-list-header>
                <ion-note>{{loggedInUserEmail}}</ion-note>
              </div>
            </div>

            <ion-menu-toggle :auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none" :detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
                <ion-icon aria-hidden="true" slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>

            <ion-menu-toggle :auto-hide="false" class="about" >
              <h3>Tascky</h3>
              <ion-item lines="none" :detail="false" router-link="/views/AddTask" >
                <ion-icon :icon="home" ></ion-icon>
                <ion-label>Home</ion-label>
              </ion-item>
              <ion-item lines="none" :detail="false" router-link="/views/About" >
                <ion-icon :icon="helpCircle" ></ion-icon>
                <ion-label>About</ion-label>
              </ion-item>
              <ion-item lines="none" :detail="false" @click="signOutUser" >
                <ion-icon :icon="power" ></ion-icon>
                <ion-label>Sign out</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script setup>
import { IonRefresher, IonRefresherContent, IonApp, IonContent, IonIcon, IonItem, useIonRouter, IonThumbnail, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonRouterOutlet, IonSplitPane } from '@ionic/vue';
import { ref } from 'vue';
import { chevronDownCircleOutline, heartHalf, person, briefcase, power, helpCircle, home, people, listCircle, notificationsCircle, stopCircle, checkmarkCircle } from 'ionicons/icons';
// import FemaleIcon from "/female.png"
// import MaleIcon from "/male.png"
import { useCookie } from "vue-cookie-next"
import { signOut } from "firebase/auth";
import { Authenticate } from "@/firebase/config";
import { useRouter } from 'vue-router';

const { getCookie, setCookie } = useCookie()
const ionRouter = useIonRouter()
const vueRouter = useRouter()

let loggedInUserName = ref(getCookie('loggedInUserName'))
let loggedInUserEmail = ref(getCookie('loggedInUserEmail'))
let loggedInUserImage = ref(getCookie('loggedInUserImage'))


const selectedIndex = ref(0);

const appPages = [
  {
    title: 'Start',
    url: '/views/AddTask',
    iosIcon: home,
    mdIcon: home,
  },
  {
    title: 'Tasks',
    url: '/folder/Tasks',
    iosIcon: listCircle,
    mdIcon: listCircle,
  },
  {
    title: 'Complete',
    url: '/folder/Complete',
    iosIcon: checkmarkCircle,
    mdIcon: checkmarkCircle,
  },
  {
    title: 'Pending',
    url: '/folder/Pending',
    iosIcon: notificationsCircle,
    mdIcon: notificationsCircle,
  },
  {
    title: 'Paused',
    url: '/folder/Pause',
    iosIcon: stopCircle,
    mdIcon: stopCircle,
  },
  { 
    title: 'Family',
    url: '/folder/Family',
    iosIcon: home,
    mdIcon: home
  },
  { 
    title: 'Friends',
    url: '/folder/Friends',
    iosIcon: people,
    mdIcon: people
  },
  { 
    title: 'Work',
    url: '/folder/Work',
    iosIcon: briefcase,
    mdIcon: briefcase
  },
  { 
    title: 'Personal',
    url: '/folder/Personal',
    iosIcon: person,
    mdIcon: person
  },
  { 
    title: 'Health',
    url: '/folder/Health',
    iosIcon: heartHalf,
    mdIcon: heartHalf
  }
];


const path = window.location.pathname.split('folder/')[1];
if (path !== undefined) {
  selectedIndex.value = appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
}

const handleRefresh = (event) => {
  setTimeout(() => {
    // Any calls to load data go here
    vueRouter.go(0)
    event.target.complete();
  }, 2000);
};

const signOutUser = () => {
  signOut(Authenticate).then(() => {
    // Sign-out successful.
    setCookie('loggedInUserName', '')
    setCookie('loggedInUserEmail', '')
    setCookie('loggedInUserId', '')
    setCookie('loggedInUserImage', '')
    ionRouter.push('/views/Initial')
  }).catch((error) => {
    // An error happened.
    console.log('sorry', error.message)
  });
}


</script>

<style scoped>

ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #757575;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 0.5rem;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-note {
  display: inline-block;
  font-size: 13px;
  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}

.userContainer {
  display: flex;
  align-items: center;
  flex-direction: row;
  /* background-color: red; */
  margin-bottom: 20px;
}
.ios body .userContainer {
  margin-left: 0.5rem;
}
.about h3 {
  margin-top: 2rem;
  margin-left: 1rem;
  font-size: 1rem;
}
.about ion-item {
  display: flex;
  align-items: center;
}
.about ion-item ion-icon {
  margin-right: 2rem;
}
</style>
