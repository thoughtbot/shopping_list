import React from 'react'
import { useContent } from '@thoughtbot/superglue'
import { Form, TextField, SubmitButton } from '@javascript/components'
import { useAppSelector } from '@javascript/store'

export default function ShoppingListsShow() {
  const { header, items, newItemForm } = useContent()
  const { form, extras, inputs } = newItemForm

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

      <Form {...form} extras={extras}>
        <TextField {...inputs.name} />
        <SubmitButton {...inputs.submit} />
      </Form>
    </div>
  )
}