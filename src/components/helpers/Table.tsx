import { useMemo, useState, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import gc from "../../utils/gc";

type Column<T> = {
  field: keyof T;
  label: string;
};

type DynamicTableProps<T extends { image?: string }> = {
  data: T[];
  columns: Column<T>[];
};

function DynamicTable<T extends { image?: string }>({ data, columns }: DynamicTableProps<T>) {
  const { t } = useTranslation();
  const [rowsPerPage, setRowsPerPage] = useState<number>(6);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);
  
  const buttons = [
    {
      disable: currentPage === 1,
      command: () => goToPage(1),
      text: '«'
    },
    {
      disable: currentPage === 1,
      command: () => goToPage(currentPage - 1),
      text: '‹'
    },
    {
      disable: currentPage === totalPages,
      command: () => goToPage(currentPage + 1),
      text: '›'
    },
    {
      disable: currentPage === totalPages,
      command: () => goToPage(totalPages),
      text: '»'
    }
  ];

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = currentPage * rowsPerPage;
    return data.slice(start, end);
  }, [data, currentPage, rowsPerPage]);

  const handleChangeRows = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value > 0) {
      setRowsPerPage(value);
      setCurrentPage(1);
    }
  };

  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(totalPages, page));
    setCurrentPage(validPage);
  };

  return (
    <div className="h-full py-5">
      <div className="h-[calc(100%-65px)] bg-white p-4 shadow-card relative z-20 rounded-t-2xl overflow-y-auto">
        <table className="w-full mb-4 border-separate border-spacing-y-2">
          <thead className="bg-[#F8FAFF] h-[56px] border-none sticky">
            <tr>
              {columns.map((col) => (
                <th key={String(col.field)} className="px-4 py-2 text-start text-[#657397] capitalize">
                  {t(col.label)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr key={index} className="group cursor-pointer">
                {columns.map((col, colIndex) => (
                  <td 
                    key={colIndex} 
                    className={`
                      px-4 py-3 bg-white border-y-1 border-[#ECF3FF] group-hover:border-[#A2FFF3] group-hover:bg-primary-light group-hover:text-primary
                      ${colIndex === 0 ? 'border-s-1 ltr:rounded-tl-lg ltr:rounded-bl-lg rtl:rounded-tr-lg rtl:rounded-br-lg' : 
                        colIndex === columns.length - 1 ? 'border-e-1 ltr:rounded-tr-lg ltr:rounded-br-lg rtl:rounded-tl-lg rtl:rounded-bl-lg' : 'border-x-0'}
                    `}
                  >
                    {col.field === 'name' && 'image' in row ? 
                      <div className="flex items-center gap-3">
                        <img className="w-[30px] aspect-square rounded-md object-cover" src={`${gc.baseURL}/${row.image}`} />
                        <span>{String(row[col.field])}</span>
                      </div> : 
                      String(row[col.field])
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="h-[65px] flex items-center justify-between bg-white text-[#919EAB] p-4 gap-2 rounded-b-2xl">
        <div className="flex items-center gap-5">
          <span className="lg:inline-block hidden">{currentPage} - {totalPages} {t('of')} {data.length}</span>
          <div className="flex items-center gap-2">
            <label htmlFor="rowsPerPage" className="lg:block hidden">{t('rows_per_page')}</label>
            <input
              type="number"
              id="rowsPerPage"
              min={1}
              max={data.length}
              value={rowsPerPage}
              onChange={handleChangeRows}
              className="shadow-small-shadow border border-[#F8FAFF] px-2 rounded w-12"
            />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="sm:block hidden">{t('page')} {currentPage} {t('of')} {totalPages}</div>
          <div className="flex items-center gap-1">
            {buttons.map((button, i) => (
              <button 
                key={i}
                onClick={button.command}
                disabled={button.disable}
                className="w-8 h-8 border border-[#D9E3F4] rounded disabled:opacity-50 text-2xl"
              >
                {button.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DynamicTable;