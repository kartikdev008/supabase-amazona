import Layout from "../../components/Layout";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabaseAdmin } from "../../utils/supabaseClient";
import Link from "next/link";

const ProductScreen = (props) => {
  const { slug } = props;
  const [state, setState] = useState({
    product: null,
    loading: true,
    error: "",
  });
  const { product, loading, error } = state;

  const fetchData = async () => {
    try {
      const product = await supabaseAdmin
        .from("products")
        .select("*")
        .eq("slug", slug);

      setState({ ...state, product: product.data[0], loading: false });
    } catch (err) {
      setState({ ...state, loading: false, error: err.message });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      {loading ? (
        "Loading..."
      ) : error ? (
        { error }
      ) : (
        <>
          <Image
            src={product.image_url}
            alt=""
            width={600}
            height={600}
          ></Image>
          <div>
            <p>Name: {product.name}</p>
            <p>Category: {product.category}</p>
            <p>Brand: {product.brand}</p>
            <p>Rating: {product.rating}</p>
            <p>Reviews: {product.num_reviews}</p>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <p>
              Status: {product.count_in_stock > 0 ? "In Stock" : "Unavailable"}
            </p>
            <p>Add To Cart</p>
            <Link href="/" passHref>
              <a>Back to results</a>
            </Link>
          </div>
        </>
      )}
    </Layout>
  );
};

export default ProductScreen;

export function getServerSideProps(context) {
  return {
    props: { slug: context.params.slug },
  };
}
