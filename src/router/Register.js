import React, {useState} from 'react'
import styled from "styled-components";
import {Button, Form, Input, message, Upload, Icon} from "antd";
import {createHashHistory} from 'history'
import axios from 'axios'

const base_url = process.env.REACT_APP_BASE_URL
const history = createHashHistory()

const Container = styled.div`
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
    padding-top: 200px;
`

const Register = props => {

    const {getFieldDecorator} = props.form

    //当用户离开确认密码输入框，然后可能修改密码输入框
    const [confirmDirty, setConfirmDirty] = useState(false)
    const handleConfirmBlur = (e) => {
        const {value} = e.target;
        setConfirmDirty(confirmDirty || !!value);
    }

    const compareToFirstPassword = (rule, value, callback) => {
        const {form} = props;
        if (value && value !== form.getFieldValue('pass')) {
            callback('两次密码不一致!');
        } else {
            callback();
        }
    };

    const validateToNextPassword = (rule, value, callback) => {
        const {form} = props;
        if (value && confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    const submit = e => {
        e.preventDefault()
        props.form.validateFields((err, values) => {
            if (!err) {
                if (values.email === undefined || values.email === '')
                    values.email = null
                axios.post('/register', {
                    name: values.name,
                    phone: values.phone,
                    pass: values.pass,
                    email: values.email
                }).then(resp => {
                    if (resp.data.code === 200) {
                        message.success('注册成功')
                        setTimeout(() => {
                            history.replace('/login')
                        }, 1000)
                    } else {
                        message.error(resp.data.msg)
                    }
                })
            }
        })
    }

    //上传按钮
    const uploadButton = (
        <div>
            <Button>
                <Icon type={'upload'}/>点击上传
            </Button>
        </div>
    );

    return (
        <Container>
            <div style={{flexGrow: 1}}>
                <Form labelCol={{span: 8}} wrapperCol={{span: 16}} onSubmit={submit}>
                    <Form.Item label={'用户名'}>
                        {getFieldDecorator('name', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入用户名!'
                                }
                            ]
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label={'手机号'}>
                        {getFieldDecorator('phone', {
                            rules: [{required: 'true', message: '请输入您的手机号！'},
                                {len: 11, message: '请输入正确的手机号！'}]
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label={'头像'}>
                        <Upload name={'avatar'}>
                            {uploadButton}
                        </Upload>
                    </Form.Item>
                    <Form.Item label={'邮箱'}>
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: '请输入合法的邮箱地址!'
                                }
                            ]
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label="密码" hasFeedback>
                        {getFieldDecorator('pass', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入密码!',
                                },
                                {
                                    validator: validateToNextPassword,
                                },
                            ],
                        })(<Input.Password/>)}
                    </Form.Item>
                    <Form.Item label="确认密码" hasFeedback>
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: '请确认您的密码!',
                                },
                                {
                                    validator: compareToFirstPassword,
                                },
                            ],
                        })(<Input.Password onBlur={handleConfirmBlur}/>)}
                    </Form.Item>
                    <Form.Item wrapperCol={{span: 16, offset: 8}}>
                        <Button type="primary" htmlType="submit">
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Container>
    )
}

const RegisterComponent = Form.create()(Register)

export default RegisterComponent