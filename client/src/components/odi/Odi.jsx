import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input, Table } from "antd";
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

import "./odi.css";
import moment from "moment";

 //Table col
const columns = [
  {
    title: "Batting Score",
    dataIndex: "batting_score",
    key: "batting_score",
  },
  {
    title: "Wickets",
    dataIndex: "wickets",
    key: "wickets",

    defaultSortOrder: "descend",
    sorter: (a, b) => {
      // console.log(a, b);
      return a["wickets"] > b["wickets"]
        ? -1
        : a["wickets"] < b["wickets"]
        ? 1
        : 0;
    },
  },
  {
    title: "Runs Conceded",
    dataIndex: "runs_conceded",
    key: "runs_conceded",
  },
  {
    title: "Catches",
    dataIndex: "catches",
    key: "catches",
  },
  {
    title: "Stumps",
    dataIndex: "stumps",
    key: "stumps",
  },
  {
    title: "Opposition",
    dataIndex: "opposition",
    key: "opposition",
  },
  {
    title: "Ground",
    dataIndex: "ground",
    key: "ground",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",

    width: 120,
    render: (text) => <p>{moment(text).format("DD MMM YYYY")}</p>,

    defaultSortOrder: "descend",
    sorter: (a, b) => {
      return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
    },
  },
  {
    title: "Match_Result",
    dataIndex: "match_result",
    key: "match_result",

    filters: [
      {
        text: "lost",
        value: "lost",
      },
      {
        text: "tied",
        value: "tied",
      },
      {
        text: "won",
        value: "won",
      },
      {
        text: "n/r",
        value: "n/r",
      },
    ],

    onFilter: (value, record) => {
      return record.match_result.includes(value);
    },
    render: (text) => (
      <p style={{ color: text === "won" ? "green" : "red" }}>{text}</p>
    ),
  },
  {
    title: "Result_Margin",
    dataIndex: "result_margin",
    key: "result_margin",
  },
  {
    title: "Toss",
    dataIndex: "toss",
    key: "toss",

    filters: [
      {
        text: "lost",
        value: "lost",
      },

      {
        text: "won",
        value: "won",
      },
    ],
    onFilter: (value, record) => {
      return record.toss.includes(value);
    },
  },
  {
    title: "Batting_Innings",
    dataIndex: "batting_innings",
    key: "batting_innings",
  },
];


export const Odi = () => {
  const [loading, setLoading] = useState(false);
  const [odiData, setOdiData] = useState([]);
  const [filterTable, setFilterTable] = useState(null && "");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchRecords(1);
  }, []);
  const fetchRecords = (page) =>{
   const url = `http://localhost:3030/odi?page=${page}&size=10`
  let isApiSubscribed = true;
  setLoading(true);
  axios.get(url)
  .then(( res)=>{
    if (isApiSubscribed) {
            console.log(res.data.results);
          //  console.log(res.data.totalPages);
           setOdiData(res.data.results);
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

    const filterTable = odiData.filter((item) =>
      Object.keys(item).some((k) =>
        String(item[k]).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilterTable(filterTable);
  };

  return (
    <div className="group">
      <h2 style={{ color: "red" }}>Odi Page</h2>
    
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
        dataSource={filterTable == null ? odiData : filterTable}
        columns={columns}
        pagination={{
          pageSize: 10,
          total: totalPages,
          onChange: (page) => {
            fetchRecords(page);
          },
        }}
      />

      {/* Chart........ */}
      <h1> Odi Bar Chart</h1>
      <ResponsiveContainer width="100%" aspect={3}>
        <BarChart
          width={500}
          height={300}
          data={odiData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="opposition" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="batting_score" fill="green" />
          <Bar dataKey="catches" fill="red" />
          <Bar dataKey="wickets" fill="orange" />
          <Bar dataKey="stumps" fill="black" />
          <Bar dataKey="match_result" fill="#2C3A47" />
          <Bar dataKey="ground" fill="#2C3A47" />
          <Bar dataKey="runs_conceded" fill="blue" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Odi;
