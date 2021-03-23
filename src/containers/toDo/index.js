import React, { useState, useEffect } from "react";
import SockJsClient from "react-stomp";
import todoList from "../../ressouces/mocks/todoListMock.json";
//components
import Header from "../../components/Header";
import ToDoList from "../../components/ToDoList";
import ToDoForm from "../../components/ToDoForm";
import { isConnected } from "../../services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GET_IMAGE_URL, WEBSOCKET_URL, NOTIFICATIONS_TOPIC } from "./constants";

function ToDo() {
  const [toDoList, setToDoList] = useState(todoList);
  const [userInput, setUserInput] = useState("");
  const [connected, setConnected] = useState(false);
  const [liveImg, setLiveImg] = useState("");
  const [client, setClient] = useState("");
  const [notifications, setNotifications] = useState("");

  //componentDidMount
  useEffect(() => {
    var streamId;
    isConnected()
      .then((res) => {
        if (res && res._available.length > 0) {
          setConnected(true);
          streamId = setInterval(updateLiveImage, 170);
        }
      })
      .catch((err) => {
        console.log("axios err=", err);
      });

    //ComponentWillUnmount
    return () => {
      console.log("axios cleanup.");
      clearInterval(streamId);
    };
  }, []);

  const handleToggle = (id) => {
    let mapped = toDoList.map((task) => {
      return task.id === Number(id)
        ? { ...task, complete: !task.complete }
        : { ...task };
    });
    setToDoList(mapped);
  };

  /*const websocket = () => {
    var ws = new WebSocket("ws://localhost/pokaiok-dev/websockets/websocket");
    ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      ws.send(
        JSON.stringify({
          command: "subscribe",
          identifier: "{\"topic\":\"notifications\"}",
        })
      );
      console.log("connected");
    };

    ws.onmessage = (evt) => {
      // listen to data sent from the websocket server
      console.log(evt);
      const message = JSON.parse(evt.data);
      console.log(message);
    };

    ws.onclose = () => {
      console.log("disconnected");
      // automatically try to reconnect on connection loss
    };
    setWs(ws);
  };*/

  const updateLiveImage = () => {
    var random = Math.random();
    setLiveImg(GET_IMAGE_URL + random);
  };

  const handleFilter = () => {
    let filtered = toDoList.filter((task) => {
      return !task.complete;
    });
    setToDoList(filtered);
  };

  const addTask = (userInput) => {
    let copy = [...toDoList];
    copy = [
      ...copy,
      { id: toDoList.length + 1, task: userInput, complete: false },
    ];
    setToDoList(copy);
  };

  const handleChange = (text) => {
    setUserInput(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(userInput);
    setUserInput("");
  };

  const showNotifications = (notification) => {
    setNotifications(notifications);
    toast(notification.text);
  };

  return (
    <div className="App">
      <Header />
      <ToDoList
        toDoList={toDoList}
        handleToggle={handleToggle}
        handleFilter={handleFilter}
      />
      <ToDoForm
        handleChange={handleChange}
        userInput={userInput}
        addTask={addTask}
        handleSubmit={handleSubmit}
      />
      {connected && <img className="liveImg" alt="liveImg" src={liveImg}></img>}

      <SockJsClient
        url={WEBSOCKET_URL}
        topics={[NOTIFICATIONS_TOPIC]}
        onMessage={(notifications) => {
          showNotifications(notifications);
        }}
        ref={(client) => {
          setClient(client);
        }}
      />
      <ToastContainer />
    </div>
  );
}

export default ToDo;
