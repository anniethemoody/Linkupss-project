import 'package:http/http.dart' as http;
import 'package:linkupss_flutter_app/api/apis-endpoints.dart';
import 'package:linkupss_flutter_app/models/participant.dart';

class ApiService {
  Future<List<Participant>?> getParticipants() async {
    try {
      var url =
          Uri.parse(ApiConstants.baseUrl + ApiConstants.participantEndpoint);
      var response = await http.get(url);
      if (response.statusCode == 200) {

      }
    } catch (e) {
      print(e.toString());
    }
  }
}
