import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin, Button } from 'antd';
import { useEffect, useState } from 'react';

const Loader = () => {
  console.log("loading...");
  //   <Flex align="center" gap="middle">
  //   <Spin indicator={<LoadingOutlined spin />} size="small" />
  //   <Spin indicator={<LoadingOutlined spin />} />
  //   <Spin indicator={<LoadingOutlined spin />} size="large" />
    
  //   <Spin
  //     indicator={
  //       <LoadingOutlined
  //         style={{
  //           fontSize: 70,
  //         }}
  //         spin
  //       />
  //     }
  //   />
  // </Flex>

// const [loading, setLoading] = useState(true);

// Simulate data fetching
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000); // Simulate API call with 3 seconds delay
  // }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      
        <Spin size="large" tip="Loading..." />
     
    </div>
  );
}

export default Loader;