import BarChart from './widgets/barchart';
import PieChart from './widgets/piechart';
import React from 'react';
import { IWidget, TInnerWidget, TWidgetEditor } from './widget.types';
import { WidgetType } from '../../common/wiget-type';

export const WIDGETS = new Map<WidgetType, IWidget<any>>([
    [WidgetType.BAR_CHART, BarChart],
    [WidgetType.PIE_CHART, PieChart],
]);

export const defaultConfig: (type: WidgetType) => any = (type: WidgetType) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return WIDGETS.get(type).defaultConfig;
};

const WidgetComponent: React.FC<TInnerWidget<any> & { widgetType: WidgetType }> = (
    props: TInnerWidget<any> & { widgetType: WidgetType },
) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const AWidget: React.FC<TInnerWidget<any>> = WIDGETS.get(props.widgetType).widget;
    return <AWidget {...props} />;
};

export const Widget: React.FC<TInnerWidget<any> & { widgetType: WidgetType }> = React.memo(WidgetComponent);

export const WidgetEditorComponent: React.FC<TWidgetEditor<any> & { widgetType: WidgetType }> = (
    props: TWidgetEditor<any> & { widgetType: WidgetType },
) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const Editor: React.FC<TWidgetEditor<any>> = WIDGETS.get(props.widgetType).widgetEditor;
    return <Editor {...props} />;
};

export const WidgetEditor: React.FC<TWidgetEditor<any> & { widgetType: WidgetType }> =
    React.memo(WidgetEditorComponent);
