import React from 'react'
import { View, Text , TouchableOpacity , Image } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'

const TextButtonIcon = ({onPress , icon , iconColor = COLORS.black , title , customBtnStyle , customTextStyle}) => {
    return (
       <TouchableOpacity
        onPress={onPress}
        style={{
            borderRadius : SIZES.radius,
            backgroundColor:COLORS.white,
            height : 55,
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'row',
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
           <Image
                source={icon}
                style={{
                    width:20,
                    height : 20,
                    tintColor: iconColor,
                    marginLeft : 10
                }}
           />
       </TouchableOpacity>
    )
}

export default TextButtonIcon
