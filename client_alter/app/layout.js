
import { Inter } from 'next/font/google'
import './globals.css'
import NavigationBar from './component/navigation';
import Footer from './component/footer';


const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  return (
    <html className="container" lang="ko">
      <body className={inter.className}> 
      <NavigationBar/>
      {children}</body>
      <div style={{border:'0.5px solid #ddd',marginTop:'200px'}}></div>
      <Footer/>
    </html>
  )
}
