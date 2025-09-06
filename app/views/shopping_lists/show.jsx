import React from 'react'
import { useContent, useStreamSource } from '@thoughtbot/superglue'
import { Form, TextField, SubmitButton } from '@javascript/components'
import { useAppSelector } from '@javascript/store'

export default function ShoppingListsShow() {
  const { header, items, newItemForm, totalCost, streamFromShopping } = useContent()
  const { form, extras, inputs } = newItemForm
  const flash = useAppSelector((state) => state.flash)

  // Subscribe to real-time updates
  const { connected } = useStreamSource(streamFromShopping)

  return (
    <div>
      <h1>{header.title}</h1>
      {flash.notice && <p>{flash.notice}</p>} 
      {flash.alert && <p>{flash.alert}</p>} 

      <div style={{border: '1px solid #ccc', padding: '10px', margin: '10px 0'}}>
        <h3>Total Cost: {totalCost.amount}</h3>
        <small>{totalCost.message}</small>
        <div style={{float: 'right', fontSize: '12px'}}>
          {connected ? '🟢 Live Updates' : '🔴 Connecting...'}
        </div>
      </div>
           
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.completed ? "✅"  : "❌"}
            <Form {...item.toggleForm.form} extras={item.toggleForm.extras} data-sg-remote>
              <SubmitButton {...item.toggleForm.inputs.submit} />
            </Form>
            {item.name}
            <a href={item.detailPath} data-sg-visit>Details</a>
          </li>
        ))}
      </ul>

      <Form {...form} extras={extras} data-sg-remote>
        <TextField {...inputs.name} />
        <SubmitButton {...inputs.submit} />
      </Form>
    </div>
  )
}