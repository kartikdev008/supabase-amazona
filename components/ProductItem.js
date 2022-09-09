import Image from "next/image";
import Link from "next/link";

const ProductItem = ({ product }) => {
  console.log(product);

  return (
    <>
      <Link href={`/product/${product.slug}`} passHref>
        <a>
          <Image
            src={product.image_url}
            alt=""
            width={300}
            height={300}
          ></Image>
          <p>{product.name}</p>
          <p>
            {product.rating} ({product.num_reviews} reviews)
          </p>
        </a>
      </Link>
      <p>${product.price}</p>
      <p>Add To Cart</p>
    </>
  );
};

export default ProductItem;
