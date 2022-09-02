# React - Todo List

Click [here](https://edmond-luu.github.io/react-todo-list) or on the image below to see the app!

[![image](https://user-images.githubusercontent.com/26613209/187746941-59881751-a429-4d7d-bbe0-502ca992f56e.png)](https://edmond-luu.github.io/react-todo-list/)

This is the largest React app I have built completely from scratch as of now. It may seem like a simple todo list, but there are many features under the hood! [Bootstrap](https://getbootstrap.com/) was also used for building this app. 

## Here are the features of this application: ##

### Form section (top-left): ###
* In the form, the user inputs 3 pieces of information for each note: the title (required), the description, and the category.
  * The color of each note depends on the category chosen: personal (blue), work (green), other (purple).
* There is a red reset button that is for deleting all contents of all input fields, if no information has been entered, the button will be disabled by default.
* Once the user is finished entering the information, clicking on the green submit button would save the information into a note that is displayed in the Todo Items section on the left.

### Todo Items section (right): ###
* All information submitted in the form will be saved in this section.
* There are two buttons at the top of the Todo Items section and both are only visible when there are items inside the section.
   * The blue Pin All Items button transfers all notes in this section to the Pinned Items section.
   * The red Delete All Items button removes all notes in this section.
* There are three buttons for each note in this section.
   * Clicking on the blue pin button will transfer that note to the Pinned Items section.
   * Clicking on the yellow pencil button will allow the user to edit the note with all of the note's information prefilled into each input.
     * Once the user edits the notes, clicking on the green check button saves it.
     * Clicking on the gray x button will discard all changes.
   * Clicking on the red trash button will permanently delete that note.

### Pinned Items section (bottom-left): ###
* All pinned notes in this section are outlined in solid green. Clicking on the delete all button on the Todo Items section will have no effect on any notes in the Pinned Items section.
* Clicking on the yellow Unpin All Notes button at the top will transfer the all notes in this section back to the Todo Items section.
* Clicking on the red Delete All Pinned Notes button at the top will delete all notes in this section while having no effect on the notes in the Todo Items section.
* For each pinned note, there are two buttons:
   * A yellow unpin button, when clicked, will unpin that particular note by transferring it back to the Todo Items section.
   * A red trash button, when clicked, will permanently delete that particular note.
   
React’s useState and useEffect hooks are heavily used in this application as needed to account for and track which notes are being modified.

The app is also fully responsive, meaning that it will automatically adjust itself based on screen size. For example, by default, on larger screens, the page is laid out in a horizontal format with the form and the Pinned Items section on the left side and the Todo Items section on the right side. However, on smaller screens, the page automatically changes into a vertical format with the form, the pinned notes, and the unpinned notes taking up one column each. Each element would resize itself accordingly to maximize space and to ensure that the user is able to see as much content as possible.

<div>
<img src="https://user-images.githubusercontent.com/26613209/187988579-3cd88dcb-ea6f-447d-84d5-792b268e44de.png" width="400"/>
<img src="https://user-images.githubusercontent.com/26613209/187988686-7dd21f37-616e-4c7b-a068-bc7f971fedc6.png" width="400"/>
</div>
