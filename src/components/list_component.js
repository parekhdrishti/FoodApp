import * as React from 'react'
import {View , Text} from 'react-native'
import {Card} from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';




export let ListComponent = (props) =>{

    const picture = props.url //"https://i.ytimg.com/vi/OD7d1e1mwyQ/maxresdefault.jpg"
    const title = props.title //"Jogi - Swastik the band"
    const rating = props.rating //"4.6"
    const making_time = props.time //20

    return(
            <Card style={{margin:10}}>
                <Card.Cover style={{height:hp("25%")}} source={{ uri: picture}} />
                <View style = {{flexDirection:'row' , paddingRight:10 , paddingLeft:10 , paddingTop:5 }}>
                    <View style={{flex:1}}>
                        <Text style={{textAlign:'left',paddingBottom:5, fontSize:17, fontWeight:"500", paddingTop:3 , color:"#131313" }}>{title}</Text>
                        <View style={{flexDirection: 'row',}}>
                            <Text style={{textAlign:'left',paddingBottom:5,paddingTop:3 , color:"#808080", flexGrow: 1 }}>Rating: {rating}/5</Text>
                            <Text style={{textAlign:'left',paddingBottom:5,paddingTop:3 , color:"#808080" }}>{making_time} minutes</Text>
                        </View>
                    </View>   
                </View>
            </Card>

    )
}