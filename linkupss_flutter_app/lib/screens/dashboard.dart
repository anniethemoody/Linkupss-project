// ignore_for_file: unnecessary_const, deprecated_member_use
import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:linkupss_flutter_app/models/participant.dart';
import 'package:linkupss_flutter_app/api/api-service.dart';
import 'package:badges/badges.dart';

// To do: add buttons, add top bar for displaying user and org info, bottom bar for confirmation
class Dashboard extends StatefulWidget {
  const Dashboard({Key? key}) : super(key: key);

  @override
  State<Dashboard> createState() => DashboardState();
}

class DashboardState extends State<Dashboard> {
  late List<Participant>? _participantList = [];
  List<bool> enrolledSessionList = List.filled(6, false, growable: true);
  List<String> enrollSessionButtonText =
      List.filled(20, "Enroll", growable: true);
  @override
  void initState() {
    log("hello");
    super.initState();
    // _getData();
  }

  void _getData() async {
    _participantList = (await ApiService().getParticipants())!;
    Future.delayed(const Duration(seconds: 1)).then((value) => setState(() {}));
  }

  void enrollSessionButtonState(int index) {
    setState(() {
      if (enrolledSessionList[index]) {
        enrollSessionButtonText[index] = "Joined";
      } else {
        enrollSessionButtonText[index] = "Enroll";
      }
      enrolledSessionList[index] = !enrolledSessionList[index];
    });
  }

