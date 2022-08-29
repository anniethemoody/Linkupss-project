//import 'package:flutter/src/foundation/key.dart';
//import 'package:flutter/src/widgets/framework.dart';
// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:application_linkupss_flutter/main.dart';
import 'package:form_field_validator/form_field_validator.dart';

class AccountLogin extends StatefulWidget {
  const AccountLogin({Key? key}) : super(key: key);

  @override
  State<AccountLogin> createState() => AccountLoginState();
}

class AccountLoginState extends State<AccountLogin> {
  
  GlobalKey<FormState> formKeyLogin = GlobalKey<FormState>();
  String email = "", password = "";

  void validate() {
    if(formKeyLogin.currentState != null)
    {
      if(formKeyLogin.currentState!.validate()) 
      {
        //needs verification implementation
        print("Successful Login");
        print(email);
        print(password);
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
    return Container(
      width: double.infinity,
      color: Colors.blue[700],
      child: Padding(
        padding: EdgeInsets.only(top: MyApp.padding, bottom: MyApp.padding, left: MyApp.padding*3, right: MyApp.padding*3),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Expanded(
              flex: 4,
              child: Text(
                'Linkupss',
                style: TextStyle(
                  color: Colors.black,
                  fontSize: 60.0,
                  fontFamily: 'Montserrat',
                ),
              ),
            ),
            Spacer(flex: 1),
            Form(
              key: formKeyLogin,
              child: Expanded(
                flex: 4,
                child: Row(
                  children: [
                    Expanded(
                      flex: 4,
                      child: TextFormField(
                        decoration: const InputDecoration(
                          labelText: 'Email',
                          hintText: 'example@gmail.com',
                          border: OutlineInputBorder(),
                          prefixIcon: Icon(Icons.mail),
                        ),
                        validator: MultiValidator( 
                          [
                            RequiredValidator(errorText: "Required*"),
                            EmailValidator(errorText: "Not a Valid Email"),
                          ]
                        ),
                        onChanged: (value) => setState(() => email = value),
                      ),
                    ),
                    Spacer(flex: 1),
                    Expanded(
                      flex: 4,
                      child: TextFormField(
                        decoration: InputDecoration(
                          labelText: 'Password',
                          border: OutlineInputBorder(),
                          prefixIcon: Icon(Icons.key),
                        ),
                        validator: RequiredValidator(errorText: "Required*"),
                        onChanged: (value) => setState(() => password = value),
                      ),
                    ),
                    SizedBox(width: MyApp.padding),
                    Expanded(
                      flex: 2,
                      child: ElevatedButton(
                          child: Text('Login'),
                          onPressed: () { validate(); }, 
                      ),
                    ),
                  ]
                ),
              ),
            ),
          ],
        ),
      )
    );
  }
}