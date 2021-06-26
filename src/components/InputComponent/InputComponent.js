import React from 'react';
import {Input} from 'antd';

const InputComponent = props => {
    return(
        <Input 
            value={props.value}
            disabled={true}
        />
    )
}

export default InputComponent;