import { Option, Select } from '@material-tailwind/react'
import React from 'react'

function EditorFileSelector() {
  return (
    <div>
         <Select variant="standard" label="Select File">
        <Option>Material Tailwind HTML</Option>
        <Option>Material Tailwind React</Option>
        <Option>Material Tailwind Vue</Option>
        <Option>Material Tailwind Angular</Option>
        <Option>Material Tailwind Svelte</Option>
      </Select>
    </div>
  )
}

export default EditorFileSelector