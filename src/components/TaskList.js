import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import _ from 'lodash'
import {Button, Modal, Input, Form, message, Checkbox} from 'antd'
const TaskList = ({p}) => {
    const [todo, setTodo] = useState('')
    const dispatch = useDispatch();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
      };

      const validateMessages = {
        required: '${label} is required!',
        types: {
          email: '${label} is not a valid email!',
          number: '${label} is not a valid number!',
        },
        number: {
          range: '${label} must be between ${min} and ${max}',
        },
      };
      

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
    
      const handleRemove = () => {
    // console.log(p._id, "to remove");
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // [1,2,3,4,5]
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
      message.error('ลบข้อมูลสำเร็จแล้ว');
    }
  };

  const handleEdit = () => {
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].todo = todo;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
      message.success('แก้ไขข้อมูลสำเร็จแล้ว');
    }
  };

  function onChange(e) {
    let done = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("done")) {
        done = JSON.parse(localStorage.getItem("done"));
      }
      // push new product to cart
      done.push({
          _id: done.length,
        done: p.todo,
        finished: true
      });
      // remove duplicates
      let unique = _.uniqWith(done, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("done", JSON.stringify(unique));

      // add to reeux state
      dispatch({
        type: "ADD_TO_DONE",
        payload: unique,
      });
      // show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });

      handleRemove()
    }
  }

  
    return (
        <>
        <Checkbox onChange={onChange}>เสร็จแล้ว (Done)</Checkbox>
            <Button type="primary" onClick={showModal}>
        Edit
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleEdit} onCancel={handleCancel}>
      <Form {...layout} name="nest-messages" validateMessages={validateMessages}>
        <Form.Item name="todo" label="Todo Task" rules={[{ required: true }]}>
          <Input defaultValue={p.todo} name="todo" onChange={(e) => setTodo(e.target.value)} />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        </Form.Item>
      </Form>
      </Modal>
      <Button type="danger" onClick={handleRemove}>
        Remove
      </Button>
              </>
    )
}

export default TaskList