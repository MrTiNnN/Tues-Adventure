import { useContext } from 'react'
import './header.css'
import { DataContext } from '../../context/DataContext'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

const Nav = () => {
    const { refresh, setRefresh, access, setAccess } = useContext(DataContext)

    const handleLogout = () => {
        setRefresh(null)
        setAccess(null)
        localStorage.removeItem('refresh')
        localStorage.removeItem('access')
    }

    return (
        <header className="header">
            <Link to='/' className="nav-logo" style={{ color: "white", textDecoration: "none" }}>LOGO</Link>

            {
                refresh && access ?
                <nav className='account-nav'>
                    <ul className='nav-links'>
                        <li><Link className='nav-link' to='/adventures'>Приключения</Link></li>
                        <li><Link className='nav-link' onClick={handleLogout}>Log Out</Link></li>
                    </ul>
                </nav>
                :
                <nav className='account-nav'>
                    <ul className='nav-links'>
                        <li><Link className='nav-link' to='/register'>Регистрация</Link></li>
                        <li><Link className='nav-link login' to='/login'>Вход</Link></li>
                    </ul>
                </nav>
            }
        </header>
    )
}

export default Nav