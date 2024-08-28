import { useEffect, useState } from "react";
import "./styles.css"
export default function LoadMoreComp(){
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [disable, setDisable] = useState(false);
    async function fetchProducts(){
        try{
            setLoading(true);
            const reponse = await fetch(`https://dummyjson.com/products?limit=20&skip=${count === 0 ? 0 : count * 20}`);
            const data = await reponse.json();
            console.log(data);
            if(data.products.length){
                setProducts((prevData) => [...prevData, ...data.products]);
                setLoading(false);
            }
        }
        catch(e){
            setLoading(false);
            console.log(e);
        }
    }
    useEffect(() => {
        fetchProducts();
    }, [count]); 
    useEffect(() => {
        if(products.length === 100){
            setDisable(true);
        }
    }, [products]); 
    if(loading){
        return <div>Loading data... please wait</div>
    }
    return <div className="container">
        <div className="product-container">
            {
                products.map((eachProduct, index) => {
                    return <div className="product" key={eachProduct.id}>
                        <div>Rating:<span className="product-rating">{eachProduct.rating}/5</span></div>
                        <img src={eachProduct.thumbnail} alt={eachProduct.title}/>
                        <p>{eachProduct.title}</p>
                        <div>Price:<span className="product-price">${eachProduct.price}</span></div>
                    </div>
                })
            }
        </div>
        <div className="button-container">
            <button disabled={disable} onClick={() => setCount(count + 1)}>Load More Products</button>
        </div>
    </div>
}