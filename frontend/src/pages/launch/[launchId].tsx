import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import {
  ActionButton,
  Header,
  LaunchDetail,
  Loading,
  PageContainer
} from '../../components'
import * as LaunchDetailsTypes from '../../lib/apollo/__generated__/LaunchDetails'
import { LAUNCH_TILE_DATA } from '../launches'

export const GET_LAUNCH_DETAILS = gql`
  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      site
      rocket {
        type
      }
      ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`

const Launch: React.FC = () => {
  const router = useRouter()
  const { launchId } = router.query

  const { data, loading, error } = useQuery<
    LaunchDetailsTypes.LaunchDetails,
    LaunchDetailsTypes.LaunchDetailsVariables
  >(GET_LAUNCH_DETAILS, { variables: { launchId } })

  if (loading) {
    return (
      <PageContainer>
        <Loading />
      </PageContainer>
    )
  }
  if (error) return <p>ERROR: {error.message}</p>
  if (!data) return <p>Not found</p>

  return (
    <PageContainer>
      <Header image={data.launch?.mission?.missionPatch}>
        {data.launch?.mission?.name}
      </Header>
      <LaunchDetail {...data.launch} />
      <ActionButton {...data.launch} />
    </PageContainer>
  )
}

export default Launch
