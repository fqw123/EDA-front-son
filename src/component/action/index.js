
import React from 'react';
import View from './tabs';
import Model from './model';

export default function(props) {
    return  (
        <Model  {...props}>
            {prop => <View {...prop}  {...props}  />}
        </Model>
    );
}
