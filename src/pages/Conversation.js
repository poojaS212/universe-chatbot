/* eslint-disable no-unused-expressions */

import React from "react";
import { useState, useEffect, useRef } from "react";
import '../App.css'
import SideBar from "../components/SideBar";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MailOutlined,
  BellOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import {
  Layout,
  Button,
  theme,
  Space,
  Badge,
  Card,
  Tag,
  Table,
  Input,
  Modal,
  DatePicker,Flex, Spin
} from "antd";
// import moment from 'moment';

import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import Highlighter from "react-highlight-words";
import moment from "moment";
import api from "../Apis/api";

// import { v4 as uuid } from 'uuid';

import "./conversation.css";
import Chart from "../components/Chart";

import { BiLogIn, BiUser } from "react-icons/bi";
import Loader from "../components/Loader";
import PieChartPage from "./PieChartPage";

const { Header, Content } = Layout;
const { RangePicker } = DatePicker;

// const initialDate = moment();

// Define the desired date format
// const dateFormat = 'YYYY-MM-DD';

var stylingObject = {
  rowC: {
    display: "flex",
    flexDirection: "row",
    marginTop: "15px",
  },
  chatStart: {
    padding: "25px",
    display: "inline-block",
    /* min-height: 380px; */
    /* max-height: 380px; */
    background: "#fbfbfb",
    overflow: "auto",
  },

  chatBubbleYou: {
    backgroundImage:
      "linear-gradient(to right, #dee3e8, #d8dadd, #d2ccd6, #babfc4, #acb0b3)!important",
    color: "black !important",
    borderRadius: "0 15px 15px 15px",
    alignSelf: "flex-start",
    display: "table",
  },

  chatBubbleMe: {
    backgroundImage:
      "linear-gradient(to right, #FFFFFF, #FFFFFF, #FFFFFF, #FFFFFF, #FFFFFF)",
    color: "#888ea8",
    borderRadius: "15px 0px 15px 15px",
    float: "right",
    alignSelf: "flex-end",
    display: "table",
  },

  chatBubble: {
    fontSize: "12px",
    padding: "10px 15px",
    display: "inline-block",
    clear: "both",
    marginBottom: "10px",
    boxShadow: "0 5px 5px rgb(0 0 0 / 2%)",
  },
};

