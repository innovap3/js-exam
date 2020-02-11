# js-exam readme


A platform for programing interview. Allow interviewer to add/edit exam and dispatch to the Candidate. Inteviewer can also watch the intervewee's coding process. All the coding histories can be viewed in the Candidates page.



## Prerequisites

install `node.js`


## Installing

`npm install`


## Usage
### Running the platform

`npm start`

### Format and lint

`npm run format`


### Test

`npm run test`


## Built With

- [Create React App](https://github.com/facebookincubator/create-react-app)
- redux.js
- aws-amplify
- graphql
- Ant design


### Versioning

v0.1.0

---

# Amplify Setup

### Prerequisite
* Node.js version >= 10.x and npm version >= 6.x

### Step 1. Install Amplify-cli

1. Run the command `npm -i -g @aws-amplify/cli@4.13.1` 
2. Run the command `amplify` and make sure it will show usage information

### Step 2. Setup Local Config

**Amplify will scan your user directory and check `.aws` folder for authentication.**

1. Kindly ask your team member for `.aws` credential info
2. Put whole folder into user directory (`echo $HOME` will display actual path)

### Step 3. Init project

1. Go into the project directory `cd /path/to/js-exam`
2. Run the cammand `amplify init` and finish few prompt question as below
	* **? Do you want to use an existing environment?** `Yes`
	* **? Choose the environment you would like to use:** `dev`
	* **? Choose your default editor:** `(select yours)`
	* **? Do you want to use an AWS profile?** `Yes`
	* **? Please choose the profile you want to use** `amplify-user`
3. If success you'll see the follow message: `Your project has been successfully initialized and connected to the cloud!` :tada::tada::tada: