import React, { Dispatch, SetStateAction } from 'react';

export type TWidgetEditor<T> = {
    widgetConfig: T;
    setWidgetConfig: Dispatch<SetStateAction<T>>;
};

export type TInnerWidget<T> = {
    top: number;
    left: number;
    width: number;
    height: number;
    config: T;
};

export interface IWidget<T> {
    widget: React.FC<TInnerWidget<T>>;
    widgetEditor: React.FC<TWidgetEditor<T>>;
    defaultConfig: T;
}