function Conversation() {
  const [collapsed, setCollapsed] = useState(false);

  const [user, setUser] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  const [bots, setBots] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [botCount, setbotCount] = useState(0);
  const [conversationsCount, setConversationsCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [conversationHTML, setConversationHTML] = useState("");
  const [last7DaysData, setLast7DaysData] = useState([]);
  const [totalConversation, setTotalConversation] = useState(0);
  const [totalLead, setTotalLead] = useState(0);

  const [hideColumn, setHideColumn] = useState(false); // table

  const [loading, setLoading] =  useState(true); // loader

  const [pieChartData, setpieChartData] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user_token")));
    setUserInfo(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    setLoading(true)
    if (user) {
      api
        .post(
          "/conversation/getBots",
          { company: userInfo?.company },
          {
            headers: {
              authorization: user,
            },
          }
        )
        .then((response) => {
          // console.log("🚀 ~ file: SignUp.js:70 ~ handleData ~ response:", response)

          if (response.status === 200) {
            setBots(response.data.result?.bots);
            setbotCount(response.data.result?.bots?.length);
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
        }).finally(() => {
          setLoading(false)
        })
    }
  }, [user?.token, userInfo?.company]);

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    console.log("heehee", event.target.value);
    
    if (event.target.value) getConversation(event.target.value);
  };

  // const handleDateFormat = (response) => {
  //   response?.reduce((acc, record) => {
  //     var d = new Date(record.added),
  //     month = '' + (d.getMonth() + 1),
  //     day   = '' + d.getDate(),
  //     year  = d.getFullYear();

  //     const date  = [year, month, day ].join('-')
  //     acc[date]   = (acc[date] || 0) + 1;
  //     return acc;
  //   }, {});
  // }

  async function filterRecordsLastYDays(records, y) {
    if (records) {
      const dataArray = await Object.keys(records).map((date) => ({
        date: date,
        conversations: records[date],
      }));

      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - y); // Calculate the date y days ago

      const lastYDaysRecords = dataArray.filter((record) => {
        const recordDate = new Date(record.date);
        return recordDate >= currentDate;
      });
      return lastYDaysRecords;
    }
  }

  // botConversations
  const getConversation = (botId) => {
    setLoading(true)
    api
      .post(
        "/conversation/botConversations",
        { bot: botId },
        {
          headers: {
            authorization: user,
          },
        }
      )
      .then(async (response) => {
        if (response.status === 200) {
          setConversations(response.data?.result);
          setConversationsCount(response.data?.result?.length);

          const pichartData = response.data?.result.reduce((acc, curr) => {
            console.log('curr',curr)
            if (!acc[curr.source]) {
              acc[curr.source] = 1
            } else{
              acc[curr.source] += 1
            }
          
            
            return acc;
          }, {})
          console.log("piechart", pichartData)
          setpieChartData(pichartData);
          console.log("sfdgdfs", response.data)

          var leads = 0;
          const countAccDate = await response.data?.result?.reduce(
            (acc, record) => {
              var d = new Date(record.added),
                month = "" + (d.getMonth() + 1),
                day = "" + d.getDate(),
                year = d.getFullYear();

              const date = [year, month, day].join("-");
              acc[date] = (acc[date] || 0) + 1;

              if (record.phone) {
                leads += 1;
              }

              setTotalLead(leads);
              console.log("Total leads", totalLead)
              return acc;
            },
            {}
          );

          // console.log("🚀 ~ file: Conversation.js:179 ~ countAccDate ~ countAccDate:", countAccDate)

          if (countAccDate) {
            const y = 7; // Replace this with the number of days you want to consider
            const lastYDaysRecords = await filterRecordsLastYDays(
              countAccDate,
              y
            );
            setLast7DaysData(lastYDaysRecords);
            // console.log("🚀 ~ file: Conversation.js:183 ~ countRecordsByDate ~ lastYDaysRecords:", lastYDaysRecords)
          }
          // var result = [];
          // for (var i=0; i<7; i++) {
          //   var d = new Date();
          //   d.setDate(d.getDate() - i);
          //   var month = '' + (d.getMonth() + 1),
          //   day = '' + d.getDate(),
          //   year = d.getFullYear();
          //   result.push( d )
          // }

          // // return(result.join(','));
          // console.log("🚀 ~ file: Conversation.js:160 ~ countRecordsByDate ~ result.join(','):", result.join(','))
          // console.log("🚀 ~ file: Conversation.js:147 ~ countAccDate ~ countAccDate:", countAccDate)
          // }

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
        toast.error(error.response?.data?.msg, {
          position: "top-center",
        });
      }).finally(()=> {
        setLoading(false)
      })
  };

  // ------------------ START Table Code --------------------------------

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const calculateWidth = (text) => text.length * 10;

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
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
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
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
          color: filtered ? "#1677ff" : undefined,
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
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleConversation = (conversation) => {
    setOpen(true);
    setConversationHTML(conversation);
    // const newData = dataSource.filter((item) => item.key !== key);
    // setDataSource(newData);
  };

  const [filteredData, setFilteredData] = useState([]);
  // const [filterDate, setFilterDate] = useState(null);

  const handleDateRangeChange = (dates) => {
    const [startDate, endDate] = dates;

    var leads = 0;
    const filteredDataSource = conversations.filter((item) => {
      const itemDate = moment(item.added);

      if (item.phone) {
        leads += 1;
      }
      return itemDate >= startDate && itemDate <= endDate.endOf("day");
    });

    // console.log("🚀 ~ file: Conversation.js:370 ~ handleDateRangeChange ~ leads:", leads)
    // setTotalConversation(conversations.length)
    setTotalConversation(filteredDataSource.length);
    setTotalLead(leads);
    setFilteredData(filteredDataSource);

    console.log("filteredData", filteredData);
  };

 

  const columns = [
    {
      key: React.Key,
      hidden: true,
    },

    // {
    //   title: () => <span>Total Rows: {conversations?.length}</span>,
    //   dataIndex: 'columnName',
    //   key: 'columnName',
    //   // Other column configurations
    // },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    // {
    //   title : 'Conversation',
    //   dataIndex : 'conversation',
    //   key : 'conversation'
    // },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      width: calculateWidth("source"),
      ...getColumnSearchProps("source"),
    },
    {
      title: "Sub Source",
      dataIndex: "subSource",
      key: "subSource",
      width: calculateWidth("subSource"),
      ...getColumnSearchProps("subSource"),
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
      title: "Date",
      dataIndex: "added",
      key: "added",
      sorter: (a, b) => a.added.length - b.added.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Replies",
      dataIndex: "",
      key: "x",
      render: (_, record) =>
        conversations.length >= 1 ? (
          <Tag
            color="#2db7f5"
            key={record._id}
            onClick={() => handleConversation(record)}
          >
            {
              (
                decodeURIComponent(record.conversation).match(
                  new RegExp("chat-bubble me", "g")
                ) || []
              ).length
            }
          </Tag>
        ) : null,
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      // render: () => <a>View Conversation</a>,
      render: (_, record) =>
        conversations.length >= 1 ? (
          <Tag
            color="#f50"
            key={record._id}
            onClick={() => handleConversation(record)}
          >
            Conversation
          </Tag>
        ) : null,
    },
  ];

  // ------------------ END Table Code   --------------------------------


