//stałe
const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

//zmienne globalne
let userName;

//tablica wiadomości
const messages = [];

//logowanie i walidacja
function login(e) {
    e.preventDefault();
    if (userNameInput.value.length >= 3) {
        userName = userNameInput;
        loginForm.classList.toggle('show');
        messagesSection.classList.toggle('show');
    } else {
        alert('Username must have at least 3 characters');
    }
}

loginForm.addEventListener('submit', login);

//MessageForm
function addMessage(author, content) {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if(author === userName) message.classList.add('message--self');
    message.innerHTML = `
      <h3 class="message__author">${userName === author ? 'You' : author }</h3>
      <div class="message__content">
        ${content}
      </div>
    `;
    messagesList.appendChild(message);
  }

function sendMessage(e) {
    e.preventDefault();
    if (messageContentInput.value) {
        addMessage(userName, messageContentInput.value)
    } else {
        alert('Message cannot be empty');
    }
    messageContentInput.value = '';
};

addMessageForm.addEventListener('submit', sendMessage);