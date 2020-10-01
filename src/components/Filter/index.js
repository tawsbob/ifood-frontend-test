import React, { useContext } from 'react'
import AppContext from '../../context'
import './index.css'

function Filter() {
  const Context = useContext(AppContext)

  return (
    <div className="filter-container">
      <input type="text" className="input-search" placeholder="Pesquisar por nome" onKeyUp={Context.filterListByName} />
    </div>
  )
}

export default Filter
