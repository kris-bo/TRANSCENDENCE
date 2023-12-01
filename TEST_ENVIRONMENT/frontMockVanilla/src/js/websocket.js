websocket_obj = {

  username: null,
  password: null,
  age: null,

  chat_name: null,
  chat_id: null,

  chat_data: [
    {
      chat_id: null,
      chat_name: null,
    }
  ],
  messages: [
    {
      id: 0,
      sender: null,
      text: null,
      timestamp: 0,
    }
  ],

  message: null,
  sender: null,
  websocket: null,
}

async function establishWebsocketConnection() {

  websocket_obj.websocket = new WebSocket('ws://localhost:6969/ws/test/');

  websocket_obj.websocket.onopen = function (event) {
    console.log("WebSocket onopen");
    renderProfile()
  };

  websocket_obj.websocket.onmessage = async function (event) {
    const data = JSON.parse(event.data);
    console.log('ON MESSAGE: ', data)

    // check if current user is in the same chat_id
    console.log('CHAT_ID: ', data.chat_id)
    if (data.chat_id === websocket_obj.chat_id) {
      await renderProfile()
      websocket_obj.messages = data
      await renderChat()
    }
  };

  websocket_obj.websocket.onerror = function (error) {
    console.error("WebSocket error:", error);
  };

  websocket_obj.websocket.onclose = function (event) {
    console.log("WebSocket closed:", event);
  };
}

const onMessage = async (event) => {
  const responseData = JSON.parse(event.data);
  websocket_obj.messages = responseData.message_data
}
const sendError = async (error) => {
  console.error('Error: Failed to receive ws data: ', error)
}

async function sendWsMessageDataRequest() {
  return new Promise((resolve, reject) => {
    if (websocket_obj.websocket.readyState === WebSocket.OPEN) {
      websocket_obj.websocket.send(JSON.stringify({
        'status': 'ok',
        'type': 'chat.message',
        'data': {
          'user_id': websocket_obj.user_id,
          'chat_id': websocket_obj.chat_id,
          'sender': websocket_obj.sender,
          'message': websocket_obj.message,
        },
      }));
      websocket_obj.websocket.addEventListener('message', onMessage);
      websocket_obj.websocket.addEventListener('error', sendError);
    } else {
      console.error("WebSocket connection is not open.");
      reject(new Error("WebSocket connection is not open."));
    }
  });
}



// ASYNC because we want to get a Promise that we got the response
// of the ws request before continuing with further functions where
// we're dependent on the data
async function getMessageData() {
  try
  {
    websocket_obj.messages = await sendWsMessageDataRequest();
  } catch (error) {
    console.error("Error:", error);
  }
}



async function renderChat() {

  const chatTitle = document.getElementById('chatTitle')
  chatTitle.textContent = ' [ '+ websocket_obj.chat_name +' | ' + websocket_obj.chat_id + ' ]'

  let myArray = websocket_obj.messages.message_data;
  let mainContainer = document.getElementById('messageContainer');
  mainContainer.innerHTML = '';

  let tmpDiv = [];
  for (let i = 0; i < myArray.length; i++) {
    let messageDiv = document.createElement('div');
    let contentDiv = document.createElement('div');
    let strongElement = document.createElement('strong');
    let lineBreakElement = document.createElement('br');

    let textDiv = document.createElement('div');
    textDiv.classList.add('text-break');
    textDiv.textContent = myArray[i].text;

    let timestampDiv = document.createElement('div');
    timestampDiv.classList.add('timestamp');
    timestampDiv.textContent = myArray[i].timestamp;

    if (websocket_obj.username === myArray[i].sender)
    {
      strongElement.textContent = 'You';
      messageDiv.style.textAlign = 'right';
      contentDiv.classList.add('own-message-text');
    }
    else
    {
      contentDiv.classList.add('other-message-text');
      strongElement.textContent = myArray[i].sender;
    }

    contentDiv.appendChild(strongElement);
    contentDiv.appendChild(lineBreakElement);
    contentDiv.appendChild(textDiv);
    contentDiv.appendChild(timestampDiv);

    messageDiv.appendChild(contentDiv);
    tmpDiv.push(messageDiv);
  }

  // Append all divs in the tmpDiv array to the main container
  for (let i = 0; i < myArray.length; i++) {
    mainContainer.appendChild(tmpDiv[i]);

    if (i < tmpDiv.length - 1) {
      mainContainer.appendChild(document.createElement('br'));
    }
  }
}