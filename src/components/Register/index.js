import React from 'react'
import styled from "styled-components";
import {Button, Form, Input, message} from "antd";
import {createHashHistory} from 'history'
import axios from 'axios'

const base_url = process.env.REACT_APP_BASE_URL
const history = createHashHistory()

const Container = styled.div`
    max-width: 400px;
    width: 100%;
    display: flex;
    align-items: center;
    margin: 0 auto;
    height: 100%;
`

const Register = props => {

    const {getFieldDecorator} = props.form

    const validateToNextPassword = (rule, value, callback) => {
        const { form } = props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    const handleConfirmBlur = () => {

    }

    const submit = () => {
        props.form.validateFields((err, values) => {
            if (!err) {
                axios.post(base_url + '/register', {
                    name: values.name,
                    pass: values.pass,
                    email: values.email
                }).then(resp => {
                    if (resp.data.code === 200) {
                        message.success('注册成功')
                        setTimeout(() => {
                            history.replace('/login')
                        }, 1000)
                    }
                })
            }
        })
    }

    return (
        <Container>
            <div style={{flexGrow: 1}}>
                <div style={{textAlign: 'center', fontSize: '30px', marginBottom: '20px'}}>
                    注册
                </div>
            <Form labelCol={{span: 8}} wrapperCol={{span: 16}}>
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
                <Form.Item label={'邮箱'}>
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: '请输入合法的邮箱地址!'
                            },
                            {
                                required: true,
                                message: '请输入邮箱地址!'
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
                            // {
                            //     validator: this.validateToNextPassword,
                            // },
                        ],
                    })(<Input.Password />)}
                </Form.Item>
                <Form.Item label="确认密码" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: '请确认您的密码!',
                            },
                            // {
                            //     validator: this.compareToFirstPassword,
                            // },
                        ],
                    })(<Input.Password onBlur={handleConfirmBlur} />)}
                </Form.Item>
                <div style={{textAlign: 'center'}}>
                <Button type={"primary"} style={{width: '150px'}}
                        onClick={submit}
                >注册</Button>
                </div>
            </Form>
            </div>
        </Container>
    )
}

const RegisterComponent = Form.create()(Register)

export default RegisterComponent