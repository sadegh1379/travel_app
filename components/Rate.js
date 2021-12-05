import React from 'react'
import { View, Text, Image } from 'react-native'
import { icons } from '../constants'

const Rate = ({containerStyle , rate}) => {

    let starComponents = []

    for(var i = 0 ; i < rate ; i++){
        starComponents.push(
            <Image
                key={`full-${i}`}
                resizeMode="contain"
                source={icons.star}
                style={{
                    width:15,
                    height : 15,
                    marginLeft : i == 0 ? 0 : 5
                }}
            />
        )
    }
    return (
        <View style={{flexDirection :'row'}}>
            {starComponents}
        </View>
    )
}

export default Rate
