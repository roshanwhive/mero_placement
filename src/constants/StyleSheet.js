import { customThemeColor } from "./Color";
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
}