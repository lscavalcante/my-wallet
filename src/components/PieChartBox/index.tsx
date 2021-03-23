import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import { Container, SideLeft, Legend, SideRigth, LegendContainer } from './styles';


interface IPieChartProps {
    data: {
        name: string,
        value: number,
        percent: number;
        color: string;
    }[];
}

// componente stales
const PieChartBox: React.FC<IPieChartProps> = ({ data }) => (
    <Container>

        <SideLeft>
            <h2>Relaçāo</h2>
            <LegendContainer>
                {
                    data.map(indicator => (
                        <Legend key={indicator.name} color={indicator.color}>
                            <div>{indicator.percent}%</div>
                            <span>{indicator.name}</span>
                        </Legend>
                    ))
                }
            </LegendContainer>
        </SideLeft>

        <SideRigth>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie data={data} dataKey="percent">
                            {
                                data.map((indicator) => (
                                    <Cell key={indicator.name} fill={indicator.color}/>
                                ))
                            }

                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
        </SideRigth>

    </Container>
);


export default PieChartBox;