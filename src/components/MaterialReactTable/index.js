import {
  MaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
  useMaterialReactTable,
} from "material-react-table";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import MDBox from "components/MDBase/MDBox";
import AnimatedLoadingIconButton from "./AnimatedLoadingIconButton";
import MDTypography from "components/MDBase/MDTypography";
import {InfoOutlined, SearchOutlined } from "@mui/icons-material";
import DownloadExcelButton from "./DownloadExcelButton";
import {
  muiBottomToolbarProps,
  muiFilterTextFieldProps, muiLinearProgressProps,
  muiPaginationProps, muiSearchTextFieldProps,
  muiTableHeadProps, muiTablePaperProps,
  muiTopToolbarProps,
} from "./style";
import Icon from "@mui/material/Icon";

function MRTable(
  {
    columns,
    data,
    initialColumnOrder = null,
    initialColumnVisibility = null,
    initialColumnPinning = null,
    isLoading = false,
    isRefetching = false,
    customTopLeftToolbar = () => {},
    customTopRightToolbar = () => {},
    rowActionMenuItems = null,
    customRowActions = null,
    onRefresh = null,
    onCellClick = null,
    onRowClick = null,
    onColumnStateChanged = null,
    enableRowSelection = false,
    onRowSelectionChange = () => {},
    noExcel = false,
    compact = false,
    onCreatingRowSave = null,
    onEditingRowSave = null,
    ...rest
  }) {

  const [columnOrder, setColumnOrder] = useState(() => initialColumnOrder || columns.map(col => col.accessorKey));
  const [columnVisibility, setColumnVisibility] = useState(() => {
    if (initialColumnVisibility === {} || !initialColumnVisibility) {
      return columns.reduce(
        (acc, {accessorKey, hide}) => hide && accessorKey ?
          { ...acc, [accessorKey]: false} : acc, {}
      )
    } else {
      return initialColumnVisibility
    }
  });
  const [columnPinning, setColumnPinning] = useState(() => initialColumnPinning || { left: ['mrt-row-select'], right: ['mrt-row-actions'] });
  const [rowSelection, setRowSelection] = useState({});
  const clickableColumn = columns
    .filter(column => column.clickable)
    .map(column => column.accessorKey);

  useEffect(() => {
    if (onColumnStateChanged !== null) {
      onColumnStateChanged({
        visibility: columnVisibility,
        pinning: columnPinning,
        order: columnOrder,
      });
    }
  }, [columnVisibility, columnPinning, columnOrder]);

  useEffect(() => {
    onRowSelectionChange(table);
  }, [rowSelection]);

  const table = useMaterialReactTable({
    columns,
    data,

    //#region Props
    enableFullScreenToggle: false,
    autoResetPageIndex: false,

    // Filters, Grouping, Sorting
    positionGlobalFilter: "none",
    enableColumnFilterModes: true,
    enableColumnFilters: true,
    enableSorting: true,
    enableHiding: true,
    enableGrouping: true,
    enableColumnOrdering: true,
    enableColumnPinning: true,

    // Pagination
    paginateExpandedRows: true, // Change to false if you want all the child rows to be in the same page of the parent
    enablePagination: true,
    paginationDisplayMode: "pages",


    // Row Stuff
    selectAllMode: "all",
    enableRowSelection: enableRowSelection,
    enableRowActions: (rowActionMenuItems !== null || customRowActions !== null),
    onRowSelectionChange: setRowSelection,

    // UI
    mrtTheme: (theme) => ({
      baseBackgroundColor: theme.palette.background.sidenav,
      draggingBorderColor: theme.palette.secondary.main,
      menuBackgroundColor: theme.palette.background.card,
      selectedRowBackgroundColor: theme.palette.background.default,
      transition: "all 350ms ease-out",
    }),
    muiCircularProgressProps: { color: "info" },
    muiTablePaperProps: muiTablePaperProps,
    muiFilterTextFieldProps: muiFilterTextFieldProps,
    muiTopToolbarProps: muiTopToolbarProps,
    muiBottomToolbarProps: muiBottomToolbarProps,
    muiPaginationProps: muiPaginationProps,
    muiTableHeadCellProps: muiTableHeadProps,
    muiSearchTextFieldProps: muiSearchTextFieldProps,
    muiLinearProgressProps: muiLinearProgressProps,
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => { if (onRowClick !== null) { onRowClick(row); } },
      sx: () => ({
        // backgroundColor: row.original.updatedUtc > previousUpdatedTimestamp / 1000 ? "table.rowHighlight" : "table.row",
      }),
    }),
    muiTableBodyCellProps: ({ cell, column }) => ({
      onClick: (e) => { if (onCellClick !== null) { onCellClick(e, cell); } },
      sx: (theme) => ({
        fontSize: "14px",
        px: 2,
        textDecoration: clickableColumn.includes(cell.column.id) ? "underline" : "none",
        color: clickableColumn.includes(cell.column.id) ? "info.main" : theme.palette.text.main,
        cursor: (clickableColumn.includes(cell.column.id) || onRowClick !== null) ? "pointer" : "default",
        button: {
          display:(cell.row.original.noAction && cell.column.id === "mrt-row-actions") ? "none":"inline-flex"
        }
      }),
    }),
    icons: {
      SearchIcon: (props) => <SearchOutlined sx={{ color: "icon.main" }} {...props} />,
      EditIcon: () => <Icon color="text" fontSize="small" >edit</Icon>,
    },
    //#endregion

    //#region Callbacks
    onColumnOrderChange: (newColumnOrder) => setColumnOrder(newColumnOrder),
    onColumnVisibilityChange: (updater) => setColumnVisibility(updater),
    onColumnPinningChange: (updater) => setColumnPinning(updater),
    //#endregion

    //#region Renders
    renderRowActionMenuItems: rowActionMenuItems,
    renderRowActions: customRowActions,
    renderEmptyRowsFallback: ({}) => (
      <MDBox display="flex" p={1} justifyContent="center" alignItems="center" alignContent="center">
        <InfoOutlined color="warning" />
        <MDTypography px={1} variant="body2">No data</MDTypography>
      </MDBox>
    ),
    renderTopToolbarCustomActions: ({table}) => (
      <MDBox display="flex" flexDirection="column" alignItems="start" sx={{paddingTop:2}}>
        {customTopLeftToolbar(table)}
        <MRT_ShowHideColumnsButton table={table} />
      </MDBox>
    ),
    renderToolbarInternalActions: ({ table }) => (
      <MDBox display="flex" flexDirection="column" alignItems="end" sx={{paddingTop:2}}>
        {customTopRightToolbar(table)}
        <MDBox display="flex" >
          {onRefresh !== null && <AnimatedLoadingIconButton isRefetching={isLoading||isRefetching} refetch={onRefresh} />}
          {
            !noExcel?(
              <DownloadExcelButton isRefetching={isLoading||isRefetching} rows={table.getPrePaginationRowModel().rows} />
            ): null
          }
          <MRT_GlobalFilterTextField table={table} sx={{paddingX:1}}/>
          <MRT_ToggleFiltersButton table={table} />
          <MRT_ToggleDensePaddingButton table={table} />
        </MDBox>
      </MDBox>
    ),
    renderBottomToolbarCustomActions: ({table}) => (
      <MDTypography variant="caption" sx={{ mx: 2 }}>
        {`Showing ${table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to ${Math.min(
          (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
          table.getFilteredRowModel().rows.length
        )} of ${table.getFilteredRowModel().rows.length}`}
      </MDTypography>
    ),
    //#endregion

    createDisplayMode: (onCreatingRowSave!==null)?"row":null,
    onCreatingRowSave: onCreatingRowSave, // ({row}) => row._valuesCache

    editDisplayMode: (onEditingRowSave!==null)?"row":null,
    enableEditing: (onEditingRowSave!==null),
    onEditingRowSave: onEditingRowSave, // ({row}) => row._valuesCache


    ...rest, // other props that is not handled
    state: {
      isLoading,
      columnOrder,
      columnVisibility,
      columnPinning,
      rowSelection,
      showProgressBars: isLoading || isRefetching,
    },
    initialState: {
      density: (compact)?'compact':'comfortable',
      showColumnFilters: false,
      showGlobalFilter: true,
      pagination: { pageSize: 10, pageIndex: 0 },
    },
  });

  return (
    <MaterialReactTable table={table} />
  );
}

MRTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  initialColumnOrder: PropTypes.array,
  initialColumnVisibility: PropTypes.object,
  initialColumnPinning: PropTypes.object,
  isLoading: PropTypes.bool,
  isRefetching: PropTypes.bool,
  customTopLeftToolbar: PropTypes.func,
  customTopRightToolbar: PropTypes.func,
  customRowActions: PropTypes.func,
  rowActionMenuItems: PropTypes.func,
  onRefresh: PropTypes.func,
  onCellClick: PropTypes.func,
  onRowClick: PropTypes.func,
  onColumnStateChanged: PropTypes.func,
  enableRowSelection: PropTypes.bool,
  onRowSelectionChange: PropTypes.func,
  noExcel: PropTypes.bool,
  compact: PropTypes.bool,
  onCreatingRowSave: PropTypes.func,
  onEditingRowSave: PropTypes.func
}

export default MRTable;