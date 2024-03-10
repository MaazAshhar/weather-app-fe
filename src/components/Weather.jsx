import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Card, Container, Spinner } from 'react-bootstrap'
import City from './City'
import AddCity from './AddCity';
import AddCityModal from './AddCityModal';
import style from './styles/Weather.module.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import UpdateCityModal from './UpdateCityModal';

const Weather = () => {
    const [fetched, setFetched] = useState(false);
    const [modal, setModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [updateCityId, setUpdateCityId] = useState('');
    const [deleted, setDeleted] = useState(0);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (Cookies.get('jwt-token')) {
            const response = fetch('https://weather-app-be.vercel.app/weather',{method: 'get', headers:{"Content-Type": 'application/json', "authorization": `Bearer ${Cookies.get('jwt-token')}`}})
            .then(res => res.json())
            .then(response => {
                if (response.error) {
                  Cookies.set('error', response.error);
                  navigate('/login');
                }
                else {
                  setData(response.cities);
                  setFetched(true);
                }
            })
        } else {
            Cookies.set('error', 'Please login first');
            navigate('/login');
        }
    }, [modal, deleted, updateModal])


  return (
    <>
        {modal && <AddCityModal setModal={setModal} setFetched={setFetched} />}
        {updateModal && <UpdateCityModal setUpdateModal={setUpdateModal} updateCityId={updateCityId} setUpdateCityId={setUpdateCityId} data={data} setFetched={setFetched} />}
        <Navbar modal={modal} blur={style.blur}/>
        <Container
        className={`${(modal || updateModal)?style.blur:''} d-flex justify-content-center align-items-center`}>
            <Card className='rounded as-card mt-5'>
                {!fetched && <div className='d-flex justify-content-center align-items-center' style={{width: '22rem', height: '22rem'}}><Spinner animation="grow" /></div>}
                {fetched && <>
                {data.length < 4 && <AddCity data={data} setData={setData} modal={modal} setModal={setModal}/>}
                <div className='rounded p-2 mx-1 d-flex flex-column'>
                    {data.map((item, key)=>(<City item={item} key={key} deleted={deleted} setDeleted={setDeleted} setUpdateModal={setUpdateModal} setUpdateCityId={setUpdateCityId} />))}
                </div>
                </>}
            </Card>

        </Container>
    </>
  )
}

export default Weather