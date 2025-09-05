import React from 'react'
import { useContent } from '@thoughtbot/superglue'

export default function ShoppingListsShow() {
  const { header, items } = useContent()

  return (
    <div>
      <h1>{header.title}</h1>
      
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <input 
              type="checkbox" 
              checked={item.completed}
              readOnly 
            />
            {item.name}
            <a href={item.detailPath}>Details</a>
          </li>
        ))}
      </ul>
    </div>
  )
}