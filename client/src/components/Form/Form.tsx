import React from 'react'
import { Input, Form, Button, Upload } from 'antd';
import './index.css';
import { fetchAddPost } from '../../redux/thunkActions'
import { useAppDispatch } from '../../redux/hook';
import { PlusOutlined } from '@ant-design/icons';

export default function AddForm() {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

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
    <div>
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
        label="Имя"
        name="title"
        rules={[{ message: 'Введите имя!' }]}
      > <Input /> 
      </Form.Item>
      <Form.Item
        label="О чем ваш профиль?"
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
      <Button type="primary" htmlType="submit">
          Добавить
      </Button>
      </Form.Item>
    
     
    </Form>
    </div>
  )
}
