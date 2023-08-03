
import React from 'react';
import SideBar from "../components/SideBar";
import axios from "axios";
import { SearchOutlined } from '@ant-design/icons';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined, MailOutlined, BellOutlined
} from '@ant-design/icons';
import { Layout, Button, theme, Space, Badge, Card, Tag, Table, Input, Modal, DatePicker } from "antd";
import { useState, useEffect, useRef } from "react";
// import moment from 'moment';

// import { useNavigate, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';
import Highlighter from 'react-highlight-words';
import { v4 as uuid } from 'uuid';

import './conversation.css';

const { Header, Content } = Layout;

// const initialDate = moment();

// Define the desired date format
// const dateFormat = 'YYYY-MM-DD';

var stylingObject = {
    rowC: {
        display: "flex",
        flexDirection: "row",
        marginTop: '15px'
    },
    chatStart: {
        padding: "25px",
        display: "inline-block",
        /* min-height: 380px; */
        /* max-height: 380px; */
        background: "#fbfbfb",
        overflow: "auto"
    },

    chatBubbleYou: {
        backgroundImage: "linear-gradient(to right, #dee3e8, #d8dadd, #d2ccd6, #babfc4, #acb0b3)!important",
        color: "black !important",
        borderRadius: "0 15px 15px 15px",
        alignSelf: "flex-start",
        display: "table"
    },
    
    chatBubbleMe: {
        backgroundImage: "linear-gradient(to right, #FFFFFF, #FFFFFF, #FFFFFF, #FFFFFF, #FFFFFF)",
        color: "#888ea8",
        borderRadius: "15px 0px 15px 15px",
        float: "right",
        alignSelf: "flex-end",
        display: "table"
    },
    
    chatBubble: {
      fontSize: "12px",
      padding: "10px 15px",
      display: "inline-block",
      clear: "both",
      marginBottom: "10px",
      boxShadow: "0 5px 5px rgb(0 0 0 / 2%)"
    }

}

