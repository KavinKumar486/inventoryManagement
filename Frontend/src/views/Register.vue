<script setup>
</script>
<template>
<h1 id="heading">Register</h1>
<form @submit.prevent="handleRegister"> 
<label for="username">Username:</label>
<input v-model="uname" type="text" name="username" >
<label for="location">Location:</label>
<input v-model="location" type="text" name="location">    
<label for ='email'>Email:</label>
<input v-model="email" type="email" name="email">

<label for="password">Password:</label>
<input v-model="password" type="password" name="password">  

<button type="submit">Register</button>
<p>Already have an account? <router-link to="/login"><button>Login</button></router-link></p>
</form>
</template>
<script setup>
import "../assets/formStyle.css"
import { ref } from 'vue'
import axios from 'axios'   
import { useRouter } from 'vue-router'
const baseUrl = import.meta.env.VITE_BASE_URL;
const uname = ref('')
const email = ref('')
const password = ref('')
const location = ref('')
const credentials = ref({name:'', email:'', password:'',location:''})   
const router = useRouter()
async function handleRegister() {
    try {
        credentials.value.name = uname.value;
        credentials.value.email = email.value;
        credentials.value.password = password.value;
        credentials.value.location = location.value;

        const res = await axios.post(`${baseUrl}/customers/add`,credentials.value);
        if (res.data.status === 'Success') {
        console.log('Registration successful');
        router.push('/'); 
        } else {
        console.log('Registration failed:', res.data.message);
        }
    } catch (error) {
        console.error('An error occurred during registration:', error);
        if (error.response) {
        console.error('Server response error:', error.response.data);
        }
    } finally {
        credentials.value.name = '';
        credentials.value.email = '';
        credentials.value.password = '';
        credentials.value.location = '';
        uname.value = '';
        email.value = '';
        location.value='';
        password.value = '';
    }
}
</script>