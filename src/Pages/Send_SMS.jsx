import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Form, Input, Button, Radio ,notification} from 'antd'

// ===========> GRAND, 
const Festival='diwali' // not more than 6 characters

function revisedRandId() {
    return Math.random().toString().slice(12);
}

const openNotification = (openType,message,description,placement) => {
    switch(openType)
    {
        case 'info':
            notification.info({
                message,
                description,
                placement,
                duration:3
              });
              break;
        case 'success':
            notification.success({
                message,
                description,
                placement,
                duration:3
                });
                break;
        case 'error':
            notification.error({
                message,
                description,
                placement,
                duration:3
                });
            break;
        case 'warning':
            notification.warning({
                message,
                description,
                placement,
                duration:3
                });
                break;
    }
  };
  

function Generate_Message(data) {
    switch (data.smstype) {
        case 'id':  
            return [
                `Welcome ${data.name} for ${Festival} offer, your customer-id is ${data.id}. We also accept online payment at 9408276130 - FROM SUNGOLD (MANGALDEEP).`,
                `Congratulations ${data.name}, your registration ID is ${data.id} for ${Festival} offer. We also accept online payment at 9408276130 - FROM SUNGOLD (MANGALDEEP).`,
                `Congratulations ${data.name} having listed with ID : ${data.id} for ${Festival} offer. We also accept online payment at 9408276130 - FROM SUNGOLD (MANGALDEEP).`
            ]
            break;
        case 'amount':
            return [
                `Thank you ${data.name}, we have received your payment for ${data.amount} Rs. We also accept online payment at 9408276130 - FROM SUNGOLD (MANGALDEEP).`,
                `Thankyou ${data.name}, we got your payment of ${data.amount} Rs under ${Festival} offer. We also accept online payment at 9408276130 - FROM SUNGOLD (MANGALDEEP).`,
                `Welcome to ${Festival} offer ${data.name}, we got your payment of ${data.amount} Rs. We also accept online payment at 9408276130 - FROM SUNGOLD (MANGALDEEP).`
            ]
            break;
        case 'custom':
            return [data.message]
            break;
        default :
            return [data.message]
            break;
    }
    // return [
    //     `Welcome ${data.name} for Diwali Offer from SUNGOLD JEWELLERY, we have recevied your payment of `
    // ]
}

