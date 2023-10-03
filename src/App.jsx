import "./App.scss";
import Select from "react-select";

function App() {
    // Import recipes.json
    const recipes = require("./recipes.json");
    console.log(recipes);

    // Create dropdown options for each recipe
    const options = [];
    recipes.forEach((recipe) => {
        options.push({ value: recipe.name, label: recipe.display_name });
    });

    var selectedRecipe = recipes[0];

    const handleChange = (selectedOption) => {
        selectedRecipe = recipes.find(
            (recipes) => recipe.name === selectedOption.name
        );
        console.log(selectedRecipe);
    };

    return (
        <div className="container">
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
                        onChange={handleChange}
                    />
                    <p>Control scale weight (g):</p>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="0"
                        id="weightRange"
                    ></input>
                </div>
                <div className="mock-ui-screen">
                    <div className="mock-ui-video">
                        <iframe
                            width="100%"
                            height="100%"
                            src={selectedRecipe.video.src}
                            title={selectedRecipe.video.title}
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                        ></iframe>
                    </div>
                    <div className="mock-ui-instructions">
                        <div className="mock-ui-instructions-header">
                            <p className="title">
                                {selectedRecipe.display_name}
                            </p>
                            <p>Instruction #1</p>
                        </div>
                        <div className="mock-ui-instructions-body">
                            <p>{selectedRecipe.steps[0].body_text}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
