import React, { Component } from 'react'
import PhoneInfo from './PhoneInfo';

export default class PhoneInfoList extends Component {
    static defaultProps = {
        data: []
    }

    render() {
        const { data, onRemove } = this.props;

        const list = data.map(
            info => (
            <PhoneInfo 
                onRemove = {onRemove} 
                info={info} 
                key={info.id}
            />
            )
        );
        return (
            <div>
                {list}
            </div>
        )
    }
}
