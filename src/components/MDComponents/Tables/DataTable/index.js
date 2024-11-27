import { useMemo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Icon from "@mui/material/Icon";
import Autocomplete from "@mui/material/Autocomplete";
import MDBox from "components/MDBase/MDBox";
import MDTypography from "components/MDBase/MDTypography";
import MDInput from "components/MDBase/MDInput";
import MDPagination from "components/MDBase/MDPagination";
import DataTableHeadCell from "components/MDComponents/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "components/MDComponents/Tables/DataTable/DataTableBodyCell";
import MDButton from "components/MDBase/MDButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import {v4 as uuidv4} from "uuid"
import {Skeleton} from "@mui/material";
import {downloadExcel} from "util/ExcelUtil";

function DataTable(
  {
    entriesPerPage,
    canSearch,
    showEntriesPerPage,
    showTotalEntries,
    table,
    pagination,
    isSorted,
    noEndBorder,
    onRowClick,
    onRefresh,
    columnToggle,
    isLoading,
    onSelectedRowsChange,
    searchValue,
    columnVisibilityCallback,
    webSocketLoading
  }) {
  const defaultValue = entriesPerPage.defaultValue ? entriesPerPage.defaultValue : 10;
  const entries = entriesPerPage.entries
    ? entriesPerPage.entries.map((el) => el.toString())
    : ["5", "10", "15", "20", "25"];
  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table]);

  const [hoveredRow, setHoveredRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: columns.filter(column => column.hide).map(column => column.accessor),
        pageIndex: currentPage,
      }
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    pageOptions,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
    toggleHideColumn
  } = tableInstance;

  useEffect(() => setPageSize(defaultValue || 10), [defaultValue]);

  const setEntriesPerPage = (value) => setPageSize(value);

  const renderPagination = pageOptions.map((option) => (
    <MDPagination
      item
      key={option}
      onClick={() => {
        setCurrentPage(Number(option))
        gotoPage(Number(option))
      }}
      active={pageIndex === option}
    >
      {option + 1}
    </MDPagination>
  ));

  const handleInputPagination = ({ target: { value } }) => {
    let page = (value > pageOptions.length || value < 0) ? 0 : Number(value);
    setCurrentPage(page);
    gotoPage(page);
  };

  const customizedPageOptions = pageOptions.map((option) => option + 1);

  const handleInputPaginationValue = ({ target: value }) => {
    setCurrentPage(Number(value.value - 1))
    gotoPage(Number(value.value - 1))
  };

  const [search, setSearch] = useState(globalFilter);
  const [sVal, setSVal] = useState("");

  const onSearchChange = useAsyncDebounce((value) => {
    setSVal(value);
    setGlobalFilter(value || undefined);
  }, 100);

  const setSortedValue = (column) => {
    let sortedValue;

    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? "desc" : "asce";
    } else if (isSorted) {
      sortedValue = "none";
    } else {
      sortedValue = false;
    }

    return sortedValue;
  };

  const entriesStart = pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

  let entriesEnd;

  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === pageOptions.length - 1) {
    entriesEnd = rows.length;
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }

  //#region Toggle (row length) tracking to move back to first page
  const [rowLen, setRowLen] = useState(rows.length);
  useEffect(() => {
    if (rows.length !== rowLen) {
      setRowLen(rows.length);
      setCurrentPage(0);
      gotoPage(0)
    }
  }, [rows]);
  //#endregion

  const handleRowClick = (rowData) => {
    if (onRowClick) {
      onRowClick(rowData.original);
    } else if (onSelectedRowsChange) {
      handleSelectRow(rowData.id);
    }
  };

  let mouseDownTime = null;

  const handleMouseDown = (event) => {
    if (
      event.button === 0 &&
      event.target.tagName.toLowerCase() !== "clickable" &&
      event.target.tagName.toLowerCase() !== "input" &&
      event.target.tagName.toLowerCase() !== "button"
    ) {
      mouseDownTime = Date.now();
    }
  };

  const handleMouseUp = (rowData) => {
    const mouseUpTime = Date.now();
    const timeDifference = mouseUpTime - mouseDownTime;

    if (timeDifference <= 300) {
      handleRowClick(rowData);
    }
  };

  // Column Toggle
  const [showColumnsMenu, setShowColumnsMenu] = useState(false); // State to control column toggle menu visibility
  const initialVisibility = columns.reduce((acc, column) => {
    acc[column.accessor] = !column.hide;
    return acc;
  }, {});

  const [columnsVisibility, setColumnsVisibility] = useState(initialVisibility);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleColumnToggleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setShowColumnsMenu(!showColumnsMenu);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShowColumnsMenu(false);
  };

  const [colHideState, setColHideState] = useState(0);
  useEffect(() => {
    if (isLoading && colHideState === 0) {setColHideState(1)}
    if (!isLoading && colHideState === 1) {
      setColumnsVisibility(columns.reduce((acc, column) => {
        acc[column.accessor] = !column.hide;
        return acc;
      }, {}));
    }
  }, [isLoading]);

  const handleColumnToggle = (columnAccessor) => {
    const isVisible = !columnsVisibility[columnAccessor];
    setColumnsVisibility((prev) => ({
      ...prev,
      [columnAccessor]: isVisible,
    }));

    // Using the updated state after setting it
    const updatedVisibility = { ...columnsVisibility, [columnAccessor]: isVisible };
    toggleHideColumn(columnAccessor);

    if (columnVisibilityCallback) {
      columnVisibilityCallback(updatedVisibility);
    }
  };

  const showAllColumns = () => {
    const newColumnsVisibility = {};
    columns.forEach((column) => {
      if (!column.search) {
        newColumnsVisibility[column.accessor] = true;
        toggleHideColumn(column.accessor, false);
      }
    });
    setColumnsVisibility(newColumnsVisibility);
  };

  const [searchLimit, setSearchLimit] = useState(0)
  useEffect(() => {
    if (searchValue && searchLimit < 2) {
      setGlobalFilter(searchValue)
      setSearchLimit(prevState => prevState+1)
    }
  }, [table]);

  // Selection
  const [selectedRows, setSelectedRows] = useState({}); // Use an object to store selected row IDs
  const [selectAll, setSelectAll] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);


  // Select/Deselect All Logic
  const handleSelectAll = (event) => {
    const newSelectedRows = {};
    if (event.target.checked) {
      rows.forEach(row => {
        newSelectedRows[row.id] = true;
      });
    }
    setSelectedRows(newSelectedRows);
    // Update select all status if all or some rows are selected
    const allSelected = Object.values(newSelectedRows).every(Boolean);
    setSelectAll(allSelected);
  };

  // Select Single Row
  const handleSelectRow = (id) => {
    setSelectedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    // Update select all status if all
    const allSelected = Object.values(selectedRows).filter(Boolean).length === data.length;
    setSelectAll(allSelected);
  };

  // Update select all when individual selects change
  useEffect(() => {
    const allSelected = Object.values(selectedRows).filter(Boolean).length === rows.length;
    const someSelected = Object.values(selectedRows).some(Boolean) && !allSelected;
    setSelectAll(allSelected);
    setIndeterminate(someSelected);

    onSelectedRowsChange && onSelectedRowsChange(rows.filter((item)=>{return selectedRows[item.id]}).map(item=>item.original))
  }, [selectedRows, rows]);


  // Checkboxes in rows
  const renderCheckbox = (row) => {
    return (
      <Checkbox
        checked={selectedRows[row.id] || false}
        onChange={() => handleSelectRow(row.id)}
      />
    );
  }

  const loadTable = () => (
    <MDBox p={3}>
      <Grid container spacing={1}>
        {
          Array(6).fill(null).map((_,index) => {
            const height=(index!==0)?39:null;
            return (
              <Grid key={uuidv4()} item xs={12}>
                <MDBox sx={{
                  borderBottom: index === 0 ? '1px solid lightgray' : 'none',
                  marginBottom: (index === 0) ? "0.5rem" : null
                }}>
                  <Grid container spacing={1}>
                    <Grid item xs={3}><Skeleton height={height} /></Grid>
                    <Grid item xs={2.25}><Skeleton height={height} /></Grid>
                    <Grid item xs={2.25}><Skeleton height={height} /></Grid>
                    <Grid item xs={2.25}><Skeleton height={height} /></Grid>
                    <Grid item xs={2.25}><Skeleton height={height} /></Grid>
                  </Grid>
                </MDBox>
              </Grid>
            )
          })
        }
      </Grid>
    </MDBox>
  );

  useEffect(() => {
    if (sVal) {
      onSearchChange(sVal);
    }
  }, [isLoading]);

  return (
    <TableContainer sx={{ boxShadow: "none" }}>
      {showEntriesPerPage || canSearch || columnToggle ? (
        <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <MDBox display="flex" >
            {columnToggle && (
              <>
                <Tooltip title="Toggle Columns">
                  <MDButton
                    disabled={isLoading}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    color="info"
                    variant="gradient"
                    iconOnly
                    onClick={handleColumnToggleClick}
                    sx={{marginRight: (showEntriesPerPage || canSearch) ? "0.5rem" : "0"}}
                  >
                    <Icon>view_column</Icon>
                  </MDButton>
                </Tooltip>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  PaperProps={{
                    style: { maxHeight: '25rem', marginTop: '1rem', },
                  }}
                  anchorOrigin={{
                    vertical: 'bottom',
                  }}

                >
                  <MenuItem onClick={showAllColumns}>
                    <MDTypography variant="body2" color="info" style={{ cursor: 'pointer', margin: '10px 0' }}>
                      Show All
                    </MDTypography>
                  </MenuItem>
                  {columns.map((column) => {
                    if (!(column.search)) {
                      return (
                        <MenuItem key={column.accessor} onClick={() => handleColumnToggle(column.accessor)}>
                          <Checkbox checked={columnsVisibility[column.accessor]??false} />
                          <MDTypography variant="body2" color="text">
                            {column.Header}
                          </MDTypography>
                        </MenuItem>
                      );
                    }
                  })}
                </Menu>
              </>
            )}
            {showEntriesPerPage && (
              <MDBox display="flex" alignItems="center">
                <Autocomplete
                  disableClearable
                  value={pageSize.toString()}
                  options={entries}
                  onChange={(event, newValue) => {
                    setEntriesPerPage(parseInt(newValue, 10));
                  }}
                  size="small"
                  sx={{ width: "5rem" }}
                  renderInput={(params) => <MDInput {...params} />}
                />
                <MDTypography variant="caption" color="secondary">
                  &nbsp;&nbsp;entries per page
                </MDTypography>
              </MDBox>
            )}
          </MDBox>
          <MDBox display="flex" verticalAlign="middle">
            <Tooltip title="Download Excel">
              <MDButton
                disabled={isLoading}
                color="info"
                variant="gradient"
                iconOnly
                onClick={()=>{
                  const test = rows.map((item)=>item.original)
                  const vals = test.map(obj => {
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
                }}
                sx={{marginRight: (canSearch || onRefresh)?"0.5rem":"0"}}

              >
                <Icon>save_alt</Icon>
              </MDButton>
            </Tooltip>
            {onRefresh && (
              <Tooltip title="Refresh">
                <MDButton
                  disabled={isLoading}
                  color="info"
                  variant="gradient"
                  iconOnly
                  onClick={onRefresh}
                  sx={{marginRight: (canSearch)?"0.5rem":"0"}}

                >
                  <Icon
                    sx={{
                      ...(webSocketLoading ? {
                        animation: 'spin 1s linear infinite',
                        '@keyframes spin': {
                          '0%': { transform: 'rotate(0deg)' },
                          '100%': { transform: 'rotate(360deg)' },
                        },
                      } : {})
                    }}
                  >
                    refresh
                  </Icon>
                </MDButton>
              </Tooltip>
            )}
            {canSearch && (
              <MDBox width="12rem" ml="auto">
                <MDInput
                  placeholder="Search..."
                  value={search}
                  size="small"
                  fullWidth
                  onChange={({ currentTarget }) => {
                    setSearch(search);
                    onSearchChange(currentTarget.value);
                  }}
                />
              </MDBox>
            )}
          </MDBox>
        </MDBox>
      ) : null}

      {
        (isLoading && !webSocketLoading)?loadTable():(
          <MDBox sx={{overflow: "auto"}} >
            <Table {...getTableProps()}>
              <MDBox component="thead">
                {headerGroups.map((headerGroup, key) => (
                  <TableRow key={key} {...headerGroup.getHeaderGroupProps()}>
                    {onSelectedRowsChange && (
                      <DataTableHeadCell width="1%" align="left" sorted={false} opacity={1}>
                        <Checkbox
                          indeterminate={indeterminate}
                          checked={selectAll}
                          onChange={(e) => handleSelectAll(e)}
                        />
                      </DataTableHeadCell>
                    )}
                    {headerGroup.headers.map((column, idx) => (
                      <DataTableHeadCell
                        key={idx}
                        {...column.getHeaderProps(isSorted && column.getSortByToggleProps())}
                        width={column.width ? column.width : "auto"}
                        align={column.align ? column.align : "left"}
                        sorted={setSortedValue(column)}
                      >
                        {column.render("Header")}
                      </DataTableHeadCell>
                    ))}
                  </TableRow>
                ))}
              </MDBox>
              <TableBody {...getTableBodyProps()}>
                {page.map((row, key) => {
                  prepareRow(row);
                  return (
                    <TableRow
                      key={key}
                      {...row.getRowProps()}
                      onMouseDown={handleMouseDown}
                      onMouseUp={() => handleMouseUp(row)}
                      onMouseEnter={() => setHoveredRow(row.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                      style={{
                        cursor: !(row.original.un_clickable) && (onRowClick || onSelectedRowsChange) ? "pointer" : "default",
                        backgroundColor: (hoveredRow === row.id && (onRowClick || onSelectedRowsChange) && !(row.original.un_clickable)) ? "rgba(129,139,160,0.2)" : "inherit",
                      }}
                    >
                      {onSelectedRowsChange && <DataTableBodyCell>{renderCheckbox(row)}</DataTableBodyCell>}
                      {row.cells.map((cell, idx) => (
                        <DataTableBodyCell
                          key={idx}
                          noBorder={noEndBorder && rows.length - 1 === key}
                          align={cell.column.align ? cell.column.align : "left"}
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </DataTableBodyCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </MDBox>
        )
      }

      <MDBox
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
      >
        {showTotalEntries && (
          <MDBox mb={{ xs: 3, sm: 0 }}>
            <MDTypography variant="button" color="secondary" fontWeight="regular">
              Showing {entriesStart} to {entriesEnd} of {rows.length} entries
            </MDTypography>
          </MDBox>
        )}
        {pageOptions.length > 1 && (
          <MDPagination
            variant={pagination.variant ? pagination.variant : "gradient"}
            color={pagination.color ? pagination.color : "info"}
          >
            {canPreviousPage && (
              <MDPagination item onClick={() => {
                setCurrentPage(prevState => prevState-1)
                previousPage()
              }}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
              </MDPagination>
            )}
            {renderPagination.length > 6 ? (
              <MDBox width="5rem" mx={1}>
                <MDInput
                  inputProps={{ type: "number", min: 1, max: customizedPageOptions.length }}
                  value={customizedPageOptions[pageIndex]}
                  onChange={(handleInputPagination, handleInputPaginationValue)}
                />
              </MDBox>
            ) : (
              renderPagination
            )}
            {canNextPage && (
              <MDPagination item onClick={() => {
                setCurrentPage(prevState => prevState+1)
                nextPage()
              }}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
              </MDPagination>
            )}
          </MDPagination>
        )}
      </MDBox>
    </TableContainer>
  );
}

DataTable.defaultProps = {
  entriesPerPage: { defaultValue: 10, entries: [5, 10, 15, 20, 25] },
  canSearch: false,
  showEntriesPerPage: true,
  showTotalEntries: true,
  pagination: { variant: "gradient", color: "info" },
  isSorted: true,
  noEndBorder: false,
  onRowClick: null,
  onRefresh: null,
  columnToggle: false,
  isLoading: false,
  webSocketLoading: false,
  onSelectedRowsChange: null,
  searchValue: null,
  columnVisibilityCallback: null
};

DataTable.propTypes = {
  entriesPerPage: PropTypes.oneOfType([
    PropTypes.shape({
      defaultValue: PropTypes.number,
      entries: PropTypes.arrayOf(PropTypes.number),
    }),
    PropTypes.bool,
  ]),
  canSearch: PropTypes.bool,
  showEntriesPerPage: PropTypes.bool,
  showTotalEntries: PropTypes.bool,
  table: PropTypes.objectOf(PropTypes.array).isRequired,
  pagination: PropTypes.shape({
    variant: PropTypes.oneOf(["contained", "gradient"]),
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
  }),
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool,
  onRowClick: PropTypes.func,
  onRefresh: PropTypes.func,
  columnToggle: PropTypes.bool,
  isLoading: PropTypes.bool,
  webSocketLoading: PropTypes.bool,
  onSelectedRowsChange: PropTypes.func,
  searchValue: PropTypes.string,
  columnVisibilityCallback: PropTypes.func
};

export default DataTable;
