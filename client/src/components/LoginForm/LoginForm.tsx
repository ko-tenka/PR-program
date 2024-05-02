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
    login?: string;
    password?: string;
  };
  
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const onFinish = async (values: FieldType) => {

      const result = await dispatch(fetchUserLogin(values));
      if(result.payload === 'Вы вошли'){
        navigate('/')
      }
      else{
        setErrorMessage(result.payload)
        form.resetFields();
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
      label={<span style={{ color: 'white' }}>Логин</span>}
      name="login"
      rules={[{ required: true, message: 'Пожалуйста введите логин!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label={<span style={{ color: 'white' }}>Пароль</span>}
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
