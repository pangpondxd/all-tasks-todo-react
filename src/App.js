import React from "react";
import {useSelector} from "react-redux";
import TaskList from "./components/TaskList";
import InputTask from "./components/InputTask";
import { List, Divider } from 'antd';
import "./App.css";
const App = () => {
  const {cart, done} = useSelector((state) => ({...state}));
  return (
    <div className="App">
      {cart.length > 0 ? ( 
      <>
      <Divider orientation="left">Todo lists</Divider>
      <InputTask />
    <List
      bordered
      dataSource={cart}
      renderItem={item => (
        <List.Item>
         {item.todo} <TaskList key={item._id} p={item} />
        </List.Item>
      )}
    />
    </>) : (<h1>No todo task now</h1>)}
      <br />
      {done.length > 0 ? ( 
      <>
      <Divider orientation="left">Done lists</Divider>
      <InputTask />
    <List
      bordered
      dataSource={done}
      renderItem={item => (
        <List.Item>
         <s>{item.done}</s>
        </List.Item>
      )}
    />
    </>) : (<h1>No done task now</h1>)}
    </div>
  );
};

export default App;
