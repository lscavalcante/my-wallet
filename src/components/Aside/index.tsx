import React from 'react';
import {
    MdDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdExitToApp
} from 'react-icons/md';

import LogoImg from '../../assets/logo.svg';

import { Container, Header, LogImg, Title, MenuContainer, MenuItemLink } from './styles';

const Aside: React.FC = () => {
    return (
        <Container>
            <Header>
                <LogImg src={LogoImg} alt="Logo My Wallet" />
                <Title>Minha carteira</Title>
            </Header>

            <MenuContainer>
                <MenuItemLink href="/dashboard">
                    <MdDashboard />
                    DashBoard
                </MenuItemLink>
                <MenuItemLink href="/list/entry-balance">
                    <MdArrowDownward />
                    Entradas
                </MenuItemLink>
                <MenuItemLink href="/list/exit-balance">
                    <MdArrowUpward />
                    Saidas
                </MenuItemLink>
                <MenuItemLink href="#">
                    <MdExitToApp />
                    Sair
                </MenuItemLink>
            </MenuContainer>

        </Container>
    )
}

export default Aside;