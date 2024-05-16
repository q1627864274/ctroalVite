<template>
  <div v-if="controlText === ''">
     <div>你的控制码{{ localCode }}</div>
     <input type="text" v-model="remoteCode"></input>
     <button @click="startControl">确认</button>
  </div>
  <div v-else>{{ controlText }}</div>
</template>
<script setup lang="ts">
import { ipcRenderer } from 'electron';
import {onMounted, ref, onUnmounted} from 'vue'
const remoteCode = ref('')
const localCode = ref('')
const controlText = ref('')
const login = async () => {
  localCode.value = await ipcRenderer.invoke('login')
}
onMounted(() => {
  login()
  ipcRenderer.on('control-state-change',handleControlState)
})
const handleControlState = (e, name, type) => {
  let text = ''
  if(type === 1) {
    text = `正在远程控制${name}`
  } else if(type === 2) {
    text = `被${name}控制中`
  }
  controlText.value = text
}
const startControl = async () => {
  ipcRenderer.send('control',remoteCode.value)
}
onUnmounted(() => {
  ipcRenderer.removeListener('control-state-change',handleControlState)
})
</script>
<style scoped>
   
</style>
