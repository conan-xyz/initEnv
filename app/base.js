/**
 * Created by Conan on 2016/12/1.
 */
import React from 'react';
import {render} from 'react-dom';

export default class Base extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
}