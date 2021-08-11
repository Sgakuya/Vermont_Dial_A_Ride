###### Instruction of Git #####
# Run git clone <repository url> to download the repository to the computer to your current directory
  # Run touch <new file name> to create a new file in that folder.
  # Run [git add <new file name>] to track that specific file, or [git add .] to track all files within that directory.
  # run: [git commit -m "some message"] where the message describes the changes you just made.
  # After this change, we can run git status to see how our code compares to the code on the remote repository
  # When we’re ready to publish our local commits to Github, we can run git push and when we go to GitHub in our web browser, our changes will be reflected.
  # If you’ve only changed existing files and not created new ones, instead of using [git add .] and then [git commit]..., 
  we can condense this into one command: [git commit -am "some message"]. This command will commit all the changes that you made.
  
  
  


# Vermont-Dial-a-Ride-Django-
# Manage is the main function that run the server:

###### To run this project: ######
# First need to direct to DynamicWebsite
# Then: python3 manage.py runserver
# Copy the link of the local server and go to the website
# Remeber to add /website after the server otherwise you won't see the site


###### To access the database: ######
# Add /admin to the end of the server directory
# To change the database's object, edit model, and then do the following command:
# python3 manage.py makemigrations
# python3 manage.py migrate
