import React from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';

import { Container } from './styles';

const DashBoard: React.FC = () => {

    const months = [
        { value: 7, label: 'julho' },
        { value: 8, label: 'agosto' },
        { value: 9, label: 'setembro' }
    ];


    return (
        <Container>
            <ContentHeader title="DashBoard" lineColor="#fff">
                <SelectInput options={months} onChange={() => {}} />
            </ContentHeader>
        </Container>
    );
}

export default DashBoard;