import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import 'react-tabs/style/react-tabs.css';
import orderCoverImg from '../../assets/shop/order.jpg'
import Cover from '../Shared/Cover/Cover'
import { useState } from 'react';
import useMenu from '../../hooks/useMenu';
import OrderTab from './OrderTab/OrderTab';
const Order = () => {
    const [tabIndex, setTabIndex] = useState(0)
    const [ menu ] = useMenu();
    const desserts = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const drinks = menu.filter(item => item.category === 'drinks')
  return (
    <div>
        <Cover img={orderCoverImg} title="Order Food"></Cover>
        <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
  <TabList>
    <Tab>Salad</Tab>
    <Tab>Pizza</Tab>
    <Tab>Soup</Tab>
    <Tab>Dessert</Tab>
    <Tab>Drinks</Tab>
  </TabList>
  <TabPanel>
    <OrderTab items={salad} />
  </TabPanel>
  <TabPanel>
  <OrderTab items={pizza} />
  </TabPanel>
  <TabPanel>
  <OrderTab items={soup} />
  </TabPanel>
  <TabPanel>
  <OrderTab items={desserts} />
  </TabPanel>
  <TabPanel>    
    <OrderTab items={drinks} />
</TabPanel>
</Tabs>
    </div>
  )
}

export default Order