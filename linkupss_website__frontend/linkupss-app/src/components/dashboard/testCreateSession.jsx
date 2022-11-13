import axios from 'axios';
const TestCreateSession = () => {
    const testapicall = async () =>{

      var config = { headers: { Authorization: `Bearer ` + localStorage.getItem("userToken") } };

      try {

        const data = {
          "name": "testing2345",
          "org_id": 5,
          "tag": "test",
          "code": "12345678901",
          "start_time": "12:00",
          "recurring": 5,
          "password": "password",
          "day_of_week": "Monday"
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