import {
    MenuFoldOutlined,
    MenuUnfoldOutlined, MailOutlined, BellOutlined
  } from '@ant-design/icons';
  import { Layout, Button, theme, Space, Badge} from 'antd';
  import SideBar from "../components/SideBar"
import { useState } from 'react';
import DashBoard from './Dashboard';
  const { Header, Content } = Layout;


function LayoutPage(){
    const [collapsed, setCollapsed] = useState(false)
    const {
        token: { colorBgContainer },
      } = theme.useToken();
    return(
        <>
          <Layout>
            <SideBar collapsed={collapsed}/>
            <Layout>
            <Header
                style={{
                    padding: 0,
                    background: colorBgContainer,
            
                }}
                >
                <Button 
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                    }}
                />
                <div style={{display: 'flex', float : 'right', marginRight:'82px'}}>
                <Space>
                    
                    <Badge count={10} dot>
                        <MailOutlined style={{fontSize : 24}}/>
                    </Badge>
                    <Badge count={10}>
                        <BellOutlined style={{fontSize : 24}}/>
                    </Badge>
        
                
                </Space>
                </div>
                
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                    >
                    <DashBoard />
                    </Content>
            </Layout>
          </Layout>
        </>
    )
}

export default LayoutPage;