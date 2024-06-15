import { useContext } from 'react'
import './header.css'
import { DataContext } from '../../context/DataContext'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

const Nav = () => {
    const { acc, setAcc } = useContext(DataContext)

    const handleLogout = () => {
        setAcc(null)
        localStorage.removeItem('acc')
    }

    return (
        <header className="header">
            <Link to='/' className="nav-logo" style={{ color: "white", textDecoration: "none" }}>LOGO</Link>

            {
                acc ?
                <nav className='account-nav'>
                    <ul className='nav-links'>
                        <li><Link className='nav-link' onClick={handleLogout}>Log Out</Link></li>
                        
                    </ul>
                </nav>
                :
                <nav className='account-nav'>
                    <ul className='nav-links'>
                        <li><Link className='nav-link' to='/register'>Регистрация</Link></li>
                        <li><Link className='nav-link login' to='/login'>Вход</Link></li>
                        <li><HashLink className='nav-link' to='#about-tues'>About tues</HashLink></li>
                    </ul>
                </nav>
            }
        </header>
    )
}

export default Nav