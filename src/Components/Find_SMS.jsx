import React, { useState, useEffect } from 'react'
import { Input, Button } from 'antd'
import axios from 'axios';
let headersList = {
  "Content-Type": "application/json",
  "Access-Control-Request-Headers": "*",
  "api-key": `${process.env.REACT_APP_API_KEY}`,
  "Accept": "application/json",
}
let flag = false; // true => phonenumber | false => string
let re = new RegExp("^(?:(?:\\+|0{0,2})91(\\s*[\\-]\\s*)?|[0]?)?[789]\\d{9}$");
const Find_SMS = () => {
  const [val, setVal] = useState();
  const [response, setresponse] = useState();
  useEffect(() => {
    if (re.test(val)) {
      //phone number
      flag = true;
    }
    else {
      //string text
      flag = false;
    }
  }, [val]);
  const onSubmit = async () => {
    try {
      let bodyContent = ""
      if (flag) {
        bodyContent = JSON.stringify({
          "collection": "SMS",
          "database": "SMS_Database",
          "dataSource": "Cluster0",
          "filter": {
            "phonenumber": `${val}`
          }
        });
      }
      else {
        bodyContent = JSON.stringify({
          "collection": "SMS",
          "database": "SMS_Database",
          "dataSource": "Cluster0",
          "filter": {
            "name": `${val}`
          }
        });
      }
      let reqOptions = {
        url: "https://data.mongodb-api.com/app/data-yzybn/endpoint/data/v1/action/findOne",
        method: "POST",
        headers: headersList,
        data: bodyContent,
      }

      let responseData = await axios.request(reqOptions);
      console.log(responseData.data);
      setresponse(responseData.data)
    }
    catch (err) {
      setresponse(err);
      console.error(response);
    }

  }

  return (
    <div className='SMS_Container' style={{ padding: "10px" }}>
      <div className="Find_SMS_Container">
        <div className="find_sms_form" style={{ display: "flex", width: "100%" }}>
          <Input value={val} onChange={(e) => { setVal(e.target.value) }} showCount maxLength={20} placeholder={"Search anything ..."} />
          <Button type='primary' onClick={onSubmit}>Go</Button>
        </div>
        <div style={{width:"100%"}}>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}

export default Find_SMS