/* eslint-disable react/prop-types */

import {basicSort, epochToTimestamp, formatDate, isBetweenInclusive} from "util/UtilHelper";
import DateRangeFilter from "components/TableCells/Filter/DateRangeFilter";
import ActiveCell from "components/TableCells/General/ActiveCell";
import DescriptionCell from "components/TableCells/General/DescriptionCell";

export const columnDefs = [
  { header: "Endpoint", accessorKey: "endpoint"},
  { header: "Environment", accessorKey: "environment",
    editVariant: 'select',
    editSelectOptions: ["env1","env2"],
    muiEditTextFieldProps: {
      select: true,
    },
  },
]

export const processData = (rawData) => {
  return rawData.map((i) => {
    return {
      id: i.id,
      endpoint: i.endpoint,
      environment: i.env
    }
  })
}