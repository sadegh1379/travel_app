import React , {useState , useEffect} from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image
} from 'react-native';
import { NavbarHeader, TextButtonIcon } from '../components';
import { COLORS , SIZES , icons , FONTS } from '../constants';


const Place = ({navigation , route}) => {

    const [selectedPlace , setSelectedPlace] = useState(null)

    useEffect(()=>{
        const {selectedPlace} = route.params
        setSelectedPlace(selectedPlace) 
    },[])

    const renderPlace = ()=>{
        return(
            <ImageBackground
                source={selectedPlace?.image}
                style={{
                    width :'100%',
                    height : '100%'
                }}
            >
                <NavbarHeader
                    
                    leftOnPress={()=>navigation.goBack()}
                    right={false}
                    customContainerStyle={{
                        marginTop  : SIZES.base * 2
                    }}
                />
                <View 
                  style={{
                      flex : 1,
                      paddingHorizontal:SIZES.padding,
                      justifyContent:'flex-end'
                  }}
                >
                    {/* head */}
                    <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between'
                        }}
                    >
                        <Text
                           style={{
                            color :COLORS.white,
                            ...FONTS.largeTitle,
                            marginRight : 10
                        }}
                        >{selectedPlace?.name}</Text>
                        <View style={{flexDirection:'row' }}>
                            <Text
                                style={{
                                    color :COLORS.white,
                                    ...FONTS.h3,
                                    marginRight : 10
                                }}
                            >{selectedPlace?.rate}</Text>
                            <Image
                                source={icons.star}
                                resizeMode="contain"
                                style={{
                                    width :20,
                                    height : 20
                                }}
                            />
                        </View>
                    </View>
                    {/* description */}
                    <Text
                        style={{
                            ...FONTS.body3,
                            color:COLORS.white,
                            width : "80%",
                            lineHeight: 25,
                            marginTop : SIZES.base,
                            
                        }}
                    >
                        {selectedPlace?.description}
                    </Text>
                    {/* button */}
                    <TextButtonIcon
                        title="Book a flight"
                        icon={icons.aeroplane}
                        customBtnStyle={{
                            marginVertical : SIZES.padding * 2
                        }}
                        customTextStyle={{
                            ...FONTS.h2
                        }}
                        onPress={()=>console.log('')}
                    />
                </View>
            </ImageBackground>
        )
    }
    return (
        <View>
            {/* place */}
            {renderPlace()}
        </View>
    )
}

export default Place;