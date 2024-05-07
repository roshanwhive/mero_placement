import { customTextColor, customThemeColor } from "./Color";
import { customFontSize, customFonts } from "./theme";

export const GlobalStyleSheet = {
  scrollViewContent: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    overflow: 'visible',
    flex: 1,
    backgroundColor: customThemeColor.lightBG,
  },

  formContainer: {
    flex: 1,
    width: '100%',
  },

  seeAll: {
    color: '#2b8256',
    paddingRight: 3,
    fontFamily: customFonts.fontPoppins,
    fontSize: customFontSize.font14,
  },

  Hometitle: {
    color: '#11401E',
    fontSize: customFontSize.font18,
    fontFamily: customFonts.fontPoppins,
  },

  cardContainer: {
    display: 'flex',
    flexWrap: "wrap",
  },

  scrollViewContentStatus: {
    overflow: 'visible',
    backgroundColor: customThemeColor.lightBG,
  },
  inputWrapper: {
    padding: 4,
    width: '100%',
    marginBottom: 8,
  },
  inputWrapper1: {
    padding: 4,
    width: '80%',
    marginBottom: 8,
  },

  containerForm: {
    alignItems: 'center',
    marginHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 20,
  },
  buttonText: {
    fontSize: customFontSize.font18,
    color: customTextColor.white,
    textAlign: 'center',
    padding: 10,
    fontFamily: customFonts.fontRobotoBold,
  },
  button: {
    backgroundColor: customThemeColor.darkRed,
    borderRadius: 15,
  },
  shadow: {
    shadowColor: "rgba(0,0,0,.5)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8,
  },
  ButtonText: {
    color: customTextColor.white,
    fontSize: customFontSize.font16,
    fontFamily: customFonts.fontPrompt,
    textAlign: 'center',
  },
}