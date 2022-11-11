import React from 'react'
import { Tabs } from 'antd'

import Send_SMS from '../Components/Send_SMS';
import Find_SMS from '../Components/Find_SMS';
import { Speech_To_Text } from '../Components/Speech_To_Text';
export  const SMS = () => {
    return (
        <div>
            <Tabs defaultActiveKey="1" tabPosition='top' type='card'>
                <Tabs.TabPane tab="Send SMS" key="1">
                    <Send_SMS />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Search SMS" key="2">
                    <Find_SMS />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Bill Generate" key="3">
                    <Speech_To_Text />
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}

export default SMS;