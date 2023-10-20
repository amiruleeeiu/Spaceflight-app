function SpaceFlight({ product }) {
  const { mission_name, launch_date_local, rocket, launch_success, links } =
    product;

  return (
    <div className="col-lg-4 col-md-6 col-xs-12 p-0">
      <div className="card m-2 border text-center">
        <div className="card-body">
          <img
            src={links?.mission_patch_small}
            className="img-fluid p-4 mb-2 w-50"
            alt=""
          />
          <p className="mb-2">
            Launch date: {new Date(launch_date_local).toDateString()}
          </p>
          <h5>{mission_name}</h5>
          <p className="mb-3">{rocket?.rocket_name}</p>
          <p>Launch status:</p>
          <span
            className={`badge ${launch_success ? "bg-success" : "bg-danger"}`}
          >
            {launch_success === true
              ? "Success"
              : launch_success === false
              ? "Failed"
              : ""}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SpaceFlight;
