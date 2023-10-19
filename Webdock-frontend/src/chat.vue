<template>
  <div>
    <span>{{ pings.length }}</span>
    <div v-for="message in messages" :key="message.id">
      {{ message }}
    </div>
    <form @submit.prevent="sendMessage">
      <input v-model="newMessage" type="text" />
      <button type="submit">Send</button>
      <button type="button" @click="closeConnection">Close Connection</button>
      <button type="button" @click="openConnection">Open Connection</button>
    </form>
  </div>
</template>

<script>
import { ChatTypes } from "../../Webdock-sockets/chat/interfaces/chatTypes";
export default {
  data() {
    return {
      messages: [],
      pings: [],
      newMessage: "",
      socket: null,
    };
  },
  mounted() {
    const random = Math.floor(Math.random() * 1000);
    this.socket = new WebSocket(`ws://localhost:3000/ws?uuid=${random}`);
    this.socket.addEventListener("message", (event) => {
      //check if event.data is of type object
      const { type, message } = JSON.parse(event.data);
      if (type === "ping") {
        this.pings.push(message);
        return;
      }

      this.messages.push(message);
    });
    this.socket.addEventListener("open", (event) => {
      console.log("Connected to WS Server");
    });
    this.socket.addEventListener("close", (event) => {
      console.log("Disconnected from WS Server");
    });
  },
  methods: {
    sendMessage() {
      const message = this.newMessage;
      if (!message.startsWith("/")) {
        this.messages.push(message);
      }
      this.socket.send(message);
      this.newMessage = "";
    },

    closeConnection() {
      this.socket.close();
    },

    openConnection() {
      const random = Math.floor(Math.random() * 1000);
      this.socket = new WebSocket(`ws://localhost:3000/ws?uuid=${random}`);
      this.socket.addEventListener("message", (event) => {
        console.log(event.data);
        const message = event.data.message;
        this.messages.push(message);
      });
    },
  },
};
</script>
