import { useContext } from 'react'
import './header.css'
import { DataContext } from '../../context/DataContext'
import { Link } from 'react-router-dom'

const Nav = () => {
    const { acc, setAcc } = useContext(DataContext)

    const handleLogout = () => {
        setAcc(null)
        sessionStorage.removeItem('acc')
    }

    return (
        <header className="header">
            <p className="nav-logo">LOGO</p>

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
                    </ul>
                </nav>
            }
        </header>
    )
}

export default Nav