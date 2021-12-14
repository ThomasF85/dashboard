import React from 'react';
import { PieChart as Chart, Pie } from 'recharts';
import { Form } from 'react-bootstrap';
import { IWidget, TInnerWidget, TWidgetEditor } from '../widget.types';

type TPieChart = {
    headline: string;
};

const PieChartEditor: React.FC<TWidgetEditor<TPieChart>> = (props: TWidgetEditor<TPieChart>) => {
    const { widgetConfig, setWidgetConfig } = props;
    const onHeadlineChange: (headline: string) => any = (headline: string) => {
        const newConfig: TPieChart = {
            ...widgetConfig,
            headline,
        };
        setWidgetConfig(newConfig);
    };

    return (
        <Form.Group className="mb-3" controlId="pieChartForm">
            <Form.Label>Headline of chart</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter headline"
                value={widgetConfig.headline}
                onChange={(e) => onHeadlineChange(e.target.value)}
            />
        </Form.Group>
    );
};

const PieChartWidget: React.FC<TInnerWidget<TPieChart>> = (props: TInnerWidget<TPieChart>) => {
    const { width, height, top, left, config } = props;

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
            <div>{config.headline}</div>
            <Chart width={width} height={height}>
                <Pie
                    data={[
                        { id: 1, a: 30 },
                        { id: 2, a: 45 },
                        { id: 3, a: 40 },
                    ]}
                    dataKey="a"
                    cx={width / 2}
                    cy={height / 2 - 20}
                    fill="#696969"
                />
            </Chart>
        </div>
    );
};

const defaultConfig: TPieChart = {
    headline: 'Kuchen',
};

const PieChart: IWidget<TPieChart> = {
    widget: PieChartWidget,
    widgetEditor: PieChartEditor,
    defaultConfig,
};

export default PieChart;
