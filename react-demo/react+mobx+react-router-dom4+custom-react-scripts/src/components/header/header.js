import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {observer, inject} from "mobx-react";

@inject('stores')
@observer
class Header extends Component {
    constructor(props) {
        super(props)
        this.store = this.props.stores;
        this.state = {
            isShowListInfo: true,
            number: this.store.number
        }
        console.info(this.store.number)
    }

    render() {
        return (
            <header>
                <nav>
                    <ul>
                        <Link to="/home">首页</Link>
                        <br/>
                        <Link to="/hello/123">第二页123</Link>
                        <Link to="/hello">第二页</Link>
                        <br/>
                        <Link to="/list">一个列表</Link>
                        <br/>
                    </ul>
                    <button onClick={this.onClickPrintNum.bind(this)}>click me{this.store.number}</button>
                    <button onClick={this.login.bind(this)}>login{this.store.token}</button>
                </nav>
            </header>
        )
    }

    onClickPrintNum() {
        this.store.add()
        console.info(this.store.number)
    }

    login() {
        this.store.login({username: 'admin', password: 'admi'})
    }
}

export default withRouter(Header)