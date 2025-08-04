import React from "react";
import { DragLayerMonitorProps } from "@minoru/react-dnd-treeview";
import { TypeIcon } from "@/components/shared/TypeIcon";
import { CustomData } from "@/types/CustomData";

type Props = {
  monitorProps: DragLayerMonitorProps<CustomData>;
};

export const CustomDragPreview: React.FC<Props> = (props) => {
  const item = props.monitorProps.item;

  return (
    <div className={'dragging-source'}>
      <div className={'icon'}>
        <TypeIcon
          fileType={item?.data?.fileType}
        />
      </div>
      <div className={'label'}>{item.text}</div>
    </div>
  );
};
