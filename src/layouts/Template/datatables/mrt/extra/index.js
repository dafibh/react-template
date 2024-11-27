import {useEffect, useState} from "react";
import {columnDefs, processData} from "./tableUtil";
import {dummyData} from "./data";
import MRTable from "components/MaterialReactTable";
import {setSBContent, setSBOpen, useSBController} from "context/snackbar";
import DeleteButton from "components/MaterialReactTable/components/DeleteButton";
import MDBox from "components/MDBase/MDBox";
import MDButton from "components/MDBase/MDButton";
import Icon from "@mui/material/Icon";
import MDTypography from "components/MDBase/MDTypography";

function ExtraMRT() {
  const [sb_controller, sb_dispatch] = useSBController();
  const {content} = sb_controller;

  const [data, setData] = useState([]);
  const [isDeleting, setDeleting] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setData(processData(dummyData))
    } catch (e) {
      console.error(e);
    }
  }

  const handleSB = (newState) => {
    setSBContent(sb_dispatch, {
      ...content,
      ...newState
    })
    setSBOpen(sb_dispatch,true)
  }

  const handleDelete = async (item) => {
    const newList = data.filter((e)=> e.id !== item);
    setData(newList);
    handleSB({
      color: "success",
      icon: "check",
      title: "Success",
      content: "Endpoint Deleted"
    });
  }

  const handleEdit = async ({ table, row, values }) => {
    const id = row.original.id
    const newList = data.map(item => item.id === id ? {id:id, ...values} : item)
    setData(newList)
    handleSB({
      color: "success",
      icon: "check",
      title: "Success",
      content: "Endpoint Updated"
    });
    table.setEditingRow(null)
  }

  const handleCreate = async ({ values }) => {
    setData([...data, {id:Date.now(), ...values}])
    handleSB({
      color: "success",
      icon: "check",
      title: "Success",
      content: "Endpoint Created"
    });
  }

  return (
    <MRTable
      enableColumnFilterModes={false}
      enableHiding={false}
      enableGrouping={false}
      enableColumnOrdering={false}
      enableColumnPinning={false}
      noExcel
      compact
      data={data}
      columns={columnDefs}
      onRefresh={getData}
      onEditingRowSave={handleEdit}
      onCreatingRowSave={handleCreate}
      rowActionMenuItems={({row, closeMenu})=>[
        <DeleteButton
          key="delete"
          isDeleting={isDeleting}
          onUnmount={()=>{setDeleting(false);}}
          onClick={() => {
            if (isDeleting) {
              setDeleting(false);
              closeMenu();
              handleDelete(row.original.id);
            } else {
              setDeleting(true);
            }
          }}
        />
      ]}
      customTopLeftToolbar={()=>{
        return <MDTypography variant="h4" pl={1} pb={1}>Extra Inputs</MDTypography>
      }}

      customTopRightToolbar={(table)=>{
        return (
          <MDBox sx={{margin:"0 0.5rem 1rem 0"}} >
            <MDButton onClick={()=>{table.setCreatingRow(true)}} variant="contained" color="info">
              <Icon>add</Icon>&nbsp; Add
            </MDButton>
          </MDBox>
        )
      }}
    />
  );
}

export default ExtraMRT