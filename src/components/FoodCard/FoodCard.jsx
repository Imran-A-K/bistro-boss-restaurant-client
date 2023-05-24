const FoodCard = ({item}) => {
    const { name, image, price, recipe } = item;

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img
          src={image}
          alt="Shoes"
        />
        <p className="bg-slate-900 absolute right-0 mr-4 mt-4 px-4 text-white">${price}</p>
      </figure>
      <div className="card-body text-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
         s <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
