import { Input, Form, Button, Upload } from 'antd';
import './index.css';
import { fetchAddPost } from '../../redux/thunkActions'
import { PlusOutlined } from '@ant-design/icons';

import React, { useEffect } from 'react';
import { fetchUserInfo } from '../../redux/thunkActions'
import { useAppDispatch, useAppSelector } from '../../redux/hook';


export default function AddForm() {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const user = useAppSelector((store) => store.userSlice.user)
  useEffect(() => {
    void dispatch(fetchUserInfo());
  }, [dispatch])


  const onFinish = async (values) => {
    const result = await dispatch(fetchAddPost(values));
    console.log(result)
    
};
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

  return (
    <div className='FormCont'>
      {user?(<>
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
        label={<span style={{ color: 'white' }}>Имя</span>}
        name="title"
        rules={[{ message: 'Введите имя!' }]}
      > <Input /> 
      </Form.Item>
      <Form.Item
        label={<span style={{ color: 'white' }}>О чем ваш профиль?</span>}
        name="description"
        rules={[{ message: 'Введите имя!' }]}
      > <Input /> 
      </Form.Item>
        {/* Тут большой размер не принимает ошибка 413 */}
      {/* <Form.Item label="Upload" valuePropName="fileList" name='img' getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <button style={{ border: 0, background: 'none' }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Загрузить</div>
            </button>
          </Upload>
        </Form.Item> */}

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit" className='btnForm'> 
          Добавить
      </Button>
      </Form.Item>
    
     
    </Form></>):(<></>)}
    
    </div>
  )
}
