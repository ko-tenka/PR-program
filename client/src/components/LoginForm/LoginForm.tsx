import React from 'react'
// import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';

export default function LoginForm() {
  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };
  
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
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
    <Form.Item<FieldType>
      label="Логин"
      name="username"
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
  )
}
