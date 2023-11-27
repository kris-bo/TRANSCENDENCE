  websocket_obj = {
    switch_bool: false,
    message: null,
    sender: null,
    websocket: null,
}

function establishWebsocketConnection() {

    const username = obj.username
    const password = obj.password
    console.log('TEST OBJ< NAME: ', username)
    console.log('TEST OBJ< PASSWORD: ', password)

    websocket_obj.websocket = new WebSocket(
        'ws://localhost:6969/ws/test/'
    );

    // Wait for the WebSocket to open before sending messages
    websocket_obj.websocket.onopen = function (event) {
        console.log("WebSocket opened. You can now send messages.");
        sendWebsocketData()
    };


    // Handle incoming messages
    websocket_obj.websocket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        // Process the incoming message data
        console.log(data);
        let sender = document.getElementById('sender')
        let message = document.getElementById('message')

        sender.textContent = websocket_obj.sender
        message.textContent = websocket_obj.message

    };

    // Handle WebSocket errors
    websocket_obj.websocket.onerror = function (error) {
        console.error("WebSocket error:", error);
    };

    // Handle WebSocket closure
    websocket_obj.websocket.onclose = function (event) {
        console.log("WebSocket closed:", event);
    };
}

function sendWebsocketData() {

    if (websocket_obj.websocket.readyState === WebSocket.OPEN)
    {
        console.log("WebSocket open");
        websocket_obj.websocket.send(JSON.stringify({
            'type': 'chat.message',
            'sender': websocket_obj.sender,
            'message': websocket_obj.message,
        }));
    }
    else {
        console.error("WebSocket connection is not open.");
    }
}