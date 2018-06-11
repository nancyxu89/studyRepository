import React, {Component} from "react";
import './hello.scss'

export default class Hello extends Component {
    render() {
        console.info(this.props.match)
        return (
            <div className="title">hello</div>
        )
    }
}