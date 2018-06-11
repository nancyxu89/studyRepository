import React, {Component} from 'react'

export default class Login extends Component{
    render(){
        return (
            <div>
                <label htmlFor="">用户名: </label><input type="text"/>
                <label htmlFor="">密码: </label><input type="password"/>
            </div>
        )
    }
}