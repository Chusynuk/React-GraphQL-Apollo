import React, { Fragment }  from 'react';
import { RouteComponentProps } from '@reach/router';
import { gql, useQuery } from '@apollo/client'
import * as GetLaunchListTypes from './__generated__/GetLaunchList';
import {Header, LaunchTile, Loading} from '../components';

export const LAUNCH_TILE_DATA = gql`
  fragment LaunchTile on Launch {
    __typename
    id
    isBooked
    rocket {
      id
      name
    }
    mission {
      name
      missionPatch
    }
  }
`;

export const GET_LAUNCHES = gql`
    query GetLaunchList($after: String) {
      launches(after: $after) {
        cursor
        hasMore
        launches {
          ...LaunchTile
        }
      }
    }
    ${LAUNCH_TILE_DATA}
`;

interface LaunchesProps extends RouteComponentProps {}

const Launches: React.FC<LaunchesProps> = () => {
  const { data, loading, error } = useQuery<GetLaunchListTypes.GetLaunchList, GetLaunchListTypes.GetLaunchListVariables>(GET_LAUNCHES);

  if (loading) return <Loading />;
  if (error) return  <p>ERROR</p>;
  if (loading) return <p>Not Found</p>;

  return(
    <React.Fragment>
      <Header />
      {
        data?.launches?.launches &&
        data?.launches.launches.map((launch: any) => <LaunchTile key={launch.id} launch={launch} />
        )
      }
    </React.Fragment>
  )
}

export default Launches;
