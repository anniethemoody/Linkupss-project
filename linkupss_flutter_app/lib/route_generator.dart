import 'package:linkupss_flutter_app/screens/landing_screen.dart';
import 'package:linkupss_flutter_app/widgets/account_create.dart';
import "package:flutter/material.dart";
import 'package:linkupss_flutter_app/screens/user_verify_screen.dart';

class RouteGenerator {
  static Route<dynamic> generateRoute(RouteSettings settings) {
    final args = settings.arguments;
    switch (settings.name) {
      case '/':
        return MaterialPageRoute(builder: (_) => LandingPage());
      case '/user_verify':
        NewAccountArguments argument = args as NewAccountArguments;
        return MaterialPageRoute(
          builder: (_) => UserVerifyScreen(
              fName: argument.fName,
              lName: argument.lName,
              email: argument.email,
              pass: argument.pass,
              orgID: argument.orgID),
        );
      default:
        //if there is no such named route in the switch statement
        return _errorRoute();
    }
  }

  static Route<dynamic> _errorRoute() {
    return MaterialPageRoute(builder: (_) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Error'),
        ),
        body: const Center(
          child: Text("Something went wrong. Please reload the application."),
        ),
      );
    });
  }
}
