import { Outlet } from 'react-router-dom'
import styles from './App.module.css'
import Footer from './components/Footer'
import Header from './components/Header'

interface AppProps {
  children?: React.ReactNode,
}

function App(props: AppProps = {}) {
  return (
    <>
      <Header />
      <main className={styles.main}>
        { props.children ? props.children : <Outlet /> }
      </main>
      <Footer />
    </>
  )
}

export default App
