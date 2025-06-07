import Table from "../../components/helpers/Table"
import { Column, Product } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
const columns: Column<Product>[] = [
  { field: "id", label: "id" },
  { field: "name", label: "name" }
];
function Dashboard() {
    const { isPending, error, data } = useQuery({
        queryKey: ['products'],
        queryFn: () => api.get('Product')
    })
    if (isPending) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message
  return (
    <>
      { data && <Table<Product> data={ data.data } columns={ columns } /> }
    </>
  )
}

export default Dashboard

