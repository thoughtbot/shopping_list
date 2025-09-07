import React from 'react'
import { useContent, useStreamSource, unproxy } from '@thoughtbot/superglue'
import ItemsList from '@javascript/components/ItemsList'
import { Form, TextField, SubmitButton } from '@javascript/components'
import { useAppSelector } from '@javascript/store'

export default function ShoppingListsShow() {
  const content = useContent()
  const { header, newItemForm, totalCost, streamFromShopping } = content
  const { form, extras, inputs } = newItemForm
  const flash = useAppSelector((state) => state.flash)

  // Subscribe to real-time updates
  const { connected } = useStreamSource(streamFromShopping)
       
  // Get the raw content and pass fragment reference for items 
  // to prevent parent re-renders
  const itemsRef = unproxy(content).items

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
           
      <ItemsList itemsRef={itemsRef} />

      <Form {...form} extras={extras} data-sg-remote>
        <TextField {...inputs.name} />
        <SubmitButton {...inputs.submit} />
      </Form>
    </div>
  )
}