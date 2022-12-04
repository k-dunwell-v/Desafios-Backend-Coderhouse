import './App.css';
import axios from "axios";
import { useState, useEffect } from "react";
import Product from './components/Product';

function App() {

	const [form, setForm] = useState(true)

	let formWidth = ''

	if (form) {
		formWidth = '50%'
	}else{
		formWidth = '100%'
	}


	const [products, setProducts] = useState([{}])

	useEffect(() => {
		axios.get('http://localhost:8080/api/').then((response) => {
			setForm(form => response.data.form)
			setProducts(products => response.data.products)
		})
	}, [])

  	return (
		<div className="main">

			{form &&
				<div style={{width: 'width:50%'}}>
					<div className="formBox">
						<h3>Registrar nuevo producto</h3>

						<form id="productForm" method="POST" action='http://localhost:8080/api/productos'>
							<input type="text" name="title" placeholder="Título" id="title" required></input>
							<input type="text" name="thumbnail" placeholder="Foto (url)" id="thumbnail"></input>
							<input type="text" name="detail" placeholder="Details" id="detail"></input>
							<input type="number" name="price" placeholder="Precio" id="price" required></input>
							<input type="number" name="stock" placeholder="Stock" id="stock" required></input>
							<input type="submit" className="submit" value="Registrar"></input>
						</form>

					</div>
				</div>
			}

			<div className="products" style={{width: formWidth}}>

				<h1 style={{color: "black"}}>Productos</h1>

				<div id="cardRow">

					{products.length === 1 ?
						<h3>Nada por aquí...</h3>
						:
						products.map ( product => <Product key={product['_id'] || product['id'] } product={product}/>)
					}

				</div>

			</div>

		</div>
	);
}

export default App;
