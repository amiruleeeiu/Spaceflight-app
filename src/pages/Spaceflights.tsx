import { useContext, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
import SpaceFlight from "../components/SpaceFlight";
import Button from "../components/bootstrap/Button";
import Select from "../components/bootstrap/Select";
import { SpaceFlightContext } from "../context/SpaceFlightContext";
import {
  SpaceFlightInterface,
  searchFieldsInterface,
} from "../interfaces/SpaceFlightInterface";
import { dateList, statusList } from "../staticData";

const searchFieldsName: searchFieldsInterface = {
  upcoming: "",
  rocket_name: "",
  launch_date: "",
  launch_status: "",
  page: 1,
};

function Spaceflights() {
  const [spaceflights, setSpaceflights] = useState<SpaceFlightInterface[]>([]);
  const { loader, allSpaceFlights } =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useContext<any>(SpaceFlightContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [searchFields, setSearchFields] =
    useState<searchFieldsInterface>(searchFieldsName);
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    let filteredSpaceflights: SpaceFlightInterface[] | [] = allSpaceFlights;

    const { launch_status, launch_date, upcoming, rocket_name } = searchFields;

    // filter by launch status
    if (launch_status) {
      let success: boolean | undefined;
      if (launch_status === "1") {
        success = false;
      } else if (launch_status === "2") {
        success = true;
      }
      filteredSpaceflights = filteredSpaceflights.filter(
        (i: SpaceFlightInterface) => i?.launch_success === success
      );
    }

    // filter by launch date
    if (launch_date) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let currentDate: any = new Date();

      if (launch_date === "1") {
        currentDate = new Date(currentDate - 7 * 24 * 60 * 60 * 1000);
      } else if (launch_date === "2") {
        currentDate = new Date(currentDate - 30 * 24 * 60 * 60 * 1000);
      } else if (launch_date === "3") {
        currentDate = new Date(currentDate - 365 * 24 * 60 * 60 * 1000);
      }

      filteredSpaceflights = filteredSpaceflights.filter(
        (item: SpaceFlightInterface) => {
          return new Date(item.launch_date_local) >= new Date(currentDate);
        }
      );
    }

    // filter by upcoming
    if (upcoming === true || upcoming === false) {
      filteredSpaceflights = filteredSpaceflights.filter(
        (item: SpaceFlightInterface) => item?.upcoming === upcoming
      );
    }

    // search by rocket name
    if (rocket_name) {
      filteredSpaceflights = filteredSpaceflights.filter(
        (i: SpaceFlightInterface) => {
          if (
            i?.rocket?.rocket_name
              ?.toLowerCase()
              .includes(rocket_name.toLowerCase())
          ) {
            return true;
          } else {
            return false;
          }
        }
      );
    }
    setTotal(filteredSpaceflights.length);
    const startindex = 9 * (currentPage - 1);
    setSpaceflights(filteredSpaceflights.slice(startindex, startindex + 9));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFields, allSpaceFlights]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setSearchFields({ ...searchFields, rocket_name: searchValue, page: 1 });
  };

  const handleEnterSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCurrentPage(1);
    if (e.target.name === "upcoming") {
      setSearchFields({
        ...searchFields,
        [e.target.name]: (e.target as HTMLInputElement).checked,
        page: 1,
      });
    } else {
      setSearchFields({
        ...searchFields,
        [e.target.name]: e.target.value,
        page: 1,
      });
    }
  };

  useEffect(() => {
    if (currentPage) {
      setSearchFields({ ...searchFields, page: currentPage });
      setSearchParams(`page=${currentPage}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    if (search) {
      const params = Object.fromEntries([...searchParams]);
      setCurrentPage(Number(params.page));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let content: null | React.ReactElement | React.ReactElement[] = null;

  if (loader) {
    content = (
      <div className="col-lg-12 my-5 d-flex justify-content-center">
        <div className="spinner-grow text-primary" role="status">
          <span className="visually-hidden" />
        </div>
      </div>
    );
  } else if (spaceflights.length === 0) {
    content = (
      <div className="col-lg-12 my-3 d-flex justify-content-center">
        There is no space flight
      </div>
    );
  } else if (spaceflights.length > 0) {
    content = spaceflights?.map((p, index) => (
      <SpaceFlight product={p} key={index} />
    ));
  }

  return (
    <div className="container my-5">
      <div className="text-center my-5">
        <h3>Spaceflight details</h3>
        <p>Find out the elaborate features of all the past big spaceflights.</p>
      </div>
      <div className="row my-4">
        <div className="col-lg-7 d-flex align-items-center ">
          <div className="d-flex w-75 ">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              onChange={handleSearchChange}
              onKeyDown={handleEnterSearch}
            />
            <Button
              className="btn-primary"
              onClick={handleSearch}
              icon="search"
            />
          </div>
        </div>
        <div className="col-lg-5">
          <div className="my-2 form-check d-flex justify-content-end">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckChecked"
              name="upcoming"
              onChange={handleChange}
            />
            <label className="form-check-label ms-1" htmlFor="flexCheckChecked">
              Show upcoming only
            </label>
          </div>
          <div className="d-flex gap-2">
            <Select
              list={statusList}
              label="By Launch Status"
              name="launch_status"
              onChange={handleChange}
            />
            <Select
              list={dateList}
              label="By Launch Date"
              name="launch_date"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="row">{content}</div>

      <Pagination
        total={total}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <Footer />
    </div>
  );
}

export default Spaceflights;
