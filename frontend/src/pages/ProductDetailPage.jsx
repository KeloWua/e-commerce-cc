import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import ProductDetail from "../components/ProductDetail";
import { ProductsContext } from "../context/ProductsContext";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { getProductById } = useContext(ProductsContext);
  const [product, setProduct] = useState(null);



  useEffect(() => {
    const loadProduct = async () => {
      const data = await getProductById(productId);
      setProduct(data);
    };

    loadProduct();
    console.log(product)
  }, [productId, getProductById]);

  if (!product) return <p className="text-center mt-12">Loading product...</p>;

  return <ProductDetail product={product.product} reviews={product.reviews} />;
};

export default ProductDetailPage;