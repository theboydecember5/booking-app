import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './navbar.css'


const Navbar = () => {

    const { user } = useContext(AuthContext)

    return (
        <div className='navbar'>
            <div className='navContainer' >

                <Link to='/' >
                    <span className='logo' style={{ textDecoration: 'none', color: 'white' }}>
                        Vinhdev Booking
                    </span>
                </Link>

                {user
                    ?
                    <p>
                        Welcome {user.username}
                    </p>
                    :
                    (<div className='navItems'>
                        <button className='navButton'>Register</button>
                        <button className='navButton'>Login</button>
                    </div>)
                }

            </div>
        </div>
    )
}

export default Navbar