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
                ...tokensDark.black,
                main: tokensDark.black[500],
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
                ...tokensLight.black,
                main: tokensDark.black[500],
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