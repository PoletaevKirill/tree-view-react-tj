import ListItem from "./ListItem";
import {useEffect, useReducer} from 'react'
import {StyledUl} from './styles'
import {reducer, initialState} from "./reducer";

/**
 *
 * @param {Object} props
 * @param {Array} props.items
 * @returns {JSX.Element}
 * @constructor
 */
export default function Index(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const listArray = Object.values(props.items || {})
    dispatch({type: 'setList', list: listArray.filter(o => !o.parentId)})
  }, [props.items])

  function toggleList({id}) {
    const index = state.list.findIndex(item => item.id === id)
    const isIdActive = state.active.includes(id)

    if (!isIdActive) {
      const children = Object.values(props.items || {}).filter(o => o.parentId === id)
      dispatch({type: "openList", children, index, id})
      dispatch({type:"addActiveItem", id})
    }

    if (isIdActive) {
      dispatch({type: "cLoseList", index, id})
      dispatch({type:"removeActiveItem", id})
    }
  }

  return (
    <StyledUl>
      {
        state.list.map((item, i) => {
          const children = Object.values(props.items || {}).filter(o => o.parentId === item.id)
          return <ListItem key={item.id}
                           active={state.active.includes(item.id)}
                           click={toggleList}
                           lastItem={!!children.length}
                           item={item}/>
        })
      }
    </StyledUl>
  );
}