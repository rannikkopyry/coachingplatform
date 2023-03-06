import React from 'react';
import SortableItem from './SortableItem';
import { SortableContainer } from 'react-sortable-hoc';
import { Link } from 'pages/[creatorSlug]';

const SortableList = (props: any) => {
  console.log(props);
  return (
    <ul>
      {props.items.map((value: any, index: number) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
};

export default SortableContainer(SortableList);
