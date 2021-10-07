
# Form Validation

This is a simple form Validation made in vanilla javascript. The main objective is to Validation user input without using any third party libraries.


### Name Validation

1. User name must be 8 chars long.
2. Name must contain both `First Name` and `Last Name`.
3. First Name and Last Name must be atleast 4 chars long respectively.

### E-mail Validation.

1. E-mail must contain `@` in the address.
2. There must be a provider name and domain name after `@`.
3. Example: `example@mydomain.com`.

### Phone Number Validation.

1. Phone number must be 10 digits.
2. Phone Circle and Provider will be verified by local database.
3. First 3 digits (Ex. **632**`4258742` ) represents Service Provider.
4. Second 3 digits `632`**425**`8742` represents State.


## Submit

After Submitting the form, A One Time Password (OTP) will be generated and copied to the user's clipboard (In Future, It will be sent to User's phone),

- User has to enter the OTP in the next screen to verify himself.
- User will have 3 attempts to enter the correct OTP before redirecting to Pixel6 404 Page.


**On Submit**
 - On Successful verification of OTP, User be will be redirect to PIXEL6 Home Page.
 - In case of Invalid OTP, After maximum attempts user will be redirected to Pixel6 404 Page.  

## Feedback

If you have any feedback, please reach out to me at shreylawang108@gmail.com

  