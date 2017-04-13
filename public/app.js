'use strict';

const socket = io.connect('http://localhost:3000');

let roomName = 'random';

const roomBtns = document.getElementsByClassName('room');
for (const roomBtn of roomBtns) {
    roomBtn.addEventListener('click', (e) => {
        const room = e.target.value;
        changeRoom(room);
    });
}

const sendBtn = document.getElementById('send');
sendBtn.addEventListener('click', () => {
    const messageText = document.querySelector('#message').value;
    document.querySelector('#message').value = '';
    const nickname = document.querySelector('#nick').value;
    sendMsg(messageText, nickname);
});

function sendMsg(text, nick) {
    console.log('send msg');
    let msg = {};
    // msg.app_id = this.appName;
    msg.time = Date.now();
    msg.json = 'json';
    msg.text = text;
    msg.nick = nick;
    // socket.json.emit('message', msg);
    socket.json.emit('message', msg);
}
const changeRoom = (room) => {
    roomName = room;
    const roomElem = document.getElementById('room-name');
    if (roomElem.innerText !== roomName) {
        roomElem.innerText = roomName;
        document.getElementById('msg-container').innerText = '';
        socket.emit('room', roomName);
    }
};


const printMsg = (msg) => {
    const container = document.querySelector('#msg-container');
    msg = JSON.parse(msg);
    container.innerHTML += `<p class="message">${msg.nick}: ${msg.text}</p>`;
};


socket.on('connect', function () {
    console.log('socket.io connected!');
    console.log(roomName);
    socket.emit('room', roomName);
});

socket.on('message', function (data) {
    printMsg(data);
    console.log('got message from server: ' + data);
});

socket.on('disconnect', function () {
    console.log('socket.io connected!');
});
