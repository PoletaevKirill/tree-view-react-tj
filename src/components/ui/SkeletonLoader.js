import styled from 'styled-components'
import skeletonListPattern from "../../config/skeletonListPattern";

export default function SkeletonLoader(props) {
  // @todo- разобарться как валидировать props и прокинуть pattern
  // Можно было сделать проще, например svg или просто просичитать все стилями или DOM построить
  // Но мне надо было хоть чуть-чуть разобраться со 'styled-component'
  const pattern = [...skeletonListPattern]

  const backgroundImage = pattern.map(({height}) => {
    return `linear-gradient(var(--primary-color) ${height}, transparent 10px)`
  }).join(',')

  const backgroundPosition = pattern.map(({spacerHeight, positionX}, index) => {
    return `${positionX} ${(spacerHeight * index) * 2}px` //x , y
  }).join(',')

  const backgroundSize = pattern.map(({width, height}, index) => {
    return `${width} ${height}` //x , y
  }).join(',')

  const SkeletonLoader = styled.div`
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-image: ${backgroundImage};
    background-position: ${backgroundPosition};
    background-size: ${backgroundSize};
  }

  @keyframes shine {
    to {
      background-position: 100% 0;
    }
  `
  return (
    <SkeletonLoader></SkeletonLoader>
  )
}