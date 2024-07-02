import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {customTextColor, customThemeColor} from '../../constants/Color';
import {customFontSize, customFonts} from '../../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ProfileAppBar = ({title, handleBack, handleAddBtn, showIcon = true}) => {
  return (
    <View style={styles.navBar}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="chevron-left" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.middleContainer}>{title}</Text>

      {showIcon && (
        <View style={styles.rightContainer}>
          <TouchableOpacity onPress={handleAddBtn}>
            <Icon name="plus" size={20} color={customTextColor.primary} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    height: 54,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0,
    shadowColor: 'white',
    shadowOffset: {width: 0, height: 2},
    backgroundColor: customThemeColor.white,
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 1,
  },
  leftContainer: {
    justifyContent: 'flex-start',
    marginLeft: 15,
    flexDirection: 'row',
  },
  middleContainer: {
    flex: 2,
    fontSize: customFontSize.font18,
    marginLeft: 20,
    fontFamily: customFonts.fontPoppins,
    color: 'black',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 10,
    resizeMode: 'contain',
    marginRight: 10,
  },
  rightIcon: {
    paddingHorizontal: 20,
    resizeMode: 'contain',
  },
  imageContainer: {
    alignItems: 'left',
    marginVertical: 10,
    width: 120,
    height: 40,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default ProfileAppBar;
