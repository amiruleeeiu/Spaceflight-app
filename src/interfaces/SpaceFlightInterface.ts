export interface SpaceFlightInterface {
  mission_name: string;
  launch_date_local: string;
  rocket: {
    rocket_name: string;
  };
  upcoming: boolean;
  launch_success: boolean | null;
  links: {
    mission_patch_small: string | undefined;
  };
}

export interface SpaceFlightPropsType {
  product: SpaceFlightInterface;
}

export interface SpaceFlightContextType {
  allSpaceFlights: SpaceFlightInterface[];
  loader: boolean;
}

export interface searchFieldsInterface {
  upcoming: boolean | string;
  rocket_name: string;
  launch_date: string;
  launch_status: string;
  page: number;
}
