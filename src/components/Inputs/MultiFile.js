import React from 'react'

const MultiFile = ({setImageFiles}) => {
  return (
      <div>
        <input type="file" multiple onChange={(e) => setImageFiles(e.target.files)} />       
      </div>
  )
}

export default MultiFile