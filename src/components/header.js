import * as React from 'react'
import {Appbar} from 'react-native-paper'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import colours from './../colours/colour'

export default Header = props => {
    //console.log(props)
    if(props.back_button===true && props.icon===true){
        return(
            <Appbar.Header style = {{backgroundColor : colors.header_background}}>
                <Appbar.BackAction onPress={props.nav_back} />
                <Appbar.Content title={props.title}/>
                <Appbar.Action icon={icons.icon_offline} onPress={props.nav_offline} size={icons.icon_size}/>
                <Appbar.Action icon={icons.icon_name} onPress={props.nav_user} size={icons.icon_size}/>
            </Appbar.Header>
        )
    }else if(props.back_button===false && props.icon===true){
        return(
            <Appbar.Header style = {{backgroundColor : colors.header_background}}>
                <Appbar.Content title={props.title}/>
                <Appbar.Action icon={icons.icon_offline} onPress={props.nav_offline} size={icons.icon_size}/>
                <Appbar.Action icon={icons.icon_name} onPress={props.nav_user} size={icons.icon_size}/>
            </Appbar.Header>
        )
    }else if(props.back_button===true && props.icon===false){
        return(
            <Appbar.Header style = {{backgroundColor : colors.header_background}}>
                <Appbar.BackAction onPress={props.nav_back}/>
                <Appbar.Content title={props.title}/>
            </Appbar.Header>
        )
    }else if(props.back_button===false && props.icon===false){
        return(
            <Appbar.Header style = {{backgroundColor : colors.header_background}}>
                <Appbar.Content title={props.title}/>
            </Appbar.Header>
        )
    }else{
        return(
            <Appbar.Header style = {{backgroundColor : colors.header_background}}>
                <Appbar.Content title={props.title}/>
            </Appbar.Header>
        )
    }
}

const colors = {
    header_background:colours["col-5"],
}

const icons = {
    icon_name:"account",
    icon_offline : "clipboard-arrow-up-outline" , 
    icon_size:30
}