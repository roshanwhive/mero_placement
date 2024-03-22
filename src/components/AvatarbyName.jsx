import React from 'react';
import {View, Text} from 'react-native';
import Svg, {Text as SvgText} from 'react-native-svg';

const Avatar = ({text, size, backgroundColor, textColor}) => {
  const avatarSize = size || 50; // Default size is 50
  const borderRadius = avatarSize / 2; // Make it a circle

  return (
    <View style={{width: avatarSize, height: avatarSize}}>
      <Svg width={avatarSize} height={avatarSize}>
        <SvgText
          x="50%"
          y="50%"
          fontSize={avatarSize * 0.5}
          fill={textColor || 'white'}
          textAnchor="middle"
          alignmentBaseline="middle"
          fontWeight="bold"
          fontFamily="Arial">
          {text.charAt(0).toUpperCase()}
        </SvgText>
      </Svg>
    </View>
  );
};

export default Avatar;
