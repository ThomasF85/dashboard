import React, { useCallback } from 'react';
import './dashboard.styles.scss';
import WidgetContainer from '../widgetcontainer/widget-container.component';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { selectIsEditMode, selectWidgetIds } from '../../redux/dashboard.selectors';
import { Button } from 'react-bootstrap';
import AddWidgetModal from '../addwidgetmodal/add-widget-modal.component';
import { Dispatch } from 'redux';
import { DashboardAction } from '../../redux/type';
import {
    cancelEditMode,
    enterEditMode,
    saveEditMode,
    showAddWidgetModal as showAddModal,
} from '../../redux/dashboard.actions';
import EditWidgetModalContainer from '../editwidgetmodal/edit-widget-modal-container.component';

const Dashboard: React.FC = () => {
    const widgetIds: string[] = useSelector(selectWidgetIds, shallowEqual);
    const editMode: boolean = useSelector(selectIsEditMode, shallowEqual);
    const dispatch: Dispatch<DashboardAction> = useDispatch();

    const enterEditModeCB: () => any = useCallback(() => dispatch(enterEditMode()), [dispatch]);
    const cancelEditModeCB: () => any = useCallback(() => dispatch(cancelEditMode()), [dispatch]);
    const saveEditModeCB: () => any = useCallback(() => dispatch(saveEditMode()), [dispatch]);

    const showAddWidgetModal = () => dispatch(showAddModal());

    const buttonGroupEdit = (
        <div className="float-end">
            <Button variant="outline-primary" onClick={showAddWidgetModal}>
                Add widget
            </Button>
            <Button className="button-spacing" variant="outline-primary" onClick={saveEditModeCB}>
                Save
            </Button>
            <Button className="button-spacing" variant="outline-primary" onClick={cancelEditModeCB}>
                Cancel
            </Button>
        </div>
    );
    const buttonGroupWatch = (
        <div className="float-end">
            <Button variant="outline-primary" onClick={enterEditModeCB}>
                edit
            </Button>
        </div>
    );

    return (
        <div className="dashboard-background">
            <div className="row button-bar">
                <div className="col-md">{editMode ? buttonGroupEdit : buttonGroupWatch}</div>
            </div>
            <div className="dashboard">
                {widgetIds.map((id) => (
                    <WidgetContainer key={id} id={id} editable={editMode} />
                ))}
            </div>
            <AddWidgetModal />
            <EditWidgetModalContainer />
        </div>
    );
};

export default Dashboard;
