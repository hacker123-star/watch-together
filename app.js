// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCk43OQqB9FTJ1KeZHR0X2erlGyvZkLQSU",
  authDomain: "watch-together-5e790.firebaseapp.com",
  projectId: "watch-together-5e790",
  storageBucket: "watch-together-5e790.firebasestorage.app",
  messagingSenderId: "962198753772",
  appId: "1:962198753772:web:ead4861107337246cb70c9",
  measurementId: "G-WZJCJHGJBY"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Chat Functionality
const chatBox = document.getElementById('chatBox');
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendButton');

sendButton.addEventListener('click', () => {
  const message = chatInput.value.trim();
  if (message) {
    push(ref(db, 'messages'), { text: message });
    chatInput.value = '';
  }
});

onValue(ref(db, 'messages'), (snapshot) => {
  chatBox.innerHTML = '';
  snapshot.forEach((child) => {
    const msg = child.val();
    const msgElement = document.createElement('div');
    msgElement.textContent = msg.text;
    chatBox.appendChild(msgElement);
  });
});
