<template>
<h1 id="heading">Login</h1>
<form @submit.prevent="handleLogin">
<label for="username">Username:</label>
<input v-model="uname" type="text" name="username" >
<label for="password">Password:</label>
<input v-model="pass" type="password" name="password">
<button type="submit">Login</button> 
<p>Don't have an account? <router-link to="/register"><button>register</button></router-link></p>
</form>
</template>

<script setup>
import "../assets/formStyle.css"
import { useAuthStore } from "@/stores/useAuthStore"
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router' 
const uname= ref('')
const pass = ref('')
const credentials = ref({name:'',pass:''})

const router = useRouter() 
async function handleLogin(){
   try {
     credentials.value.name = uname.value;
     credentials.value.pass = pass.value;
     const res = await axios.post('http://localhost:3333/login', credentials.value);
     if (res.data.message === 'Verified') {
      const authStore = useAuthStore();
      authStore.setToken(res.data.token);
      authStore.setUser(res.data.user);
      router.push('/landingPage')
      localStorage.setItem('jwt_token', res.data.token)
     } else {
       console.log('Login failed: Server did not return "Verified".');   
     }
   } catch (error) {
     console.error('An error occurred during login:', error);
     
     if (error.response) {
         console.error('Server response error:', error.response.data);
     }
   } finally {
     
     credentials.value.name ='';
     credentials.value.pass= '';
     uname.value='';
     pass.value='';
   }
}
</script>

<style>

</style>