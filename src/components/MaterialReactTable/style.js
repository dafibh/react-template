export const muiTablePaperProps = {
  elevation: 1,
  sx: {
    borderRadius: 2,
    paddingBottom: 2,
  },
};
export const muiFilterTextFieldProps = {
  sx: {
    m: 0,
    width: "100%",
    p: 0,
    height: "90%",
  },
};
export const muiTopToolbarProps = {
  sx: (theme) => ({
    transition: "all 350ms ease-out",
    color: theme.palette.text.main,
  }),
};
export const muiBottomToolbarProps = {
  sx: (theme) => ({
    transition: "all 350ms ease-out",
    color: theme.palette.text.main,
  }),
};
export const muiPaginationProps = {
  shape: "circular",
  showRowsPerPage: true,
  SelectProps: {
    sx: (theme) => ({
      color: theme.palette.text.main,
    }),
  },
  sx: (theme) => ({
    "& .MuiPaginationItem-root": {
      color: theme.palette.text.main,
      fontSize: 14,
    },
    "& .MuiPaginationItem-root.Mui-selected": {
      color: theme.palette.white.main,
      backgroundColor: theme.palette.info.main,
    },
  }),
};

export const muiTableHeadProps = () => ({
  sx: (theme) => ({
    px: 2,
    color: theme.palette.text.main,
    fontWeight: "bold",
    fontSize: "14px",
    transition: "all 350ms ease-out",
    ".MuiTableSortLabel-icon": {
      color: theme.palette.text.main + "!important",
    }
  }),
});
export const muiSearchTextFieldProps = ({ table }) => ({
  placeholder: table.getPrePaginationRowModel().rows.length
    ? `Search ${table.getPrePaginationRowModel().rows.length} rows`
    : "Search",
});

export const muiLinearProgressProps = ({ isTopToolbar }) => ({
  color: "info",
  sx: {
    display: isTopToolbar ? "block" : "none",
  },
});



