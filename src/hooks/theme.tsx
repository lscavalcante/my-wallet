import React, { createContext, useState, useContext } from 'react';

import dark from '../styles/themes/dark';
import ligth from '../styles/themes/ligth';

interface IThemeContext {
    toggleTheme(): void;
    theme: ITheme;
}

interface ITheme {
    title: string,


    colors: {
        primary: string;
        secondary: string;
        tertiary: string;

        white: string;
        black: string;
        gray: string;

        success: string;
        info: string;
        warning: string;
    },

}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

const ThemeProvider: React.FC = ({ children }) => {
    const [theme, setTheme] = useState<ITheme>(() => {
        const themeSave = localStorage.getItem('@my-wallet:theme');
        console.log('entry here');
        console.log(themeSave);

        if(themeSave) {
            return JSON.parse(themeSave)
        } else {
            return dark;
        }
    });

    const toggleTheme = ( ) => {
        if(theme.title === 'dark') {
            setTheme(ligth);
            localStorage.setItem('@my-wallet:theme', JSON.stringify(ligth));
        } else {
            setTheme(dark);
            localStorage.setItem('@my-wallet:theme', JSON.stringify(dark));
        }
    };

   return (
       <ThemeContext.Provider value={{ toggleTheme, theme }}>
           { children }
       </ThemeContext.Provider>
   )
};

function useTheme() : IThemeContext {
    const context = useContext(ThemeContext);

    return context;
}

export { ThemeProvider, useTheme };