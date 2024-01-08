<template>
    <ion-page>
        <div class="startMessage">
            <h1>Hello There!</h1>
            <p>Welcome to tascky</p>
            <div class="fBtns">
                <ion-button :color="activeForm === 'signup'? 'primary':'light'" @click="toggleForm('signup')" >Sign up</ion-button>
                <ion-button :color="activeForm === 'login'? 'primary':'light'" @click="toggleForm('login')" >Log in</ion-button>
            </div>
        </div>
        <ion-list lines="none" >
            <ion-item v-if="activeForm === 'signup'" >
                <ion-label position="floating">Full Name</ion-label>
                <ion-input type="text" v-model="formSignup.fullName" ></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="floating">Email</ion-label>
                <ion-input type="email" v-if="activeForm === 'signup'" v-model="formSignup.email" ></ion-input>
                <ion-input type="email" v-else v-model="formLogin.email" ></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="floating">Password</ion-label>
                <ion-input type="password" v-if="activeForm === 'signup'" v-model="formSignup.password" ></ion-input>
                <ion-input type="password" v-else v-model="formLogin.password" ></ion-input>
            </ion-item>

            <div class="avatars" v-if="activeForm === 'signup'" >
                <div class="forFemale" :class="formSignup.imageType === 'female'? 'chosenImage':''" @click="formSignup.imageType = 'female'" >
                    <ion-thumbnail>
                        <img :src="FemaleIcon" alt="female avatar">
                    </ion-thumbnail>
                    <span>Lady Avatar</span>
                </div>
                <div class="forMale" :class="formSignup.imageType === 'male'? 'chosenImage':''" @click="formSignup.imageType = 'male'" >
                    <ion-thumbnail>
                        <img :src="MaleIcon" alt="male avatar">
                    </ion-thumbnail>
                    <span>Gent Avatar</span>
                </div>
            </div>
            <ion-button expand="block"
                @click="activeForm === 'signup' ? signUp():logIn()"
            >
                {{ activeForm === 'signup' ? 'Sign up':'Log in' }}
            </ion-button>
        </ion-list>
        <MissingFields v-if="missingField" />
        <Done v-if="done" />
        <Loading v-if="loading" />
        <Problem v-if="tryAgain" />
    </ion-page>
</template>

<script setup>
import { IonPage, IonList, IonButton, IonItem, IonInput, IonLabel, IonThumbnail, useIonRouter } from "@ionic/vue"
import { ref, onMounted } from "vue"
import FemaleIcon from "/female.png"
import MaleIcon from "/male.png"
import Done from "@/components/Done.vue"
import Loading from "@/components/Loading.vue"
import Problem from "@/components/Problem.vue"
import MissingFields from "@/components/MissingFields.vue"
import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth"
import { Authenticate } from "@/firebase/config"
import { useRouter } from "vue-router"
import { useCookie } from "vue-cookie-next"
import { StatusBar, Style } from "@capacitor/status-bar"

StatusBar.setBackgroundColor({ color: '#3880ff' }); // Dark background color
StatusBar.setStyle({ style: Style.Dark });

const missingField = ref(false)
const done = ref(false)
const loading = ref(false)
const tryAgain = ref(false)

const cookie = useCookie()

const ionRouter = useIonRouter()
const vueRouter = useRouter()

const activeForm = ref('signup')
const toggleForm = (text) => {
    activeForm.value = text
}

let loggedInUserName = ref(cookie.getCookie('loggedInUserName'))
let loggedInUserEmail = ref(cookie.getCookie('loggedInUserEmail'))
let loggedInUserId = ref(cookie.getCookie('loggedInUserId'))
let loggedInUserImage = ref(cookie.getCookie('loggedInUserImage'))


const setCredentials = () => {
    loggedInUserName = ref(cookie.getCookie('loggedInUserName'))
    loggedInUserEmail = ref(cookie.getCookie('loggedInUserEmail'))
    loggedInUserId = ref(cookie.getCookie('loggedInUserId'))
    loggedInUserImage = ref(cookie.getCookie('loggedInUserImage'))
}

