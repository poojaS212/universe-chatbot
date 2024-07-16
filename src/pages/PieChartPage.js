import { LineChartOutlined, PieChartOutlined, BarChartOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import api from '../Apis/api';
import {getRecentLeads, getLeadsCharts} from "../Apis/index";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );

  function PieChartPage(){
   //   const data = {
   //      datasets : [{
   //          data : [10,20,30],
   //          backgroundColor : ['#428449b8', '#e292ad', '#58a5e7d6' ]
   //      }],
   //      labels : ['#428449b8', '#e292ad', '#58a5e7d6']
   //   }

     const [data, setData] = useState({
      datasets : [{
          data : [10,20,30],
          backgroundColor : ['#428449b8', '#e292ad', '#58a5e7d6' ]
      }],
      labels : ['#428449b8', '#e292ad', '#58a5e7d6']
   })

     useEffect(()=>{
      // const fetchData = () =>{
      //    fetch('http://localhost:9000/conversation/getBots').then((data) => {
      //       const res = data.json();
      //       console.log("result", res);
      //       return res;
      //    }).catch(e => {
      //       console.log("error", e)
      //    })
      // }

   //     const fetchData = () => {
   //       api.post('http://localhost:9000/conversation/getBots').then((response) => {
   //           console.log("result", response.data);
   //           return response.data;
   //       }).catch(error => {
   //          console.log('error', error);
   //       })
   //     }
   //     fetchData();

     },[])

     return(
        <div>
            <Pie data={data}/>
        </div>
     )
  }

  export default PieChartPage;