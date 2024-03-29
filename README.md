# VERMONT DIAL-A-RIDE PRELIMINARY WEB APP

A web application aimed to change the current dial a ride system in Vermont that uses a combination of routing algorithms, API calls, JavaScript and Django.

## Author: 
Smith Gakuya

## Collaborators:
Luke Lorenz   
Haiyu Luo   
Asif Islam   
Prof. Ananya Christman - Middlebury College CS Dept.    

  
## Background
This is a Dial-A-Ride Optimization problem tailored to the state of Vermont’s transit needs. Currently, there is no website or algorithm in place were users can submit requests to be picked up by a dial a ride driver in Vermont. We hope to change that with a website that can handle requests, and efficiently schedule a path that efficiently maximizes the number of requests each driver can serve.
  
## Usage
For Usage, visit the page: [Dial-A-Ride_Vermont](sgakuya.pythonanywhere.com) 

### Ride Request
1. To test the ride creation process, click on Rider Login on the menu bar.
2. Register as a new user and fill in the form with the info about the ride you are requesting and confirm.
3. You can also check out your previously requested rides on the page after logging in.

### Schedule Creation and Simulation
1. Click on Dispatcher Login on the menu bar and login with the following credentials
> Username : achristman       
> Password: password
2. On the menu bar you will note you have the option to view ride requests, run simulations (from random or actual requests) and create schedules


To create a local copy on your desktop, watch this video: [GitHub to Website Demo](https://youtu.be/xSqp2LjHDFg)

For more background on the algorithm and website details, visit this link for a holistic overview of motivation and development: 
> [Background_Midd-Sharepoint](https://middleburycollege-my.sharepoint.com/:w:/g/personal/llorenz_middlebury_edu/EaSkns-D_-VAr100pDSxGQUBfWzqhgjjsc0GV7KVXT_6TA?e=Veyvdy)   

Much of the link above touches on java code written to develop these algorithms, the files to these are located here:   
> [DAR Single-Driver Optimization](https://github.com/llorenz29/1D-Dial-A-Ride-Optimization)   
> [DAR Multi-Driver & Other Algorithms](https://github.com/Sgakuya/DAR_Algorithms)   
  
  
An Aside: To access the link above, you must be a member of Middlebury College. I am currently working on a way arround a restricted shareable link. 

<img width="1440" alt="Welcome Page, index" src="https://github.com/Sgakuya/Vermont_Dial_A_Ride/assets/61175297/76542884-ab81-4555-ad43-cb5d7dd33545">
<img width="1440" alt="Rider Login" src="https://github.com/Sgakuya/Vermont_Dial_A_Ride/assets/61175297/69ee4ea3-d22d-44b1-8cf5-aea798435bf6">
<img width="1440" alt="Rider Homepage" src="https://github.com/Sgakuya/Vermont_Dial_A_Ride/assets/61175297/ee355a25-cc07-4e9c-be30-0b5d47e8ebac">
<img width="1440" alt="Ride Request" src="https://github.com/Sgakuya/Vermont_Dial_A_Ride/assets/61175297/b69f8054-a113-4672-b417-af72f77b3eed">
<img width="1440" alt="Dispatcher Schedule" src="https://github.com/Sgakuya/Vermont_Dial_A_Ride/assets/61175297/6f02ebc9-f7d8-4e50-afb3-74a31f0a2fb9">

