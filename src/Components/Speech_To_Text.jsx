import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button, Form, Input, notification } from 'antd';


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
      default :
              break;
  }
};

export const Speech_To_Text = () => {
  const [idx, setIdx] = useState(1);
  const [userIpt,setuserIpt] = useState('');
  const [data, setData] = useState({});
  const [form] = Form.useForm();
  const question = {
    1: {
      field: 'name',
      question: 'What is Customer Name ?'
    },
    2: {
      field: 'labour',
      question: "What is labour charge ?"
    }
  }

  const handleNext = ()=>{
    if(transcript.trim().length===0 || transcript.trim()==="")
    {
      openNotification('error','Please Speak Again','','top');
    }
    else
    {
      let temdata = {}
      temdata[`${question[idx]['field']}`] = userIpt;
      setData({ ...data, ...temdata });
      resetTranscript();
      setIdx(idx+1);
      console.log(data);
    }
  }

  const handlePrevious=()=>{
    resetTranscript();
    setIdx(idx-1);
  }
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(()=>{
    console.log("spealiung");
    setuserIpt(transcript.toString());
    form.setFieldValue('user_input',transcript);
  },[transcript])


  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  return (
    <Bill_Container>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <h1>{question[idx]?.question}</h1>
      <Form style={{width:"70%"}} form={form}>
        <Form.Item name="user_input"><Input.TextArea autoSize value={userIpt} onClick={SpeechRecognition.startListening} name='user_input' placeholder='Speak anything ...' onChange={(e)=>{setuserIpt(e.target.value)}} /></Form.Item>
      </Form>
      {/* <button onClick={SpeechRecognition.stopListening}>Stop</button> */}
      <p>{transcript}</p>
      <div className='button_Container'>
        <div className="hflex">
          <Button type='primary' onClick={handlePrevious} >&laquo; Prevs</Button>
          <Button type='primary' onClick={SpeechRecognition.startListening} className='start_button'>{listening ? 'Listening' : 'Speak'}</Button>
          <Button type='primary'onClick={handleNext} >Next &raquo;</Button>
        </div>
        <div style={{display:'flex',justifyContent:'center'}}><Button onClick={resetTranscript} type='primary'>Reset</Button></div>
      </div>
    </Bill_Container>
  )
}

const Bill_Container = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;

  textarea{
    text-align:center;
  }

  .hflex{
    display:flex;
    justify-content:space-evenly;
    align-items:center;
    gap:1rem;
  }

  .button_Container{
    position:fixed;
    display:flex;
    flex-direction:column;
    border:1px solid red;
    bottom:10%;
    padding:2rem;
    gap:1rem;
  }

  .start_button{
    width:5rem;
    height:5rem;
    border-radius:100%;
    text-align:center;
  }
`;