/**
 * Created by Conan on 2016/12/1.
 */
import React from 'react';
import {render} from 'react-dom';
import connect from 'react-redux/lib/components/connect';
import * as Action from '../actions/action';

@connect(
    state =>({
        doActionState: state.doActionState,
        errorState: state.errorState
    }),
    {
        doAction: Action.doAction
    }
)
export default class IndexForm extends React.Component {
    constructor(props) {}

    render() {
        return (
            <div></div>
        )
    }
}