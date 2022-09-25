import 'dart:convert';

Participant participantFromJson(String str) => Participant.fromJson(json.decode(str));

String participantToJson(Participant data) => json.encode(data.toJson());

class Participant {

    String participantId;
    String orgId;
    String name;
    String extraInfo;

    Participant({
        required this.participantId,
        required this.orgId,
        required this.name,
        required this.extraInfo,
    });
    factory Participant.fromJson(Map<String, dynamic> json) => Participant(
        participantId: json["participant_id"],
        orgId: json["org_id"],
        name: json["name"],
        extraInfo: json["extra_info"],
    );

    Map<String, dynamic> toJson() => {
        "participant_id": participantId,
        "org_id": orgId,
        "name": name,
        "extra_info": extraInfo,
    };
}
