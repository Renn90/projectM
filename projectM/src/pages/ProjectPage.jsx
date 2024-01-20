import React from 'react'
import { useParams } from 'react-router-dom'
import Frame from '../components/Frame'

const ProjectPage = () => {
    const params = useParams()
    console.log(params)
  return (
    <div className="relative w-[100%] flex flex-col justify-center p-4 px-8">
        <Frame>
      heres the project page for {params.projectID}
      </Frame>
    </div>
  )
}

export default ProjectPage
