import React from 'react';
import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hook';
import { fetchUserRegister } from '../../redux/thunkActions'; // Путь к вашему экшену
import { Alert } from 'antd';

import { ILoginEmailPassword } from '../../types/types'

export default function RegForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onFinish = async (values: ILoginEmailPassword) => {
      const result = await dispatch(fetchUserRegister(values));
      
      if (result.error) {
          setErrorMessage(result.error || 'Ошибка при регистрации пользователя'); // Предполагаем, что `result.error` это строка
          form.resetFields();
      } else {
          setErrorMessage(null);
          navigate('/');
      }
  };
const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};


  return (
    <>
    {errorMessage && <Alert message={'Такой пользователь уже есть!'} type="error" />}
    <Form
      form={form}
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
        label={<span style={{ color: 'white' }}>Логин</span>}
        name="login"
        rules={[{ required: true, message: 'Пожалуйста, введите логин!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={<span style={{ color: 'white' }}>Почта</span>}
        name="email"
        rules={[{ required: true, message: 'Пожалуйста, введите почту!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={<span style={{ color: 'white' }}>Пароль</span>}
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
    </>
  );
}
