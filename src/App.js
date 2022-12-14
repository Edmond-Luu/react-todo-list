import React from "react"
import SubmissionForm from "./SubmissionForm"
import Item from "./Item"
import PinnedItem from "./PinnedItem"
import { nanoid } from "nanoid"
import * as Icon from 'react-bootstrap-icons'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function App() {
  const [fullList, setFullList] = React.useState(JSON.parse(localStorage.getItem("fullList")) || []);
  const [listData, setListData] = React.useState(JSON.parse(localStorage.getItem("listData")) || {
    title: '',
    desc: '',
    category: 'personal',
    id: '',
    edit: false
  })

  const [editData, setEditData] = React.useState(JSON.parse(localStorage.getItem("editData")) || {
    title: '',
    desc: '',
    category: '',
    id: '',
  })

  const [pinnedList, setPinnedList] = React.useState(JSON.parse(localStorage.getItem("pinnedList")) || []);
  const [editMode, setEditMode] = React.useState(JSON.parse(localStorage.getItem("editMode")) || false)

  React.useEffect(() => {
    localStorage.setItem("fullList", JSON.stringify(fullList))
  }, [fullList])

  React.useEffect(() => {
    localStorage.setItem("listData", JSON.stringify(listData))
  }, [listData])

  React.useEffect(() => {
    localStorage.setItem("pinnedList", JSON.stringify(pinnedList))
  }, [pinnedList])

  React.useEffect(() => {
    localStorage.setItem("editData", JSON.stringify(editData))
  }, [editData])

  React.useEffect(() => {
    localStorage.setItem("editMode", JSON.stringify(editMode))
  }, [editMode])


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
      id: '',
      edit: false
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
    setEditMode(false);
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
    for (const item of pinnedList) {
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

  function toggleEditOn(event, updateId) {
    const tempList = fullList
    const tempItem = tempList.find(item => item.id === updateId)
    const updateIndex = tempList.findIndex(item => item.id === updateId);

    setEditMode(!editMode);

    tempList.splice(updateIndex, 1, {
      title: tempItem.title,
      desc: tempItem.desc,
      category: tempItem.category,
      id: tempItem.id,
      edit: !tempItem.edit
    });

    setFullList([...tempList]);

    setEditData({
      title: tempItem.title,
      desc: tempItem.desc,
      category: tempItem.category,
      id: tempItem.id
    });
  }

  function toggleEditOff(event, updateId) {
    const tempList = fullList
    const tempItem = tempList.find(item => item.id === updateId)
    const updateIndex = tempList.findIndex(item => item.id === updateId);

    setEditMode(!editMode);

    tempList.splice(updateIndex, 1, {
      title: tempItem.title,
      desc: tempItem.desc,
      category: tempItem.category,
      id: tempItem.id,
      edit: !tempItem.edit
    });

    setFullList([...tempList]);

    setEditData({
      title: "",
      desc: "",
      category: "",
      id: ""
    });
  }

  function editChange(event) {
    const { name, value } = event.target;
    setEditData(oldData => {
      return {
        ...oldData,
        [name]: value,
        id: nanoid()
      }
    })
  }

  function editSubmit(event, updateId) {
    const theList = fullList
    // const theItem = theList.find(item => item.id === updateId)
    const updateIndex = theList.findIndex(item => item.id === updateId);

    setEditMode(!editMode);

    theList.splice(updateIndex, 1, {
      title: editData.title,
      desc: editData.desc,
      category: editData.category,
      id: editData.id,
      edit: false
    });

    setFullList([...theList]);

    setEditData({
      title: "",
      desc: "",
      category: "",
      id: ""
    });
  }

  function pinAll() {
    setPinnedList(oldList => [...fullList, ...oldList]);
    setFullList([]);
    setEditMode(false);
  }

  function handleOnDragEndUnpinned(result) {
    const items = Array.from(fullList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFullList(items);
  }

  function handleOnDragEndPinned(result) {
    const items = Array.from(pinnedList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPinnedList(items)
  }

  const condStyle = {
    display: fullList.length ? '' : 'none'
  }
  const pinnedStyle = {
    display: pinnedList.length ? '' : 'none'
  }

  // const itemElements = fullList.map(item => {
  //   return (
  //     <Item
  //       title={item.title}
  //       desc={item.desc}
  //       category={item.category}
  //       key={item.id}
  //       id={item.id}
  //       editMode={editMode}
  //       edit={item.edit}
  //       editData={editData}
  //       deleteItem={deleteItem}
  //       pinItem={pinItem}
  //       toggleEditOn={toggleEditOn}
  //       toggleEditOff={toggleEditOff}
  //       editChange={editChange}
  //       editSubmit={editSubmit}
  //     />
  //   )
  // })

  // const pinnedItemElements = pinnedList.map(item => {
  //   return (
  //     <PinnedItem
  //       title={item.title}
  //       desc={item.desc}
  //       category={item.category}
  //       key={item.id}
  //       id={item.id}
  //       deletePinnedItem={deletePinned}
  //       deleteAllPinned={deleteAllPinned}
  //       unpinItem={unpinItem}
  //     />
  //   )
  // })

  return (
    <div className="app">

      <div className="container theGrid">
        <div className="grid1">
          <SubmissionForm
            listData={listData}
            handleChange={handleChange}
            handleClick={handleClick}
            handleClear={handleClear}
          />
          <div className="allPinned">
            <h3 style={pinnedStyle}>Pinned Items <Icon.PinFill /></h3>
            <button type="button" className="btn btn-warning unpinBtn" style={pinnedStyle} onClick={unpinAll}>Unpin All Items</button>
            <button type="button" className="btn btn-danger" style={pinnedStyle} onClick={deleteAllPinned}>Delete All Pinned Items</button>



            <DragDropContext onDragEnd={handleOnDragEndPinned}>
              <Droppable droppableId="pinnedNotes">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {pinnedList.map((item, index) => {
                      return (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided) => (
                            <div className="cardSpacing" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
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
                            </div>
                          )}
                        </Draggable>
                      )
                    })
                    }
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

          </div>
        </div>
        <div className="grid2">
          <h3 style={condStyle}>Todo Items <Icon.ListCheck /></h3>
          <button type="button" className="btn btn-primary unpinBtn" style={condStyle} onClick={pinAll}>Pin All Items</button>
          <button type="button" className="btn btn-danger" style={condStyle} onClick={deleteAll}>Delete All Items</button>

          <DragDropContext onDragEnd={handleOnDragEndUnpinned}>
            <Droppable droppableId="unpinnedNotes">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {fullList.map((item, index) => {
                    return (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <div className="cardSpacing" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                            <Item
                              title={item.title}
                              desc={item.desc}
                              category={item.category}
                              id={item.id}
                              editMode={editMode}
                              edit={item.edit}
                              editData={editData}
                              deleteItem={deleteItem}
                              pinItem={pinItem}
                              toggleEditOn={toggleEditOn}
                              toggleEditOff={toggleEditOff}
                              editChange={editChange}
                              editSubmit={editSubmit}
                            />
                          </div>
                        )}
                      </Draggable>
                    )
                  })
                  }
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

        </div>
      </div>


      <div className="footer">
        <p className="caption">Made completely from scratch with ?????? by <a href="https://edmond-luu.github.io" target="_blank" rel="noreferrer">Edmond Luu</a></p>
      </div>

    </div>
  )
}

export default App;