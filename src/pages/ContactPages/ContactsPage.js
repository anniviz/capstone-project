import styled from 'styled-components/macro'
import ContactGroup from '../../components/ContactGroup'

export default function ContactsPage() {
  const contacts = [
    { id: '1', name: 'Kinderklinik', content: 'Tel: 01234-56789111' },
    { id: '2', name: 'Apotheke', content: 'Tel: 01234-787878' },
    { id: '3', name: 'Hausarzt', content: 'Tel: 01234-666777999' },
    { id: '4', name: 'Zahnarzt', content: 'Tel: 01221-999991' },
  ]

  return (
    <Flexbox>
      {contacts.map(({ id, name, content }) => (
        <ContactGroup key={id} name={name} content={content} />
      ))}
    </Flexbox>
  )
}

const Flexbox = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  overflow-y: auto;
  gap: 20px;
`
