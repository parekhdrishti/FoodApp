import * as React from 'react'
import {View , Text , StyleSheet , FlatList} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RadioButton, Card } from 'react-native-paper';
import {connect} from 'react-redux'


export default class MailPref extends React.Component{

    flags = []

    constructor(props){
        super(props)
    }

    state = {
        selected: this.flags
    }

    //for testing response prop
    /*
    static getDerivedStateFromProps(nextProps, prevState) {
        //console.log(nextProps.user_data_state)
        console.log(nextProps.resp)
        return null
    }
    */

    data = [
        {
            "id": 1,
            "value": "Yes"
        },
        {
            "id": 2,
            "value": "No"
        },
    ]

    render(){
        //console.log('SC')
        return(
            <View>
                <Card style={styles.card}>
                    <Card.Content>
                        <Text style={styles.card_title}>Do you want to receive emails from us?</Text>
                        <FlatList
                            data = {this.data}
                            renderItem = {({item}) => (
                                
                                <View style={styles.option_component_view}> 
                                    <View style={{flex:1}}>
                                        <Text style={styles.option_component_text}>{item.value}</Text>
                                    </View>
                                    <RadioButton
                                        status={this.state.selected[item.id - 1]?'checked':'unchecked'}
                                        onPress = {()=>{
                                            let flag_list = this.state.selected
                                            flag_list[item.id - 1] = !flag_list[item.id - 1]
                                            for(let i =0 ; i<flag_list.length ; i++){
                                                if(i!==item.id-1){
                                                    flag_list[i] = false
                                                }
                                            }
                                            this.setState({selected:flag_list})
                                        }}/>
                                </View>
                            )}
                            keyExtractor = {item => item.id.toString()}
                        />
                    </Card.Content>
                </Card>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    card_title:{
        fontSize:hp('2.5%'),
        fontWeight:"500",
        paddingBottom:hp('1%'),
        alignSelf:'auto'
    },
    card:{
        marginHorizontal:wp('2%'),
        marginVertical:hp('1%'),
        elevation:6,
        borderRadius:10,
        backgroundColor:"#fff"
    },
    option_component_view:{
        flexDirection:'row',
        paddingTop:hp('1.5%') 
    },
    option_component_text:{
        paddingTop:hp('0.5%') , fontSize:hp('2.8%') ,flexWrap:'wrap' , color:"#131313"
    }
})
