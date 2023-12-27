const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');


let isRecording = false;
let audioChunks = [];

userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
})


function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage === '') return;

    appendMessage('user', userMessage);
    userInput.value = '';

    setTimeout(() => {
        const botResponse = getBotResponse(userMessage);
        appendMessage('bot', botResponse);
    }, 500);
}


function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender);

    const senderText = sender === 'user' ? 'You' : 'Bot';
    messageElement.innerHTML = `<strong>${senderText}:</strong> ${message}`;

    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}


function appendMusic(sender, musicUrl) {
    const musicElement = document.createElement('div');
    musicElement.classList.add('file', 'music', sender);

    const senderText = sender === 'user' ? 'You' : 'Bot';
    // const playButton = document.createElement('button');
    // playButton.innerText = 'Play';

    const audioElement = document.createElement('audio');
    audioElement.controls = true;
    audioElement.src = musicUrl;

    // playButton.addEventListener('click', function () {
        audioElement.play();
    // });

    musicElement.appendChild(audioElement);
    // musicElement.appendChild(playButton);

    chatbox.appendChild(musicElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}



// data for conversing with the bot
const conversationData = {
    "hello": "Hi there! How can I help you today?",
    "hi": "Hi there! How can I help you today?",   
    "bye": "Goodbye! Thanks for chatting with me.",
    'how are you': "I am just a chatbot, but thanks for asking!",
    'what is your name': "My name is OHILE Chatbot",
    'how are you?': "I am just a chatbot, but thanks for asking!",
    'what is your name?': "My name is OHILE Chatbot",
    'who created you' : "I was created by OHILE Team and Kanai in 2024",
    'who created you?': "I was created by OHILE Team and Kanai in 2024",
    'who are you': "I am OHILE Chatbot",
    'who are you?': "I am OHILE Chatbot",
    'what is your purpose': "I am here to help you with your questions about OHILE",
    'what is your purpose?': "I am here to help you with your questions about OHILE",
    'ok': "Great!",
}


function getBotResponse(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase();
    const matchingKey = conversationData.hasOwnProperty(lowerCaseMessage) ? lowerCaseMessage : null;
    return matchingKey ? conversationData[matchingKey] : 'I did not understand that. Can you please rephrase?';

}


function toggleRecording() {
    if (isRecording) {
        stopRecording();
    } else {
        startRecording();
    }
}



function startRecording() {
    isRecording = true;
    audioChunks = [];
    if (isRecording) {
        document.getElementById('record-btn').innerHTML = 'Stop & Play Recording';
    }
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = event => {
                if (event.data.size > 0) {
                    audioChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                appendMusic('user', audioUrl);
            };

            mediaRecorder.start();
            setTimeout(() => {
                stopRecording(mediaRecorder);
            }, 10000);
        })
        .catch(error => {
            console.error('Error accessing microphone:', error);
        });
}

function stopRecording(mediaRecorder) {
    isRecording = false;
    if (!isRecording) {
        document.getElementById('record-btn').innerHTML = 'Record Audio';
    }
    mediaRecorder.stop();
}


