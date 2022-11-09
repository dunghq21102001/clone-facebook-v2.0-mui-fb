import { Box } from '@mui/material'
import React from 'react'
import Header from '../components/Header'
import MessageBox from '../components/MessageBox'
import MessageList from '../components/MessageList'

function Message() {
  return (
    <>
      <Header />
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', paddingTop: '100px' }}>
        <Box sx={{ width: '30%', borderRight: '1px solid #9f9f9f' }}>
          <MessageList />
        </Box>
        <Box sx={{ width: '69%' }}>
          <MessageBox />
        </Box>
      </Box>
    </>
  )
}

export default Message