import React from "react";
import {View} from 'react-native'
import {Button} from 'react-native-paper'
import {connect} from 'react-redux'
import { toggle_rate } from "../redux/action";
import { AirbnbRating } from 'react-native-ratings';
import { rate_recipe_api } from "../api/api";
import Toast from 'react-native-toast-message';

class RatingShow extends React.Component{

    state = {
        rating: 3
    }

    showToast = (msg, type='success') => {
        Toast.show({
          type: type,
          text1: msg,
        });
    }

    rate_recipe_inner_api = async () => {
        try{
            let response = await rate_recipe_api(this.props.user.token, this.props.rate.recipe_id, this.state.rating)
            let status = response.status 
            console.log(this.props.rate.recipe_id)
            if(status === 200){
                this.showToast("Rating recorded")
            }else if(status === 400){
                this.showToast("Network Error", "error")
            }else if(status === 500){
                this.showToast("Server Error", "error")
            }
        }catch(e){
            console.log(e)
            console.log(e.stack)
            this.showToast("Network Error", "error")
        }
    }

    ratingCompleted = (rating) => {
        this.setState({rating: rating})
    }

    rate = async () => {
        await this.rate_recipe_inner_api()
        this.props.toggle_rate(false)
    }

    render(){
        return(
            <View>
                <AirbnbRating onFinishRating={this.ratingCompleted}/>
                <Button style={{marginTop: 10}} color="#1e4f74" onPress={this.rate}>Rate</Button>
            </View>
        )
    }
}

const msp = state => ({
    rate: state.rate,
    user: state.user
})

export default connect(msp, {toggle_rate: toggle_rate})(RatingShow)