# js-exam readme

A platform for programming interview. Allow the interviewer to add/edit exams and dispatch to the Candidate. Interviewer can also watch the interviewee's coding process. All the coding histories can be viewed in the Candidates page.

### Versioning

v0.1.0

---

## Built With

- [Create React App](https://github.com/facebookincubator/create-react-app)
- redux.js
- aws-amplify
- graphql
- Ant design

### Prerequisite

1.Node.js version <=12.0. \
Install nvm to install a specific version of node (Install [nvm](https://github.com/nvm-sh/nvm))
If you use nvm to install the node.js you can type `nvm install version` i.g `nvm install 11.0.0`

2. Make sure you have the AWS credential with `access_key` and `key_id`.
   It can be found in IAM->Users->amplify->Security credentials->Create access key( if it's in gray, please ask your manager to delete someone's key and press create access id ). You will find the `access_key` and `key_id` in a csv file

![Screen Shot 2022-07-11 at 10 57 27 AM](https://user-images.githubusercontent.com/56998170/178196138-66a0cfa5-0c87-493c-bfb6-85dc925f5b82.png)

3. You can also ask your team member whether they have the credential info, usually stored as an `.aws` folder, so you do not need to click the Create Access Key, keep the access_key and key_id secretly. \
   The .aws folder contains two files: credentials and config(They look like the following figs). \
   If you don't have the files you can create on your own. (1. by using touch command manually 2. See section Amplify Setup->Step 2)

![Screen Shot 2022-07-12 at 3 22 19 PM](https://user-images.githubusercontent.com/56998170/178649029-886a9266-c5ba-482a-a732-8fd5aa299aa2.png)
![Screen Shot 2022-07-12 at 3 20 35 PM](https://user-images.githubusercontent.com/56998170/178649041-64c97e17-6cfc-4650-9bbd-c09d5f1da1d5.png)

4. Please confirm you have setup the SSH to your GitHub account, it's crucial for final deploying, guide can be found here: :https://docs.github.com/en/authentication/connecting-to-github-with-ssh

## Installing

1. After clone the repo to your local host, open the terminal and type `nvm use ver.number` ig `nvm use 11.0.0`, as long as the node version is under 12.0.
2. run `npm install`
3. If you haven't use aws before run `npm install aws`, and make sure the `aws-exports.js` is in your `../js-exam/src` folder

# Amplify Setup

### Step 1. Install Amplify-cli

1. Run the command `npm i -g @aws-amplify/cli@4.13.1` if not working please install amplify cli updated by `npm i -g @aws-amplify/cli`
   (It takes a few minutes around 180Mb)
2. Run the command `amplify` and make sure it will show usage information
   ![Screen Shot 2022-07-11 at 11 07 28 AM](https://user-images.githubusercontent.com/56998170/178195305-b7fc1c35-5004-4c51-981b-aea4bc357844.png)

### Step 2. Setup Local Config

**Amplify will scan your user directory and check `.aws` folder for authentication.**

1. If you have the `.aws` folder with `credentials` and `config` files, put the whole folder into the user directory (`echo $HOME` will display the actual path)
2. If you and your teammates do not have the .aws folder in your user directory, then run `aws configure`
   it will require your `key_id` and `access_key` and make an `.aws` folder with credential info stored in your user directory.
   ![Screen Shot 2022-07-11 at 11 10 04 AM](https://user-images.githubusercontent.com/56998170/178195340-afda586f-43ed-45db-b862-bfc970a0ebfe.png)

### Step 3. Init project

1. Go into the project directory `cd /path/to/js-exam`
2. Run the command `amplify init` and finish a few prompt questions as below
   - **? Do you want to use an existing environment?** `Yes`
   - **? Choose the environment you would like to use:** `dev`
   - **? Choose your default editor:** `(select yours)`
   - **? Do you want to use an AWS profile?** `Yes`
   - **? Please choose the profile you want to use** `amplify-user`
3. If successful you'll see the following message: `Your project has been successfully initialized and connected to the cloud!` :tada::tada::tada:

### catch : Step 3- if init with error:

1. Go to the amplify -> CloudFormation->delete all the Stacks with status: "UPDATED Failed" ![Screen Shot 2022-07-11 at 11 26 04 AM](https://user-images.githubusercontent.com/56998170/178195419-0ee18af3-f908-42c7-b35e-45d11a0362b2.png)

2) Then redo the `amplify init`
3) your `app_id` in `team-provider-info.json` should be updated with with the Amplify Studio app_id(can be found in amplify->edit_backend)

![Screen Shot 2022-07-11 at 11 37 33 AM](https://user-images.githubusercontent.com/56998170/178195560-eb265ffd-3918-490b-a739-9145fd083a47.png)

### catch: Step- if you delete the existing app on Amplify:

1. If you found there's no existing app or you constantly face errors, you can try deleting the existing app:

![Screen Shot 2022-07-13 at 1 17 05 PM](https://user-images.githubusercontent.com/56998170/178656251-1b9f2e35-6b3f-45e6-b059-cad3c2935acd.png)

2. Then do the `amplify init`, there will be some prompt questions as below:

   - \*\*? Enter a name for the environment `dev`
   - \*\*? Please choose an authentication method: `AWS Profile`
   - \*\*? Do you want to update the code for your updated GraphQL API? `No`  
     !!!!!!!!!THIS IS EXTREMELY IMPORTANT!!!!!!!!!!  
     !!!!!!!!DO NOT UPDATE GraphQL API!!!!!!  
      The reasons are as follows: The new version of amplify provides several new functionalities, but it requires the conflict resolver function, The schema was designed under the old version of Amplify, and turning on this functionality will cause the app not be able to do the `UPDATE` and `DELETE` queries.

3. If you finish the amplify init, please double confirm the conflict resolution function is closed by:
   type `amplify update api` \

   - \*\*? Select from one of the below-mentioned services:`GraphQL`

     - \*\*Your terminal should prompt the current setting of api, and the Conflict detection should be disabled

   ![Screen Shot 2022-07-13 at 1 47 13 PM](https://user-images.githubusercontent.com/56998170/178659886-8932e890-448d-4dd8-8d12-01ba9693a27a.png)

   - \*\* If you see the `Conflict Resolution` is set in other mode, please select `Disable conflict resolution` and type  
     `amplify push` to make sure your setting is pushed to the cloud.

4. After you finish all the setup you can run `npm start` to see if the app working on localhost

### Step 4- User Creation

1. In order to log in to your app, you need a user account. Now navigate to Amazon Cognito service(Services->Cognito), create a new user(usually called Admin), your new account will be in `Force to update password` status
2. then type `aws cognito-idp admin-set-user-password \ --user-pool-id <your-user-pool-id> \ --username <username> \ --password <password> \ --permanent`

3. Refresh the page, your user status should be confirmed now
4. Do not forget to create an Interviewee account, it is required for the interviewee to successfully
5. Please enter a random email or phone and mark it as verified in cognito

### Step 5 - Deployment

1. After the amplify init is finished, type `npm run build`
2. then type `npm run deploy`
   NOTICE: if the `npm run deploy` has fatal: remote hang up error, try it in another network environment (i.g personal hotspot)
3. Use the username and password you created in step 4 and go to https://innovap3.github.io/js-exam/, now you can log in.

---

### Format and lint

`npm run format`

### Test

`npm run test`

### Reference

if you are a new user of AWS amplify, the following guide may be helpful

https://aws.amazon.com/tw/blogs/mobile/restoring-aws-amplify-project-after-deleting-it-from-the-cloud/

https://ithelp.ithome.com.tw/articles/10188245

https://travor20814.medium.com/react-%E5%B0%88%E6%A1%88%E6%9E%B6%E6%A7%8B%E5%88%86%E4%BA%AB-%E6%88%91%E7%9A%84%E8%B8%A9%E9%9B%B7%E9%80%B2%E5%8C%96%E9%81%8E%E7%A8%8B-aceea0747045

https://eyesofkids.gitbooks.io/react-basic-zh-tw/content/day27_redux_ex3/ give some concept of redux

https://v5.reactrouter.com/web/guides/quick-start
