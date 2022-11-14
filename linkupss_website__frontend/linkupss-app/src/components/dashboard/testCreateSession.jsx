import axios from 'axios';
const TestCreateSession = () => {
    const testapicall = async () =>{

      var config = { headers: { Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY2ODM3NjU1NSwianRpIjoiMTc2ZjZjNTMtNjRlYi00YjYyLWI4NzAtMDc1ZGNhOWI0ZDk1IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImFtYnJvc2UxMDE1IiwibmJmIjoxNjY4Mzc2NTU1LCJleHAiOjE2NjgzNzc0NTV9.--n9TorG7ajHrBlr_yENyr8OmO7tRYbqRhQfFe_AMv4" } };
      try {

        var data = {
            name: "testmeeting",
            org_id: 5,
            tag: "test",
            code: 12345678901,
            start_time: "12:00",
            recurring: 1,
            password: "password",
            day_of_week: "Monday"
          }

        const response = await axios.post(
          "https://agile-mountain-50739.herokuapp.com/https://api.linkupss.com/createsession",
          data,
          config
        );

        console.log(response);
      } catch (err) {
        console.log("cannot post session");
      }
    }
    return ( 
        <button onClick={testapicall}>
            Click to create session
        </button>
     );
}
 
export default TestCreateSession;