import React from 'react'
import { useContent, unproxy } from '@thoughtbot/superglue'
import { Form, SubmitButton } from '@javascript/components'

const Item = ({ itemRef }) => {
  const {
    name,
    completed,
    detailPath,
    toggleForm,
  } = useContent(itemRef)
    
  return (
    <li>
        {completed ? "✅"  : "❌"}
        <Form {...toggleForm.form} extras={toggleForm.extras} data-sg-remote>
          <SubmitButton {...toggleForm.inputs.submit} />
        </Form>
        {name}
        <a href={detailPath} data-sg-visit>Details</a>
    </li>
  )
}

export default function ItemsList({ itemsRef }) {
  const items = useContent(itemsRef)

  return (
    <ul>
      {unproxy(items).map(itemRef => (
        <Item key={itemRef.__id} itemRef={itemRef} />
      ))}
    </ul>
  )
}