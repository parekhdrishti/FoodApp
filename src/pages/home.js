import React from "react";
import {View, Text, FlatList, TouchableOpacity} from "react-native"
import {Searchbar, ActivityIndicator} from 'react-native-paper'
import { ListComponent } from "../components/list_component";
import { useNavigation } from '@react-navigation/native';
import { get_recepes_api, search_recipe_api } from "../api/api";
import {connect} from 'react-redux'
import { api_bool } from "../redux/action";
 
class Home extends React.Component{

    state = {
        searchquery: "",
        recipes: "none",
        refresh_status: false,
        temp_state: "anything",
        updated_once: false
    }

    setSearchQuery = (query) => {
        this.setState({searchquery: query})
    }

    search_submit = async () => {
        if(this.state.searchquery.trim() === ""){
            await this.get_recepes_inner_api(this.props.user.token)
        }else{
            await this.search_recipes_inner_api(this.props.user.token, this.state.searchquery)
        }
    }

    componentDidMount = async () => {
        console.log(this.props.user.token)
        await this.get_recepes_inner_api(this.props.user.token)
    }



    search_recipes_inner_api = async (token, keyword) => {
        try{
            this.props.set_api_bool(true)
            let response = await search_recipe_api(token, keyword)
            let status = response.status 
            console.log("status")
            if(status === 200){
                let text = JSON.parse(await response.text())
                this.setState({recipes: text["data"], updated_once: true})
            }else if(status === 400){
                this.showToast("Network Error!", "error")
            }else if(status.toString()[0] === "5"){
                this.showToast("Server Error!", "error")
            }
            this.props.set_api_bool(false)
            this.setState({updated_once: true})
        }catch(e){
            console.log(e)
            console.log(e.stack)
            this.showToast("Network Error!", "error")
            this.props.set_api_bool(true)
            this.setState({updated_once: true})
        }
    }

    get_recepes_inner_api = async (token) => {
        try{
            this.props.set_api_bool(true)
            let response = await get_recepes_api(token)
            let status = response.status
            if(status===200){
                let text = JSON.parse(await response.text())
                this.setState({recipes: text["data"]})
            }else if(status==400){
                this.showToast("Network Error!", "error")
            }else if(status.toString()[0] === "5"){
                this.showToast("Server Error!", "error")
            }else if(status === 401){
                let t = this.props.user.token
                this.get_recepes_inner_api(t)
            }
            this.props.set_api_bool(false)
        }catch(e){
            // console.log(e)
            // console.log(e.stack)
            this.showToast("Network Error!", "error")
            this.props.set_api_bool(false)
        }
    }

    onRefresh = async () => {
        if(this.state.searchquery.trim() === ""){
            await this.get_recepes_inner_api(this.props.user.token)
        }else{
            await this.search_recipes_inner_api(this.props.user.token, this.state.searchquery)
        }
    }
    
    request_press = () => {
        const {navigation} = this.props
        navigation.navigate('Request')
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.api === false){
            return {
                temp_state: "anything - props"
              }
        }
        return null
    }

    showToast = (msg, type='success') => {
        Toast.show({
          type: type,
          text1: msg,
        });
    }

    render(){
        return(
            <View style={{flex: 1}}>
                {this.props.api === true ? (
                    <View style={{flex:1}}>
                        <View style={{padding:5}}>
                            <Searchbar
                                placeholder="Search"
                                value = {this.state.searchquery}
                                onChangeText = {this.setSearchQuery}
                            />    
                        </View>
                        <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
                            <ActivityIndicator animating={this.props.api} color="#1e5f74" size="small" />
                        </View>
                    </View>
                ) : (    
                    <View style={{padding:5, flex: 1}}>
                        <Searchbar
                            placeholder="Search"
                            value = {this.state.searchquery}
                            onChangeText = {this.setSearchQuery}
                            onSubmitEditing={this.search_submit}
                            onIconPress={this.search_submit}
                        />
                        {this.state.recipes.length === 0 ? (
                            <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
                                <Text>No recipes found</Text>
                                <TouchableOpacity onPress={this.request_press}>
                                    <Text style={{color:"#1e4f74", marginTop: 10}}>REQUEST RECIPE</Text>
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
                                }else{
                                    return(
                                        <View>
                                            <Text>Hello</Text>
                                        </View>
                                    )
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
    return <Home {...props} navigation={navigation} />;
}

const msp = state => ({
    api: state.api,
    user: state.user
})

export default connect(msp, {set_api_bool:api_bool})(Func)