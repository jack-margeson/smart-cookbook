import "./App.scss";
import React from 'react';
import Select from "react-select";

import Profile from "./Profile";
import Notes from "./Notes"

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import PersonIcon from '@mui/icons-material/Person';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CloseIcon from '@mui/icons-material/Close';
import WarningIcon from '@mui/icons-material/Warning';
import ScaleIcon from '@mui/icons-material/Scale';
import { Button, IconButton, Modal, Tooltip } from "@mui/material";


// Import recipes.json
const recipes = require("./recipes.json");

// Create dropdown options for each recipe
const options = [];
recipes.forEach((recipe) => {
    options.push({ value: recipe.name, label: recipe.display_name });
});

class App extends React.Component {
    constructor(props) {
        super();
        this.state = {
            selectedRecipe: recipes[0],
            scaleValue: 0,
            scaleTrueValue: 0,
            profileModalOpen: false,
            notesModalOpen: false,
            currentInstructionPos: 0,
            currentInstruction: "",
            currentInstructionScale: 0
        }
    }

    componentDidMount() {
        const savedProfile = localStorage.getItem('smart-cookbook-profile');
        if (savedProfile !== null) {
            for (const [key, value] of Object.entries(JSON.parse(savedProfile))) {
                this.setState({ [key]: value });
            }
        }
        this.setState({currentInstruction: this.state.selectedRecipe.steps[0].body_text});
        this.setState({currentInstructionScale: this.state.selectedRecipe.steps[0].measurements}); 
    }

    handleChange = (selectedOption) => {
        let recipe = recipes.find(x => x.name === selectedOption.value);
        if (recipe !== undefined) {
            console.log(recipe);
            this.setState({ selectedRecipe: recipe });
        }
        this.setState({currentInstructionPos: 0});
        this.setState({currentInstruction: this.state.selectedRecipe.steps[0].body_text});
        this.setState({currentInstructionScale: this.state.selectedRecipe.steps[0].measurements}); 
    }

    handleScaleChange = (event) => {
        let value = event.target.value

        if (value <= 0) {
            this.setState({ scaleValue: 0 });
        } else if (value <= 25) {
            this.setState({ scaleValue: 1 });
        } else if (value <= 50) {
            this.setState({ scaleValue: 2 });
        } else if (value <= 75) {
            this.setState({ scaleValue: 3 });
        } else if (value <= 100) {
            this.setState({ scaleValue: 4 });
        }

        this.setState({scaleTrueValue: value});
    }

    closeRecipe = (event) => {
        alert("This button would return you to the main menu!");
    }

    openProfileModal = (event) => {
        this.setState({ profileModalOpen: true });
    }

    openNotesModal = (event) => {
        this.setState({ notesModalOpen: true });
    }

    closeProfileModal = (event) => {
        this.setState({ profileModalOpen: false });
        const savedProfile = localStorage.getItem('smart-cookbook-profile');
        if (savedProfile !== null) {
            for (const [key, value] of Object.entries(JSON.parse(savedProfile))) {
                this.setState({ [key]: value });
            }
        }
    }

    closeNotesModal = (event) => {
        this.setState({ notesModalOpen: false });
    }

    instructionNext = (event) => {
        let tmp = this.state.currentInstructionPos;
        tmp += 1;
        if (tmp > this.state.selectedRecipe.steps.length-1) {
            this.setState({currentInstructionPos: 0});
            tmp = 0;
        } else {
            this.setState({currentInstructionPos: tmp});
        }
        this.updateInstructionText(tmp);
        this.setState({scaleValue: 0, scaleTrueValue: 0});
    }

    instructionPrev = (event) => {
        let tmp = this.state.currentInstructionPos;
        tmp -= 1;
        if (tmp < 0) {
            this.setState({currentInstructionPos: this.state.selectedRecipe.steps.length-1});
            tmp = this.state.selectedRecipe.steps.length-1;
        } else {
            this.setState({currentInstructionPos: tmp});
        }
        this.updateInstructionText(tmp);
        this.setState({scaleValue: 0, scaleTrueValue: 0});
    }