function requiredData(conversation) {
  return conversation.name.length !==0 && conversation.email.length !==0
}

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  if(loading) return <Loader/>
  return (
    <>
      <Layout>
        <SideBar collapsed={!collapsed} />
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
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div
              style={{ display: "flex", float: "right", marginRight: "82px" }}
            >
              <Space>
                {/* <Badge count={10} dot>
                            <MailOutlined style={{fontSize : 24}}/>
                        </Badge>
                        <Badge count={10}>
                            <BellOutlined style={{fontSize : 24}}/>
                        </Badge> */}

                <NavLink to="/logout">
                  {" "}
                  <BiUser /> Logout
                </NavLink>
              </Space>
            </div>
          </Header>

          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Card>
              {bots ? (
                <Form>
                  <Form.Select
                    className="mb-3 col-lg-6"
                    aria-label="Default select example"
                    style={{ backgroundColor: "#00c67d", width: "50%" }}
                    value={selectedOption}
                    onChange={handleSelectChange}
                  >
                    <option>Open this select menu</option>
                    {bots &&
                      bots?.map((bot) => {
                        return (
                          <option value={bot._id} key={bot._id}>
                            {bot.name}
                          </option>
                        );
                      })}
                  </Form.Select>
                </Form>
              ) : null}
            </Card>

            {/* <Card>
              {bots ? (
                <Form>
                  <Form.Select
                    className="mb-3 col-lg-6"
                    aria-label="Default select example"
                    style={{ backgroundColor: "#00c67d", width: "50%" }}
                    value={selectedOption}
                    onChange={handleSelectChange}
                  >
                    <option>Open this select menu</option>
                    {bots &&
                      bots?.map((bot) => {
                        return (
                          <option value={bot._id} key={bot._id}>
                            {bot.name}
                          </option>
                        );
                      })}
                  </Form.Select>
                </Form>
              ) : null}
            </Card> */}

            <Card>
              {last7DaysData.length ? <Chart data={last7DaysData} /> : ""}
            </Card>
            <Space direction="horizontal">
            {!!pieChartData && <PieChartPage data={pieChartData}/>}
            </Space>
            
            

            <Modal
              title={conversationHTML?.name}
              centered
              open={open}
              onOk={() => setOpen(false)}
              onCancel={() => setOpen(false)}
              width={1000}
            >
              {/* { decodeURIComponent(conversationHTML?.conversation) } */}
              <div
                className="chat-body-react"
                dangerouslySetInnerHTML={{
                  __html: decodeURIComponent(conversationHTML?.conversation),
                }}
              ></div>
            </Modal>

            <Card>
              {conversations.length ? (
                <>
                  <RangePicker onChange={handleDateRangeChange} />
                  {/* <p>Total Conversation: { totalConversation >= 0 ? conversations?.length : totalConversation }</p> */}
                  <p>
                    Total Conversation:{" "}
                    {filteredData.length
                      ? filteredData.length
                      : conversations?.length}
                  </p>
                  <p>Total Leads: {totalLead}</p>

                  <Table
                    columns={columns}
                    // dataSource={conversations}

                    // dataSource={
                    //   filteredData.length > 0 ? filteredData : conversations
                    // }


                    dataSource={
                      filteredData.length > 0
                      ? filteredData.map((data) => ({
                          ...data,
                          key: Math.random().toString(),
                        }))
                        
                      : conversations.filter(requiredData).map((data) => ({
                          ...data,
                          key: Math.random().toString(),
                        }))
                    }
                 
                    // dataSource={dataSource.name !== 0  && da}

                    style={{ marginRight: 20 }}
                    scroll={{ x: true, y: 400 }}
                    bordered
                    expandable={{
                      expandedRowRender: (record) => (
                        <p style={{ margin: 0 }}>
                          {
                            <>
                              <h6>
                                URL:{" "}
                                <a href={record.url}>
                                  <i>{record.url}</i>
                                </a>
                              </h6>
                              <h6>
                                Referer URL:{" "}
                                <a href={record.refURL}>
                                  <i>{record.refURL}</i>
                                </a>
                              </h6>
                            </>
                          }
                        </p>
                      ),
                      rowExpandable: (record) =>
                        record._id !== "Not Expandable",
                    }}
                  >
                    
                  </Table>
                </>
              ) : null}
            </Card>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default Conversation;

// -- To do list
// 1. add loader on conversation page
// 2. converstation page styling
// 3. add new circular graph according to source