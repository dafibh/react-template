import PropTypes from "prop-types";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { Download } from "@mui/icons-material";
import { downloadExcel } from "util/ExcelUtil";

const DownloadExcelButton =({isRefetching=false, rows}) => {
  return (
    <Tooltip arrow title="Download Excel">
      <IconButton
        sx={{
          transition: !isRefetching ? "opacity 350ms" : "opacity 250ms",
          opacity: isRefetching ? 0.25 : 1,
        }}
        onClick={() => {
        if (rows.length > 0 && !isRefetching) {
          const vals = rows.map((item)=>item.original).map(obj => {
            return Object.keys(obj).reduce((newObj, key) => {
              const value = obj[key];
              if (typeof value === "number" || typeof value === "string") {
                newObj[key] = value;
              }
              return newObj;
            }, {});
          });

          const contents = {
            "Data": vals
          }
          downloadExcel("Table", contents)
        }
      }}>
        <Download />
      </IconButton>
    </Tooltip>
  );
}

DownloadExcelButton.propTypes = {
  isRefetching: PropTypes.bool,
  rows: PropTypes.array.isRequired
}

export default DownloadExcelButton;