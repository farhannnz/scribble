import './App.css';
import { useState } from 'react';
import PopUp from './PopUp';
import Notes from './Notes';
import Slide from './Slide';

function App() {

	const [showPopup, setShowPopup ] = useState(false);
	const [showSlide, setShowSlide ] = useState(false);
	const [selectedNote, setSelectedNote ] = useState(null);

	const togglePopup = () => {
		setShowPopup(!showPopup);
	}

	const toggleSlide = (note = null) => {
		setShowSlide(!showSlide);
		setSelectedNote(note);
		console.log("clicked", note);
	}

  return (
	<>
		<div className='container'>
			<header className='head'>
				<h1 className='scribble'>Scribble</h1>
				<button className='addItem' onClick={togglePopup}>create</button>
				{showPopup && <PopUp togglePopup={togglePopup}/>}
			</header>
			{showSlide && <Slide toggleSlide={toggleSlide} note={selectedNote}/>}
		</div>
		<Notes toggleSlide={toggleSlide}/>
		{/* <Slide/> */}
	</>
  );
}

export default App;
