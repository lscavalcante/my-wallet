import { Container } from './styles';

import dolarImg from '../../assets/dolar.svg';
import arrowUpImg from '../../assets/arrow-up.svg';
import arrowDownImg from '../../assets/arrow-down.svg';
import { useMemo } from 'react';
import CountUp from 'react-countup';

interface IWalletBoxProps {
    title: string;
    amount: number;
    footerLabel: string;
    icon: 'dolar' | 'arrowUpImg' | 'arrowDownImg';
    color: string;
}

const WalletBox: React.FC<IWalletBoxProps>  = ({ title, amount, footerLabel, icon, color  }) => {

    const iconSelected = useMemo(() => {
        switch (icon) {
            case 'dolar':
                return dolarImg;
            case 'arrowUpImg':
                return arrowUpImg;
            case 'arrowDownImg':
                return arrowDownImg;
            default:
                return null;
        }}, [icon])


    return (
        <Container color={color}>
            <span>{title}</span>
            <h1>
                <CountUp
                    end={amount}
                    prefix={"R$ "}
                    separator="."
                    decimal=","
                    decimals={2}
                />
            </h1>
            <small>{footerLabel}</small>
            {iconSelected && <img src={iconSelected} alt={title}></img>}
        </Container>
    );
}

export default WalletBox;