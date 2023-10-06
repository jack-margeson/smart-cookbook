import "./Notes.scss"
import React from "react";

import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton } from "@mui/material";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '60%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            skill: "novice",
            "diet-lactose": false,
            "diet-gluten": false,
            "diet-vegan": false,
            "equipment-stovetop": false,
            "equipment-oven": false,
            "equipment-microwave": false,
            notes: {}
        }
        const savedProfile = localStorage.getItem('smart-cookbook-profile');
        if (savedProfile !== null) {
            this.state = JSON.parse(savedProfile);
        }
        const savedNotes = localStorage.getItem('smart-cookbook-notes');
        if (savedNotes !== null) {
            this.state.notes = JSON.parse(savedNotes);
        }
    }

    updateNotes = (event) => {
        this.setState({ notes: { [this.props.currentRecipe.name]: event.target.value } })
    }

    saveAndCloseNotes = (event) => {
        const savedNotes = localStorage.getItem('smart-cookbook-notes');
        if (savedNotes !== null) {
            let notes = JSON.parse(savedNotes);
            notes[this.props.currentRecipe.name] = this.state.notes[this.props.currentRecipe.name]
            localStorage.setItem('smart-cookbook-notes', JSON.stringify(notes));
        } else {
            localStorage.setItem('smart-cookbook-notes', JSON.stringify(this.state.notes))
        }
        this.props.closeNotesModal();
    }

    render() {
        return (
            <Box sx={modalStyle}>
                <div className="notes-container">
                    <div className="notes-header">
                        <div className="notes-header-icon">
                            <IconButton size="large" onClick={this.saveAndCloseNotes} >
                                <CloseIcon fontSize="large" sx={{ color: "#000" }}></CloseIcon>
                            </IconButton>
                        </div>
                        <div className="notes-header-text">
                            <p>{this.state.name !== "" ? this.state.name + "'s" : "Chef's"} notes</p>
                        </div>
                    </div>
                    <div className="notes-body">
                        <div className="notes-recipe-title">
                            Notes for {this.props.currentRecipe.display_name}
                        </div>
                        <div className="notes-input-container">
                            <textarea className="notes-input" type="text" placeholder={"Enter notes..."} defaultValue={this.state.notes ? this.state.notes[this.props.currentRecipe.name] : ""} onChange={this.updateNotes}></textarea>
                        </div>
                    </div>
                </div>
            </Box>
        );
    }
}

export default Notes;