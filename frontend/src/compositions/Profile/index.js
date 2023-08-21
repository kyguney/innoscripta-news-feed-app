/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalStates, newsAPI } from '@contexts/app-context'
import {
  Button,
  Form,
  Divider,
  Checkbox,
  Select,
  Spin,
  Layout,
  Row,
  Col,
  message
} from 'antd'
import SiteLayout from '@compositions/Layout'

const Profile = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const [profileForm] = Form.useForm()
  const { currentUser, isLoggedIn, getUser } = useGlobalStates()
  const [allAuthorsOptions, setAllAuthorsOptions] = useState({})
  const [allCategoriesOptions, setAllCategoriesOptions] = useState({})
  const [allSourcesOptions, setAllSourcesOptions] = useState({})
  const [formLoading, setFormLoading] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, isLoggedIn])

  useEffect(() => {
    if (isLoggedIn) {
      getAllAuthors()
      getAllCategories()
      getAllSources()
    }
  }, [currentUser])

  const getAllAuthors = async () => {
    try {
      const authorsReq = await newsAPI.get('/api/authors')
      const authors = await authorsReq.data
      const authorsOptions = await authors.map((author) => ({
        label: author,
        value: author
      }))
      let userAuthors = await authorsOptions.map((author) => author.value)
      if (currentUser?.authors !== null) {
        userAuthors = await currentUser.authors.split(':')
      }
      setAllAuthorsOptions({ all: authorsOptions, selected: userAuthors })
    } catch (error) {
      console.log(`Authors couldn't be loaded! Error Code: ${error.message}`)
    }
  }

  const getAllCategories = async () => {
    try {
      const categoriesReq = await newsAPI.get('/api/categories')
      const categories = await categoriesReq.data
      const categoriesOptions = await categories.map((category) => ({
        label: category.title,
        value: category.id
      }))
      let userCats = await categoriesOptions.map((category) => category.value)
      if (currentUser?.cats !== null) {
        userCats = await currentUser.cats.split(':').map(function (item) {
          return parseInt(item, 10)
        })
      }
      setAllCategoriesOptions({ all: categoriesOptions, selected: userCats })
    } catch (error) {
      console.log(`Categories couldn't be loaded! Error Code: ${error.message}`)
    }
  }

  const getAllSources = async () => {
    try {
      const sourcesReq = await newsAPI.get('/api/sources')
      const sources = await sourcesReq.data
      const sourcesOptions = await sources.map((source) => ({
        label: source.title,
        value: source.id
      }))
      let userSources = await sourcesOptions.map((source) => source.value)
      if (currentUser?.sources !== null) {
        userSources = await currentUser.sources.split(':').map(function (item) {
          return parseInt(item, 10)
        })
      }
      setAllSourcesOptions({ all: sourcesOptions, selected: userSources })
    } catch (error) {
      console.log(`Sources couldn't be loaded! Error Code: ${error.message}`)
    }
  }

  const updateUser = (values) => {
    setFormLoading(true)
    newsAPI
      .post('/api/update-user', {
        id: currentUser.id,
        cats: `${values.categories.join(':')}`,
        sources: `${values.sources.join(':')}`,
        authors: `${values.authors.join(':')}`
      })
      .then((response) => {
        setFormLoading(false)
        if (response.status === 200) {
          messageApi.open({
            type: 'success',
            content: 'Profile has been saved successfully!'
          })
          getUser()
        } else {
          messageApi.open({
            type: 'warning',
            content:
              'Unknown Issue! Profile data has not been saved successfully'
          })
        }
      })
      .catch((error) => {
        setFormLoading(false)
        messageApi.open({
          type: 'error',
          content: error.message
        })
      })
  }
  return isLoggedIn ? (
    <SiteLayout>
      {contextHolder}
      <Layout style={{ alignItems: 'center' }}>
        <Row>
          <Col>
            <h2>Profile</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form
              onFinish={updateUser}
              form={profileForm}
              name="basic"
              labelCol={{
                span: 8
              }}
              wrapperCol={{
                span: 24
              }}
              style={{
                maxWidth: 600
              }}
            >
              <Spin
                tip="Loading"
                size="large"
                spinning={
                  !(
                    Object.keys(allAuthorsOptions).length > 0 &&
                    Object.keys(allCategoriesOptions).length > 0 &&
                    Object.keys(allSourcesOptions).length > 0
                  ) || formLoading
                }
              >
                <Divider orientation="left">Sources</Divider>
                {Object.keys(allSourcesOptions).length > 0 && (
                  <Form.Item
                    name="sources"
                    initialValue={allSourcesOptions.selected}
                  >
                    <Checkbox.Group options={allSourcesOptions.all} />
                  </Form.Item>
                )}
                <Divider orientation="left">Categories</Divider>
                {Object.keys(allCategoriesOptions).length > 0 && (
                  <Form.Item
                    name="categories"
                    initialValue={allCategoriesOptions.selected}
                  >
                    <Checkbox.Group options={allCategoriesOptions.all} />
                  </Form.Item>
                )}
                <Divider orientation="left">Authors</Divider>
                {Object.keys(allAuthorsOptions).length > 0 && (
                  <Form.Item
                    name="authors"
                    initialValue={allAuthorsOptions.selected}
                  >
                    <Select
                      mode="multiple"
                      style={{
                        width: '100%'
                      }}
                      options={allAuthorsOptions.all}
                    />
                  </Form.Item>
                )}
                <Button
                  htmlType="submit"
                  type="primary"
                  style={{ float: 'right', marginTop: '7px' }}
                >
                  Save
                </Button>
                <Button
                  type="default"
                  onClick={() => navigate('/')}
                  style={{
                    float: 'right',
                    marginTop: '7px',
                    marginRight: '7px'
                  }}
                >
                  Cancel
                </Button>
              </Spin>
            </Form>
          </Col>
        </Row>
      </Layout>
    </SiteLayout>
  ) : null
}

export default Profile
