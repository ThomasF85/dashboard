import React, { useState } from 'react';
import './widget-container.styles.css';
import { Rnd, RndDragCallback, RndResizeCallback, RndResizeStartCallback } from 'react-rnd';
import { DashboardAction, PositionAndSize, TWidget } from '../../redux/type';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { selectWidget } from '../../redux/dashboard.selectors';
import { Dispatch } from 'redux';
import { deleteWidget, repositionWidget, resizeWidget, showEditWidgetModal } from '../../redux/dashboard.actions';
import { FaCog, FaWindowClose } from 'react-icons/all';
import { Widget } from '../widget/widgets';
import { TInnerWidget } from '../widget/widget.types';

const extractNumberFromPXString: (px: string) => number = (px: string) => {
    const cleanedString: string = px.replace('px', '');
    return parseInt(cleanedString);
};

const extractPositionXFromTransform: (transform: string) => number = (transform: string) => {
    return parseInt(transform.substring(10, transform.indexOf('px'))) + 1;
};

const extractPositionYFromTransform: (transform: string) => number = (transform: string) => {
    return parseInt(transform.substring(transform.indexOf('px') + 4, transform.indexOf('px)'))) + 1;
};

const transformToTInnerWidget = (positionAndSize: PositionAndSize, config: any) => {
    return {
        config,
        width: positionAndSize.width - 10,
        height: positionAndSize.height - 35,
        top: 30,
        left: 4,
    };
};
const iconStyle = { marginRight: '5px', marginTop: '3px', cursor: 'pointer' };

const WidgetContainer: React.FC<WidgetContainerProps> = (props: WidgetContainerProps) => {
    const { id, editable } = props;
    const { positionAndSize, type, config }: TWidget<any> = useSelector(selectWidget(id), shallowEqual);
    const dispatch: Dispatch<DashboardAction> = useDispatch();
    const [resizing, setResizing] = useState(false);

    const resizeStartHandler: RndResizeStartCallback = () => {
        setResizing(true);
    };
    const resizeStopHandler: RndResizeCallback = (e, dir, ref) => {
        dispatch(
            resizeWidget(id, extractNumberFromPXString(ref.style.width), extractNumberFromPXString(ref.style.height)),
        );
        setResizing(false);
    };
    const dragStopHandler: RndDragCallback = (e, data) => {
        const x = extractPositionXFromTransform(data.node.style.transform);
        const y = extractPositionYFromTransform(data.node.style.transform);
        dispatch(repositionWidget(id, x, y));
    };
    const innerWidgetProps: TInnerWidget<any> = transformToTInnerWidget(positionAndSize, config);

    return (
        <Rnd
            position={{ x: positionAndSize.x, y: positionAndSize.y }}
            size={{ width: positionAndSize.width, height: positionAndSize.height }}
            resizeGrid={[50, 50]}
            dragGrid={[50, 50]}
            className="widget-container"
            minWidth="150"
            minHeight="100"
            maxWidth="400"
            maxHeight="250"
            bounds="parent"
            enableResizing={editable}
            disableDragging={!editable}
            onResizeStart={resizeStartHandler}
            onResizeStop={resizeStopHandler}
            onDragStop={dragStopHandler}
        >
            <div className={resizing ? 'transparent' : ''}>
                {editable ? (
                    <div className="float-end">
                        <FaCog
                            style={iconStyle}
                            onClick={() => dispatch(showEditWidgetModal(type, id))}
                            size={25}
                            color="rgba(0,0,0,0.3)"
                        />
                        <FaWindowClose
                            style={iconStyle}
                            onClick={() => dispatch(deleteWidget(id))}
                            size={25}
                            color="rgba(0,0,0,0.3)"
                        />
                    </div>
                ) : null}
                <Widget widgetType={type} {...innerWidgetProps} />
            </div>
        </Rnd>
    );
};

type WidgetContainerProps = {
    id: string;
    editable: boolean;
};

export default React.memo(WidgetContainer);
