import React from 'react';
import { Bar, BarChart as Chart, XAxis } from 'recharts';
import { Form } from 'react-bootstrap';
import { IWidget, TInnerWidget, TWidgetEditor } from '../widget.types';

type TBarChart = {
    bars: number;
};

const BarChartEditor: React.FC<TWidgetEditor<TBarChart>> = (props: TWidgetEditor<TBarChart>) => {
    const { widgetConfig, setWidgetConfig } = props;
    const onBarsChange: (bars: number) => any = (bars: number) => {
        const newConfig: TBarChart = {
            ...widgetConfig,
            bars,
        };
        setWidgetConfig(newConfig);
    };

    return (
        <Form.Group className="mb-3" controlId="barChartForm">
            <Form.Label>Number of bars</Form.Label>
            <Form.Control
                type="number"
                placeholder="Enter headline"
                value={widgetConfig.bars}
                onChange={(e) => onBarsChange(parseInt(e.target.value))}
            />
        </Form.Group>
    );
};

const BarChartWidget: React.FC<TInnerWidget<TBarChart>> = (props: TInnerWidget<TBarChart>) => {
    const { width, height, top, left } = props;
    const config: TBarChart = props.config;
    const data = [];
    for (let i = 0; i < config.bars; i++) {
        data.push({ id: i + 1, val: 6 + 3 * i });
    }
    console.log('BAR');
    return (
        <div
            className="inner-widget"
            style={{
                position: 'absolute',
                backgroundColor: 'rgba(0,0,0,.1)',
                width: width + 'px',
                height: height + 'px',
                top: top + 'px',
                left: left + 'px',
            }}
        >
            <Chart width={width} height={height} data={data}>
                <XAxis dataKey="id" />
                <Bar dataKey="val" fill="#0d6efd" />
            </Chart>
        </div>
    );
};

const defaultConfig: TBarChart = {
    bars: 3,
};

const BarChart: IWidget<TBarChart> = {
    widget: BarChartWidget,
    widgetEditor: BarChartEditor,
    defaultConfig,
};

export default BarChart;
