import * as React from 'react'
import {View , Text , StyleSheet , FlatList} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RadioButton, Card } from 'react-native-paper';
import {connect} from 'react-redux'
import { add_user_data } from '../redux/action';


class FoodPref extends React.Component{

    flags = []

    map_obj = {
        "veg": [true, false, false],
        "non-veg": [false, true, false],
        "both": [false, false, true]
    }

    state = {
        selected: this.map_obj[this.props.user.user_data["foodPreference"]] || [false, false, true]
    }

    inverse_map_obj = (flags) => {
        if(flags[0]) return "veg"
        if(flags[1]) return "non-veg"
        if(flags[2]) return "both"
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
            "value": "Vegeterian"
        },
        {
            "id": 2,
            "value": "Non-Vegeterian"
        },
        {
            "id": 3,
            "value": "Both"
        }
    ]

    render(){
        return(
            <View>
                <Card style={styles.card}>
                    <Card.Content>
                        <Text style={styles.card_title}>Choose your preference</Text>
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
                                            let obj_user = this.props.user.user_data
                                            obj_user["foodPreference"] =  this.inverse_map_obj(flag_list)
                                            this.props.add_user_data(obj_user)
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

const msp = state => ({
    user: state.user
})
export default connect(msp, {add_user_data: add_user_data})(FoodPref)

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