const Send_SMS = () => {
    const [smsData,setsmsData] = useState({
        name:"",
        phonenumber:"",
        smstype:"",
        messageText:"",
        amount:"",
        id:revisedRandId(),
        wallet:""
    });
    const [loading, setloading] = useState(false)

    const onFinish = async (values) => {
        setloading(true);
        try{
            // const response = await axios.get(`https://www.fast2sms.com/dev/bulkV2?authorization=PvvtrxIbU6aK2ktHBGjnNdsnMxPwoL7Myb69SPTqv0rii9OtRXS7N07qHeGu&message=${smsData.message}&language=english&route=q&numbers=${smsData.phonenumber}`)
            // if(response.data.return)
            // {
            //     openNotification("success","SMS Sent",`SMS sent to ${values.name}`,'top')
            //     const walletresponse = await axios.get(" https://www.fast2sms.com/dev/wallet?authorization=PvvtrxIbU6aK2ktHBGjnNdsnMxPwoL7Myb69SPTqv0rii9OtRXS7N07qHeGu");
            //     setsmsData({...smsData,wallet:walletresponse.data.wallet})
            // }
            // else
            // {
            //     openNotification("error","SMS Not Sent!",`${response.data.status_code}`,'top')
            // }
            console.log(values)
            setloading(false);
        }
        catch(err){
            openNotification("error","SMS Not Sent!",`${err.response.data.message}`,'top')
        }
        setloading(false);

    };

    const onFinishFailed = (errorInfo) => {
        openNotification('error',"SMS Not Send!","Please fill all details correctly",'top')
    };

    const OnRadioChange = (e) => {
        console.log(e.target.value);
        setsmsData({...smsData,smstype: e.target.value});
    }

    useEffect(() => {
        async function walletCall() {
            console.log("wallet called")
            const response = await axios.get(" https://www.fast2sms.com/dev/wallet?authorization=PvvtrxIbU6aK2ktHBGjnNdsnMxPwoL7Myb69SPTqv0rii9OtRXS7N07qHeGu");
            setsmsData({...smsData,wallet: response.data.wallet})
        }
        walletCall();
        if(parseInt(smsData.wallet)<=20){
            openNotification("warning","Low Balance !",`Balance is less than 20 Rs`,'top')
        }
    }, []);

    useEffect(()=>{
        const msg=Generate_Message(smsData);
        const final_msg=msg[Math.floor(Math.random()*msg.length)]
        setsmsData({...smsData,messageText:final_msg})
    },[smsData.name,smsData.id,smsData.amount,smsData.smstype]);
    return (
        <div className='SMS_Container'>
            <div className="form_container">
                <h2>Send SMS - Balance : {smsData.wallet} Rs</h2>
                <Form
                    layout='vertical'
                    name="basic"
                    // labelCol={{ span: 8 }}
                    // wrapperCol={{ span: 16 }}
                    initialValues={{}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Customer Name"
                        rules={[{ required: true, message: 'Please input customer name!' }]}
                    >
                        <Input showCount maxLength={20} value={smsData.name} onChange={(e)=>{setsmsData({...smsData,name:e.target.value})}}/>
                    </Form.Item>

                    <Form.Item
                        label="Customer Phone No."
                        rules={[{ required: true, message: 'Please input customer phone number!' }]}
                    >
                        <Input pattern="^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$" value={smsData.phonenumber} showCount maxLength={10} onChange={(e)=>{setsmsData({...smsData,phonenumber:e.target.value})}}/>
                    </Form.Item>

                    <Form.Item label="Select SMS Type"
                        rules={[{ required: true, message: 'Please SMS Type!' }]}>
                        <Radio.Group onChange={OnRadioChange}>
                            <Radio.Button value="amount"> Amount Payed </Radio.Button>
                            <Radio.Button value="id"> Customer ID </Radio.Button>
                            <Radio.Button value="custom"> Custom Message</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    {
                        (() => {
                            switch (smsData.smstype) {
                                case 'id':
                                    return <p>ID : {smsData.id}</p>;
                                    break;
                                case 'amount':
                                    return <Form.Item
                                        label="Enter Amount"
                                        name="amount"
                                        rules={[{ required: true, message: 'Please enter amount!' }]}
                                    >
                                        <Input showCount type={"number"} value={smsData.amount} onChange={(e)=>{setsmsData({...smsData,amount:e.target.value})}}/>
                                    </Form.Item>;
                                    break;
                                case 'custom':
                                    return <p>Plz enter your custom message below</p>
                                    break;
                                default: return <p>Select SMS Type</p>; break;
                            }
                        })()
                    }
                    <Form.Item
                        label="Enter Message"
                        rules={[{ required: true, message: 'Please enter message!' }]}
                    >
                        <Input.TextArea rows={4} showCount maxLength={160} value={smsData.messageText}  onChange={(e)=>{setsmsData({...smsData,messageText :e.target.value})}}/>
                    {/* <textarea name='messageText' value={smsData.messageText} onChange={(e)=>{setsmsData({...smsData,message:e.target.value})}}></textarea> */}
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button htmlType="submit" loading={loading} disabled={loading} type={"primary"}>
                            Send
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        </div>
    )
}

export default Send_SMS

// var axios = require('axios');
// var data = JSON.stringify({
//     "collection": "SMS",
//     "database": "SMS_Database",
//     "dataSource": "Cluster0",
//     "projection": {
//         "_id": 1
//     }
// });
            
// var config = {
//     method: 'post',
//     url: 'https://data.mongodb-api.com/app/data-yzybn/endpoint/data/v1/action/findOne',
//     headers: {
//       'Content-Type': 'application/json',
//       'Access-Control-Request-Headers': '*',
//       'api-key': 't4MPHMnrhCV7IjjkWYJEMpHPlUoa3YybkJQA3oeKJ3mczP2USyO6T6sX0i0GA9rz',
//       'Accept': 'application/ejson'
//     },
//     data: data
// };
            
// axios(config)
//     .then(function (response) {
//         console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//         console.log(error);
//     });
