import PropTypes from "prop-types";
import { InputAdornment } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { CloseOutlined } from "@mui/icons-material";
import { dateRangeFormat } from "../../../../util/UtilHelper";
import MDDatePicker from "components/MDBase/MDDatePicker";
import React from "react";

function DateRangeFilter({header}) {
  return (
    <MDDatePicker
      key={header.column.getFilterValue()?.toString()}
      input={{
        sx:{width:"12.5rem"},
        variant: "standard",
        slotProps:{
          input: {
            endAdornment: <InputAdornment position="end">
              <Tooltip title="Clear filter">
                <div>
                  <IconButton
                    disabled={!(header.column.getFilterValue()?.length === 2)}
                    size="small"
                    onClick={() => header.column.setFilterValue(undefined)}
                  >
                    <CloseOutlined color={(header.column.getFilterValue()?.length === 2)?"text":"disabled"} />
                  </IconButton>
                </div>
              </Tooltip>
            </InputAdornment>,
          },
        }
      }}
      value={header.column.getFilterValue() || []}
      onChange={e => {
        if (e.length === 2) {
          header.column.setFilterValue(e || undefined)
        }
      }}
      placeholder="Date Range"
      range
      options={{
        mode: "range",
        dateFormat: dateRangeFormat(localStorage.getItem('datetime-format')),
      }}
    />
  );
}

DateRangeFilter.propTypes = {
  header: PropTypes.object.isRequired,
};

export default DateRangeFilter;
