import React from 'react'

const Home = (props) => {

	return (
		<>
			<div className="homepage">
				<h1 className="page-heading">Welcome to the PawSitters!</h1>
				<h3>We are dedicated to making sure pawrents can conveniently connect with our pawsitters to find care for their beloved pets.</h3>
				<img src="https://i.imgur.com/NPgfqZb.jpg" alt="dog"></img>
				<img src="https://i.imgur.com/vF1rrlJ.jpg" alt="cat"></img>
				<img src="https://i.imgur.com/7ofQ8oe.jpg?2" alt="bird"></img>
				<img src="https://i.imgur.com/oxtiQPO.jpg" alt="guinea pig"></img>
				<h5 className="mt-5">Ways to get started:</h5>
				<a href='/petsitters' className='btn btn-outline-info mx-1'>Find Pet Sitters</a>
				<a href='/sign-up' className='btn btn-outline-info'>Register a PawSitters Account</a>
				<a href='/sign-in' className='btn btn-outline-info mx-1'>Sign Into Your PawSitters Account</a>
			</div>
			
		</>
	)
}

export default Home
