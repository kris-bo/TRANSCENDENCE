
// BUTTON TO SEND MESSAGE IN CHAT
function addEventListenersIsAuth() {
  document.getElementById('sendMessageButton').addEventListener('click', async function () {
    websocket_obj.message = document.getElementById('messageInput').value
    websocket_obj.sender = websocket_obj.username

    document.getElementById('messageInput').value = ''
    await getOnlineStats()
    // await getMessageData()
    // await renderChat();
  });



  document.getElementById('invite_user_button').addEventListener('click', async function () {
    const invited_user_name = document.getElementById('invite_user').value

    document.getElementById('invite_user').value = ''
    await inviteUser(invited_user_name)
  })
}


// rn as HTTP but needs to happen through ws
async function inviteUser(invited_user_name){
  const url = `http://127.0.0.1:6969/user/inviteUserToChat/${websocket_obj.user_id}/${websocket_obj.chat_id}/${invited_user_name}/`
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Could not get Users Chats Data');
      }
      return response.json();
    })
    .then(data => {
      renderProfile()
    })
    .catch(error => {
      console.error('Error during getUserChats:', error);
    });
}


async function leaveChat() {
  const chatDiv = document.getElementById('showChat');
  chatDiv.classList.add('hidden');
  console.log('USER_ID | CHAT_ID: ', websocket_obj.user_id, websocket_obj.chat_id)
  const url = `http://127.0.0.1:6969/user/leaveChat/${websocket_obj.user_id}/${websocket_obj.chat_id}/`
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Could not get Users Chats Data');
      }
      return response.json();
    })
    .then(data => {
      renderProfile()
    })
    .catch(error => {
      console.error('Error during getUserChats:', error);
    });
}


async function createChat() {

  const chat_name = document.getElementById('new_chat_name').value
  if (!chat_name.trim()) {
    console.error('CHAT NAME CANT BE EMPTY ')
    return
  }

  const url = `http://127.0.0.1:6969/user/createChat/${websocket_obj.user_id}/${chat_name}/`
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Could not create new Chat');
      }
      return response.json();
    })
    .then(data => {
      renderProfile()
      // getMessageData()
      // renderChat()
    })
    .catch(error => {
      console.error('Error during creating new Chat:', error);
    });
}


async function renderProfile() {

  let sender_title = document.getElementById('displayUserName');
  sender_title.textContent = 'Hey ' + websocket_obj.username + ' 🫠'

  const chatDiv = document.getElementById('userChatsList');
  chatDiv.classList.remove('hidden');

  let url = `http://127.0.0.1:6969/user/getUserChats/${websocket_obj.user_id}/`
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Could not get Users Chats Data');
      }
      return response.json();
    })
    .then(data => {
      // console.log('GOT USER CHAT LIST: ', data)
      websocket_obj.chat_data = data.chat_data
      console.log('GOT USER CHAT LIST: ', websocket_obj.chat_data)
      renderUsersChatList()
    })
    .catch(error => {
      console.error('Error during getUserChats:', error);
    });


  const friendsDiv = document.getElementById('userFriendsList');
  friendsDiv.classList.remove('hidden');
  url = `http://127.0.0.1:6969/user/getAllUser/${websocket_obj.user_id}/`
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Could not get all Users');
      }
      return response.json();
    })
    .then(data => {
      // console.log('GOT USER CHAT LIST: ', data)
      // DO HERE
      websocket_obj.all_user = data.all_user
      console.log('GOT USER LIST: ', websocket_obj.all_user)
      renderAllUsersList()
    })
    .catch(error => {
      console.error('Error during getAllUser:', error);
    });

  console.log('YES YSR YSRXDGS')
}


async function handleButtonClickChats(chatId, chatName) {
  const chatDiv = document.getElementById('showChat');
  chatDiv.classList.remove('hidden');

  websocket_obj.chat_id = chatId;
  websocket_obj.chat_name = chatName;
console.log('BEEF')
  // await getMessageData() // change later to only this back
  // console.log('BEFORE')
  await getOnlineStats()
  // console.log('LOL: ', websocket_obj.onlineStats)
  // await renderChat();
}

async function renderUsersChatList() {
  let array_of_chats = websocket_obj.chat_data
  let userChatsList = document.getElementById('userChatsList');
  userChatsList.innerHTML = '';

  let title = document.createElement('h2');
  title.textContent = 'Your Chats:'
  userChatsList.appendChild(title);

  if (array_of_chats.length === 0) {
    let paragraph = document.createElement('p');
    paragraph.textContent = 'Damn, pretty empty here...'
    userChatsList.appendChild(paragraph);
  }

  for (let i = 0; i < array_of_chats.length; i++)
  {
    let paragraph = document.createElement('p');
    let button = document.createElement('button');
    button.textContent = array_of_chats[i].chat_name;
    button.classList.add('btn');
    button.classList.add('btn-outline-success');

    button.addEventListener('click', async function () {
      await handleButtonClickChats(array_of_chats[i].chat_id, array_of_chats[i].chat_name);
    });

    userChatsList.appendChild(paragraph);
    userChatsList.appendChild(button);
  }
}

async function handleButtonClickUser(user_id, user_name) {
  const chatDiv = document.getElementById('tempTextInfo');
  chatDiv.classList.remove('hidden');
  chatDiv.textContent = 'Yeah something should happen now lol'


//   websocket_obj.chat_id = chatId;
//   websocket_obj.chat_name = chatName;
// console.log('BEEF')
  // await getMessageData() // change later to only this back
  // console.log('BEFORE')
  // await getOnlineStats()
  // console.log('LOL: ', websocket_obj.onlineStats)
  // await renderChat();
}


async function renderAllUsersList() {
  let array_of_users = websocket_obj.all_user
  let userFriendsList = document.getElementById('userFriendsList');
  userFriendsList.innerHTML = '';

  console.log('USER LIST: ', websocket_obj.all_user)


  let title = document.createElement('h2');
  title.textContent = 'All User:'
  userFriendsList.appendChild(title);

  if (array_of_users.length === 0) {
    let paragraph = document.createElement('p');
    paragraph.textContent = 'Damn, pretty empty here...'
    userFriendsList.appendChild(paragraph);
  }

  for (let i = 0; i < array_of_users.length; i++)
  {
    let paragraph = document.createElement('p');
    let button = document.createElement('button');
    button.textContent = array_of_users[i].name;
    button.classList.add('btn');
    button.classList.add('btn-outline-success');

    button.addEventListener('click', async function () {
      await handleButtonClickUser(array_of_users[i].user_id, array_of_users[i].user_name);
    });

    userFriendsList.appendChild(paragraph);
    userFriendsList.appendChild(button);
  }
}