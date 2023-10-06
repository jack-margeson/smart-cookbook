import "./Profile.scss"
import React from "react";

import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Button } from "@mui/material";

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


class Profile extends React.Component {
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
            "equipment-microwave": false
        }
        const savedProfile = localStorage.getItem('smart-cookbook-profile');
        if (savedProfile !== null) {
            this.state = JSON.parse(savedProfile);
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleCheckbox = (event) => {
        this.setState({ [event.target.name]: event.target.checked });
    }

    saveProfile = (event) => {
        event.preventDefault();
        let profile = this.state;
        localStorage.setItem('smart-cookbook-profile', JSON.stringify(profile));
        this.props.closeProfileModal();
    }

    render() {
        return (
            <Box sx={modalStyle}>
                <div className="profile-container">
                    <div className="profile-header">
                        <div className="profile-header-icon">
                            <IconButton size="large" onClick={this.props.closeProfileModal} >
                                <CloseIcon fontSize="large" sx={{ color: "#000" }}></CloseIcon>
                            </IconButton>
                        </div>
                        <div className="profile-header-text">
                            <p>Chef Profile</p>
                        </div>
                    </div>
                    <div className="profile-body">
                        <form onSubmit={this.saveProfile}>
                            <div>
                                <label for="name">Chef's name:</label><br></br>
                                <input className="input-text" type="text" name="name" value={this.state.name} onChange={this.handleChange}></input>
                            </div>
                            <fieldset>
                                <legend>Choose your skill level:</legend>
                                <div onChange={this.handleChange}>
                                    <input type="radio" name="skill" defaultChecked={this.state.skill === "novice" ? true : false} value="novice" />
                                    <label>Novice</label><br></br>
                                    <input type="radio" name="skill" defaultChecked={this.state.skill === "intermediate" ? true : false} value="intermediate" />
                                    <label>Intermediate</label><br></br>
                                    <input type="radio" name="skill" defaultChecked={this.state.skill === "expert" ? true : false} value="expert" />
                                    <label>Expert</label>
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend>Choose your dietary restrictions:</legend>
                                <div>
                                    <input type="checkbox" name="diet-lactose" value="diet-lactose" defaultChecked={this.state['diet-lactose']} onClick={this.handleCheckbox} />
                                    <label>Lactose intolerant</label><br></br>
                                    <input type="checkbox" name="diet-gluten" value="diet-gluten" defaultChecked={this.state['diet-gluten']} onClick={this.handleCheckbox} />
                                    <label >Gluten intolerant</label><br></br>
                                    <input type="checkbox" name="diet-vegan" value="diet-vegan" defaultChecked={this.state['diet-vegan']} onClick={this.handleCheckbox} />
                                    <label >Vegetarian/Vegan</label>
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend>Choose your cooking equipment:</legend>
                                <div>
                                    <input type="checkbox" name="equipment-stovetop" value="equipment-stovetop" defaultChecked={this.state['equipment-stovetop']} onClick={this.handleCheckbox} />
                                    <label>Stovetop</label><br></br>
                                    <input type="checkbox" name="equipment-oven" value="equipment-oven" defaultChecked={this.state['equipment-oven']} onClick={this.handleCheckbox} />
                                    <label>Oven</label><br></br>
                                    <input type="checkbox" name="equipment-microwave" value="equipment-microwave" defaultChecked={this.state['equipment-microwave']} onClick={this.handleCheckbox} />
                                    <label>Microwave</label>
                                </div>
                            </fieldset>
                            <div className="profile-form-actions">
                                <div className="profile-form-actions-button">
                                    <Button type="submit" variant="contained">Save</Button>
                                </div>
                                <div className="profile-form-actions-button">
                                    <Button variant="contained" onClick={this.props.closeProfileModal} sx={{ backgroundColor: "#808080" }}>Cancel</Button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </Box>
        );
    }
}

export default Profile;