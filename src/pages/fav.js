import React from "react";
import {View, Text, FlatList, TouchableOpacity} from "react-native"
import {ActivityIndicator} from 'react-native-paper'
import { ListComponent } from "../components/list_component";
import { useNavigation } from '@react-navigation/native';
import { get_fav_api} from "../api/api";
import {connect} from 'react-redux'
import { api_bool } from "../redux/action";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class Favourites extends React.Component{

    state = {
        recipes: "none",
        refresh_status: false
    }

    componentDidMount = async () => {
        await this.get_recepes_inner_api(this.props.user.token)
    }

    showToast = (msg, type='success') => {
        Toast.show({
          type: type,
          text1: msg,
        });
    }

    get_recepes_inner_api = async (token) => {
        try{
            this.props.set_api_bool(true)
            let response = await get_fav_api(token)
            let status = response.status
            if(status===200){
                let text = JSON.parse(await response.text())
                this.setState({recipes: text["data"]})
            }else if(status==400){
                this.showToast("Network Error", "error")
            }else if(status.toString()[0] === "5"){
                this.showToast("Server Error", "error")
            }
            this.props.set_api_bool(false)
        }catch(e){
            // console.log(e)
            // console.log(e.stack)
            this.showToast("Server Error", "error")
            this.props.set_api_bool(false)
        }
    }

    onRefresh = async () => {
        await this.get_recepes_inner_api(this.props.user.token)
    }

    refresh_press = async () => {
        await this.get_recepes_inner_api(this.props.user.token)
    }

    render(){
        return(
            <View style={{flex: 1}}>
                {this.props.api === true ? (
                    <View style={{flex:1}}>
                        <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
                            <ActivityIndicator animating={this.props.api} color="#1e5f74" size="small" />
                        </View>
                    </View>
                ) : (    
                    <View style={{padding:5, flex: 1}}>
                        {this.state.recipes.length === 0 ? (
                            <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
                                <Text>No recipes are favourited</Text>
                                <TouchableOpacity onPress={this.refresh_press}>
                                    <Text style={{color:"#1e4f74", marginTop: 10}}>REFRESH</Text>
                                </TouchableOpacity>
                            </View>
                        ):(
                            <FlatList
                            data = {this.state.recipes}
                            renderItem = {({item}) => {
                                if(this.props.user.user_data !== undefined){
                                    if(this.props.user.user_data.foodPreference === "veg"){
                                        if(item.isVeg){
                                            return(
                                                <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Recipe", {result: item})}}>
                                                    <ListComponent url={item.imageLink} title={item.name} rating={item.rating} time={item.timeOfPrep}/>
                                                </TouchableOpacity>
                                            )
                                        }else{
                                            return (
                                                <View></View>
                                            )
                                        }
                                    }else if(this.props.user.user_data.foodPreference === "non-veg"){
                                        if(!item.isVeg){
                                            return(
                                                <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Recipe", {result: item})}}>
                                                    <ListComponent url={item.imageLink} title={item.name} rating={item.rating} time={item.timeOfPrep}/>
                                                </TouchableOpacity>
                                            )
                                        }else{
                                            return (
                                                <View></View>
                                            )
                                        }
                                    }else{
                                        return(
                                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Recipe", {result: item})}}>
                                                <ListComponent url={item.imageLink} title={item.name} rating={item.rating} time={item.timeOfPrep}/>
                                            </TouchableOpacity>
                                        )
                                    }
                                }
                            }}
                            onRefresh={() => this.onRefresh()}
  	                        refreshing={this.state.refresh_status}
                            keyExtractor={(item) => item._id}
                        />
                        )
                        
                        }
                    </View>
                )}
            </View>
        )
    }
}

const Func =  function(props) {
    const navigation = useNavigation();
    return <Favourites {...props} navigation={navigation} />;
}

const msp = state => ({
    api: state.api,
    user: state.user
})

export default connect(msp, {set_api_bool:api_bool})(Func)