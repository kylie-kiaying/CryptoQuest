import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card, Button } from 'antd'; // Ensure Button is imported
import moment from 'moment';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews, error } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });

  const [showAll, setShowAll] = useState(false);

  const displayedNews = showAll ? cryptoNews.data : cryptoNews.data.slice(0, 6);

  if (error) return <p>Error loading news</p>;
  if (!cryptoNews || !Array.isArray(cryptoNews.data)) return <p>Loading...</p>;

  return (
    <>
      <Row gutter={[24, 24]}>
        {displayedNews.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>{news.title}</Title>
                  <img src={news.thumbnail || demoImage} alt={news.title} />
                </div>
                <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
                <div className="provider-container">
                  <div>
                    <Avatar src={news.provider?.[0]?.image?.thumbnail?.contentUrl || demoImage} alt={news.provider?.[0]?.name} />
                    <Text className="provider-name">{news.provider?.[0]?.name}</Text>
                  </div>
                  <Text>{moment(news.createdAt).startOf('ss').fromNow()}</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
      {!showAll && simplified && (
        <Row>
          <Col span={24} style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button type="primary" onClick={() => setShowAll(true)}>Show More</Button>
          </Col>
        </Row>
      )}
    </>
  );
};

export default News;
