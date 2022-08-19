import React from "react"
import Form from "./Form"
import Item from "./Item"
import PinnedItem from "./PinnedItem"
import { nanoid } from "nanoid"
import * as Icon from 'react-bootstrap-icons'

function App() {
  const [fullList, setFullList] = React.useState(JSON.parse(localStorage.getItem("fullList")) || []);
  const [listData, setListData] = React.useState(JSON.parse(localStorage.getItem("listData")) || {
    title: '',
    desc: '',
    category: 'personal',
    id: ''
  })
  const [pinnedList, setPinnedList] = React.useState(JSON.parse(localStorage.getItem("donList")) || []);

  React.useEffect(() => {
    localStorage.setItem("fullList", JSON.stringify(fullList))
  }, [fullList])

  React.useEffect(() => {
    localStorage.setItem("listData", JSON.stringify(listData))
  }, [listData])

  React.useEffect(() => {
    localStorage.setItem("pinnedList", JSON.stringify(pinnedList))
  }, [pinnedList])


  function handleChange(event) {
    const { name, value } = event.target
    setListData(oldData => {
      return {
        ...oldData,
        [name]: value,
        id: nanoid()
      }
    })
  }

  function handleClick() {
    setFullList(oldList => [listData, ...oldList])
    setListData({
      title: '',
      desc: '',
      category: 'personal',
      id: ''
    })
  }

  function handleClear() {
    setListData({
      title: '',
      desc: '',
      id: ''
    });
  };

  function deleteItem(event, itemId) {
    event.stopPropagation()
    setFullList(oldList => oldList.filter(item => item.id !== itemId));
  }

  function deleteAll() {
    setFullList([]);
  }

  function pinItem(event, pinTitle, pinDesc, pinCategory, itemId) {
    event.stopPropagation()
    setFullList(oldList => oldList.filter(item => item.id !== itemId));
    setPinnedList(oldList => [
      {
        title: pinTitle,
        desc: pinDesc,
        category: pinCategory,
        id: itemId
      },
      ...oldList])
  }

  function deletePinned(event, itemId) {
    event.stopPropagation()
    setPinnedList(oldList => oldList.filter(item => item.id !== itemId));
  }

  function deleteAllPinned() {
    setPinnedList([]);
  }

  function unpinItem(event, unpinTitle, unpinDesc, unpinCategory, itemId) {
    event.stopPropagation()
    setPinnedList(oldList => oldList.filter(item => item.id !== itemId));
    setFullList(oldList => [
      {
        title: unpinTitle,
        desc: unpinDesc,
        category: unpinCategory,
        id: itemId
      },
      ...oldList])
  }
  
  function unpinAll() {
    for (const item of pinnedList){
      setFullList(oldList => [
        {
          title: item.title,
          desc: item.desc,
          category: item.category,
          id: item.id
        },
        ...oldList])
    }
    setPinnedList([]);
  }


  const condStyle = {
    display: fullList.length ? '' : 'none'
  }
  const pinnedStyle = {
    display: pinnedList.length ? '' : 'none'
  }

  const itemElements = fullList.map(item => {
    return (
      <Item
        title={item.title}
        desc={item.desc}
        category={item.category}
        key={item.id}
        id={item.id}
        deleteItem={deleteItem}
        pinItem={pinItem}
      />
    )
  })

  const pinnedItemElements = pinnedList.map(item => {
    return (
      <PinnedItem
        title={item.title}
        desc={item.desc}
        category={item.category}
        key={item.id}
        id={item.id}
        deletePinnedItem={deletePinned}
        deleteAllPinned={deleteAllPinned}
        unpinItem={unpinItem}
      />
    )
  })

  return (
    <div className="container theGrid">
      <div className="grid1">
        <Form
          listData={listData}
          handleChange={handleChange}
          handleClick={handleClick}
          handleClear={handleClear}
        />
        <div className="allPinned">
          <h3 style={pinnedStyle}>Pinned Items <Icon.PinFill/></h3>
          <button type="button" className="btn btn-warning unpinBtn" style={pinnedStyle} onClick={unpinAll}>Unpin All Items</button>
          <button type="button" className="btn btn-danger" style={pinnedStyle} onClick={deleteAllPinned}>Delete All Pinned Items</button>
          {pinnedItemElements}
        </div>
      </div>
      <div className="grid2">
        <p className="caption">Made completely from scratch with ❤️ by <a href="https://edmond-luu.github.io" target="_blank" rel="noreferrer">Edmond Luu</a></p>
        <h3 style={condStyle}>Todo Items <Icon.ListCheck/></h3>
        <button type="button" className="btn btn-danger" style={condStyle} onClick={deleteAll}>Delete All Items</button>
        {itemElements}
      </div>
    </div>
  )
}

export default App;
