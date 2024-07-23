import React from 'react'
import { Helmet } from 'react-helmet'

export default function HelmetHead({ title, desc }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={desc || "Edutime Website"} />
    </Helmet>
  )
}
