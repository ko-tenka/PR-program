import React from 'react'
// import type { FormProps } from 'antd';
import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { fetchUserLogin } from '../../redux/thunkActions'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hook';
import { Alert } from 'antd';

export default function LoginForm() {
  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };
  
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const onFinish = async (values: FieldType) => {
    try {
      const result = await dispatch(fetchUserLogin({ username: values.username, password: values.password }));
      console.log('============>', result);

      if (result.error) {
        setErrorMessage('Не верный пароль'); // Используем `result.error` напрямую, предполагая, что это строка
        form.resetFields();
      } else {
        setErrorMessage(null);
        navigate('/');
      }
    } catch (error) {
      setErrorMessage('Произошла ошибка при входе.'); // В случае общей ошибки входа
    }
  };
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
    {errorMessage && <Alert message={errorMessage || 'Ошибка'} type="error" />}
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
    <Form.Item<FieldType>
      label="Логин"
      name="login"
      rules={[{ required: true, message: 'Пожалуйста введите логин!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Пароль"
      name="password"
      rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Войти
      </Button>
    </Form.Item>
  </Form>
  </>
  )
}
