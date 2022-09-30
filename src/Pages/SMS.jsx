import React from 'react'
import { Tabs } from 'antd'

import Send_SMS from '../Components/Send_SMS';
import Find_SMS from '../Components/Find_SMS';
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
            </Tabs>
        </div>
    )
}

export default SMS;