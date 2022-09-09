import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { supabaseAdmin } from "../utils/supabaseClient";
import ProductItem from "../components/ProductItem";

const Home = () => {
  const [state, setState] = useState({
    products: [],
    error: "",
    loading: true,
  });
  const { loading, error, products } = state;

  const fetchData = async () => {
    try {
      const products = await supabaseAdmin
        .from("products")
        .select("*")
        .order("id");

      setState({ products: products.data, loading: false });
    } catch (err) {
      setState({ loading: false, error: err.message });
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
          {products.map((product) => (
            <ProductItem key={product.id} product={product}></ProductItem>
          ))}
        </>
      )}
    </Layout>
  );
};

export default Home;

/*
export async function getStaticProps() {
  const supabaseAdmin = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );

  const { data } = await supabaseAdmin.from("products").select("*").order("id");

  return {
    props: {
      products: data,
    },
  };
} */
