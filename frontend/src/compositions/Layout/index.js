import { useNavigate } from 'react-router-dom'
import { Layout, Row, Col, Menu, Popover, Avatar, List } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useGlobalStates } from '@contexts/app-context'

const SiteLayout = ({ children, className }) => {
  const { currentMenuItem, setCurrentMenuitem, isLoggedIn, logout } =
    useGlobalStates()
  const navigate = useNavigate()
  const { Header, Content, Footer } = Layout

  const userToolsContent = (
    <List>
      <List.Item>
        <a
          href="/profile"
          onClick={(event) => {
            event.preventDefault()
            navigate('/profile')
          }}
        >
          Profile
        </a>
      </List.Item>
      <List.Item>
        <a
          href="/sign-out"
          onClick={(event) => {
            event.preventDefault()
            logout()
          }}
        >
          Sign Out
        </a>
      </List.Item>
    </List>
  )
  return (
    <Layout className={['site-layout', className]}>
      <Header className="header">
        <Row justify="space-between" align="middle">
          <Col sm={6}>
            <h1
              onClick={() => {
                navigate('/')
                setCurrentMenuitem([])
              }}
            >
              Innoscripta News Feed
            </h1>
          </Col>
          <Col sm={6}>
            {isLoggedIn ? (
              <Popover
                placement="bottomRight"
                trigger="click"
                content={userToolsContent}
                className="user-popover"
              >
                <Avatar
                  size={{ xs: 38, sm: 38, md: 38, lg: 38, xl: 41, xxl: 41 }}
                  icon={<UserOutlined />}
                  className="user-avatar"
                />
              </Popover>
            ) : (
              <Menu
                className="main-nav"
                selectedKeys={currentMenuItem}
                items={[
                  {
                    key: 'login',
                    label: 'Login',
                    onClick: () => {
                      navigate('/login')
                      setCurrentMenuitem(['login'])
                    }
                  },
                  {
                    key: 'register',
                    label: 'Register',
                    onClick: () => {
                      navigate('/register')
                      setCurrentMenuitem(['register'])
                    }
                  }
                ]}
                theme="dark"
                mode="horizontal"
              />
            )}
          </Col>
        </Row>
      </Header>
      <Content className="main-content">
        <Row>
          <Col span={18}>
            {children}
          </Col>
        </Row>
      </Content>
      <Footer className="footer">© 2023 Kyguney. All Rights Reserved.</Footer>
    </Layout>
  )
}

export default SiteLayout
