import styles from './App.module.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './components/Home'

function App() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Home />
      </main>
      <Footer />
    </>
  )
}

export default App
