import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();
    }, []);

    const lineChart = (
        dailyData.length
            ? (
                <Line
                    data={{
                        labels: dailyData.map(({ date }) => date),
                        datasets: [{
                            data: dailyData.map(({ confirmed }) => confirmed),
                            label: 'Infected',
                            borderColor: 'rgba(131, 56, 234, 0.5)',
                            backgroundColor: 'rgba(131, 56, 234, 0.075)',
                            fill: true,
                        }, {
                            data: dailyData.map(({ deaths }) => deaths),
                            label: 'Deaths',
                            borderColor: 'red',
                            backgroundColor: 'rgba(246, 46, 75, 0.5)',
                            fill: true,
                        }],
                    }}
                />) : null
    );

    const barChart = (
        confirmed
            ? (
                <Bar
                    data={{
                        labels: ['Infected', 'Active', 'Recovered', 'Deaths'],
                        datasets: [{
                            label: 'People',
                            backgroundColor: ['rgba(131, 56, 234, 0.5)',
                                'rgba(255, 191, 11, 0.5)',
                                'rgba(0, 255, 42, 0.5)',
                                'rgba(255, 0, 0, 0.5)',
                            ],
                            data: [confirmed.value, (confirmed.value - (recovered.value + deaths.value)), recovered.value, deaths.value]
                        }]
                    }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text:`COVID-19 Stats For ${country}`, fontSize: 20 },
                    }}
                />
            ) : null
    )

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    );
};

export default Chart;