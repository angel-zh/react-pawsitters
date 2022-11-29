import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw, faDog, faBone, faCat, faAlignJustify, faPenToSquare, faRightToBracket, faLock, faCalendarAlt, faUserClock, faTableColumns } from '@fortawesome/free-solid-svg-icons'


const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}
const SideNav = ({ user }) => {
    const { collapseSidebar } = useProSidebar();

    const authenticatedOptions = (
        <>
            <MenuItem routerLink={<Link to='dashboard' />}>
                <FontAwesomeIcon icon={faTableColumns} size='xl' className='icon' />My Dashboard
            </MenuItem>
            <MenuItem routerLink={<Link to='petowners/' />}> Pet Owner </MenuItem>
            <MenuItem routerLink={<Link to='petowners/create' />}> Create Pet Owner </MenuItem>
            <MenuItem routerLink={<Link to='bookings' />}>
                <FontAwesomeIcon icon={faCalendarAlt} size='xl' className='icon' /> My Bookings
            </MenuItem>
            <MenuItem routerLink={<Link to='reviews' />}> My Reviews </MenuItem>
            <div className='mt-5'>
                <MenuItem routerLink={<Link to='change-password' />}>
                    <FontAwesomeIcon icon={faLock} size='xl' className='icon' />Change Password
                </MenuItem>
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
                <FontAwesomeIcon icon={faDog} size='xl' className='icon' /> Find Pet Sitters
            </MenuItem>
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
                    <FontAwesomeIcon icon={faAlignJustify} size='xl' />
                </button>

                <Menu>
                    <div className='px-2'>
                        {user && (
                            <span className='navbar-text mr-2'><i>Welcome, {user.email}</i></span>
                        )}
                    </div>
                    {alwaysOptions}
                    {user ? authenticatedOptions : unauthenticatedOptions}
                </Menu>
            </Sidebar>
        </div>
    );
}



export default SideNav