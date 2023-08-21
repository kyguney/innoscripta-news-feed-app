/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useGlobalStates } from '@contexts/app-context'
import { Card, List, Typography, Row, Col, Badge } from 'antd'
import SiteLayout from '@compositions/Layout'
import NewsFilter from '@components/NewsFilter'

const Home = () => {
  const { Text } = Typography
  const { currentUser, newsLoading, getFeeds, newsFeed, setNewsLoading } =
    useGlobalStates()

  useEffect(() => {
    setNewsLoading(true)
    getFeeds(currentUser)
  }, [])

  const limit = (string = '', limit = 0) => {
    return string.substring(0, limit)
  }
  const badgeDetails = [
    { source: 'Guardian API', color: 'pink' },
    { source: 'NewsAPI', color: 'green' },
    { source: 'New york Times API', color: 'blue' }
  ]

  return (
    <SiteLayout>
      <NewsFilter />
      <List
        loading={newsLoading}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 4
        }}
        dataSource={newsFeed}
        renderItem={(item) => {
          const currentBadge = badgeDetails.filter(
            (badge) => badge.source === item.source.title
          )
          const date = new Date(item.news_time)
          return (
            <List.Item>
              <Badge.Ribbon
                text={item.source.title}
                color={currentBadge[0].color}
                style={{ marginTop: '35px' }}
              >
                <Card
                  title={`${limit(item.title.replace(/<[^>]+>/g, ''), 50)}...`}
                >
                  <Row style={{ marginBottom: '7px' }}>
                    <Col>
                      <Text code>{item.category.title}</Text>
                    </Col>
                  </Row>
                  {`${limit(item.content.replace(/<[^>]+>/g, ''), 150)}...`}
                  <Row justify="space-between" style={{ marginTop: '7px' }}>
                    <Col>
                      <Text type="secondary">
                        {date.toLocaleString('de-DE', {
                          timeZone: 'Europe/Berlin'
                        })}
                      </Text>
                    </Col>
                    {item?.author && (
                      <Col>
                        <Text italic>{limit(item.author, 20)}...</Text>
                      </Col>
                    )}
                  </Row>
                </Card>
              </Badge.Ribbon>
            </List.Item>
          )
        }}
      />
    </SiteLayout>
  )
}

export default Home
