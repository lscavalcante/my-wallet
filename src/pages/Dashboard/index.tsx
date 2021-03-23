import React, { useCallback, useMemo, useState } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';
import PieChartBox from '../../components/PieChartBox';
import HistoryBox from '../../components/HistoryBox';

import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import listOfMonths from '../../utils/months';

import happyImg from '../../assets/happy.svg';
import sad from '../../assets/sad.svg';

import { Container, Content } from './styles';
import BarChartBox from '../../components/BarChartBox';

const DashBoard: React.FC = () => {
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        [...expenses, ...gains].forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if (!uniqueYears.includes(year)) {
                uniqueYears.push(year);
            }
        });

        return uniqueYears.map(year => {
            return {
                value: year,
                label: year
            }
        })

    }, []);

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: String(month)
            }
        });
    }, []);

    const totalExpenses = useMemo(() => {
        let total: number = 0;

        expenses.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear()
            const month = date.getMonth() + 1;

            if (month === monthSelected && year === yearSelected) {

                try {
                    total += Number(item.amount);
                } catch (error) {
                    throw new Error('Invalid amount! Amount must be number');
                }
            }

        });

        return total;

    }, [monthSelected, yearSelected]);

    const totalGains = useMemo(() => {
        let total: number = 0;

        gains.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear()
            const month = date.getMonth() + 1;

            if (month === monthSelected && year === yearSelected) {

                try {
                    total += Number(item.amount);
                } catch (error) {
                    throw new Error('Invalid amount! Amount must be number');
                }
            }

        });

        return total;

    }, [monthSelected, yearSelected]);

    const totalBalance = useMemo(() => {
        return totalGains - totalExpenses;
    }, [totalGains, totalExpenses]);

    const message = useMemo(() => {
        if (totalBalance < 0) {
            return {
                title: "Ques triste!",
                description: "Neste mês, você gastou mais do que deveria.",
                footerText: "Verifique seus gastos e tente cortar algumas coisas desnecessárias",
                icon: sad
            }


        }
        else if (totalGains === 0 && totalExpenses === 0) {
            return {
                title: "Ops!",
                description: "Neste mês, nāo há registros de entradas ou saidas.",
                footerText: "Parece que você nāo fez nenhum registro no mês e ano selecionado",
                icon: happyImg
            }
        }


        else if (totalBalance === 0) {
            return {
                title: "Ufaa!",
                description: "Neste mês, você gastou exatamente oque ganhou.",
                footerText: "Tenha cuidado. No proximo mês tente poupar",
                icon: happyImg
            }
        }
        else {
            return {
                title: "Muito bem!",
                description: "Sua carteira está positiva",
                footerText: "Continue assim. Considere investir o seu saldo",
                icon: happyImg
            }
        }
    }, [totalBalance]);

    const relationExpensesVersusGains = useMemo(() => {
        const total = totalGains + totalExpenses;

        const percenteGains = Number(((totalGains / total) * 100).toFixed(1));

        const percentExpenses = Number(((totalExpenses / total) * 100).toFixed(1));

        const data = [
            {
                name: 'Saidas',
                value: totalExpenses,
                percent: percentExpenses ? percentExpenses : 0,
                color: '#e44c4e'
            },
            {
                name: 'Entradas',
                value: totalGains,
                percent: percenteGains ? percenteGains : 0,
                color: '#f7931b'
            }
        ]

        return data;

    }, [totalGains, totalExpenses]);

    const historyData = useMemo(() => {
        return listOfMonths.map((_, month) => {

            let amountEntry = 0;
            gains.forEach(gain => {
                const date = new Date(gain.date);
                const gainMonth = date.getMonth();
                const gainYear = date.getFullYear();

                if (gainMonth === month && gainYear === yearSelected) {
                    try {
                        amountEntry += Number(gain.amount);
                    } catch (error) {
                        throw new Error('AmountEntry is invalid. AmountEntry must be valid number');
                    }
                }
            });

            let amountOutput = 0;
            expenses.forEach(expense => {
                const date = new Date(expense.date);
                const expenseMonth = date.getMonth();
                const expenseYear = date.getFullYear();

                if (expenseMonth === month && expenseYear === yearSelected) {
                    try {
                        amountOutput += Number(expense.amount);
                    } catch (error) {
                        throw new Error('AmountOutput is invalid. AmountOutput must be valid number');
                    }
                }
            });


            return {
                monthNumber: month,
                month: listOfMonths[month].substr(0, 3),
                amountEntry,
                amountOutput
            }

        }).filter(item => {
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();

            return (yearSelected === currentYear && item.monthNumber <= currentMonth) || (yearSelected < currentYear);

        });


    }, [yearSelected])

    const relationExpenvesRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        expenses.filter((expense) => {
            const date = new Date(expense.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return month === monthSelected && year === yearSelected
        }).forEach((expense) => {
            if (expense.frequency === 'recorrente') {
                return amountRecurrent += Number(expense.amount);
            }

            if (expense.frequency === 'eventual') {
                return amountEventual += Number(expense.amount);
            }
        });

        const total = amountRecurrent + amountEventual;

        const recurrentPercent = Number((((amountRecurrent / total) * 100)).toFixed(1));
        const eventualPercent = Number((((amountEventual / total) * 100)).toFixed(1));

        return [
            {
                name: 'Recorrente',
                amount: amountRecurrent,
                percent: recurrentPercent ? recurrentPercent : 0,
                color: "#F7931B"
            },
            {
                name: 'Eventual',
                amount: amountEventual,
                percent: eventualPercent ? eventualPercent : 0,
                color: "#e44c4e"
            },
        ]

    }, [monthSelected, yearSelected]);

    const relationGainsRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        gains.filter((gain) => {
            const date = new Date(gain.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return month === monthSelected && year === yearSelected
        }).forEach((gain) => {
            if (gain.frequency === 'recorrente') {
                return amountRecurrent += Number(gain.amount);
            }

            if (gain.frequency === 'eventual') {
                return amountEventual += Number(gain.amount);
            }
        });

        const total = amountRecurrent + amountEventual;

        const eventualPercent = Number((((amountEventual / total) * 100)).toFixed(1))
        const recurrentPercent = Number((((amountRecurrent / total) * 100)).toFixed(1));

        return [
            {
                name: 'Recorrente',
                amount: amountRecurrent,
                percent: recurrentPercent ? recurrentPercent : 0,
                color: "#F7931B"
            },
            {
                name: 'Eventual',
                amount: amountEventual,
                percent: eventualPercent ? eventualPercent : 0,
                color: "#e44c4e"
            },
        ]

    }, [monthSelected, yearSelected]);


    const handleMonthSelected = useCallback((frequency: string) => {
        try {
            const parseMonth = Number(frequency);
            setMonthSelected(parseMonth);
        } catch (error) {
            throw new Error('invalid month value. Is accept 0 - 24.');
        }
    }, []);

    const handleYearhSelected = useCallback((frequency: string) => {
        try {
            const parserYear = Number(frequency);
            setYearSelected(parserYear);
        } catch (error) {
            throw new Error('invalid years value. Is accept integer number.');
        }
    },[]);

    return (
        <Container>
            <ContentHeader title="DashBoard" lineColor="#fff">
                <SelectInput
                    options={months}
                    onChange={(e) => handleMonthSelected(e.target.value)}
                    defaultValue={monthSelected}
                />

                <SelectInput
                    options={years}
                    onChange={(e) => handleYearhSelected(e.target.value)}
                    defaultValue={yearSelected}
                />
            </ContentHeader>

            <Content>
                <WalletBox
                    title="Saldo"
                    amount={totalBalance}
                    footerLabel="atualizado com base nas entradas e sáidas"
                    icon="dolar"
                    color="#4e41f0"
                />
                <WalletBox
                    title="Entradas"
                    amount={totalGains}
                    footerLabel="atualizado com base nas entradas e sáidas"
                    icon="arrowUpImg"
                    color="#f7931b"
                />
                <WalletBox
                    title="Saidas"
                    amount={totalExpenses}
                    footerLabel="atualizado com base nas entradas e sáidas"
                    icon="arrowDownImg"
                    color="#e44c4e"
                />

                <MessageBox
                    title={message.title}
                    description={message.description}
                    footerText={message.footerText}
                    icon={message.icon}
                />

                <PieChartBox
                    data={relationExpensesVersusGains}
                />

                <HistoryBox
                    data={historyData}
                    lineColorAmountOutput="#f7931b"
                    lineColorAmountEntry="#e44c4e"
                />

                <BarChartBox
                    data={relationExpenvesRecurrentVersusEventual}
                    title="Sáidas"
                />
                <BarChartBox
                    data={relationGainsRecurrentVersusEventual}
                    title="Entradas"
                />

            </Content>



        </Container>
    );
}

export default DashBoard;