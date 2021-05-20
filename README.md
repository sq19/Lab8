# Lab8_Starter

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)

1: Within a Github action that runs whenever code is pushed 

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.

No. The "message" feature requires many different components of the messaging application to interact with each other. It would need to check if the message was sent or received, if the message that was received was what the original user wrote, whether the receiver can reply, etc. Unit testing should only be used to test a single component of the application.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters

Yes. This would only require testing a single component of the messaging application, which is the "max message length" feature.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?



5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?



