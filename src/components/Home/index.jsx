import React, { useState, useMemo, useEffect, useCallback } from "react"
import { Row, Col, Select, Input, Card, Button, Skeleton, notification } from "antd"
import axios from "axios"

import { options, urls} from "./data"
import WelcomeSection from "./welcome"
import List from "./List"
import CountryTable from "./CountryTable"
import { AnimatePresence, motion } from 'framer-motion';
import SliderToggle from "../../shared_components/SliderToggle"

const PAGE_SIZE = 12

const { Option } = Select;


export default function Home(){

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [filter, setFilter] = useState({ inputValue:"", selectValue:"all" })
  const [ selectedView, setSelectedView] = useState("list")

  //Infinite Scrolling Feature
  const [displayedData, setDisplayedData] = useState([])
  const [loadMoreLoading, setLoadMoreLoading] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dataSize, setDataSize] = useState(0)

  //Sort Options for data
  const [sort, setSort] = useState("name")

  const API_END_POINT = useMemo(()=> urls[filter?.selectValue](filter?.inputValue),[filter?.selectValue, filter?.inputValue])
  const Query_STRING = "?fields=name,population,capital,currencies,flag,flags,region"

  useEffect(()=>{
    get_data()
  },[])

  const get_data = async() => {
    try{
      setLoading(true)
      const response = await axios.get(API_END_POINT + Query_STRING)
      if (Array.isArray(response?.data)) {
        setDataSize(response?.data?.length)
        if(response?.data?.length < PAGE_SIZE){
          setDisplayedData(response.data.slice(0, response?.data))
        } else {
          setDisplayedData(response.data.slice(0, PAGE_SIZE))
        }
        setData(response?.data)
        setCurrentIndex(PAGE_SIZE)
      } else if(typeof response?.data === "object" && response?.data !== null){
        setDataSize(1)
        setData([response?.data])
        setDisplayedData([response?.data])
        setCurrentIndex(PAGE_SIZE)
      }
    } catch(err){
      console.log(err)
      notification.error({
        message: 'Failed to load data',
        description: `Could not fetch data from filters. Please check the country name and try again.`,
        placement: 'topRight',
      });
    } finally {
      setLoading(false)
    } 
  }

  const loadMoreData = useCallback(() => {
    setLoadMoreLoading(true);
    const nextIndex = currentIndex + PAGE_SIZE;

    setTimeout(() => {
      if (nextIndex <= dataSize) {
        setDisplayedData(data.slice(0, nextIndex));
      } else {
        setDisplayedData(data.slice(0, dataSize));
      }
      setCurrentIndex(nextIndex);
      setLoadMoreLoading(false);
    }, 5000);
  }, [currentIndex, data, dataSize])

  const sortData = (criterion) => {
    setLoading(true)

    setTimeout(() => {
      const sorted = [...data].sort((a, b) => {
        if (criterion === 'name') {
          return a.name.official.localeCompare(b.name.official);
        } else if (criterion === 'population') {
          return a.population - b.population;
        }
        return 0;
      });
  
      setData(sorted);
      setLoading(false);
    }, 1200);
  };

  return(
    <div className="h-screen overflow-hidden p-4">
        <Card>
          <Row gutter={[14, 14]} align="middle">
            <Col xs={24} sm={12} md={12} lg={10} xl={10}>
              <label className="my-1 text-gray-700 font-bold">Search:</label>
              <Input 
                value={filter?.inputValue}
                onChange={(e) => setFilter({ ...filter, inputValue: e.target.value })}
                placeholder="Search for countries ..."
                className="w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
              />
            </Col>
            <Col xs={24} sm={12} md={12} lg={8} xl={6}>
              <label className="my-1 text-gray-700 font-bold">Search filters:</label>
              <Select 
                value={filter?.selectValue}
                onChange={(value) => setFilter({ ...filter, selectValue: value })}
                options={options}
                placeholder="Search by"
                className="w-full h-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
              />
            </Col>
            <Col span={24} className="flex justify-end mt-4">
              <Button type="primary" size="medium" loading={loading} disabled={loading} onClick={()=>get_data()} className="w-28 font-bold bg-violet-600 hover:bg-blue-800 hover:scale-105 transition duration-200">
                Search
              </Button>
            </Col>
          </Row>
        </Card>
        <div className="my-4 font-bold text-gray-800">
          <p>
            Providing list of countries with flag,name and currency as well
          </p>
        </div>
        <Row gutter={[10,10]} className="flex justify-end">
          <Col xs={16} sm={20} md={10} lg={8} xl={7} xxl={6} style={{minHeight:"20px"}}>
            <Select 
              value={sort}
              onChange={(value) => {
                setSort(value);
                sortData(value)
              }}
              className="form-select form-control w-full h-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-violet-500"
            >
              <Option value="name">Sort by Name</Option>
              <Option value="population">Sort by Population</Option>
            </Select>
          </Col>
          <Col xs={24} sm={24} md={14} lg={11} xl={7} xxl={5} className="flex justify-end">
            <SliderToggle selected={selectedView} setSelected={setSelectedView}/>
          </Col>
        </Row>
        <Row className="h-fit">
          <Col span={24}>
            <AnimatePresence mode="wait">
              {selectedView === 'list' ? (
                <motion.div
                  key="list-view"
                  initial={{ opacity: 0, x: 20, rotate: 20 }} 
                  animate={{ opacity: 1, x: 0, rotate: 0 }} 
                  exit={{ opacity: 0, x: -20, rotate: -20 }}
                  transition={{ duration: 0.4 }}
                  className="h-full"
                >
                  <List
                    loading={loading}
                    data={displayedData}
                    originalData={data}
                    loadMoreData={loadMoreData}
                    loadMoreLoading={loadMoreLoading}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="table-view"
                  initial={{ opacity: 0, rotate: 20 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <CountryTable countries={data} loading={loading} />
                </motion.div>
              )}
            </AnimatePresence>
          </Col>
        </Row>
      </div>
  )
}