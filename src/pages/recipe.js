import React from 'react'
import {View, Text, FlatList, TouchableOpacity, ScrollView} from 'react-native'
import Video from '../components/video'
import IngredientTable from '../components/table';
import {ActivityIndicator} from 'react-native-paper'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Modal from "react-native-modal";
import RatingShow from '../components/rating_show';
import { connect } from 'react-redux';
import { api_bool, rate_id, toggle_rate } from '../redux/action';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { fav_recipe_api, unfav_recipe_api } from '../api/api';
import colours from './../colours/colour'

class Recipe extends React.Component{

    state = {
        chosen: "description",
        fav: false,
        rate: false,
    }

    componentDidMount = () => {
        let obj = this.props.route.params.result 
        let fb = obj.favouritedBy
        for(let i of fb){
            if(i === this.props.user.user_data._id){
                this.setState({fav: true})
                break
            }
        }
    }

    showToast = (msg, type="success") => {
        Toast.show({
          type: type,
          text1: msg,
        });
    }

    make_desc_list = () => {
        let obj = this.props.route.params.result
        let desc = obj.description
        desc = desc.trim()
        desc = desc.split("#")
        let ll = []
        let count = 0
        for(let i of desc){
            let o = {}
            o["id"] = count 
            o["data"] = `\u2022` + i.trim()
            ll.push(o)
            count+=1
        }
        return ll
    }

    favourite_inner_api = async (id) => {
        try{
            this.props.set_api_bool(true)
            let response = await fav_recipe_api(this.props.user.token, id)
            let status = response.status 
            if(status===200){
                console.log("200")
                this.setState({fav: true})
            }else if(status===400){
                let text = await response.text()
                console.log(text)
                this.showToast("Network Error!", "error")
            }else if(status.toString()[0] === "5"){
                this.showToast("Server Error!", "error")
            }
            this.props.set_api_bool(false)
        }catch(e){
            console.log(e)
            console.log(e.stack)
            this.props.set_api_bool(false)
            this.showToast("Network Error!", "error")
        } 
    }

    unfavourite_inner_api = async (id) => {
        try{
            this.props.set_api_bool(true)
            let response = await unfav_recipe_api(this.props.user.token, id)
            let status = response.status 
            if(status===200){
                console.log("200")
                this.setState({fav: false})
            }else if(status===400){
                this.showToast("Network Error!", "error")
            }else if(status.toString()[0] === "5"){
                this.showToast("Server Error!", "error")
            }
            this.props.set_api_bool(false)
        }catch(e){
            console.log(e)
            console.log(e.stack)
            this.props.set_api_bool(false)
            this.showToast("Network Error!", "error")
        } 
    }

    favourite_press = async () => {
        let obj = this.props.route.params.result
        if(this.state.fav===false){
            await this.favourite_inner_api(obj._id)
        }
    }

    unfavourite_press = async () => {
        let obj = this.props.route.params.result
        if(this.state.fav===true){
            await this.unfavourite_inner_api(obj._id)
        }
    }

