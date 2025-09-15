import { gql, request } from "graphql-request";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/SingleProduct.module.css";

const URL = "https://vintage-store-team.myshopify.com/api/2025-07/graphql.json";
const STOREFRONT_TOKEN = "98f04c2261ef3843b0bcb76dd76a4cac";

const getProductById = async (id: string) => {
  const QUERY = gql`
    query getProduct($id: ID!) {
      product(id: $id) {
        id
        title
        descriptionHtml
        featuredImage {
          url
          altText
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  `;
  try {
    const response = await request(
      URL,
      QUERY,
      { id },
      {
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
        "Content-Type": "application/json",
      }
    );
    return (response as { product: any }).product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (id) {
      (async () => {
        const data = await getProductById(id);
        setProduct(data);
      })();
    }
  }, [id]);

  if (!product) return <p>Loading product...</p>;

  const minPrice = product.priceRange.minVariantPrice.amount;
  const maxPrice = product.priceRange.maxVariantPrice.amount;
  const currency = product.priceRange.minVariantPrice.currencyCode;

  return (
    <div className={styles.container}>
      {product.featuredImage && (
        <img
          src={product.featuredImage.url}
          alt={product.featuredImage.altText || product.title}
          className={styles.image}
        />
      )}

      <div className={styles.content}>
        <h2>{product.title}</h2>

        <p className={styles.price}>
          {minPrice} {currency}
          {maxPrice !== minPrice && (
            <> - {maxPrice} {currency}</>
          )}
        </p>

        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
        />

        <button className={styles.button}>Add to Cart</button>
      </div>
    </div>
  );
};

export default SingleProduct;
