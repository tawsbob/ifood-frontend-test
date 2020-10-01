import React, { useContext } from 'react'
import AppContext from '../../context'
import Field from '../Field'
import './index.css'

function Filter() {
  const Context = useContext(AppContext)
  return (
    <div className="filter-container">
      <input type="text" className="input-search" placeholder="Pesquisar por nome" onKeyUp={Context.filterListByName} />
      {
        Context.filtersConfigs && (
          <div className="custom-filters">
          {
            Context.filtersConfigs && 
            Context.filtersConfigs.map((props)=>(<Field key={props.id} {...props} />))
          }
          <button className="button primary" onClick={Context.setFiltersAndSearch}>Filtrar</button>
        </div>
        )
      }
    </div>
  )
}

export default Filter
