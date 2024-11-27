import {useEffect, useState} from "react";
import {columnDefs, processData} from "layouts/Template/datatables/mrt/main/tableUtil";
import {dummyData} from "layouts/Template/datatables/mrt/main/data";
import MRTable from "components/MaterialReactTable";

function MainMRT() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [wsLoading, setWsLoading] = useState(false);
  const [columnState, setColumnState] = useState({order:[],pinning:{},visibility: {}});

  const columnStateCallback = async (item) => {
    const state = JSON.stringify(item);
    setColumnState(item);
    // store it if needed
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      setData(processData(dummyData))
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  return (
    <MRTable
      data={data}
      columns={columnDefs}
      isLoading={isLoading}
      isRefetching={wsLoading}
      onRefresh={getData}
      onColumnStateChanged={columnStateCallback}
      initialColumnOrder={columnState.order}
      initialColumnPinning={columnState.pinning}
      initialColumnVisibility={columnState.visibility}
    />
  );
}

export default MainMRT;