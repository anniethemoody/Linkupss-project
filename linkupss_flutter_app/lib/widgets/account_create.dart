// ignore_for_file: avoid_print
import 'package:flutter/material.dart';
import 'package:form_field_validator/form_field_validator.dart';

class CreateAccountForm extends StatefulWidget {
  const CreateAccountForm({ Key? key }) : super(key: key);

  @override
  _CreateAccountFormState createState() => _CreateAccountFormState();
}

double padding = 25.0;

class _CreateAccountFormState extends State<CreateAccountForm> {

  GlobalKey<FormState> formKeyNew = GlobalKey<FormState>();
  String fName = "", lName = "", email = "", password = "", orgID = "";


  void validate()
  {
    if(formKeyNew.currentState != null)
    {
      if(formKeyNew.currentState!.validate()) 
      {
        print(fName);
        print(lName);
        print(email);
        print(password);
        print(orgID);
        //here we can now navigate to next page!
      }
      else
      {
        print("Error - not all fields completed");
      }
    }
  }
  @override
  Widget build(BuildContext context) {
    return Expanded(
    flex: 4,
    child: Padding(
      padding: EdgeInsets.only(top: padding, right: padding*3),
      child: Form(
        autovalidateMode: AutovalidateMode.onUserInteraction,
        key: formKeyNew,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          
          children: [
            // Line one and two (intro text)
            const Text(
              'New here?',
              style: TextStyle(
                color: Colors.black,
                fontSize: 15.0,
                fontFamily: 'Montserrat',
              ),
            ),
            SizedBox(height: padding / 3),
            const Text(
              'Create an account',
              style: TextStyle(
                color: Colors.black,
                fontSize: 50.0,
                fontStyle: FontStyle.italic, //want to make it bold
                fontFamily: 'Montserrat',
              ),
            ),
            SizedBox(height: padding),

            // Form starts here:
            // First and last name input fields
            Row(
              children: <Widget>[
                Expanded(
                  flex: 3,
                  child: TextFormField(
                    decoration: const InputDecoration(
                      labelText: 'First Name',
                      hintText: 'e.g. John',
                      border: OutlineInputBorder(),
                    ),
                    validator: RequiredValidator(errorText: "Required*"),
                    onChanged: (value) => setState(() => fName = value),
                    
                  ),
                ),
                const Spacer(flex: 1),
                Expanded(
                  flex: 3,
                  child: TextFormField(
                    decoration: const InputDecoration(
                      labelText: 'Last Name',
                      hintText: 'e.g. Smith',
                      border: OutlineInputBorder(),
                    ),
                    validator: RequiredValidator(errorText: "Required*"),
                    onChanged: (value) => setState(() => lName = value),
                  ),
                ),
              ],
            ),
            SizedBox(height: padding),
            //Email address, password, and organisation with their text below.
            Row(
              children: <Widget>[
                Expanded(
                  child: TextFormField(
                    decoration: const InputDecoration(
                      labelText: 'Email Address',
                      hintText: 'example@gmail.com',
                      border: OutlineInputBorder(),
                      prefixIcon: Icon(Icons.mail),
                    ),
                    validator: MultiValidator( //not working even though it should...
                      [
                        RequiredValidator(errorText: "Required*"),
                        EmailValidator(errorText: "Not a Valid Email"),
                      ]
                    ),
                    onChanged: (value) => setState(() => email = value),
                  ),
                ),
              ],
            ),
            SizedBox(height: padding),
            Row(
              children: <Widget>[
                Expanded(
                  child: TextFormField(
                    decoration: const InputDecoration(
                      labelText: 'New Password',
                      border: OutlineInputBorder(),
                      prefixIcon: Icon(Icons.key),
                    ),
                    validator: MultiValidator(
                      [
                        RequiredValidator(errorText: "Required*"),
                        MinLengthValidator(8, errorText: "More than eight characters are required*"),
                      ]
                    ),
                    onChanged: (value) => setState(() => password = value),
                  ),
                ),
              ],
            ),
            SizedBox(height: padding),
            Row(
              children: [
                Expanded(
                  child: TextFormField(
                    decoration: const InputDecoration(
                      labelText: 'Organisation ID',
                      border: OutlineInputBorder(),
                      prefixIcon: Icon(Icons.bookmark),
                    ),
                    validator: RequiredValidator(errorText: "Required*"),
                    onChanged: (value) => setState(() => orgID = value),
                  ),
                ),
              ],
            ),
            SizedBox(height: padding / 3),
            const Text(
              'This ID would have been given to you by the organisation you are in. If not, please ask for this ID before continuing.',
              style: TextStyle(
                color: Colors.black,
                fontSize: 15.0,
                fontStyle: FontStyle.italic, //want to make it bold
                fontFamily: 'Montserrat',
              ),
            ),
            SizedBox(height: padding),
            Row(
              children: [
                Expanded(
                  child: ElevatedButton(
                    child: 
                      Padding(
                        padding: EdgeInsets.all(padding/2),
                        child: const Text(
                          'Create Your Account',
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 30.0,
                            fontFamily: 'Montserrat',
                          ),
                        ),
                      ),
                    onPressed: () {
                      validate();
                    }, //need to figure out how to compare this with a database to confirm login
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    ),
  );
  }
}