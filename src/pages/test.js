import React from "react";
import {View, Button, Text} from 'react-native'

export default class Test extends React.Component{

    call = async () => {
        let url = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=OD7d1e1mwyQ&key=AIzaSyAgxtS5dVNgvAaCtBt_ua5fuN1Z_FLhRsM"
        try{
            let response = await fetch(`${url}`)
            let result = await response.json()
            console.log(result["items"][0]["snippet"]["thumbnails"])
        }catch(e){
            console.log(`ERROR + ${e}`)
        }
    }

    render(){
        return(
            <View>
                <Button title="Test" onPress={this.call}/>
            </View>
        )
    }
}