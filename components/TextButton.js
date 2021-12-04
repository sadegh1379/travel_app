import React from 'react'
import { View, Text , TouchableOpacity } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
const TextButton = ({onPress , title , customBtnStyle , customTextStyle}) => {
    return (
       <TouchableOpacity
        onPress={onPress}
        style={{
            borderRadius : SIZES.radius,
            backgroundColor:COLORS.white,
            height : 55,
            justifyContent:'center',
            alignItems:'center',
            ...customBtnStyle
        }}
       >
           <Text
                style={{
                    color:COLORS.black,
                    ...FONTS.h3,
                    ...customTextStyle
                }}
           >{title}</Text>
       </TouchableOpacity>
    )
}

export default TextButton
