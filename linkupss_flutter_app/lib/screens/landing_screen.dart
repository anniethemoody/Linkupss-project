// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:application_linkupss_flutter/widgets/account_create.dart';
import 'package:application_linkupss_flutter/widgets/account_login.dart';

const double padding = 25.0;

class LandingPage extends StatelessWidget {
  LandingPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: const [Colors.blue, Colors.white],
              ),
            ),
            child: Column(
              children: [
                AccountLogin(),
                Row(
                  children: [
                    informationSection,
                    Spacer(flex: 1),
                    CreateAccountForm(),
                  ],
                ),
              ],
            )),
      ),
    );
  }

  final Widget informationSection = Expanded(
    flex: 4,
    child: Padding(
      padding: const EdgeInsets.only(left: padding*3),
      child: Column(
        children: [
          // ignore: sized_box_for_whitespace
          Text(
            'Simplifying the way you connect with your community.',
            style: TextStyle(
              color: Colors.black,
              fontSize: 30.0,
              fontFamily: 'Montserrat',
            ),
          ),
          Padding(
            //image part
            padding: EdgeInsets.symmetric(vertical: padding),
            child: Image.asset('assets/image_landing.png',
                filterQuality: FilterQuality.high),
          ),
        ],
      ),
    ),
  );
}
