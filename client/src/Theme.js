export const tokensDark = {
  black: {
    0: "#ffffff",
    100: "#e0e0e0",
    200: "#c0c0c0",
    300: "#a0a0a0",
    400: "#808080",
    500: "#606060",
    600: "#404040",
    700: "#303030",
    800: "#202020",
    900: "#101010",
    1000: "#000000",
  },
  purple: {
    50: "#ede7f6",
    100: "#d1c4e9",
    200: "#b39ddb",
    300: "#9575cd",
    400: "#7e57c2",
    500: "#673ab7", 
    600: "#5e35b1",
    700: "#512da8",
    800: "#4527a0",
    900: "#311b92",
  },
};
  
  function reverseTokens(tokensDark) {
    const reversedTokens = {};
    Object.entries(tokensDark).forEach(([key, val]) => {
      const keys = Object.keys(val);
      const values = Object.values(val);
      const length = keys.length;
      const reversedObj = {};
      for (let i = 0; i < length; i++) {
        reversedObj[keys[i]] = values[length - i - 1];
      }
      reversedTokens[key] = reversedObj;
    });
    return reversedTokens;
  }
  
  export const tokensLight = reverseTokens(tokensDark);
  
  export const themeSettings = (mode) => {
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
              primary: {
                ...tokensDark.black,
                main: tokensDark.black[600],
                light: tokensDark.black[400],
              },
              secondary: {
                ...tokensDark.black,
                main: tokensDark.black[300],
              },
              neutral: {
                ...tokensDark.purple,
                main: tokensDark.purple[800],
                light: tokensDark.purple[700],
              },
              accent: {
                main: tokensDark.purple[600],
                light: tokensDark.purple[300],
              },
              background: {
                default: tokensDark.black[900],
                alt: tokensDark.black[800],
              },
            }
          : {
              primary: {
                ...tokensLight.black,
                main: tokensDark.black[100],
                light: tokensDark.black[200],
              },
              secondary: {
                ...tokensLight.black,
                main: tokensDark.black[600],
                light: tokensDark.black[700],
              },
              neutral: {
                ...tokensLight.purple,
                main: tokensDark.purple[300],
                light: tokensDark.purple[200],
              },
              accent: {
                main: tokensDark.purple[200],
                light: tokensDark.purple[100],
              },
              background: {
                default: tokensDark.black[0],
                alt: tokensDark.black[100],
              },
            }),
      },
      typography: {
        fontFamily: ['Poppins', 'sans-serif'].join(','),
        fontSize: 12,
        h1: {
          fontFamily: ['Poppins', 'sans-serif'].join(','),
          fontSize: 40,
        },
        h2: {
          fontFamily: ['Poppins', 'sans-serif'].join(','),
          fontSize: 32,
        },
        h3: {
          fontFamily: ['Poppins', 'sans-serif'].join(','),
          fontSize: 24,
        },
        h4: {
          fontFamily: ['Poppins', 'sans-serif'].join(','),
          fontSize: 20,
        },
        h5: {
          fontFamily: ['Poppins', 'sans-serif'].join(','),
          fontSize: 16,
        },
        h6: {
          fontFamily: ['Poppins', 'sans-serif'].join(','),
          fontSize: 14,
        },
      },
    };
  };