
import {gql, useQuery} from '@apollo/client';
import { RouteComponentProps } from '@reach/router';
import React from 'react';
import { Loading, Header, LaunchDetail } from '../components';
import { ActionButton } from '../containers';
import {LAUNCH_TILE_DATA} from './launches';
import * as LaunchDetailsTypes from './__generated__/LaunchDetails';


export const GET_LAUNCH_DETAILS = gql `
  query LaunchDetails($launchId: ID!){
    launch(id: $launchId) {
      site
      rocket {
           type
         }
         ...LaunchTile
      }
    }
    ${LAUNCH_TILE_DATA}
`;


interface LaunchProps extends RouteComponentProps {
  launchId?: any,
}

const Launch: React.FC<LaunchProps> = ({ launchId }) => {
  const { data, loading, error} = useQuery<LaunchDetailsTypes.LaunchDetails, LaunchDetailsTypes.LaunchDetailsVariables>(GET_LAUNCH_DETAILS, { variables: { launchId } });

  if (loading) return <Loading />
  if (error) return <p>{error.message}</p>;
  if (!data) return <p>Not found</p>;

  return (
    <React.Fragment>
      <Header image={data.launch && data.launch.mission && data.launch.mission.missionPatch}>
        {data.launch && data.launch.mission && data.launch.mission.name}
      </Header>
      <LaunchDetail {...data.launch}/>
      <ActionButton  {...data.launch}/>
    </React.Fragment>
  )
};

export default Launch