  @override
  Widget build(BuildContext context) {
    final List<String> sessionsAvailable = <String>[
      'Yoga Session',
      'Bingo Session',
      'Arts and Crafts',
      'Chess Club',
      'Mahjong Club',
      'Cooking activities',
    ];
    final List<String> sessionsEnrolled = <String>['hello', 'hello'];

    final List<int> colorCodes = <int>[600, 500, 100];
    return SafeArea(
        child: Scaffold(
            appBar: AppBar(
              title: const Text('Your sessions dashboard'),
              actions: <Widget>[
                TextButton(
                  onPressed: () {},
                  child: const Text('Refresh',
                      style: TextStyle(color: Colors.white)),
                ),
                TextButton(
                  onPressed: () {},
                  child: const Text('Ask for help',
                      style: TextStyle(color: Colors.white)),
                ),
              ],
            ),
            body: Container(
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [Colors.blue, Colors.white],
                  ),
                ),
                child: Row(
                  children: [
                    Column(children: [
                      Container(
                          width: 490,
                          height: 30,
                          decoration: new BoxDecoration(
                              color: Colors.white,
                              borderRadius: const BorderRadius.only(
                                bottomLeft: const Radius.circular(10.0),
                                bottomRight: const Radius.circular(10.0),
                              )),
                          child: Text("Sessions available for selection: ",
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                  color: Colors.blue,
                                  fontFamily: 'Montserrat',
                                  fontSize: 16.5))),
                      Container(
                        height: 650,
                        width: 550,
                        child: ListView.separated(
                          controller: ScrollController(),
                          padding: const EdgeInsets.fromLTRB(30, 60, 30, 60),
                          itemCount: sessionsAvailable.length,
                          itemBuilder: (BuildContext context, int index) {
                            return Container(
                                width: 550,
                                height: 150,
                                decoration: new BoxDecoration(
                                    color: Colors.white,
                                    borderRadius: const BorderRadius.only(
                                      topLeft: const Radius.circular(20.0),
                                      topRight: const Radius.circular(20.0),
                                      bottomLeft: const Radius.circular(20.0),
                                      bottomRight: const Radius.circular(20.0),
                                    )),
                                child: Column(children: [
                                  Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceAround,
                                      children: [
                                        Padding(
                                            padding: const EdgeInsets.all(8.0),
                                            child: Text(
                                                '${sessionsAvailable[index]}',
                                                style: TextStyle(
                                                    color: Colors.blue,
                                                    fontFamily: 'Montserrat',
                                                    fontSize: 20))),
                                        Badge(
                                          toAnimate: false,
                                          shape: BadgeShape.square,
                                          badgeColor: Colors.deepPurple,
                                          borderRadius:
                                              BorderRadius.circular(8),
                                          badgeContent: Text('15:00 Wednesday',
                                              style: TextStyle(
                                                  color: Colors.white)),
                                        ),
                                      ]),
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceAround,
                                    children: [
                                      Text(
                                          "This is just a description for the sessions and it \nconverys useful information about the session",
                                          textAlign: TextAlign.center,
                                          style: TextStyle(
                                              color: Colors.blue,
                                              fontFamily: 'Montserrat',
                                              fontSize: 15))
                                    ],
                                  ),
                                  Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceEvenly,
                                      children: [
                                        ElevatedButton(
                                            onPressed: () {
                                              setState(() {});
                                            },
                                            child: Text('Details',
                                                style:
                                                    TextStyle(fontSize: 15))),
                                        ElevatedButton.icon(
                                          style: ElevatedButton.styleFrom(
                                            primary: Colors.white,
                                            side: BorderSide(
                                                color: Colors.blue, width: 1.5),
                                          ),
                                          icon: Icon(
                                              enrolledSessionList[index]
                                                  ? Icons.add
                                                  : Icons.done,
                                              color: Colors.blue),
                                          label: Text(
                                              enrollSessionButtonText[index],
                                              style: TextStyle(
                                                  color: Colors.blue)),
                                          onPressed: () {
                                            enrollSessionButtonState(index);
                                          },
                                        ),
                                      ]),
                                ]));
                          },
                          separatorBuilder: (BuildContext context, int index) =>
                              SizedBox(height: 50, child: const Divider()),
                        ),
                      )
                    ]),
                    Column(children: [
                      Container(
                          width: 490,
                          height: 30,
                          decoration: new BoxDecoration(
                              color: Colors.white,
                              borderRadius: const BorderRadius.only(
                                bottomLeft: const Radius.circular(10.0),
                                bottomRight: const Radius.circular(10.0),
                              )),
                          child: Text("Sessions you are enrolled in: ",
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                  color: Colors.blue,
                                  fontFamily: 'Montserrat',
                                  fontSize: 16.5))),
                      Container(
                        height: 650,
                        width: 550,
                        child: ListView.separated(
                          controller: ScrollController(),
                          padding: const EdgeInsets.fromLTRB(30, 60, 30, 60),
                          itemCount: sessionsAvailable.length,
                          itemBuilder: (BuildContext context, int index) {
                            return Container(
                                width: 550,
                                height: 100,
                                decoration: new BoxDecoration(
                                    color: Colors.white,
                                    borderRadius: const BorderRadius.only(
                                      topLeft: const Radius.circular(20.0),
                                      topRight: const Radius.circular(20.0),
                                      bottomLeft: const Radius.circular(20.0),
                                      bottomRight: const Radius.circular(20.0),
                                    )),
                                child: Column(children: [
                                  Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.start,
                                      children: [
                                        Padding(
                                            padding: const EdgeInsets.all(8.0),
                                            child: Text(
                                                '${sessionsAvailable[index]}',
                                                style: TextStyle(
                                                    color: Colors.blue,
                                                    fontFamily: 'Montserrat',
                                                    fontSize: 20))),
                                      ]),
                                  Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceEvenly,
                                      children: [
                                        ElevatedButton(
                                            onPressed: () {
                                              setState(() {});
                                            },
                                            child: Text('Details',
                                                style:
                                                    TextStyle(fontSize: 15))),
                                        ElevatedButton.icon(
                                          style: ElevatedButton.styleFrom(
                                              primary: Colors.grey),
                                          icon: Icon(
                                            Icons.delete,
                                          ),
                                          label: Text(' Remove'),
                                          onPressed: () {},
                                        ),
                                      ]),
                                ]));
                          },
                          separatorBuilder: (BuildContext context, int index) =>
                              SizedBox(height: 50, child: const Divider()),
                        ),
                      )
                    ])
                  ],
                ))));
  }
}
