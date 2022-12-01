import { useNavigate } from 'react-router-dom'
import {Button, ButtonGroup} from 'react-bootstrap'
import { signOut } from '../../api/auth'


const SignOut = (props) => {
	const { clearUser, user } = props

    const navigate = useNavigate()

    const onSignOut = () => {
		signOut(user)
			.finally(() => navigate('/'))
			.finally(() => clearUser())
    }

    const onCancel = () => {
        navigate('/')
    }

	return (
		<>
            <div className='container-fluid w-50 mt-5 text-center'>
                    <h2>Are you sure you want to sign out?</h2>
                    <small>We hate to see you go...</small><br/>
                    <ButtonGroup className='mt-2'>
                        <Button variant='info' onClick={onSignOut}>
                            Sign Out
                        </Button>
                        <Button variant='outline-info' onClick={onCancel}>
                            Cancel
                        </Button>
                    </ButtonGroup>
            </div>
		</>
	)
}

export default SignOut
