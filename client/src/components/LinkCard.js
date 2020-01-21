import React from 'react'

export const LinkCard = ({link}) => {
  return (
      <>
        <h1>Link</h1>
          <p>Your link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
          <p>from: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
          <p>number of clicks on the link: <strong>{link.clicks}</strong></p>
          <p>creation date: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
       </>
  )
}
