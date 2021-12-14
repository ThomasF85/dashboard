import { createSelector, Selector } from 'reselect';
import { DashboardState, TWidget } from './type';
import { DashboardMode } from '../common/dashboard-mode';

export const selectWidgetIds: Selector<DashboardState, string[]> = createSelector(
    [(state: DashboardState) => state.widgets],
    (widgets: TWidget<any>[]) => widgets.map((w) => w.id),
);

export const selectWidget: (widgetId: string) => Selector<DashboardState, TWidget<any>> = (widgetId: string) =>
    createSelector(
        [(state: DashboardState) => state.widgets],
        (widgets: TWidget<any>[]) => widgets.filter((w) => w.id === widgetId)[0],
    );

export const selectWidgetToEdit: Selector<DashboardState, TWidget<any>> = createSelector(
    [(state: DashboardState) => state.editWidgetModal.id, (state: DashboardState) => state.widgets],
    (id: string, widgets: TWidget<any>[]) => widgets.filter((w) => w.id === id)[0],
);

export const selectIsEditMode: Selector<DashboardState, boolean> = createSelector(
    [(state: DashboardState) => state.mode],
    (mode: DashboardMode) => mode === DashboardMode.EDIT,
);

export const selectIsAddWidgetModalShown: Selector<DashboardState, boolean> = createSelector(
    [(state: DashboardState) => state.addWidgetModalShown],
    (modalShown: boolean) => modalShown,
);

export const selectIsEditWidgetModalShown: Selector<DashboardState, boolean> = createSelector(
    [(state: DashboardState) => state.editWidgetModal.shown],
    (modalShown: boolean) => modalShown,
);
