import { DashboardAction } from './type';
import { DashboardActionTypes } from './dashboard.types';
import { WidgetType } from '../common/wiget-type';

export const resizeWidget = (widgetId: string, newWidth: number, newHeight: number): DashboardAction => ({
    type: DashboardActionTypes.RESIZE_WIDGET,
    payload: { widgetId, newWidth, newHeight },
});

export const repositionWidget = (widgetId: string, newX: number, newY: number): DashboardAction => ({
    type: DashboardActionTypes.REPOSITION_WIDGET,
    payload: { widgetId, newX, newY },
});

export const addWidget = (widgetType: WidgetType, widgetConfig: any): DashboardAction => ({
    type: DashboardActionTypes.ADD_WIDGET,
    payload: { widgetType, widgetConfig },
});

export const deleteWidget = (id: string): DashboardAction => ({
    type: DashboardActionTypes.DELETE_WIDGET,
    payload: { id },
});

export const enterEditMode = (): DashboardAction => ({
    type: DashboardActionTypes.ENTER_EDIT_MODE,
});

export const cancelEditMode = (): DashboardAction => ({
    type: DashboardActionTypes.CANCEL_EDIT_MODE,
});

export const saveEditMode = (): DashboardAction => ({
    type: DashboardActionTypes.SAVE_EDIT_MODE,
});

export const showAddWidgetModal = (): DashboardAction => ({
    type: DashboardActionTypes.SHOW_ADD_WIDGET_MODAL,
});

export const cancelAddWidgetModal = (): DashboardAction => ({
    type: DashboardActionTypes.CANCEL_ADD_WIDGET_MODAL,
});

export const cancelEditWidgetModal = (): DashboardAction => ({
    type: DashboardActionTypes.CANCEL_EDIT_WIDGET_MODAL,
});

export const showEditWidgetModal = (type: WidgetType, id: string): DashboardAction => ({
    type: DashboardActionTypes.SHOW_EDIT_WIDGET_MODAL,
    payload: { id, type },
});

export const editWidget = (id: string, config: any): DashboardAction => ({
    type: DashboardActionTypes.EDIT_WIDGET,
    payload: { id, config },
});
