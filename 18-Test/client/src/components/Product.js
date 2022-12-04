import axios from "axios";

const Product = ({product}) => {

    const DeleteProduct = (id) => {
        axios.delete(`http://localhost:8080/api/productos/${id}`).then(() => {
            alert("Producto eliminado!")
            window.location.reload()
        })

    }

    const UpdateProduct = (product) => {
        const update = prompt('NO modificar nada aparte de la información del producto, NO modificar el ID', JSON.stringify(product))

        axios.put(`http://localhost:8080/api/productos/${product['_id']}`, JSON.parse(update)).then(() => {
            alert("Producto actualizado!");
            window.location.reload()
        })

    }

    return (

        <div className="card">
            <img src={product.thumbnail || "https://i.ibb.co/6nDS7nX/goose.jpg"} style={{width: '100%'}}></img>
            <h2>{product.title}</h2>
            <h3 className="price">{"$" + product.price}</h3>
            <button onClick={() => DeleteProduct(product['_id'])}>Eliminar</button>
            <button onClick={() => UpdateProduct(product)}>Editar</button>
        </div>

    )
}

export default Product
