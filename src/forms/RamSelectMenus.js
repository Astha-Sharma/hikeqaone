import React from 'react'
const SelectMenus = () =>
  <div>
     <div className="row">
      <div className="col">
        <form onSubmit={e => e.preventDefault()}>
          <div className="form-group">
            <label>Example multiple select</label>
            <select multiple className="form-control">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
              <option>Option 4</option>
              <option>Option 5</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  </div>
export default SelectMenus
