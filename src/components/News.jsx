import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from "moment";
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Text, Title } = Typography;
const { Option } = Select;
const demoImage = "data:image/jpeg;base64,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";

const News = ({simplified}) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ?6:12});
  
  if(!cryptoNews?.value) return 'Loading...';
  return (
    <Row gutter={[24,24]}>
      {!simplified && (
        <Col span={24}>
           <Select 
                  showSearch
                  className='select-news'
                  placeholder="Select a Crypto"
                  optionFilterProp='children'
                  onChange={(value) => setNewsCategory(value)}
                  filterOption={(input, Option) => Option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                  <Option value="Cryptocurrency">Cryptocurrency</Option>
                  {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
                  </Select>
 
                  </Col>
      )}
      {cryptoNews.value.map((news,index) => (
            <Col xs={24} sm={12} lg={8} key={index} >
              <Card hoverable className='news-card'>
                  <a href={news.url} target="_blank" rel="noreferrer">
                      <div className="news-image-container">
                        <Title className='news-title' level={4}>
                             {news.name}
                        </Title>
                        <img style={{maxWidth:"200px", maxHeight: "100px"}}  src={news?.image?.thumbnail?.contentUrl || demoImage } alt="news" />
                      </div>
                      <p>
                        {news.description > 100 ? `${news.description.substring(0,100)}...`:news.description}
                      </p>
                      <div className="provider-container">
                        <div>
                          <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage } alt=""/>
                          <Text className='provider-name'>{news.provider[0]?.name}</Text>
                        </div>
                          <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                      </div>
                  </a>
              </Card>
            </Col>
      ))}
    </Row>
  )
}

export default News