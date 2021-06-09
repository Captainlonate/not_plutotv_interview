import React, { useState, useMemo, memo } from "react";
import ReactDOM from "react-dom";
import CATEGORIES from "./categories";
import CHANNELS from "./channels";
import "./styles.scss";
// const defaultCategoryID = "5c12fe491cbd932b678e3d84";

// Step 1: render list of all categories in the left column
// a) display the category name and/or image

// Step 2: render list of all channels in the right column
// a) display the channel name
// b) display the channel number

// Step 3: onClick of a category filters the list of channels (associated with CategoryID)
// a) add state for a selected category
// b) create a filtered list based on the associated category
// c) if no channels are associated display 'no channels availible'

// If time allows...
// Step 3: allow user to favorite a channel
//         which will create a favorite category if it does not exist.

// EXAMPLE CATEGORY OBJECT
// "5c12fe491cbd932b678e3d76": {
//   id: "5c12fe491cbd932b678e3d76",
//   name: "Chill Out",
//   images: {
//     svgImage: {
//       defaultWidth: 90,
//       defaultHeight: 90,
//       url:
//         "https://images.pluto.tv/channelcategory/5c12fe491cbd932b678e3d76/ChillOut-1550594973008.svg"
//     }
//  }
// },
// ------ CATEGORY COMPONENT ------------
const Category = ({ name, image, onClick, isActive, isFavorite, onFavorite }) => {
  // Note: I would normally be using styled-components, not scss
  const categoryClasses = `category ${isActive ? 'category--active' : ''}`
  const favoriteClasses = `category__favorite-btn ${isFavorite ? 'category__favorite-btn--active' : ''}`

  return (
    <div className={categoryClasses} onClick={onClick}>
      <div className='category__img'>
        <img alt='category icon' src={image.url} />
      </div>
      <div className='category__label'>{name}</div>
      {/* The presence of an 'onFavorite' function determines
        if a 'Favorite' button should show */}
      {
        (typeof onFavorite === 'function')
          ? <div className={favoriteClasses} onClick={onFavorite}>Favorite!</div>
          : null
      }
    </div>
  );
};
// -------- END

// EXAMPLE CHANNEL OBJECT
// "5d4db961034718b2f52f9e52": {
//   id: "5d4db961034718b2f52f9e52",
//   slug: "pluto-tv-007",
//   categoryID: "5c12fe491cbd932b678e3d84",
// ------ CHANNEL COMPONENT ------------
const Channel = ({ name, number }) => {
  return (
    <div className="cards-container">
      <div className="card">
        <div className="container">
          {name} - {number}
        </div>
      </div>
    </div>
  );
};

/*
  File: utils.js
    Utilities - I kept them in the same file so it's easier for you to see what I've done
*/
// Converts an object to an array of it's values
const getValuesFromObj = (obj) => Object.values(obj)
// Generic filter function
const filterBy = (key) => (needle, list) => list.filter((item) => item[key] && item[key] === needle)
// Specialized filter function for 'categoryID'
const filterByCatId = filterBy('categoryID')
// Generic Sorting function for objects (does not modify original array)
const sortObjectsByKeyAsc = (key) => (list) => (
  [...list].sort((a, b) => a[key].localeCompare(b[key]))
)
// Specialized sorting function for objects with key 'name'
const sortObjectsByName = sortObjectsByKeyAsc('name')

/*
  File: ChannelsList.jsx
*/
// memo:Prevent re-render, even if parent does
const NoChannelsMessage = memo(() => (
  <div className='Channel__None'>
    No Channels Available
  </div>
))

const mapChannelObjToChannel = ({ id, number, name }) => (
  <Channel { ...{key: id, number, name} } />
)

const ChannelsList = ({ channels }) => (
  channels.length
    ? channels.map(mapChannelObjToChannel)
    : <NoChannelsMessage />
)

/*
  File: CategoriesList.jsx
*/
const CategoriesList = ({ categories, onClickCategory, activeId, favoriteCat, onClickFavorite }) => {
  const categoriesJSX = categories.map((cat) => (
    <Category
      name={cat.name}
      image={cat.images.pngImage}
      key={cat.id}
      onClick={onClickCategory(cat.id)}
      onFavorite={onClickFavorite(cat)}
      isActive={activeId === cat.id}
      isFavorite={favoriteCat && favoriteCat.id === cat.id}
    />
  ))

  // If there is a favorite category selected, it should appear at the top of the
  // categories list (first one).
  if (favoriteCat) {
    categoriesJSX.unshift(
      <Category
        name={`Favorite Category (${favoriteCat.name})`}
        image={favoriteCat.images.pngImage}
        key='user-favorite-category'
        onClick={onClickCategory(favoriteCat.id)}
        isActive={activeId === favoriteCat.id}
      />
    )
  }

  return (categories.length) ? categoriesJSX : <div>No Categories</div>
}

/*

*/
const App = () => {
  // All raw categories and channels, but as an array, rather than object, and
  // pre-sorted by their names alphabetically
  const allCategories = useMemo(() => sortObjectsByName(getValuesFromObj(CATEGORIES)), [])
  const allChannels = useMemo(() => sortObjectsByName(getValuesFromObj(CHANNELS)), [])
  // Which channels are currently being displayed (initially, all of them)
  const [filteredChannels, setFilteredChannels] = useState(allChannels)
  // Which category should visually appear as selected, and be used for filtered channels
  const [activeCatId, setActiveCategoryId] = useState(null)
  // The category object that represents their favorite category, or null
  const [favoriteCategory, setFavoriteCategory] = useState(null)

  const handleCategoryChoice = (id) => () => {
    // Toggle the active category by clicking it again...
    const isAlreadyTheActiveCategory = activeCatId === id
    if (isAlreadyTheActiveCategory) {
      setActiveCategoryId(null)
      setFilteredChannels(allChannels)
    } else {
      setActiveCategoryId(id)
      setFilteredChannels(filterByCatId(id, allChannels))
    }
  }

  const handleNewFavoriteCategory = (newFavoriteCategory) => (e) => {
    e.stopPropagation()
    setFavoriteCategory(newFavoriteCategory)
  }

  return (
    <div className="app-container">
      <header>
        <span>Welcome to the </span>
        <img
          src="http://pluto.tv/assets/images/logo-new-colored.svg"
          alt="pluto-logo"
        />
        <span> code challenge!</span>
      </header>
      <div className="content-container">
        <section className="categories-container">
          <h3>Categories</h3>
          <CategoriesList
            categories={allCategories}
            onClickCategory={handleCategoryChoice}
            activeId={activeCatId}
            favoriteCat={favoriteCategory}
            onClickFavorite={handleNewFavoriteCategory}
          />
        </section>
        <section className="channels-container">
          <h3>Channels</h3>
          <ChannelsList channels={filteredChannels} />
        </section>
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
