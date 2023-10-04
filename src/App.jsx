import "./App.scss";
import React from 'react';
import Select from "react-select";

 // Import recipes.json
 const recipes = require("./recipes.json");
 console.log(recipes);

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
            scaleValue: 0
        }
    }

    handleChange = (selectedOption) => {
        let recipe = recipes.find(x => x.name === selectedOption.value);
        if (recipe !== undefined) {
            console.log(recipe);
            this.setState({selectedRecipe: recipe});
        }
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
    }

    render() {
        return (
            <div className="container">
                <div className="scale-container">
                    <img 
                    src={window.location.origin + '/assets/scale/scale' + this.state.scaleValue + '.png'}
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
                        <p>Select recipe:</p>
                        <Select
                            options={options}
                            defaultValue={options[0]}
                            onChange={this.handleChange}
                        />
                        <p>Control scale weight (g):</p>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            defaultValue="0"
                            id="weightRange"
                            onChange={this.handleScaleChange}
                        ></input>
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
                            <div className="mock-ui-instructions-header">
                                <p className="title">
                                    {this.state.selectedRecipe.display_name}
                                </p>
                                <p>Instruction #1</p>
                            </div>
                            <div className="mock-ui-instructions-body">
                                <p>{this.state.selectedRecipe.steps[0].body_text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
   

    
}

export default App;
