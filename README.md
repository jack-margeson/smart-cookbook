# smart-cookbook 
[![Netlify Status](https://api.netlify.com/api/v1/badges/d1f124d5-80be-4ce3-ae7c-a8dfe44024bc/deploy-status)](https://app.netlify.com/sites/smart-cookbook/deploys)

Project repository for Jack Margeson's smart cookbook. This repo contains the files for the public smart cookbook UI mockup website, as well as files pertaining to other project deliverables. 

CS5167 USER INTERFACE I, Dr. Jillian Aurisano

## Overview 
The Smart Cookbook project aims to create an interactive user experience that emulates the usage of a tablet-like device that helps its users in the kitchen. The device is capable of displaying short form cooking video demonstrations alongside detailed instructions including measurements of required ingredients. A user is able to register their name, cooking level, dietary restrictions, and kitchen appliances through the profile feature. Users who create a profile will then be served warnings when a recipe conflicts with something stated on their profile. They are also enabled to write notes in a specialized, per-recipe note box that allows them to tweak recipes or set reminders as desired. In addition, the Smart Cookbook is able to connect to a wireless scale, which gives visual and auditory feedback when a user weighs the correct amount of an ingredient for an instructional step. A usable demo of the project can be found hosted [here](smart-cookbook.netlify.app/). 

### Interviews
The design of the smart cookbook with begin with a round of interviews. I have created 7 questions in preperation for requirements gathering. The questions are as follows:
```
1. When it comes to cooking, what does your week look like? (how many meals, how often do you cook, etc.)
2. What appliances and kitchen utensils do you use during cooking?
3. Do you look for new recipes often? If so, where, and how complex are they?
4. What makes you pick a recipe over others?
5. How do you follow a recipe while you cook? What are the pros and cons of that method?
6. Tell me about a success and a failure when it comes to cooking a new recipe.
7. What would interest you about a digital cookbook? What features do you think a digital cookbook should have?
```
In total, three interviews were conducted and their results have been recorded and formatted in the following PDF document, [accessable from this repository by clicking here](https://github.com/jack-margeson/smart-cookbook/blob/main/public/assets/Smart%20Cookbook%20Interviews.pdf).

A summary of the interviews outlining interesting points made that will be taken into consideration during design:
- Participants like to find recipes using short-form content delivery methods
- Videos alongside written instructions step-by-step would be a good way to ensure proper cooking
- Options to set what ingredients or tools is very important
- Recipes should be able to match to some sort of profile depending on difficulty
- Large controls for ease of access
- Ability to add notes/amend instructions for saved recipes

### Sketches 
Three sessions of 10-plus-10 sketching was performed, one session each per ideation statement:
- User wants to be able to discover recipes that match ingredients/tools they have on hand.
- User wants recipes to be easily accessable and accurate.
- User wants recipes to influence the difficulty of recipes.

The result of these sketching sessions have been attached below--**they are also available in the repository by following the hyperlinks** for a higher resolution, zoomable image: 

[Image 1](https://github.com/jack-margeson/smart-cookbook/blob/main/public/assets/sketches/1.png) | [Image 2](https://github.com/jack-margeson/smart-cookbook/blob/main/public/assets/sketches/2.jpg) | [Image 3](https://github.com/jack-margeson/smart-cookbook/blob/main/public/assets/sketches/3.jpg) 

![Sketch 1](https://github.com/jack-margeson/smart-cookbook/blob/main/public/assets/sketches/1.png?raw=true)

![Sketch 2](https://github.com/jack-margeson/smart-cookbook/blob/main/public/assets/sketches/2.jpg?raw=true)

![Sketch 3](https://github.com/jack-margeson/smart-cookbook/blob/main/public/assets/sketches/3.jpg?raw=true)

### Final sketch
A final draft sketch was produced iterating off of the sketches performed in the last section. Below is the draft:
![Final draft sketch](https://github.com/jack-margeson/smart-cookbook/blob/main/public/assets/sketches/f_sketch.jpg?raw=true)

When presented to peers, the following feedback was recieved:
- If design includes notepad, make it digital
- Remove notepad section and extend scale for weighing larger objects
- Scale part should be detachable for cleaning
- "What is the circle in the middle of the text"?
  - Redesign for integrated weight check meter possible
- Consider replacing bottom tray icons with other icons (x for door)
- Add controls for built-in scale (zeroing, unit changing)
- Voice control seems gimmicky--focus importance on usability and profile features

## Showcase
-- link to video showcase --

### The control panel 
The control panel on the righthand side of the site allows users to change external things that would not be a part of the main Smart Cookbook UI, including some reset features that would be implemented in a main-menu in a full fledged product.
- Clear user profile/notes: Removes the loaded profile config (see Profile View)
- Control scale weight (g): Add or subtract weight to the digitally connected scale (showcased by the drawing in the bottom right)
- Scale recipe measurements: The "ADJUST" button on the scale that the recipe scaling function mentions in the main UI (see Integrated scale features)
  
![image](https://github.com/jack-margeson/smart-cookbook/assets/31900546/cd79a22d-a817-4696-9d2b-f52bea78e58c)

## Recipe View
Recipe view is the main screen of the UI mockup of the Smart Cookbook. On the left, you'll find the video feed containing a short YouTube tutorial on how to make the dish currently selected. In the grey box in the middle of the screen, you have the instruction text, in which either the current instruction or recipe ingredient adjustment setup (see Integrated scale features) text will be displayed. On the far right are two large buttons for ease of use, which allow users to navigate between instructions. The bottom of the Recipe View contains three buttons, a potential warning symbol, and a recipe select dropdown. 

![image](https://github.com/jack-margeson/smart-cookbook/assets/31900546/ca3e4aa5-8a49-400c-8985-6dbbc6cfff9a)

![image](https://github.com/jack-margeson/smart-cookbook/assets/31900546/92e55ee5-878c-42c7-badf-43a7375d38f5)

- Button 1: the X icon allows a user to return to a main menu (unimplemented in this mock).
- Button 2: the person icon will open the Profile View.
- Button 3: the pencil/paper icon will open the Notes View.
- The warning label is displayed whenever a user's profile conflicts with something about the recipe (see Profile View)


### Profile View 
The profile view allows users to enter their name alongside various options that affect the recipe view. These options include skill level, dietary restrictions, and cooking appliances that they have. Once a user enters their information, they can click "Save" to store their profile. 

![image](https://github.com/jack-margeson/smart-cookbook/assets/31900546/d450c730-a023-4d31-bacb-e4629d483e90)

After saving a chef profile, a user might a warning icon appear in the bottom tray. This indicates when a recipe conflicts with one of the chosen options. In this example, I have set my profile to Jack, lactose intolerant, gluten intolerant, and only owning a stove. The warning tells me that the current recipe, Spaghetti and Meatballs, contains lactose, gluten, and requires a stovetop to cook.

![image](https://github.com/jack-margeson/smart-cookbook/assets/31900546/de79586e-ce77-4e23-85b6-b0688d8fc9e9)


### Notes View
The notes view allows users to enter notes that pertain to a certain recipe. Each note is saved per user, per recipe. A common use case for this feature would be to leave notes for yourself in order to make adjustments to the recipe for next time you cook, or, leave a rating on how enjoyable you found the cooking experience or taste of the final product. In this example, I have left a note on my profile for the Spaghetti and Meatballs recipe, indicating that I need to use more sauce next time I make this recipe and that I should serve with garlic bread.

![image](https://github.com/jack-margeson/smart-cookbook/assets/31900546/b15d366d-d960-4ac0-a201-c6d08daaa675)

Notes are automatically saved as typed. You can exit the note view be using the close icon in the top lefthand corner of the screen.


### Integrated scale features 
The Smart Cookbook offers the feature to connect to a secondary device--a wireless scale which integrates into the Recipe View and provides users with visual and auditory feedback when hitting the goal weight of an ingredient for any given step of the recipe that requires a measurement.

To control the simulated weight of the scale, you can use the slider on the mock control panel on the left of the page.

![image](https://github.com/jack-margeson/smart-cookbook/assets/31900546/1811d805-7f8c-44fe-8e9e-6948ccf484ac)

Each step in the recipe has an ingredient weight correlated with it. By controling the scale weight, you can move the indicator located within the instruction window up and down. The number represents a ratio of the current weight you have on the scale and the target weight. Hitting your target weight will play a ding sound, followed by a short sound effect telling you that you've hit your target weight for that ingredient (voice acted by yours truly).

Scale display waiting for weight:

![image](https://github.com/jack-margeson/smart-cookbook/assets/31900546/da0753c4-d8c9-44a2-82bf-5fa4b32b860f)

Scale indicator approaching target weight:

![image](https://github.com/jack-margeson/smart-cookbook/assets/31900546/4183be3a-479c-4cb7-b0b3-fe012a0216f2)

Target weight hit:

![image](https://github.com/jack-margeson/smart-cookbook/assets/31900546/b52d9963-80d5-4b60-bc85-e0ae4ef1c39d)


#### Ingredient Adjustment 
At the beginning of each recipe, the Smart Cookbook will ask you to adjust the recipe measurements as you see fit. The purpose of this feature is to give the user the option to either make more or less of a recipe depending on their needs (if they have less of one ingredient, want to make more for a larger group of diners, etc). To do this, weigh the highest weight item on the ingredients list on the scale. Pressing the "ADJUST" button on the scale will automatically update the rest of the weights accordingly, indicated by a green text notice below the ingredients list. 

Before adjustment:

![image](https://github.com/jack-margeson/smart-cookbook/assets/31900546/2eb60f40-35a7-4465-84f5-acb1f39a799f)

During adjustment:

![image](https://github.com/jack-margeson/smart-cookbook/assets/31900546/85adef37-1005-4780-9d49-5ccb62163806)

Finalized adjustment: 

![image](https://github.com/jack-margeson/smart-cookbook/assets/31900546/fb5190c6-e32e-4a1e-b1ed-ba0df21970dd)





