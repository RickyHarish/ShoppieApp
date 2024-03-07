import React, {useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { listProducts } from '../actions/productActions'
import Product from "../components/Product"
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { useParams } from 'react-router-dom'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { Link } from 'react-router-dom'


const HomeScreen = () => {
  const dispatch = useDispatch()
  const {keyword} = useParams()
  const {pageNumber} = useParams()

  const pageNo = pageNumber ? pageNumber : 1

  const productList = useSelector(state=>state.productList)
  const {loading, error, products, page, pages} = productList
  
  useEffect(()=>{   
    dispatch(listProducts(keyword, pageNo ))
  }, [dispatch, keyword, pageNo])



  return (
    <>
    <Meta />
    {!keyword ? <ProductCarousel />: <Link to='/' className='btn btn-light'>Go Back</Link>}
      <h1>Latest Products</h1>
      {loading ? <Loader />:error? <Message variant="danger" >{error}</Message>:
      <>
      <Row>
          {products.map(product=>(
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
            </Col>
          ))}
      </Row>
      <Paginate pages={pages} page={page} keyword={keyword ? keyword:''} />
      </>
      }
    </>
  )
}

export default HomeScreen
