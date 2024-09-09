import './Slide.css'
import { notes } from './PopUp';
import { useState } from 'react';

function Slide({ toggleSlide, note }){
    const [ noteID, setNoteId ] = useState(-1);

    const [updateTitle, setUpdateTitle ] = useState("");
    const [updateDetails, setUpdateDetails ] = useState("");
    const [title, setTitle] = useState("");
    
    const [details, setDetails] = useState("");
    const apiUrl = "http://localhost:2029";

    const handleUpdate = (item) => {
        setNoteId(item._id);
        setUpdateTitle(item.title);
        setUpdateDetails(item.details);
    }

    const updateNote = () => {
        if (updateTitle.trim() !== '' && updateDetails.trim() !== '') {
            fetch(apiUrl + "/home/"+noteID, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: updateTitle, details: updateDetails })
            }).then((res) => {
                if (res.ok) {

                    const updatedNotes = notes.map((item) => {
                        if(item._id === noteID){
                            item.title = updateTitle;
                            item.details = updateDetails;
                        } 
                        return item;
                    })

                    notes(updatedNotes);
                    notes.push({ title, details });
                    setTitle("");
                    setDetails("");
                    setNoteId(-1);
                    alert("Note Updated!");
                    toggleSlide();
                } else {
                    alert("Note not Saved!");
                    toggleSlide();
                }
            }).catch(() => {
                alert("Note Unable to Save!");
                toggleSlide();
            });
        }
    }

    const copy = (item) => {
        if(item.details.trim() !== ""){
            let copiedText = item.details;
            navigator.clipboard.writeText(copiedText);
            alert("Text Copied !")
        } else{
            alert("Text not Copied")
        }
    }

    return (
        <main className='sildeBackground'>
            {            
                note && (
                    <section className='popupSlide' key={note._id}>
                    <header className='popup-head'>
                        {
                            noteID === -1 || noteID !== note._id ?
                            <>
                                <h6 className='back' onClick={toggleSlide}>back</h6>
                            </> :
                            <>
                                <h6 className='back' onClick={toggleSlide}>cancel</h6>
                            </>
                        }
                        {
                            noteID === -1 || noteID !== note._id ? 
                            <>
                                <h6 className='edit' disabled onClick={() => handleUpdate(note)}>edit</h6>
                            </> :
                            <>
                                <h6 className='save' onClick={updateNote} >save</h6>
                            </>
                        }
                    </header>
                    {
                        noteID === -1 || noteID !== note._id ? 
                            <section className='input-holder'>
                                <input className='input-head' value={note.title} readOnly></input>
                                <textarea className='input-box' value={note.details} readOnly></textarea>
                            </section> :
                            <section className='input-holder'>
                                <input type='text' placeholder='Title' onChange={(e) => setUpdateTitle(e.target.value)} className='input-head' value={updateTitle} />
                                <textarea type='text' placeholder='Notes goes to here...' onChange={(e) => setUpdateDetails(e.target.value)} className='input-box' value={updateDetails}></textarea>
                            </section>
                    }
                        <article className='add-ons'>
                            <button className='bold' onClick={() => copy(note)}>Copy</button>
                            <button className='bold'>Delete</button>
                        </article>
                    </section>
                )
            }
        </main>
    )
}

export default Slide;