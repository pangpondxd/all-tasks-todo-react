import React from 'react'
import { Form, Input, Button } from 'antd';
import _ from "lodash";
import { useDispatch } from "react-redux";

const InputTask = () => {
const [form] = Form.useForm()
const dispatch = useDispatch();
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

  const onFinish = values => {
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
          _id: cart.length,
        ...values,
        finished: false
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));

      // add to reeux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      // show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });

      form.resetFields()
    }
  };

    return (
        <Form {...layout} form={form} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name="todo" label="Todo Task" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
}
export default InputTask