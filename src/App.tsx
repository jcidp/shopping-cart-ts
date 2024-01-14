import styles from './App.module.css'
import Router from './Router'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <main className={styles.main}>
        <Router />
      </main>
      <Footer />
    </>
  )
}

export default App
