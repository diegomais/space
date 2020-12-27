import { gql, useQuery } from '@apollo/client'
import Head from 'next/head'
import { Header, LaunchTile, Loading, PageContainer } from '../components'
import * as GetLaunchListTypes from '../lib/apollo/__generated__/GetLaunchList'

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
`

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
`

const Launches: React.FC = () => {
  const { data, loading, error } = useQuery<
    GetLaunchListTypes.GetLaunchList,
    GetLaunchListTypes.GetLaunchListVariables
  >(GET_LAUNCHES)

  if (loading) {
    return (
      <PageContainer>
        <Loading />
      </PageContainer>
    )
  }

  if (error) return <p>ERROR</p>
  if (!data) return <p>Not found</p>

  return (
    <PageContainer>
      <Head>
        <title>Space Explorer: Launches</title>
      </Head>

      <Header />

      {data.launches?.launches?.map(launch => (
        <LaunchTile key={launch.id} launch={launch} />
      ))}
    </PageContainer>
  )
}
export default Launches
