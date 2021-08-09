import Head from 'next/head'
import Layout from '@components/Layout'
import styles from '../styles/Home.module.css'
import { getDataMariachis } from '@helpers/apis'

export default function Home({ mariachis }) {
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Mariachon - serenatas y elegancía en tus eventos.</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {/** 
      Header
       */}

        {/**
      Body
       */}
        {mariachis
          ? mariachis.map((mariachi) => {
              console.log(
                Object.getOwnPropertyNames(mariachi.service_price).sort()
              )
              return (
                <div key={mariachi.mariachiId}>
                  <a>{mariachi.name}</a>
                </div>
              )
            })
          : null}

        {/**
      Footer
       */}

        <style jsx>
          {`
            a {
              color: #000;
            }
          `}
        </style>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  let mariachis = []

  await getDataMariachis()
    .then((data) => {
      mariachis = data
    })
    .catch((error) => {
      console.log(error)
    })

  return {
    props: {
      mariachis,
    },
  }
}
