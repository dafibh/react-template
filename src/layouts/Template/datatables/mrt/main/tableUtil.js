/* eslint-disable react/prop-types */

import {basicSort, epochToTimestamp, formatDate, isBetweenInclusive} from "util/UtilHelper";
import DateRangeFilter from "components/TableCells/Filter/DateRangeFilter";
import ActiveCell from "components/TableCells/General/ActiveCell";
import DescriptionCell from "components/TableCells/General/DescriptionCell";

export const columnDefs = [
  { header: "Name", accessorKey: "name", },
  {
    header: "Age",
    accessorKey: "age",
    filterVariant: 'range-slider',
    muiFilterSliderProps: {
      max: 100,
      min: 0,
      step: 1,
      color:"#000000"
    },

  },
  { header: "Description",  accessorKey: "description",
    Cell: ({ _, row }) => <DescriptionCell description={row.original.description}/>},
  { header: "Access Level", accessorKey: "access_level",
    filterVariant: "multi-select",
    filterSelectOptions: [
      { text: "Viewer", value: "viewer" },
      { text: "Admin", value: "admin" },
      { text: "Superuser", value: "superuser" },
    ],
  },
  {
    header: "Active",
    accessorKey: "active",
    Cell: ({ _, row }) => <ActiveCell active={row.original.active} />,
    filterVariant: "select",
    filterSelectOptions: [
      { text: "Active", value: "active" },
      { text: "Inactive", value: "inactive" },
    ],
  },
  {
    header: "Created UTC", accessorKey: "timestamp",
    Filter: ({ header }) => <DateRangeFilter header={header} />,
    filterFn: (row, _, [start, end]) =>
      isBetweenInclusive(new Date(epochToTimestamp(row.original.item.timestamp)), start, end),
    sortingFn: (rowA, rowB, _columnId) =>
      basicSort(rowA.original.item.timestamp, rowB.original.item.timestamp),
  }
]

export const processData = (rawData) => {
  return rawData.map((i) => {
    return {
      item:i,
      name: i.name,
      age: i.age,
      description: i.description,
      access_level: i.role,
      active: i.active,
      timestamp: formatDate("DD/MM/YYYY", new Date(epochToTimestamp(i.timestamp)))
    }
  })
}