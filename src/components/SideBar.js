import "antd/dist/reset.css";
import { Menu } from "antd";
import { AppstoreOutlined, ShopOutlined, TableOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import { GiHamburgerMenu } from 'react-icons/gi'



function SideBar({collapsed}){
    const navigate = useNavigate();
    // const [collapsed, setCollapsed] = useState(false)
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

       <Sider theme="light"   
         breakpoint="xs"
         collapsed={!collapsed}
        
        >
          <Menu onClick={(item) => {
             navigate(item.key)
          }}  items={[
              {
                label : 'Dashboard',
                icon : <AppstoreOutlined />,
                key : '/dashboardpage'
            },
            {
                label : 'Conversation',
                key : '/conversation',
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