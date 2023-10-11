# Job Portal API                                                                                                                                                                                                                                                               
          
Created a job portal with the following requirements

#### Roles

- Candidate
- Hiring Manager
- Admin

## [Live API](https://job-portal-api-xr47.onrender.com)

### Hiring Manager routes (authorization required)

<ol>
<li><b>POST</b> /jobs Create A Job
</li>

<li><b>GET</b> /manager/jobs<br>Get all jobs of this hiring manager
Verify the token and get the manager id from there to load manager specific jobs</li>
<li><b>GET</b> /manager/jobs/:id Get a job details by id (with applied candidates information and resume if any)
Authorize the route to check if this job is created by the hiring manager who is trying to see the job details (optional)</li>
<li><b>PATCH</b> /jobs/:id Update a job</li>


<li><b>GET</b> /manager/jobs 
- Get all jobs of this hiring manager
- Verify the token and get the manager id from there to load manager specific jobs</li>
<li><b>GET</b> /manager/jobs/:id 
- Get a job details by id (with applied candidates information and resume if any)
- Authorize the route to check if this job is created by the hiring manager who is trying to see the job details (optional)</li>
<li><b>PATCH</b> /jobs/:id 
- Update a job</li>
</ol>

### Candidate routes
GET /jobs 
- Get all Jobs, must be able to filter jobs by location, job type, salary range(BONUS), Must be able to sort jobs(BONUS)

GET /jobs/:id 
- Get job details with hiring manager info

POST /jobs/:id/apply 
- Apply for a job
- Can’t apply after deadline
- If already applied, then can’t apply again
- Can upload a resume(pdf)(BONUS)

### Auth routes
POST /user/signup 
- Signup/Register
POST /user/login 
- Login
- Must generate and send a token as response
GET /user/me 
- Get user information by token

### Admin routes (optional)
- Get All candidates
- Get candidate details by id (with applied jobs)
- Get All hiring managers
- Update user role to hiring manager

### More optional routes
- Top 10 highest paid jobs
- Top 5 most applied jobs

### MUST DOs
#### Must Create an advisor account with this credentials:
- Email: admin@gmail.com
- Password: Admin123#
- Route names must be as it is given in the task
- Must check if the signup and login is working correctly, otherwise the examiner won’t be able to check and don’t make it complicated
- Use a Mongo Atlas db and create some jobs beforehand, so that the examiner can check easily

### Tips
###### Think About what schemas you need. You can create a separate schema with candidate info,job info, apply info(e.g. Apply date, resume link) if you prefer.
