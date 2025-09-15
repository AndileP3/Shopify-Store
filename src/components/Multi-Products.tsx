import { gql, request } from "graphql-request";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/MultiProduct.module.css";

const URL = "https://vintage-store-team.myshopify.com/api/2025-07/graphql.json";
const STOREFRONT_TOKEN = "98f04c2261ef3843b0bcb76dd76a4cac";

const QUERY = gql`
  {
    products(first: 10) {
      edges {
        node {
          id
          title
          descriptionHtml
          featuredImage {
            url
            altText
          }
        }
      }
    }
  }
`;

const getProducts = async () => {
  try {
    const response = await request(
      URL,
      QUERY,
      {},
      {
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
        "Content-Type": "application/json",
      }
    );
    const typedResponse = response as {
      products: { edges: { node: any }[] };
    };
    return typedResponse.products.edges.map((edge) => edge.node);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const MultiProduct = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      const data = await getProducts();
      setProducts(data);
    })();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      {filteredProducts.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={styles.card}>
              {product.featuredImage && (
                <img
                  src={product.featuredImage.url}
                  alt={product.featuredImage.altText || product.title}
                  className={styles.image}
                />
              )}
              <h3>{product.title}</h3>
              <div
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
              <Link to={`/product/${encodeURIComponent(product.id)}`}>
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiProduct;
