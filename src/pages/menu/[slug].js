import Head from 'next/head';
import { useRouter } from 'next/router';

import Layout from 'components/Layout';
import Footer from 'components/Footer';
import Contacts from 'components/Contact';
import MenuIntro from 'components/MenuIntro';
import VideoIntro from 'components/VideoIntro';
import Gallery from 'components/Gallery';

import { getAllDataWithSlug,getInfoForHome } from 'lib/api';
import chooseByType from 'utils/chooseValueByType';

function Menu({ data, preview }) {
  const {
    query: {slug},
  } = useRouter();

  console.log( 'slug',slug, 'data', data, 'preview', preview );

  return (
    <>
      <Head>
        <title>Next.js Restaurant CMS</title>
        <meta name="description" content="Create template using cosmic.js CMS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout >
        <MenuIntro />
        <Gallery info={chooseByType(data, 'gallery')}/>
      </Layout>
      <Footer>
        <VideoIntro url={chooseByType(data, 'video')}/>
        <Contacts info={chooseByType(data, 'contact')}/>
      </Footer>
    </>
  )
}

export async function getStaticProps({ params, preview = null }) {
  const data = (await getInfoForHome(preview)) || [];
  return {
    props: { data },
  }
}

export async function getStaticPaths() {
  const allData = (await getAllDataWithSlug()) || []
  return {
    paths: allData.map((menu) => `/menu/${menu.slug}`),
    fallback: true,
  }
}

export default Menu;