import { Box } from "@mui/material"
import Header from "./components/Header"
import Rightbar from "./components/Rightbar"
import Feed from "./pages/Feed"

function App() {


  return (
    <Box sx={{ width: '100%' }}>
      <Header />
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '140px 0 0 0' }}>
        <Box sx={{ width: '20%', position: 'fixed', top: '60px', left: 0, display: { xs: 'none', sm: 'block' } }}>
          <Rightbar />
        </Box>
        <Box sx={{ width: { xs: '90%', sm: '55%' }, margin: '0 auto' }}>
          <Feed />
        </Box>
        <Box sx={{ width: '20%', position: 'fixed', top: '60px', right: 0, display: { xs: 'none', sm: 'block' } }}>
          ben trai
        </Box>
      </Box>
    </Box>
  )
}

export default App
