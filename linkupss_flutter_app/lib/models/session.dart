import 'dart:convert';

Session sessionFromJson(String str) => Session.fromJson(json.decode(str));

String sessionToJson(Session data) => json.encode(data.toJson());

class Session {
    Session({
        required this.sessionId,
        required this.orgId,
        required this.name,
        required this.url,
        required this.startTime,
        required this.inviteSent,
        required this.password,
        required this.extraInfo,
    });

    String sessionId;
    String orgId;
    String name;
    String url;
    String startTime;
    bool inviteSent;
    String password;
    String extraInfo;

    factory Session.fromJson(Map<String, dynamic> json) => Session(
        sessionId: json["session_id"],
        orgId: json["org_id"],
        name: json["name"],
        url: json["url"],
        startTime: json["start_time"],
        inviteSent: json["invite_sent"],
        password: json["password"],
        extraInfo: json["extra_info"],
    );

    Map<String, dynamic> toJson() => {
        "session_id": sessionId,
        "org_id": orgId,
        "name": name,
        "url": url,
        "start_time": startTime,
        "invite_sent": inviteSent,
        "password": password,
        "extra_info": extraInfo,
    };
}
