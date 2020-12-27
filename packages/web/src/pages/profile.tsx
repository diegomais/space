import { gql, useQuery } from '@apollo/client'
import { Loading, Header, LaunchTile, PageContainer } from '../components'
import * as GetMyTripsTypes from '../lib/apollo/__generated__/GetMyTrips'
import { LAUNCH_TILE_DATA } from './launches'

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
const Profile: React.FC = () => {
  const { data, loading, error } = useQuery<GetMyTripsTypes.GetMyTrips>(
    GET_MY_TRIPS,
    { fetchPolicy: 'network-only' }
  )

  if (loading) {
    return (
      <PageContainer>
        <Loading />
      </PageContainer>
    )
  }
  if (error) return <p>ERROR: {error.message}</p>
  if (data === undefined) return <p>ERROR</p>

  return (
    <PageContainer>
      <Header>My Trips</Header>
      {data.me && data.me.trips.length ? (
        data.me.trips.map((launch: any) => (
          <LaunchTile key={launch.id} launch={launch} />
        ))
      ) : (
        <p>You haven&apos;t booked any trips yet.</p>
      )}
    </PageContainer>
  )
}

export default Profile
