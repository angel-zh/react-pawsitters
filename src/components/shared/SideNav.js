import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import { faUser, faPaw, faDog, faPlay, faPenToSquare, faRightToBracket, faLock, faCalendarAlt, faBars, faTableColumns, faBone, faStar } from '@fortawesome/free-solid-svg-icons'


const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}
const SideNav = ({ user }) => {
    const { collapseSidebar } = useProSidebar();

    const authenticatedOptions = (
        <>
            <SubMenu icon={<FontAwesomeIcon icon={faUser} size='xl' className='icon' />} label="My Account">
                <MenuItem style={{ backgroundColor: '#6c6e83' }} routerLink={<Link to='dashboard' />}>
                    <FontAwesomeIcon icon={faTableColumns} size='lg' className='icon' />My Dashboard
                </MenuItem>
                <MenuItem style={{ backgroundColor: '#6c6e83' }} routerLink={<Link to='bookings' />}>
                    <FontAwesomeIcon icon={faCalendarAlt} size='lg' className='icon' /> My Bookings
                </MenuItem>
                <MenuItem style={{ backgroundColor: '#6c6e83' }} routerLink={<Link to='reviews' />}>
                    <FontAwesomeIcon icon={faStar} size='lg' className='icon' /> My Reviews
                </MenuItem>
                <MenuItem style={{ backgroundColor: '#6c6e83' }} routerLink={<Link to='change-password' />}>
                    <FontAwesomeIcon icon={faLock} size='lg' className='icon' />Change Password
                </MenuItem>
            </SubMenu>
            <div className='mt-5'>
                <MenuItem routerLink={<Link to='sign-out' />}>
                    <FontAwesomeIcon icon={faRightToBracket} size='xl' className='icon' /> Sign Out
                </MenuItem>
            </div>
        </>
    )

    const unauthenticatedOptions = (
        <div className='mt-5'>
            <MenuItem routerLink={<Link to='sign-up' />}>
                <FontAwesomeIcon icon={faPenToSquare} size='xl' className='icon' /> Sign Up
            </MenuItem>
            <MenuItem routerLink={<Link to='sign-in' />}>
                <FontAwesomeIcon icon={faRightToBracket} size='xl' className='icon' /> Sign In
            </MenuItem>
        </div>
    )
    const alwaysOptions = (


        <>
            <MenuItem routerLink={<Link to='petsitters' />}>
                <FontAwesomeIcon icon={faDog} size='xl' className='icon' /> Find PawSitters
            </MenuItem>
            <SubMenu icon={<FontAwesomeIcon icon={faPlay} size='xl' className='icon' />} label="Getting Started">
                <MenuItem style={{ backgroundColor: '#6c6e83' }} routerLink={<Link to='petsitters/create' />}>
                    <FontAwesomeIcon icon={faPaw} size='lg' className='icon' /> Become a PawSitter
                </MenuItem>
                <MenuItem style={{ backgroundColor: '#6c6e83' }} routerLink={<Link to='petowners/create' />}>
                    <FontAwesomeIcon icon={faBone} size='lg' className='icon' /> Register Pet Owner
                </MenuItem>
            </SubMenu>



        </>
    )

    return (
        <div style={{ display: 'flex', height: '100vh', minHeight: '400px' }}>

            <div className='logo container-fluid pt-3 text-center'>
                <Link to='/' style={linkStyle}>
                    <div className='logo-hover'>
                        <h2><FontAwesomeIcon icon={faPaw} size='sm' /></h2>
                        <h2 className='mt-2'>P</h2>
                        <h2>A</h2>
                        <h2>W</h2>
                        <h2>S</h2>
                        <h2>I</h2>
                        <h2>T</h2>
                        <h2>T</h2>
                        <h2>E</h2>
                        <h2>R</h2>
                        <h2>S</h2>
                    </div>
                </Link>
            </div>

            <Sidebar backgroundColor="#31344b" transitionDuration={800}>
                <button className='grip-lines mt-2 mx-3 btn mb-2' onClick={() => collapseSidebar()}>
                    <FontAwesomeIcon icon={faBars} size='xl' />
                </button>

                <Menu>
                    <div className='px-2'>
                        {user && (
                            <span className='navbar-text mr-2'><i>Welcome, {user.email}</i></span>
                        )}
                    </div>
                    <div className='mt-3'>
                        {alwaysOptions}
                        {user ? authenticatedOptions : unauthenticatedOptions}
                    </div>
                </Menu>
            </Sidebar>
        </div>
    );
}



export default SideNav