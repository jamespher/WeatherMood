import React from 'react';

import {getMoodIcon} from 'utilities/getmood.js';
import moment from 'moment';
import './PostItem.css';


export default class PostItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {id, mood, text, ts} = this.props;
        return (
            <div className="post-item">
                <div className="post d-flex">
                    <div className="mood col-1">
                        <i className={`${getMoodIcon(mood)}`}></i>
                    </div>
                    <div className="wrap pl-4">
                        <div className="ts text-secondary">{moment(ts * 1000).calendar()}</div>
                        <div className="text col-auto">{text}</div>
                    </div>
                </div>
            </div>
        );
    }
}