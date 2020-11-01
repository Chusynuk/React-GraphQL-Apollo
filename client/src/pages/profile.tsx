import React from 'react';
import {gql, useQuery} from '@apollo/client';
import { Loading, Header, LaunchTile } from '../components';
import { LAUNCH_TILE_DATA } from './launches';
import { RouteComponentProps } from '@reach/router';
import * as GetMyTripsTypes from './__generated__/GetMyTrips';

export const GET_MY_TRIPS = gql`
  query GetMyTrips {
    me {
      id
      email
      trips {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`


interface ProfileProps extends RouteComponentProps {}

const Profile: React.FC<ProfileProps> = () => {
  const { data, loading, error} = useQuery<GetMyTripsTypes.GetMyTrips>(GET_MY_TRIPS, { fetchPolicy: 'network-only'}); // network-only returns data JUST from the server, any kind of cache data or values
  console.log("\x1b[33m%s\x1b[0m",'data -->', data);
  if (loading) return <Loading />
  if (error) return <p>{error.message}</p>;
  if (!data) return <p>Not found</p>;

  console.log("\x1b[33m%s\x1b[0m",'data -->', data);
  return (
    <React.Fragment>
      <Header>My Trips</Header>
      {data.me && data.me.trips.length ? ( // OR data?.me?.trips?.length
        data.me.trips.map((launch: any) => (
          <LaunchTile ley={launch.id} launch={launch} />
        ))
      ): (
        <p>You haven't booked any trips</p>
      )}
    </React.Fragment>
  )
}

export default Profile;