    render(){
        let desc_list = this.make_desc_list()
        let obj = this.props.route.params.result
        return(
            <View style={{flex: 1}}>
                <Video style={{height: 800}} video_id={obj.yt_id}/>
                <View style={{marginHorizontal: 10, marginTop: 0}}>
                    <Text style={{fontSize:20, fontWeight:"500", color:"#131313"}}>{obj.title}</Text>
                </View>

                <View style={{flexDirection: "row", marginHorizontal: 10, marginTop: 10, justifyContent: "space-between"}}>
                    <TouchableOpacity onPress={()=>{this.props.toggle_rate(true); this.props.add_rate_id(obj._id)}}>
                        <Text style={{color: colours["col-1"]}}>RATE</Text>
                    </TouchableOpacity>

                    {this.props.api ? (
                        <ActivityIndicator animating={this.props.api} color={colours["col-1"]} size="small" />
                    ):(
                        this.state.fav? (
                            <TouchableOpacity onPress={this.unfavourite_press}>
                                <Text style={{color: colours["col-1"]}}>REMOVE FROM FAVOURITES</Text>
                            </TouchableOpacity>
                        ):(
                            <TouchableOpacity onPress={this.favourite_press}>
                                <Text style={{color: colours["col-1"]}}>ADD TO FAVOURITES</Text>
                            </TouchableOpacity>
                        )
                    )}
                </View>

                <Modal isVisible={this.props.rate.toggle_bool}>
                    <View style={{backgroundColor:"#fff", height: hp("30%"), width: wp("80%"), alignSelf:"center", borderRadius: 10}}>
                        <TouchableOpacity onPress={()=>{this.props.toggle_rate(false)}}>
                            <Text style={{justifyContent:"flex-end", textAlign:"right", marginHorizontal: 10, marginBottom: 15, fontSize: 20, fontWeight: "500"}}>x</Text>
                        </TouchableOpacity>
                        <RatingShow/>
                    </View>
                </Modal>

                {this.state.chosen === "description" ? (

                    <View style={{flexDirection: "row", justifyContent: "space-evenly", marginTop: 15, marginBottom: 5, borderBottomColor: colours["col-5"], borderBottomWidth: 1, marginHorizontal: wp("1.5%"), borderTopRightRadius: 10}}>
                       
                        <View style={{width: wp("48.5%"), height: 30, backgroundColor:"#efefef", justifyContent: "center", borderTopLeftRadius: 10}}>
                            <Text style={{fontSize:17, fontWeight:"500", color:colours["col-5"], paddingLeft: 10}}>Description</Text>
                        </View>
                    
                        <TouchableOpacity onPress={()=>{if(this.state.chosen==="description"){this.setState({chosen: "ingredients"})}}}>
                            <View style={{width: wp("48.5%"), height: 30, backgroundColor:colours["col-5"], justifyContent: "center", borderTopRightRadius: 10}}>
                                <Text style={{fontSize:17, fontWeight:"500", color:"#fff", paddingLeft: 5}}>Ingredients</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={{flexDirection: "row", justifyContent: "space-evenly", marginTop: 15, marginBottom: 5, borderBottomColor: colours["col-5"], borderBottomWidth: 1, marginHorizontal: wp("1.5%"), borderTopRightRadius: 10}}>
                        <TouchableOpacity onPress={()=>{if(this.state.chosen==="ingredients"){this.setState({chosen: "description"})}}}>
                            <View style={{width: wp("48.5%"), height: 30, justifyContent: "center", borderTopLeftRadius: 10, backgroundColor:colours["col-5"]}}>
                                <Text style={{fontSize:17, fontWeight:"500", color:"#fff", paddingLeft: 10}}>Description</Text>
                            </View>
                        </TouchableOpacity>
                        
                        <View style={{width: wp("48.5%"), height: 30, backgroundColor:"#efefef", justifyContent: "center", borderTopRightRadius: 10}}>
                            <Text style={{fontSize:17, fontWeight:"500", color:colours["col-5"], paddingLeft: 5}}>Ingredients</Text>
                        </View>
                    </View>
                )}

                {this.state.chosen === "description" ? (
                    <View style={{marginHorizontal: 20, flex: 1}}>
                        <FlatList
                            data = {desc_list}
                            renderItem = {({item}) => (
                                <Text style={{marginTop: 3}}>{item.data}</Text>                        
                            )}
                            keyExtractor={(item) => item['id']}
                            style={{flex: 1}}
                        />
                    </View>
                ):(
                    <View style={{marginHorizontal: 25, flex: 1}}>
                        <ScrollView>
                            <IngredientTable ingredients={obj.ingridients}/>
                        </ScrollView>
                    </View>
                )}


            </View>
        )
    }
}

const msp = state => ({
    rate: state.rate,
    user: state.user,
    api: state.api
})

export default connect(msp, {toggle_rate: toggle_rate, add_rate_id: rate_id, set_api_bool:api_bool})(Recipe)