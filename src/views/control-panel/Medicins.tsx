import Table from "../../components/helpers/Table"
import { Column, Drug } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
const columns: Column<Drug>[] = [
  { field: "id", label: "id" },
  { field: "name", label: "name" }
];
function Medicins() {
    const { isPending, error, data: drugs } = useQuery({
        queryKey: ['drugs', 'list'],
        queryFn: () => api.get('Drug')
    })
    if (isPending) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message
  return (
    <>
      { drugs && <Table<Drug> data={ drugs.data } columns={ columns } /> }
    </>
  )
}

export default Medicins

