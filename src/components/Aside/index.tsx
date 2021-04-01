import React, {useState} from 'react';

import {
    MdDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdExitToApp,
    MdClose,
    MdMenu
} from 'react-icons/md';

import Toggle from '../Toggle';

import { useAuth } from '../../hooks/auth';
import { useTheme } from '../../hooks/theme';

import LogoImg from '../../assets/logo.svg';

import { Container, Header, LogImg, Title, MenuContainer, MenuItemLink, MenuItemButton, ToggleMenu, ThemeToggleFooter } from './styles';

const Aside: React.FC = () => {
    const { toggleTheme, theme } = useTheme();
    const { signOut } = useAuth();

    const [toogleMenuIsOpened, setToogleMenuIsOpened] = useState(false);
    const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);
    // const [darkTheme, setDarkTheme] = useState(false);

    const handlerToggleMenu = () => {
        setToogleMenuIsOpened(!toogleMenuIsOpened);
    }

    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme);
        toggleTheme();
    }


    return (
        <Container menuIsOpen={toogleMenuIsOpened}>
            <Header>
                <ToggleMenu onClick={handlerToggleMenu}>
                    { toogleMenuIsOpened ? <MdClose/> : <MdMenu/> }
                </ToggleMenu>

                <LogImg src={LogoImg} alt="Logo My Wallet" />
                <Title>Minha carteira</Title>
            </Header>

            <MenuContainer>
                <MenuItemLink to="/">
                    <MdDashboard />
                    DashBoard
                </MenuItemLink>
                <MenuItemLink to="/list/entry-balance">
                    <MdArrowDownward />
                    Entradas
                </MenuItemLink>
                <MenuItemLink to="/list/exit-balance">
                    <MdArrowUpward />
                    Saidas
                </MenuItemLink>

                <MenuItemButton onClick={signOut}>
                    <MdExitToApp />
                    Sair
                </MenuItemButton>

            </MenuContainer>

            <ThemeToggleFooter menuIsOpen={toogleMenuIsOpened}>
                <Toggle
                    labelLeft="Light"
                    labelRight="Dark"
                    checked={darkTheme}
                    onChange={handleChangeTheme}
                />
            </ThemeToggleFooter>

        </Container>
    )
}

export default Aside;