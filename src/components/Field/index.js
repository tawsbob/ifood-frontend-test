import React, { useContext } from 'react'
import AppContext from '../../context'
import './index.css'

function renderField({id, name, validation}){

  switch (validation.primitiveType) {
    case 'STRING':
      return (
        <> 
        <label>{ name }</label>
        <input type="text" name={name} />
      </>
      )
    case 'INTEGER':

      const max = validation.max || null
      const min = validation.min || null

      return (
          <> 
            <label>{ name }</label>
            <input type="number" name={name}  max={max} min={min} />
          </>
        )
    default:
      break;
  }
}

function renderSelect({ name, values, id, onChange }){
  return (
    <select onChange={(e)=>{ onChange({ name, id, value: values[ e.target.selectedIndex-1 ].value }) }}>
      { name && (<option value={null}>{ name }</option>) }
      { values.map((v)=>(<option key={v.value} value={v.value}>{ v.name }</option>)) }
    </select>
  )
}

function Field({ id, name, values, validation }) {
  const Context = useContext(AppContext)
  return (
    <div className="field">
        { values && renderSelect({ id, name,  values, onChange: Context.changeFilter  }) }
        { validation && renderField({ id, name, validation, onChange: Context.changeFilter  }) }
    </div>
  )
}

export default Field
