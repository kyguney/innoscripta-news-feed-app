import { useEffect, useState } from 'react'
import { Row, Col, Form, Input, DatePicker, Select, Button } from 'antd'
import { useGlobalStates, newsAPI } from '@contexts/app-context'

const NewsFilter = () => {
  const [filterForm] = Form.useForm()
  const [allCategoriesOptions, setAllCategoriesOptions] = useState([])
  const [allSourcesOptions, setAllSourcesOptions] = useState([])
  const { currentUser, getFeeds, setNewsLoading } = useGlobalStates()
  const { RangePicker } = DatePicker

  useEffect(() => {
    getAllCategories()
    getAllSources()
  }, [])

  const updateFilter = (values) => {
    setNewsLoading(true)
    getFeeds(currentUser, values)
  }

  const resetFilter = () => {
    setNewsLoading(true)
    getFeeds(currentUser, {})
    filterForm.setFieldsValue({
      q: undefined,
      between: undefined,
      source: undefined,
      category: undefined
    })
  }

  const getAllCategories = async () => {
    try {
      const categoriesReq = await newsAPI.get('/api/categories')
      const categories = await categoriesReq.data
      const categoriesOptions = await categories.map((category) => ({
        label: category.title,
        value: category.id
      }))
      setAllCategoriesOptions(categoriesOptions)
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
      setAllSourcesOptions(sourcesOptions)
    } catch (error) {
      console.log(`Sources couldn't be loaded! Error Code: ${error.message}`)
    }
  }

  return (
    <Row>
      <Col span={24} style={{paddingLeft: '25px'}}>
        <Form form={filterForm} onFinish={updateFilter}>
          <Row gutter={{ xs: 8, sm: 12 }} justify="space-between">
            <Col className="gutter-row" span={7}>
              <Form.Item name="q">
                <Input placeholder="Search by keywords" />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={5}>
              <Form.Item name="between">
                <RangePicker format="DD.MM.YY" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={4}>
              <Form.Item name="category">
                <Select placeholder="Category" options={allCategoriesOptions} />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={4}>
              <Form.Item name="source">
                <Select placeholder="Source" options={allSourcesOptions} />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={4}>
              <Button type="default" onClick={resetFilter}>
                Reset
              </Button>
              <Button
                htmlType="submit"
                type="primary"
                style={{ marginLeft: '7px' }}
              >
                Filter
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

export default NewsFilter
