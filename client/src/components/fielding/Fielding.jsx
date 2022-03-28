import { Input, Table } from "antd";
import axios from "axios";
import moment from "moment";

import React, { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

//Table
const columns = [
  {
    title: "Overs",
    dataIndex: "Overs",
    key: "Overs",
  },
  {
    title: "Mdns",
    dataIndex: "Mdns",
    key: "Mdns",
  },
  {
    title: "Runs",
    dataIndex: "Runs",
    key: "Runs",
  },
  {
    title: "Wkts",
    dataIndex: "Wkts",
    key: "Wkts",
  },
  {
    title: "Econ",
    dataIndex: "Econ",
    key: "Econ",
  },
  {
    title: "Pos",
    dataIndex: "Pos",
    key: "Pos",
  },
  {
    title: "Inns",
    dataIndex: "Inns",
    key: "Inns",
  },
  {
    title: "Dismisal Made",
    dataIndex: "Dismisal Made",
    key: "_id",
  },
  {
    title: "Catch Taken",
    dataIndex: "Catch Taken",
    key: "Catch Taken",

    defaultSortOrder: "descend",
    sorter: (a, b) => a["Catch Taken"] - b["Catch Taken"],
  },
  {
    title: "Opposition",
    dataIndex: "Opposition",
    key: "Opposition",
  },
  {
    title: "Ground",
    dataIndex: "Ground",
    key: "Ground",
  },

  {
    title: "Start DateAscending",
    dataIndex: "Start DateAscending",
    key: "Start DateAscending",

    width: 120,
    render: (text) => <p>{moment(text).format("DD MMM YYYY")}</p>,

    defaultSortOrder: "descend",
    sorter: (a, b) => {
      return a["Start DateAscending"] > b["Start DateAscending"]
        ? -1
        : a["Start DateAscending"] < b["Start DateAscending"]
        ? 1
        : 0;
    },
  },
  {
    title: "Match Number",
    dataIndex: "Match Number",
    key: "Match Number",
  },
  {
    title: "Result",
    dataIndex: "Result",
    key: "Result",

    filters: [
      {
        text: "Loss",
        value: "Loss",
      },
      {
        text: "Drawn",
        value: "Drawn",
      },
      {
        text: "Won",
        value: "Won",
      },
    ],
    onFilter: (value, record) => {
      return record.Result.includes(value);
    },
    render: (text) => (
      <p style={{ color: text === "Won" ? "green" : "red" }}>{text}</p>
    ),
  },
];

const Fielding = () => {
  const [loading, setLoading] = useState(false);
  const [fieldingData, setfieldingData] = useState([]);
  const [filterTable, setFilterTable] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchRecords(1);
  }, []);

 const fetchRecords = (page) =>{
  let isApiSubscribed = true;
  setLoading(true);
  axios.get(`http://localhost:3030/fielding?page=${page}&size=10`)
  .then(( res)=>{
    if (isApiSubscribed) {
            console.log(res.data.results);
            // console.log(res.data.totalPages);
            setfieldingData(res.data.results);
            setLoading(false);
            setTotalPages(res.data.totalPages)
          }
  })
    .catch((err) => {
      console.log(err.message);
    });
  return () => {
    isApiSubscribed = false;
  };
 }

  
  //search data
  const search = (value) => {
    console.log("PASS", { value });

    const filterTable = fieldingData.filter((item) =>
      Object.keys(item).some((k) =>
        String(item[k]).toLowerCase().includes(value.toLowerCase())
      )
    );

    setFilterTable(filterTable);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ color: "red" }}>Fielding Score Page</h2>
      <Input.Search
        style={{ width: "20%", margin: "10px" }}
        placeholder="Search by..."
        enterButton
        onSearch={search}
      />

     
        <Table rowKey="_id" dataSource={filterTable == null ? fieldingData : filterTable} columns={columns}
       loading={loading}
        pagination={{
          pageSize: 10,
          total: totalPages,
          onChange: (page) => {
            fetchRecords(page);
          },
        }}
        />
    

      {/* Chart.......... */}
      <h1 style={{ textAlign: "center" }}> Fielding Bar Chart</h1>
      <ResponsiveContainer width="100%" aspect={3}>
        <BarChart
          width={500}
          height={300}
          data={fieldingData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Opposition" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Overs" fill="#F97F51" />
          <Bar dataKey="Mdns" fill="#182C61" />
          <Bar dataKey="Runs" fill="green" />
          <Bar dataKey="Wkts" fill="orange" />
          <Bar dataKey="Econ" fill="black" />
          <Bar dataKey="Pos" fill="#BDC581" />
          <Bar dataKey="Dismisal Made" fill="#FD7272" />
          <Bar dataKey="Catch Taken" fill="red" />
          <Bar dataKey="Inns" fill="blue" />
          <Bar dataKey="Ground" fill="#2C3A47" />
          <Bar dataKey="Result" fill="#2C3A47" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Fielding;
