import {
  LineChartOutlined,
  PieChartOutlined,
  BarChartOutlined,
  FundOutlined,
} from "@ant-design/icons";
import {
  Card,
  Divider,
  Space,
  Statistic,
  Table,
  Typography,
  Col,
  Row,
} from "antd";
import { useEffect, useState } from "react";
import { getRecentLeads, getLeadsCharts } from "../Apis/index";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import SideBar from "../components/SideBar";
import PieChartPage from "./PieChartPage";
import api from "../Apis/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DashBoard(props) {
  console.log("🚀 ~ file: Dashboard.js:29 ~ DashBoard ~ props:", props);
  // const pieData = {
  //   labels : ['One', 'Two', 'Three'],
  //   datasets : [
  //     {
  //       data : [3, 6, 8],
  //       backgroundColor : ['aqua', 'purple', 'green']
  //     }
  //   ]
  // }

  const [user, setUser] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  const [totalBots, setTotalBots] = useState(0);
  const [conversationsCount, setConversationsCount] = useState(0);
  const [totalLeads, setTotalLeads] = useState(0);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user_token")));
    setUserInfo(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    console.log("vshsbdjs");
    if (user) {
      api
        .post(
          "http://localhost:9000/conversation/getBots",
          { company: userInfo?.company },
          {
            headers: {
              authorization: user,
            },
          }
        )
        .then((res) => {
          setTotalBots(res.data.result.bots.length);
          console.log("bots", res.data.result.bots);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [user]);

  useEffect(() => {
    // console.log("user", user);
    api
      .post(
        "http://localhost:9000/conversation/allbotConversations", {},
        {
          headers: {
            authorization: user,
          },
        }
      )
      .then((res) => {
        setConversationsCount(res.data.result.length);
        console.log("conversation", res.data);

        var leads = 0;
        const countAccDate = res.data?.result?.reduce(
          (acc, record) => {
            var d = new Date(record.added),
              month = "" + (d.getMonth() + 1),
              day = "" + d.getDate(),
              year = d.getFullYear();

            const date = [year, month, day].join("-");
            acc[date] = (acc[date] || 0) + 1;

            console.log("record", record);

            if (record.phone) {
              leads += 1;
            }

            setTotalLeads(leads);
            return acc;
          },
          {})
        })

      .catch((e) => {
        console.log(e);
      });
  }, [user]);

  return (
    <>
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>DashBoard</Typography.Title>
        <Space direction="horizontal">
          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            justify="space-around"
          >
            <Col className="gutter-row" span={6}>
              <DashBoardCard
                icon={<LineChartOutlined className="iconColor1 iconFeature" />}
                title="Total Bots"
                value={totalBots}
              />
            </Col>
            <Col className="gutter-row" span={6}>
              <DashBoardCard
                icon={<PieChartOutlined className="iconColor2 iconFeature" />}
                title="Total Conversations"
                value={conversationsCount}
              />
            </Col>
            <Col className="gutter-row" span={6}>
              <DashBoardCard
                icon={<BarChartOutlined className="iconColor3 iconFeature" />}
                title="Total Leads"
                value={totalLeads}
              />
            </Col>
          </Row>
        </Space>
        <Divider />
        <Space direction="horizontal">
          <PieChartPage />
        </Space>
        {/* <Space>
            <Row justify="space-around">
              <Col>
                 <RecentLeads />
              </Col>
              <Col>
                 <DashBoardChart />
              </Col>
            </Row>
            
           
          </Space> */}
      </Space>
    </>
  );
}

function DashBoardCard({ title, value, icon }) {
  return (
    <Card style={{ width: 300, marginLeft: 20, marginRight: 20 }}>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value}></Statistic>
      </Space>
    </Card>
  );
}

function RecentLeads() {
  // const[dataSource, setDataSource] = useState([]);
  // const[loading, setLoading] = useState([false]);
  // useEffect(() => {
  //    setLoading(true)
  //    getRecentLeads().then((result) => {
  //     console.log('res',result);
  //     setDataSource(result.prducts);
  //     setLoading(false)
  //    })
  // }, [])

  // useEffect(() => {
  //   setLoading(true)

  //   const getTableData = async () => {
  //     const data = await fetch('https://jsonplaceholder.typicode.com/todos')
  //     .t => response.json)
  //     .then(data => {

  //        setDataSource(data)
  //     }).catch(err => {
  //       console.log(err)
  //     }).finally(() => {
  //       setLoading(false)
  //       console.log("adsds")
  //     })

  //     console.log(data);

  //     getTableData();
  //   }

  //  fetch('https://jsonplaceholder.typicode.com/todos')
  //  .then(response => response.json)
  //  .then(data => {
  //     setDataSource(data)
  //  }).catch(err => {
  //    console.log(err)
  //  }).finally(() => {
  //    setLoading(false)
  //  })
  // }, [])

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 30,
      address: "12 Park Street",
    },
  ];
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  // const columns = [{
  //   title : 'ID',
  //   dataIndex : 'id',
  //   key : '1'
  // },
  // {
  //   title : 'USER ID',
  //   dataIndex : 'user id',
  //   key : '2'
  // },
  // {
  //   title : 'STATUS',
  //   dataIndex : 'completed',
  //   key : '3',
  //   render:(completed) => {
  //     return <p>{completed ? 'completed' : 'In progress'}</p>
  //   }
  // },
  // ]

  return (
    <>
      <Typography.Text>Recent Leads</Typography.Text>

      {/* <Table columns={columns}
    dataSource={dataSource}
    style={{marginRight : 20}}
    >

    </Table> */}
    </>
  );
}

function DashBoardChart() {
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getLeadsCharts().then((result) => {
      const labels = result.carts.map((cart) => {
        return `Users - ${cart.userId}`;
      });

      const data = result.carts.map((cart) => {
        return `${cart.discountedTotal}`;
      });

      const dataSource = {
        labels,
        datasets: [
          {
            label: "Revenue",
            data: labels.map(() => Math.random() * 1000),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      };

      setRevenueData(dataSource);
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Leads Revenue",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  return (
    <>
      <Card style={{ height: 350, width: 500 }}>
        <Bar options={options} data={revenueData} />
      </Card>
    </>
  );
}

export default DashBoard;
