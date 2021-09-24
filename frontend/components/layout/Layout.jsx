
import Footer from '../footer/Footer'
import NavBar from '../navbar/NavBar'

export default function Layout({ children }) {
  return (
    <div className="container mx-auto">
      <NavBar/>
      <main className="mt-14">{children}</main>
      <Footer/>
    </div>
  )
}