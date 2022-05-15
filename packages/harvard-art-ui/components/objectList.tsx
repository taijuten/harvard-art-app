// third party
import {
  useQuery,
  gql
} from '@apollo/client'
import { useRouter } from 'next/router'
import { Alert, Col, Row } from 'react-bootstrap'

// components
import { ArtObjectsData, ArtObjectVars } from '../types/artObjects'
import Loading from './loading'
import NavigationButton from './navigationButton'
import ObjectCard from './objectCard'

export const GET_OBJECTS = gql`
  query ArtObjects($page: Int) {
    artObjects(page: $page) {
      creditline,
      id,
      title,
      primaryimageurl,
      rank,
      url
    }
  }
`

const ObjectList = () => {
  const router = useRouter()
  const pageNumber = (typeof router.query.p === 'string' && parseInt(router.query.p)) || 1
  const { loading, error, data } = useQuery<ArtObjectsData, ArtObjectVars>(GET_OBJECTS, {
    variables: {
      page: pageNumber
    }
  })

  if (error) return <Alert variant='danger'>{error.message}</Alert>
  if (loading) return <Loading />

  return (
    <>
      <Row>
        {data.artObjects?.map(({ id, creditline, title, primaryimageurl, rank, url }) => (
          <Col xs={12} md={6} lg={4} key={`object${id}`}>
            <ObjectCard
              credit={creditline}
              image={primaryimageurl}
              rank={rank}
              title={title}
              url={url}
            />
          </Col>
        ))}
      </Row>
      <Row>
        <Col xs={6}>
          <NavigationButton currentPage={pageNumber} />
        </Col>
        <Col xs={6} className='text-end'>
          <NavigationButton currentPage={pageNumber} isNext />
        </Col>
      </Row>
    </>
  )
}

export default ObjectList
