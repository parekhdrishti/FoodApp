import React from 'react';  
import {StyleSheet, View, Text  } from 'react-native'; 
import {connect} from 'react-redux'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { clear_user_data } from '../redux/action.js';

 class Splash extends React.Component{
   
    state={
       isVisible : true
    }
    
    Hide_Splash_Screen=()=>{
        if(this.props.user.login !== undefined){
            if(this.props.user.login.bool){
                this.props.navigation.navigate('BottomNavParent')
            }else{
                this.props.clear_user_data({})
            }
        }else{
            this.props.clear_user_data({})
        }
        this.props.navigation.navigate('Login')
        //}    
    }
  
    componentDidMount(){  
        var that = this;  
        setTimeout(function(){  
            that.Hide_Splash_Screen();  
        }, 2000);  
    }

    render()  
    {  
        //let image = require('./../images/Cotton_splash.png')
        return(
            <View style={styles.full_container}>
                <View style={styles.inner_container}>
                    <Text style={styles.cotton_text_2}>KITCHEN</Text>
                    <Text style={styles.cotton_text_2}>GENIE</Text>
                </View>
            </View>
        )
          
    }
}

const msp = state => ({
    user: state.user
})

export default connect(msp,{clear_user_data:clear_user_data})(Splash)

const styles = StyleSheet.create({
    full_container : {
        flex:1,
        backgroundColor : "#1e5f74",
        justifyContent: 'center',
        alignItems : 'center'
    },
    inner_container : {
        justifyContent: 'center',
        alignItems : 'center'
    },
    image: {
        alignSelf: 'center',
        width: hp("30%"),
        height: hp("30%"),
        backgroundColor: 'transparent'
    },
    cotton_text : {
        color : "#fff",
        fontSize : 43,
        fontWeight:"600",
        marginTop : 50,
    },
    cotton_text_2 : {
        color : "#fff",
        fontSize : 43,
        fontWeight:"600",
        marginTop : 2,
    },
})