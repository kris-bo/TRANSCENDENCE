
// BUTTON TO SEND MESSAGE IN CHAT
function addEventListenersIsAuth() {

  function loadContentChat(file, targetId) {
    fetch(file)
      .then(response => response.text())
      .then(html => {
        document.getElementById(targetId).innerHTML = html;
        chatDom();
      })
      .catch(error => console.error('Error loading content:', error));
  }
  loadContentChat('html/chat.html', 'chat');

  document.getElementById('showChatButton').addEventListener('click', function () {
    const chat = document.getElementById('chat')
    const button_label = document.getElementById('showChatButton')

    if (chat.classList.contains('hidden')) {
      chat.classList.remove('hidden')
      button_label.textContent = 'go back'
    } else {
      chat.classList.add('hidden')
      button_label.textContent = 'go to chat'
    }
  })
}


function setErrorWithTimout(element_id, error_message, timout) {
  const obj = document.getElementById(element_id)
  obj.textContent = error_message;
  obj.style.display = 'block';
  setTimeout(function() {
    obj.remove();
  }, timout);
}