function Conversation(){
    const[collapsed, setCollapsed] = useState(false)

    const [user, setUser] = useState(false)
    const [userInfo, setUserInfo] = useState(false)
    const [bots, setBots] = useState([])
    const [conversations, setConversations] = useState([])
    const [botCount, setbotCount] = useState(0)
    const [conversationsCount, setConversationsCount] = useState(0)
    const [open, setOpen] = useState(false);
    const [conversationHTML, setConversationHTML] = useState('')

    useEffect(() => {
      setUser(JSON.parse(localStorage.getItem("user_token")))
      setUserInfo(JSON.parse(localStorage.getItem("user")))
    }, [])
    
    useEffect(() => {
      if(user) {
        axios.post("http://localhost:9000/conversation/getBots", { company: userInfo?.company } ,  {
            headers: {
              'authorization': user
            }
        })
        .then(response => {
            console.log("🚀 ~ file: SignUp.js:70 ~ handleData ~ response:", response)
          
            if(response.status === 200){
            
              setBots(response.data.result?.bots)
              setbotCount(response.data.result?.bots?.length)
              toast.success(response.data.msg, {
                  position: "top-center",
              });
            } else {
                toast.error(response.data.msg, {
                    position: "top-center",
                });
            }
        })
        .catch(function (error) {
              toast.error(error.response.data?.msg, {
                  position: "top-center",
              });
        })
      }
    }, [user?.token, userInfo?.company])

    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
        if (event.target.value) 
          getConversation(event.target.value)
    };

    // botConversations  
    const getConversation = (event) => {
      axios.post("http://localhost:9000/conversation/botConversations", { bot: event } ,  {
          headers: {
            'authorization': user
          }
      })
      .then(response => {
          if(response.status === 200) {
              // console.log('response.data?.result', response.data?.result)
              setConversations(response.data?.result)
              setConversationsCount(response.data?.result?.length)
              toast.success(response.data?.msg, {
                  position: "top-center",
              });
          } else {
              toast.error(response.data?.msg, {
                  position: "top-center",
              });
          }
      })
      .catch(function (error) {
          toast.error(error.response.data?.msg, {
              position: "top-center",
          });
      })
    }
  
    // ------------------ START Table Code --------------------------------
    
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText('');
    };
    
    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div
          style={{
            padding: 8,
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: 'block',
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({
                  closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? '#1677ff' : undefined,
          }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: '#ffc069',
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });

    const handleConversation = (conversation) => {
      setOpen(true)
      setConversationHTML(conversation)
      // const newData = dataSource.filter((item) => item.key !== key);
      // setDataSource(newData);
    };

    const columns = [
      { 
        key: React.Key,
      },

      {
        title : 'Name',
        dataIndex : 'name',
        key : 'name',
        ...getColumnSearchProps('name'),

      },
      {
        title : 'Email',
        dataIndex : 'email',
        key : 'email',
        ...getColumnSearchProps('email'),
      },
      // {
      //   title : 'Conversation',
      //   dataIndex : 'conversation',
      //   key : 'conversation'
      // },
      {
        title : 'Source',
        dataIndex : 'source',
        key : 'source',
        ...getColumnSearchProps('source'),
      },
      {
        title : 'Sub Source',
        dataIndex : 'subSource',
        key : 'subSource',
        ...getColumnSearchProps('subSource'),
      },
      // {
      //   title : 'URL',
      //   dataIndex : 'url',
      //   key : 'url'
      // },
      // {
      //   title : 'Ref URL',
      //   dataIndex : 'refURL',
      //   key : 'refURL'
      // },
      {
        title : 'Date',
        dataIndex : 'added',
        key : 'added',
        sorter: (a, b) => a.added.length - b.added.length,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Replies',
        dataIndex: '',
        key: 'x',
        render: (_, record) =>
        conversations.length >= 1 ? (
          <Tag color='#2db7f5' key={record._id} onClick={() => handleConversation(record)}>{(decodeURIComponent(record.conversation).match(new RegExp("chat-bubble me", "g")) || []).length}</Tag>
        ) : null,
      },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        // render: () => <a>View Conversation</a>,
        render: (_, record) =>
        conversations.length >= 1 ? (
            <Tag color='#f50' key={record._id} onClick={() => handleConversation(record)}>Conversation</Tag>
          ) : null,
      },
    ]

    // ------------------ END Table Code   --------------------------------

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return<>
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
                   
                <Card>
                  { bots ? 
                  ( <Form>
                      <Form.Select className="mb-3 col-lg-6" aria-label="Default select example" style={{backgroundColor : "#00c67d", width : "50%"}} value={selectedOption} onChange={handleSelectChange} >
                          <option>Open this select menu</option>
                          {bots && bots?.map((bot) => {
                              return <option value={bot._id} key={bot._id}>{bot.name}</option>
                          })}
                          
                      </Form.Select>
                  </Form> ) : null }
              
                 {/* {conversations.map(el => {
                        let date = new Date(el.added)
                        var month = date.getUTCMonth() + 1; //months from 1-12
                        var day = date.getUTCDate();
                        var year = date.getUTCFullYear();
                        // el.added_printabble = date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear()
                        el.added_printabble = day + "/" + month + "/" + year;
                    })
                } */}

                          {/* <table>
                            <tr>
                              <td>URL</td>
                              <td>{record.url}</td>
                            </tr>
                            <tr>
                              <td>Ref URL</td>
                              <td>{record.url}</td>
                            </tr>
                           
                          </table> */}
                          <Modal
                            title={conversationHTML?.name}
                            centered
                            open={open}
                            onOk={() => setOpen(false)}
                            onCancel={() => setOpen(false)}
                            width={1000}
                          >
                            {/* { decodeURIComponent(conversationHTML?.conversation) } */}
                            <div className="chat-body-react" dangerouslySetInnerHTML = {{__html: decodeURIComponent(conversationHTML?.conversation)} } ></div>
                          </Modal>
            
                  {
                    conversations.length ? (
                      <Table columns={columns}
                        dataSource={conversations}
                        style={{marginRight : 20}}
                        bordered
                        expandable={{
                          expandedRowRender: (record) => <p style={{ margin: 0 }}>{<>
                            <h6>URL: <a href={record.url} ><i>{record.url}</i></a></h6>
                            <h6>Referer URL: <a href={record.refURL} ><i>{record.refURL}</i></a></h6>
                          </>}</p>,
                          rowExpandable: (record) => record._id !== 'Not Expandable',
                        }}
                        >
                      </Table>
                    ) : ''
                  }
                </Card>

                </Content>
            </Layout>
       </Layout>
    </>
}

export default Conversation;