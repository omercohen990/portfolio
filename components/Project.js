import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'

// data
import Tools from 'data/tools.json' 

// components
import Tool from 'components/Tool'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'

// styles
const ProjectStyled = styled.div`
  margin: 1em;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  grid-gap: 1em 2em;

  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }

  .title {
    display: flex;
    justify-content: flex-end;

    @media screen and (max-width: 700px) {
      justify-content: flex-start;
    }

    --icon-opacity: .1;
    --icon-x: 0em;

    .title-content {
      
      &:hover, &:focus {
        --icon-opacity: 1;
        --icon-x: .1em;
      }
      
      > h2 {
        text-align: start;
        margin: 0;
      }
      
      > a {
        display: flex;
  
        img {
          margin-top: .05em !important;
          opacity: var(--icon-opacity);
          transform: translateX(var(--icon-x));
          transition: .1s;
        }
      }
    }

  }

  .tools {
    display: flex;
    flex-wrap: wrap;
  }

  .tasks {
    text-align: start;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    list-style: none;
    padding: 0;
    
    @media screen and (max-width: 700px) {
      align-items: flex-start;
    }
    
    li:before {
      content: attr(data-icon);
      margin-right: .5em;
    }
  }
`

export default function Project({ projectData, isClickable }) {

  const { id, name, tools, tasks, images } = projectData
  const router = useRouter()
  
  const handleClick = () => isClickable && router.push(id)

  return (
    <ProjectStyled>
      <div className="title">
        <button className="title-content" onClick={handleClick}>
          <h2>{name}</h2>
          {isClickable && <a>
            <span>project page</span>
            <Image src="/images/general/east.svg" alt="right arrow" height="20" width="20" />
          </a>}
        </button>
      </div>

      <div className="tools">
        {tools.map(toolName => (
          <Tool key={toolName} toolData={Tools.find(tool => tool.name == toolName)} size="1.5em" />
        ))}
      </div>

      <ul className="tasks">
        {tasks.map(task => (
          <li key={task.text} data-icon={task.icon}>{task.text}</li>
        ))}
      </ul>
      
      <Carousel width={480}>
          {images.map(image => (
            <div key={image} style={{ width: 'fit-content' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="project image" />
            </div>
          ))}
      </Carousel>
    </ProjectStyled>
  )
}