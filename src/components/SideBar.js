import "antd/dist/reset.css";
import { Menu } from "antd";
import { AppstoreOutlined, ShopOutlined, TableOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import { GiHamburgerMenu } from 'react-icons/gi'
import { useState } from "react";


function SideBar(){
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false)
    return <>
       {/* <Sider className="SideMenu" collapsed={collapsed}>
          <Menu onClick={(item) => {
             navigate(item.key)
          }} 
          items={[
            {
                label : 'Dashboard',
                icon : <AppstoreOutlined />,
                key : '/dashboard'
            },
            {
                label : 'Inventory',
                key : '/inventory',
                icon: <ShopOutlined />
            },
            {
                label : 'Tables',
                key : '/tables',
                icon: <TableOutlined />
            }

          ]}></Menu>
       </Sider> */}

       <Sider theme="light" className="" collapsed={collapsed}>
         <div style={{display : "flex", alignItems : "center"}}>
                <GiHamburgerMenu onClick={() => setCollapsed(!collapsed)} size={34} style={{marginLeft : 20, marginTop : 10, marginBottom: 30, cursor:'pointer'}}/>
            </div>
          <Menu items={[
              {
                label : 'Dashboard',
                icon : <AppstoreOutlined />,
                key : '/dashboard'
            },
            {
                label : 'Inventory',
                key : '/inventory',
                icon: <ShopOutlined />
            },
            {
                label : 'Tables',
                key : '/tables',
                icon: <TableOutlined />
            }
          ]}></Menu>
       </Sider>
    </>
}

export default SideBar