import 'package:linkupss_flutter_app/main.dart';
import 'package:flutter/material.dart';

class UserVerifyScreen extends StatelessWidget {
  final String fName,lName, email, pass, orgID;
  const UserVerifyScreen({
    Key? key, 
    required this.fName, 
    required this.lName,
    required this.email,
    required this.pass,
    required this.orgID, 
    }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Verify your Details')
        ),
        body: Container(
          alignment: Alignment.center,
          color: Colors.blue,
          child: Padding(
            padding: EdgeInsets.only(left: MyApp.padding, right: MyApp.padding, top: MyApp.padding*4),
            child: Column(
              children: [
                const Text(
                  "We are on the confirmation page! Please confirm these details: ",
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 40.0,
                    fontFamily: 'Montserrat',
                  ),
                ),
                SizedBox(height: MyApp.padding*2),
                Text(
                  "Name: $fName $lName",
                  style: const TextStyle(
                    color: Colors.black,
                    fontSize: 20.0,
                    fontFamily: 'Montserrat',
                  ),
                ),
                SizedBox(height: MyApp.padding),
                Text(
                  "Email: $email",
                  style: const TextStyle(
                    color: Colors.black,
                    fontSize: 20.0,
                    fontFamily: 'Montserrat',
                  ),
                ),
                SizedBox(height: MyApp.padding),
                Text(
                  "Password: $pass",
                  style: const TextStyle(
                    color: Colors.black,
                    fontSize: 20.0,
                    fontFamily: 'Montserrat',
                  ),
                ),
                SizedBox(height: MyApp.padding),
                Text(
                  "Organisation ID: $orgID",
                  style: const TextStyle(
                    color: Colors.black,
                    fontSize: 20.0,
                    fontFamily: 'Montserrat',
                  ),
                ),
              ],
            ),
          ),
        ),
    );
  }
}