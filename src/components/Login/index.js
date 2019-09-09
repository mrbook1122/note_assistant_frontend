import React from 'react'
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';
import {Link} from "react-router-dom";
import axios from 'axios'
import {createHashHistory} from 'history'

const base_url = process.env.REACT_APP_BASE_URL
const history = createHashHistory()

const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    width: '300px',
    margin: '0 auto',
    height: '100%'
}

const buttonStyle = {
    padding: 0
}

class NormalLoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.post(base_url + '/login', {
                    name: values.username,
                    pass: values.password
                }).then(resp => {
                    if (resp.data.code === 200) {
                        localStorage.setItem('Token', resp.data.msg)
                        message.success('登录成功')
                        setTimeout(() => {
                            history.replace('/')
                        }, 1000)
                    } else {
                        message.error("用户名或密码错误")
                    }
                })
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div style={containerStyle}>
                <Form onSubmit={this.handleSubmit} style={{flexGrow: 1}}>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: '请输入用户名!'}],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="用户名"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: '请输入密码!'}],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                type="password"
                                placeholder="密码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>记住我</Checkbox>)}
                        <a style={{float: 'right'}} href="">
                            忘记密码
                        </a>
                        <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                            登录
                        </Button>
                        <Link to={'/register'}>注册账号</Link>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({name: 'normal_login'})(NormalLoginForm);

export default WrappedNormalLoginForm