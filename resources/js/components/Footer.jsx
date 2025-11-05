import React from 'react'

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#111', color: 'white', textAlign: 'center',
      padding: '1rem', marginTop: '2rem'
    }}>
      <p>© {new Date().getFullYear()} ZEK Sport. Tous droits réservés.</p>
    </footer>
  )
}
