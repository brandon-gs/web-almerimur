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
import "../Filters/Filters.css";
import { FiltersTypes, saveValueOnSessionStorage } from "src/helpers/filters";
import TableRow from "src/components/TableRow";
import usePrintDiv from "src/hooks/usePrintDiv";
import useVehicles from "src/hooks/useVehicles";
import { OrderCreation } from "src/@types/order";
import useRechanges from "src/hooks/useRechanges";

const FILTERS = [FiltersTypes.vehicle];

const ALL_EMPLOYEES = "Todos los vehículos";

export default function FiltersVehicles() {
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(ALL_EMPLOYEES);
  const [order, setOrder] = useState("");
  const [filter, setFilter] = useState<string>(FILTERS[0]);
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
    filterByVehicle,
    searchWorksByKeyword,
    sortByCreated,
    sortByDateOption,
  } = useWorks(changeLoading);
  const { vehiclesName } = useVehicles(changeLoading);
  const { rechanges } = useRechanges(changeLoading);

  // Change loading
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // on changes
  const onChangeDate = async (value: string) => {
    await filterByVehicle(value);
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
        <form>
          <div className="filters_header">
            <SelectInput
              onChange={onChangeDate}
              value={date}
              items={["Todos los vehículos", ...vehiclesName]}
              placeholder="Tipo de maquina"
              className="input_select"
            />
            <SelectInput
              onChange={onChangeOrder}
              value={order}
              items={[
                OrderCreation.firstPeriod,
                OrderCreation.lastPeriod,
                OrderCreation.firstCreatedAt,
                OrderCreation.lastCreatedAt,
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
        </form>
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
