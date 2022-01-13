import React, {useState} from 'react';
import {View} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Video = (props) => {
  const [playing, setPlaying] = useState(false);
  const togglePlaying = () => {
    setPlaying((prev) => !prev);
  }

  return (
    <View>
      <YoutubePlayer
        height={hp("28%")}
        play={playing}
        videoId={props.video_id}
        style={{flex:1}}
      />
    </View>
  );
};

export default Video 