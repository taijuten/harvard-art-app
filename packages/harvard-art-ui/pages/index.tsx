// third party
import fetch from 'cross-fetch'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client'
import { Container } from 'react-bootstrap'

// components
import ObjectList from '../components/objectList'

// styles
import styles from './index.module.scss'

const API_URI = process.env['API_URI'] || 'http://localhost:3333'

const client = new ApolloClient({
  link: new HttpLink({ uri: API_URI, fetch }),
  uri: API_URI,
  cache: new InMemoryCache()
})

const Index = () => (
  <ApolloProvider client={client}>
    <div className={styles.page}>
      <Container>
        <header className={styles.header}>
          <h1>Harvard Art UI</h1>
          <h2>Object Browser</h2>
        </header>
        <ObjectList />
      </Container>
    </div>
  </ApolloProvider>
)

export default Index
