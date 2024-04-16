// index.tsx
import React, { useEffect, useState } from 'react'
// import { GetServerSideProps } from 'next'
import Head from 'next/head'
import {
  shouldIDeploy,
  shouldIDeployFavIcon,
  getBaseUrl
} from '../helpers/constants'
import Time from '../helpers/time'
import Widget from '../component/widget'
import Footer from '../component/footer'
import Router from 'next/router'

interface IPage {
  tz: string
  now: { timezone: string; customDate: string }
  initialReason: string
}

const Page: React.FC<IPage> = ({}) => {
  const [timezone, setTimezone] = useState<string>('America/Sao_Paulo')
  const [now, setNow] = useState<any>(new Time())

  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          href={shouldIDeployFavIcon(now)}
          sizes="32x32"
        />
        <meta property="og:image" content={`${getBaseUrl()}/api/og`} />
        <title>Should I Give Kudos today?</title>
      </Head>
      <div className={`wrapper ${!shouldIDeploy(now) && 'its-friday'}`}>
        <Widget reason={'a'} now={now} />
        <div className="meta">
          <Footer timezone={timezone} changeTimezone={() => {}} />
        </div>
      </div>
    </>
  )
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   let timezone = Array.isArray(context.query.tz)
//     ? context.query.tz[0] ?? Time.DEFAULT_TIMEZONE
//     : context.query.tz || Time.DEFAULT_TIMEZONE

//   if (!Time.zoneExists(timezone)) {
//     timezone = Time.DEFAULT_TIMEZONE
//   }

//   const time = Time.validOrNull(timezone)

//   return {
//     props: {
//       tz: timezone,
//       now: time ? time.toObject() : null
//     }
//   }
// }

export default Page
