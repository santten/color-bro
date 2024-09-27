import { React, useState, useEffect } from 'react'

const Preview = ({
  yourDark,
  yourPrimary,
  yourAccent,
  yourSecondary,
  yourLight
}) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setIsPreviewOpen(!isPreviewOpen)}>See preview</button>
      {isPreviewOpen &&
        <section style={{ backgroundColor: yourLight, color: yourDark }} 
        className="previewSection">
          <h2 style={{color: yourPrimary}}>This Could Be Your Title Someday</h2>
          <p style={{backgroundColor: yourDark, color: yourLight}}>Maybe this preview isn't even remotely
            close to your website, but it might give an idea on how the colors look together, no?
          </p>
          <h3 style={{color: yourSecondary}}>I guess?</h3>
          <p>Or maybe you aren't making a website altogether, maybe you're making
            <span style={{color: yourPrimary, fontWeight: "bold"}}> something else</span> entirely?
          </p>
          <p>
            Hmm
          </p>
          
        </section>}
    </div>
  )
}

export default Preview