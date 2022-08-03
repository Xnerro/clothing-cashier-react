import { FC, useEffect, useRef, useState } from 'react';
import type { ChartData, ChartArea } from 'chart.js';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const colors = ['#429aff', '#d4e6fb8e'];

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
        },
    },
    scales: {
        yAxis: {
            grid: {
                display: false,
            },
        },
        xAxis: {
            grid: {
                display: false,
            },
        },
    },
};

export const data = {
    labels,
    datasets: [
        {
            fill: true,
            data: labels.map((x) => Math.floor(Math.random() * 20)),
        },
    ],
};

function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
    const colorStart = colors[1];
    const colorEnd = colors[0];

    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(1, colorEnd);

    return gradient;
}

export const ChartLine: FC = () => {
    const chartRef = useRef<ChartJS>(null);
    const [chartData, setChartData] = useState<ChartData<'line'>>({
        datasets: [],
    });

    useEffect(() => {
        const chart = chartRef.current;

        if (!chart) {
            return;
        }
        const chartData = {
            ...data,
            datasets: data.datasets.map((dataset) => ({
                ...dataset,
                borderColor: createGradient(chart.ctx, chart.chartArea),
                backgroundColor: createGradient(chart.ctx, chart.chartArea),
            })),
        };
        setChartData(chartData);
    }, []);
    return (
        <>
            <Chart
                type="line"
                options={options}
                data={chartData}
                ref={chartRef}
            />
        </>
    );
};