    updateInstructionText(num) {
        console.log(this.state.currentInstructionPos);
        this.setState({currentInstruction: this.state.selectedRecipe.steps[num].body_text}); 
        this.setState({currentInstructionScale: this.state.selectedRecipe.steps[num].measurements}); 
    }


    clearProfileCache = (event) => {
        localStorage.clear('smart-cookbook-profile');
        window.location.reload();
    }

    scaleRecipeMeasurements = (event) => {
        let max_measurement = 1;
        this.state.selectedRecipe.steps.forEach((step) => {
            if (step.measurements) {
                if (step.measurements >= max_measurement) {
                    max_measurement = step.measurements;
                }
            }
        })

        // Get scale factor 
        let scale_factor = this.state.scaleTrueValue / max_measurement;

        this.state.selectedRecipe.steps.forEach((step)=> {
            if (step.measurements) {
                step.measurements = Math.round( step.measurements * scale_factor);
            }
        })


        this.forceUpdate();
    }

    render() {

        let warnings = []
        this.state.selectedRecipe.warnings.forEach(
            (option) => {
                if (this.state.name) {
                    switch (option) {
                        case "diet-lactose":
                            if (this.state['diet-lactose']) {
                                warnings.push("Contains lactose");
                            }
                            break;
                        case "diet-gluten":
                            if (this.state['diet-gluten']) {
                                warnings.push("Contains gluten");
                            }
                            break;
                        case "diet-vegan":
                            if (this.state['diet-vegan']) {
                                warnings.push("Contains animal products");
                            }
                            break;
                        case "equipment-stovetop":
                            if (!this.state['equipment-stovetop']) {
                                warnings.push("Requires a stovetop to cook");
                            }
                            break;
                        case "equipment-oven":
                            if (!this.state['equipment-oven']) {
                                warnings.push("Requires an oven to cook");
                            }
                            break;
                        case "equipment-microwave":
                            if (!this.state['equipment-microwave']) {
                                warnings.push("Requires a microwave to cook");
                            }
                            break;
                        default:
                            warnings.push("This isn't supposed to happen.")
                    }
                }
            }
        );

        let warningText = (
            <h3 style={{ fontSize: '20px;' }}>
                {this.state.name ? this.state.name : "Chef"}, this recipe may not meet your dietary restrictions or be possible in your kitchen.
                The following warnings about this recipe conflict with your chef profile:<br></br><br></br>
                {warnings.map(item => <p>- {item}</p>)}
            </h3>
        )

        let warning = warnings.length > 0 ? (
            <Tooltip title={warningText} placement="top">
                <IconButton>
                    <WarningIcon fontSize="large" sx={{ color: "#F00" }}></WarningIcon>
                </IconButton>
            </Tooltip>
        ) : ""


        let instructionsScale = (
            <div className="mock-ui-instructions-scale">
                <ScaleIcon size="large"></ScaleIcon>
                {this.state.currentInstructionScale ? 
                <span style={{paddingLeft: '10px'}}>{this.state.currentInstructionScale}g</span> 
                : <span style={{paddingLeft: '10px'}}>{this.state.scaleTrueValue}g</span> }
                <input
                    className={this.state.currentInstructionScale ? "weight-display" : "weight-display-alt"}
                    type="range"
                    min="0"
                    max={this.state.currentInstructionScale}
                    defaultValue="0"
                    id="weightDisplay"
                    value={this.state.scaleTrueValue}
                ></input>
            </div>)

        let ingredientsList = []

        
        this.state.selectedRecipe.steps.forEach((step, index) => {
            if (step.measurements) {
                ingredientsList.push(<li>Ingredient #{index}: {step.measurements}g</li>)
            }
        });

        let currentInstructionComponent = this.state.currentInstructionPos > 0 ? 
        (<p>{this.state.currentInstruction}</p>) : (
            <div>
                <p>{this.state.currentInstruction}</p><br></br>
                <div>
                    <ul>
                        {ingredientsList}
                    </ul>
                </div>
            </div>
        )


        return (
            <div className="container">
                <div className="scale-container">
                    <img
                        src={window.location.origin + '/assets/scale/scale' + this.state.scaleValue + '.png'}
                        alt="Mock Scale"
                        width={"340px"}
                        height={"300px"}></img>
                </div>
                <div className="project-information">
                    <p>Smart Cookbook by Jack Margeson</p>
                    <p>
                        Project description and interactive UI instuctions coming
                        soon.
                    </p>
                    <p>CS5167 USER INTERFACE I, Dr. Jillian Aurisano</p>
                </div>
                <div className="mock-ui-container">
                    <div className="mock-ui-controls">
                        <p className="mock-control-text">Mock control panel</p>
                        <p>Select recipe:</p>
                        <Select
                            options={options}
                            defaultValue={options[0]}
                            onChange={this.handleChange}
                        />
                        <p>Clear user profile/notes:</p>
                        <div style={{ paddingBottom: "10px" }}>
                            <Button sx={{ minWidth: '100%' }} variant="contained" onClick={this.clearProfileCache}>Reset</Button>
                        </div>
                        <p>Control scale weight (g):</p>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            defaultValue="0"
                            value={this.scaleTrueValue}
                            id="weightRange"
                            onChange={this.handleScaleChange}
                        ></input>
                        <p>Scale recipe measurements:</p>
                        <div style={{ paddingBottom: "10px" }}>
                            <Button sx={{ minWidth: '100%' }} variant="contained" onClick={this.scaleRecipeMeasurements}>ADJUST</Button>
                        </div>
                    </div>
                    <div className="mock-ui-screen">
                        <div className="mock-ui-video">
                            <iframe
                                width="100%"
                                height="100%"
                                src={this.state.selectedRecipe.video.src}
                                title={this.state.selectedRecipe.video.title}
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen
                            ></iframe>
                        </div>
                        <div className="mock-ui-instructions">
                            <div className="mock-ui-text">
                                <div className="mock-ui-instructions-header">
                                    <p className="title">
                                        {this.state.selectedRecipe.display_name}
                                    </p>
                                    <p>Instruction #{this.state.currentInstructionPos}</p>
                                </div>
                                <div className="mock-ui-instructions-body">
                                    {currentInstructionComponent}
                                    {instructionsScale}
                                </div>
                                <div className="mock-ui-instructions-nav">
                                    <Tooltip title="Close recipe">
                                        <IconButton size="large" onClick={this.closeRecipe}>
                                            <CloseIcon fontSize="large" sx={{ color: "#000" }}></CloseIcon>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Chef profile">
                                        <IconButton size="large" onClick={this.openProfileModal}>
                                            <PersonIcon fontSize="large" sx={{ color: "#EB7256" }}></PersonIcon>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Edit recipe notes">
                                        <IconButton size="large" onClick={this.openNotesModal}>
                                            <EditNoteIcon fontSize="large" sx={{ color: "#EB7256" }}></EditNoteIcon>
                                        </IconButton>
                                    </Tooltip>
                                    {warning}
                                </div>
                            </div>
                            <div className="mock-ui-control-container">
                                <div className="mock-ui-control" style={{ borderBottom: "2px solid #363636" }} onClick={this.instructionNext}>
                                    <NavigateNextIcon fontSize="large"></NavigateNextIcon>
                                </div>
                                <div className="mock-ui-control" style={{ borderTop: "2px solid #363636"}} onClick={this.instructionPrev}>
                                    <NavigateBeforeIcon fontSize="large"></NavigateBeforeIcon>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <Modal
                    open={this.state.profileModalOpen}
                >
                    <div>
                        <Profile closeProfileModal={this.closeProfileModal}>
                        </Profile>
                    </div>

                </Modal>

                <Modal
                    open={this.state.notesModalOpen}
                >
                    <div>
                        <Notes
                            currentRecipe={this.state.selectedRecipe}
                            closeNotesModal={this.closeNotesModal}>
                        </Notes>
                    </div>

                </Modal>

            </div >
        );
    }



}

export default App;
