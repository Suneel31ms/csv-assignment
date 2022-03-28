import { Input, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
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
    title: "Runs",
    dataIndex: "Runs",
    key: "Runs",

    defaultSortOrder: "descend",
    sorter: (a, b) => a.Runs - b.Runs,
  },
  {
    title: "Mins",
    dataIndex: "Mins",
    key: "Mins",
  },
  {
    title: "BF",
    dataIndex: "BF",
    key: "BF",
  },
  {
    title: "4s",
    dataIndex: "4s",
    key: "4s",
  },
  {
    title: "6s",
    dataIndex: "6s",
    key: "6s",
  },
  {
    title: "SR",
    dataIndex: "SR",
    key: "SR",
  },
  {
    title: "Pos",
    dataIndex: "Pos",
    key: "Pos",
  },
  {
    title: "Dismissal",
    dataIndex: "Dismissal",
    key: "Dismissal",
  },
  {
    title: "Inns",
    dataIndex: "Inns",
    key: "Inns",
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

const Batting = () => {
  const [loading, setLoading] = useState(false);
  const [battingData, setbattingData] = useState([]);
  const [filterTable, setFilterTable] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchRecords(1);
  }, []);


  const fetchRecords = (page) =>{
    let isApiSubscribed = true;
    setLoading(true);
    axios.get(`http://localhost:3030/batting?page=${page}&size=10`)
    .then(( res)=>{
      if (isApiSubscribed) {
              console.log(res.data.results);
              // console.log(res.data.totalPages);
              setbattingData(res.data.results);
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

    const filterTable = battingData.filter((item) =>
      Object.keys(item).some((k) =>
        String(item[k]).toLowerCase().includes(value.toLowerCase())
      )
    );

    setFilterTable(filterTable);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ color: "red" }}>Batting Score Page</h2>
      {/* search */}
      <Input.Search
        style={{ width: "20%", margin: "10px" }}
        placeholder="Search by..."
        enterButton
        onSearch={search}
      />

      
        <Table
        loading={loading}
          rowKey="_id"
          dataSource={filterTable == null ? battingData : filterTable}
          columns={columns}
          pagination={{
            pageSize: 10,
            total: totalPages,
            onChange: (page) => {
              fetchRecords(page);
            },
          }}
        />
     
      {/* Chart */}
      <h1 style={{ textAlign: "center" }}> Batting Bar Chart</h1>
      <ResponsiveContainer width="100%" aspect={3}>
        <BarChart
          width={500}
          height={300}
          data={battingData}
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
          <Bar dataKey="Runs" fill="green" />
          <Bar dataKey="Mins" fill="#F97F51" />
          <Bar dataKey="BF" fill="#182C61" />
          <Bar dataKey="4s" fill="orange" />
          <Bar dataKey="6s" fill="black" />
          <Bar dataKey="SR" fill="#BDC581" />
          <Bar dataKey="Pos" fill="#FD7272" />
          <Bar dataKey="Dismissal" fill="red" />
          <Bar dataKey="Inns" fill="blue" />
          <Bar dataKey="Ground" fill="#2C3A47" />
          <Bar dataKey="Result" fill="#2C3A47" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Batting;
