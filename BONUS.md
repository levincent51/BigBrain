Form validation
    - Front end validation for login and sign up
Edit Game
    - Disables edit when form hasnt been saved for a particular question
    - when deleting, reaching 1 question disables further delete (no game has no questions)
    - Uploading new thumbnail has a preview, as well as a default image
Edit Question
    - Inserting youtube link is validated, and an embedded video is displayed
    - Uploading new photo has a preview, data url
    - Multiple choice and single choice switch between checkbox and radio
    - when deleting reaches 2 options, disables,
    - when adding more than 6 options, disable add option
Polling for player quiz
    - The quiz is polled to count down in real time, as well as change to answer screen and advance when admin advances
    - Polling also polls when quiz is ended suddenly or when admin starts game from lobby
    - Question is rendered, added circle loading and image or video is displayed in iframe
    - If there is an associated url, that url will load either an image or an embedded youtube video
Game controller for administration
    - Displays the current stage of the game, 'In lobby' or a progress bar with the question it is on which updates in real time
    - All buttons update based on the stage you are at
Results (admin)
    - Results page provides ample information regarding the game
    - Shows the max points that can be achieved, and the average for each question
    - Shows the max response time, average response time and average response time for correctly answered questions
Results (player)
    - Visual implementation of results, questions are outlined in red if wrong and outlined in green if right
    - All options that are picked are displayed to the user 
Dashboard
    - Past quizzes are implemented in the dashboard, updates in real time when a game is finished, it will appear in the dashboard
