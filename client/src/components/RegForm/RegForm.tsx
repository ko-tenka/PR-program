import React from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hook';
import { fetchUserRegister } from '../../redux/thunkActions'; // Путь к вашему экшену

export default function RegForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFinish = async (values) => {
    await dispatch(fetchUserRegister(values));
    navigate('/');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Логин"
        name="login"
        rules={[{ required: true, message: 'Пожалуйста, введите логин!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Почта"
        name="email"
        rules={[{ required: true, message: 'Пожалуйста, введите почту!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
}
