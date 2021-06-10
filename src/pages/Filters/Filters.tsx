import { LegacyRef, useEffect, useState } from "react";
import {
  DownloadExcel,
  Input,
  Loader,
  SelectInput,
  Sidebar,
  TableRowWork,
} from "src/components";
import Alert, { StateAlert } from "src/components/Alert/Alert";
import useWorks from "src/hooks/useWorks";
import "./Filters.css";
import { FiltersTypes, saveValueOnSessionStorage } from "src/helpers/filters";
import TableRow from "src/components/TableRow";
import usePrintDiv from "src/hooks/usePrintDiv";
import { OrderCreation } from "src/@types/order";
import useRechanges from "src/hooks/useRechanges";

const FILTERS = ["Ver todo"];

export default function Filters() {
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState("Ver todo");
  const [order, setOrder] = useState("");
  const [filter, setFilter] = useState(FILTERS[0]);
  const [serverError, setServerError] = useState<StateAlert>({
    message: "",
    type: "success",
    show: false,
  });

  const changeLoading = (value: boolean) => setIsLoading(value);

  // Hooks
  const { tableRef, print } = usePrintDiv();
  const {
    works,
    filterWorksByDate,
    sortByCreated,
    sortByDateOption,
    searchWorksByKeyword,
  } = useWorks(changeLoading);
  const { rechanges } = useRechanges(changeLoading);
  // Const
  const NO_FILTER = ["Ver todo"];

  const currentOptions = NO_FILTER;

  // Change loading
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // on changes
  const onChangeDate = async (value: string) => {
    if (filter === FiltersTypes.periods) {
      await filterWorksByDate(value);
    }
    saveValueOnSessionStorage("date", value);
    setDate(value);
  };
  const onChangeOrder = async (value: string) => {
    saveValueOnSessionStorage("order", value);
    if (value === OrderCreation.firstCreatedAt) {
      await sortByCreated("asc");
    } else if (value === OrderCreation.lastCreatedAt) {
      await sortByCreated("des");
    } else if (value === OrderCreation.firstPeriod) {
      await sortByDateOption("asc");
    } else if (value === OrderCreation.lastPeriod) {
      await sortByDateOption("des");
    }
    setOrder(value);
  };
  const onChangeFilter = (value: string) => {
    if (value === "Sin filtro") {
      saveValueOnSessionStorage("filter", "");
      setFilter("");
    }
    saveValueOnSessionStorage("filter", value);
    setFilter(value);
  };

  // Alert close
  const onCloseAlert = () =>
    setServerError({ message: "", type: "danger", show: false });

  return (
    <div className="page">
      {isLoading && <Loader />}
      <Alert
        show={serverError.show}
        message={serverError.message}
        type={serverError.type}
        onClose={onCloseAlert}
      />
      <Sidebar />
      <main className="panel">
        <div className="filters_header">
          <SelectInput
            onChange={onChangeDate}
            value={date}
            items={currentOptions}
            placeholder="Filtros"
            className="input_select"
          />
          <SelectInput
            onChange={onChangeOrder}
            value={order}
            items={[
              OrderCreation.firstPeriod,
              OrderCreation.lastPeriod,
              OrderCreation.lastCreatedAt,
              OrderCreation.firstCreatedAt,
            ]}
            placeholder="Ordenar"
            className="input_select"
          />
          <SelectInput
            onChange={onChangeFilter}
            value={filter}
            placeholder="Filtrar por"
            disabled
            items={FILTERS}
            className="input_select"
          />
          <Input
            type="text"
            name="search"
            onChange={(e) => searchWorksByKeyword(e.target.value)}
            placeholder="Buscar keyword"
            containerClassName="input_search"
          />
        </div>
        <div className="border"></div>
        <div className="table" ref={tableRef as LegacyRef<HTMLDivElement>}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "16px 16px",
            }}
          >
            <input style={{ marginRight: 24 }} type="checkbox" disabled />
            <TableRow>Tipo de usuario</TableRow>
            <TableRow>Nombre</TableRow>
            <TableRow>Periodo</TableRow>
            <TableRow>Maquinaria</TableRow>
            <TableRow>Proyecto</TableRow>
            <TableRow>Cliente</TableRow>
            <TableRow width={100}>Precio</TableRow>
          </div>
          <div className="border"></div>
          {works.map((work, index) => (
            <TableRowWork
              key={`work-${index}`}
              {...work}
              rechanges={rechanges}
            />
          ))}
        </div>
        <div className="button_container" style={{ width: "100%" }}>
          <button type="button" onClick={print} className="button mr-7">
            Imprimir
          </button>
          <DownloadExcel works={works} rechanges={rechanges} />
        </div>
      </main>
    </div>
  );
}
