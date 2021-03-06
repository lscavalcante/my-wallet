import React, { useMemo, useState, useEffect } from 'react';


import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';

import { Container, Content, Filters } from './styles';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';


interface IRouteParams {
    match: {
        params: {
            type: string;
        }
    }
}

interface IData {
    id: string;
    description: string;
    amountFormatted: string;
    type: string;
    frequency: string;
    dateFormatted: string;
    tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {
    const [data, setData] = useState<IData[]>([]);
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
    const [frequencyFilterSelected, setFrequencyFilterSelected] = useState(['recorrente', 'eventual']);

    const movimentType  = match.params.type;

    const pageData = useMemo(() => {
        return movimentType === 'entry-balance' ? {
            title: 'Entradas',
            lineColor: '#4e41f0',
            movimentType: gains
        } : {
            title: 'Saidas',
            lineColor: '#e44c4e',
            movimentType: expenses
        }
    }, [movimentType]);

    const years = useMemo(() => {
        let uniqueYears : number[] = [];

        pageData.movimentType.forEach(item => {
            const date = new Date(item.date) ;
            const year = date.getFullYear();

            if(!uniqueYears.includes(year)) {
                uniqueYears.push(year);
            }
        });

        return uniqueYears.map(year => {
            return {
                value:year,
                label: year
            }
        })

    }, [pageData]);

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: String(month)
            }
        });
    }, []);

    const handleFrequencyClick = (frequency: string)  => {
        const alreadySelected = frequencyFilterSelected.findIndex(item => item === frequency);

        if(alreadySelected >= 0) {
            const filtered = frequencyFilterSelected.filter(item => item !== frequency);
            setFrequencyFilterSelected(filtered);
        } else {
            setFrequencyFilterSelected((prev) => [...prev, frequency]);
        }
    }

    const handleMonthSelected = (frequency: string) => {
        try {
            const parseMonth = Number(frequency);
            setMonthSelected(parseMonth);
        } catch (error) {
            throw new Error('invalid month value. Is accept 0 - 24.');
        }
    }

    const handleYearhSelected = (frequency: string) => {
        try {
            const parserYear = Number(frequency);
            setYearSelected(parserYear);
        } catch (error) {
            throw new Error('invalid years value. Is accept integer number.');
        }
    }
    
    useEffect(() => {

        const filterDate = pageData.movimentType.filter((item) => {
            const date = new Date(item.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return month === monthSelected && year === yearSelected && frequencyFilterSelected.includes(item.frequency);
        });

        const formattedData = filterDate.map((item, index) => {

            return {
                id: String(new Date().getTime()) + item.amount + index,
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)) ,
                type: item.type,
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#4e41f0'  : '#e44c4e'
            }
        });

        setData(formattedData);
    }, [pageData, monthSelected, yearSelected, data.length, frequencyFilterSelected]);

    return (
        <Container>
            <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
                <SelectInput options={months} onChange={(e) => handleMonthSelected(e.target.value)} defaultValue={monthSelected} />
                <SelectInput options={years} onChange={(e) => handleYearhSelected(e.target.value)} defaultValue={yearSelected}/>
            </ContentHeader>

            <Filters>
                <button 
                    type="button" 
                    className={`tag-filter tag-filter-recurrent
                    ${frequencyFilterSelected.includes('recorrente') && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick('recorrente')}
                >
                    Recorrentes
                </button>
                <button 
                    type="button" 
                    className={`tag-filter tag-filter-eventual
                    ${frequencyFilterSelected.includes('eventual') && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick('eventual')}
                >
                    Eventuais
                </button>
            </Filters>

            <Content>
                {
                    data.map(item => (  
                        <HistoryFinanceCard
                            key={item.id}
                            title={item.description}
                            subtitle={item.dateFormatted}
                            amout={item.amountFormatted}
                            tagColor={item.tagColor}
                        />
                    ))
                }
            </Content>

        </Container>
    )
}

export default List;