onMounted(() => {
    console.log(loggedInUserName.value, loggedInUserEmail.value, loggedInUserId.value)
    if (loggedInUserId.value) {
        ionRouter.push('/views/AddTask')
    }
})

const formSignup = ref({
    fullName: '',
    email: '',
    password: '',
    imageType: 'female'
})

const formLogin = ref({
    email: '',
    password: ''
})

const signUp = async () => {
    if(!formSignup.value.fullName) {
        missingField.value = true
        setTimeout(() => {
            missingField.value = false
        }, 2000);
        return
    }
    if(!formSignup.value.email) {
        missingField.value = true
        setTimeout(() => {
            missingField.value = false
        }, 2000);
        return
    }
    if(!formSignup.value.password) {
        missingField.value = true
        setTimeout(() => {
            missingField.value = false
        }, 2000);
        return
    }
    try {
        loading.value = true
        const { user } = await createUserWithEmailAndPassword (Authenticate, formSignup.value.email, formSignup.value.password)
        await updateProfile (user, {
            displayName: formSignup.value.fullName,
            photoURL: formSignup.value.imageType
        });
        loading.value = false
        done.value = true
        setTimeout(() => {
            done.value = false
            // ionRouter.push('/views/AddTask')
            activeForm.value = 'login'
        }, 2000);
    } catch (error) {
        console.log('sorry', error)
    }
    console.log(formSignup.value)
}

const logIn = async () => {
    if(!formLogin.value.email) {
        missingField.value = true
        setTimeout(() => {
            missingField.value = false
        }, 2000);
        return
    }
    if(!formLogin.value.password) {
        missingField.value = true
        setTimeout(() => {
            missingField.value = false
        }, 2000);
        return
    }
    loading.value = true
    try {
        await signInWithEmailAndPassword(Authenticate, formLogin.value.email, formLogin.value.password).then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            if(user) {
                cookie.setCookie('loggedInUserName', user.displayName);
                cookie.setCookie('loggedInUserEmail', user.email);
                cookie.setCookie('loggedInUserId', user.uid );
                cookie.setCookie('loggedInUserImage', user.photoURL );
                setCredentials()
                loading.value = false
                done.value = true
                setTimeout(() => {
                    done.value = false
                }, 2000);
                console.log(formLogin.value)
                ionRouter.push('/views/AddTask')
                vueRouter.go(0)
            } else {
                
            }
            // ...
        }).catch((error) => {
            console.log(error.code)
            console.log(error.message)

            loading.value = false
            tryAgain.value = true
            setTimeout(() => {
                tryAgain.value = false
            }, 2000);
        });
    } catch (error) {
        console.log('sorry', error)
    }
}

</script>

<style scoped>

.startMessage {
    /* background-color: red; */
    margin: auto;
    text-align: center;
}
.startMessage h1 {
    font-size: 3rem;
    font-weight: 800;
    color: var(--ion-color-primary);
}
.fBtns {
    display: flex;
    align-items: center;
    justify-content: center;
}
ion-item {
    --ion-item-background: #f3f3f3;
    border-radius: 1rem;
    margin-bottom: 1rem;
    margin: 0.8rem;
    padding: 0.3rem 0;
    background-color: #f3f3f3;
}
.avatars {
    margin: 1rem;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
}
.avatars div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    background-color: #eee;
    padding: 1rem;
    border-radius: 1rem;
}
ion-button {
    --padding-top: 1rem;
    --padding-bottom: 1rem;
    margin: 1rem;
    --border-radius: 1rem;
    font-weight: 700;
}
.avatars .chosenImage {
    background-color: rgb(0, 128, 0, 0.1);
}

@media (prefers-color-scheme: dark) {
    ion-item {
        --background: #000000;
        background-color: #000000;
    }
    .avatars div {
        background-color: #000000;
    }
    .ion body ion-item {
        --background: #1f1f1f;
        background-color: #1f1f1f;
    }
    .ios body .avatars div {
        background-color: #1f1f1f;
    }
    
}

</style>