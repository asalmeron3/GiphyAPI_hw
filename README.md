# GiphyAPI_hw - week's 6 api and ajax

Overview: this webiste will have a section for buttons (each with topics), a section for inputing text that will create a new button, a section to store 10 gifs related to the topic of the button clicked. 

--------------Breaking it down into steps----------------

Creating a wesite that:

	1) Contains a list of buttons at the top of the page. These buttons:
		a. Contains the name of a tv show (or a topic) for the user to click on
		b. The names of show/topics of the initial buttons is stored in an array
		c. a separate function goes through the array and makes the buttons to append to the top of the web page
		d. upon clicking the button ....(Section 3)


	2.Contains a section of the user to create a button that fucntions in the same manner as the buttons originally on the page. This is done by:
		a. allowing the user to input text into a "form"
		b. this text is submitted via a submit button
		c. the form should NOT  clear/refresh the page (thus, disable the  default option to the form)
		d. the text is added to the original array AND 
		e. the function that creates the buttons runs again, this time with the user's input being created into a button
		f. ADDED/Bonus: if the user has already created or has a button for a certain topic, or if the user left the form blank, NO button will be created

	3. Upon Clicking the button to a topic:
		a. An ajax call should be made to the Giphy API for 10 gifs.
			i. From the API's response, we want to have the Gifs static link, the Gif's automated link, and the rating to the link
		b. The 10 gifs should be prepended/inserted into the third (3rd) section on the left, that contains all the still Gifs
		c. In this case, each row will have 3 gifs

	4.Upon Clikcing on the GIFs:
		a. If the gif is still, the gif should be animated using the animated link information stored in the div's attribute
		b. If the gif is animated, the gif should be made still by using the still-link information stored in the div's attribute