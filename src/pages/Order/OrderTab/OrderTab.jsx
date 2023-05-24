import FoodCard from "../../../components/FoodCard/FoodCard"

const OrderTab = ({ items }) => {
  return (
    <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-10'>
    {
        items.map(item => <FoodCard
        key={item._id}
        item={item}
        ></FoodCard>)
    }
    </div>
  )
}

export default OrderTab